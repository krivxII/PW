const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");
const { v4: uuid } = require("uuid");
const Joi = require("joi");
const { getNextGeneration } = require("./business_logic/game_of_life");

const range = (n) => Array.from(Array(n), (_, i) => i);

const fetchJson = (...args) =>
  fetch(...args)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response;
    })
    .then((response) => response.json());

const schema = /* GraphQL */ `
  type Query {
    allPlayers: [Player!]!
    player(id: ID!): Player
  }

  type Mutation {
    createPlayer(name: String!): Player!
    createGame(playerId: ID!, initialState: [[CellState!]!]!): Game!
    stepInTime(playerId: ID!, gameId: ID!): Game!
  }

  type Player {
    id: ID!
    name: String!
    games: [Game!]!
  }

  type Game {
    id: ID!
    initialState: [[CellState!]!]!
    currentGeneration: Int!
    currentState: [[CellState!]!]!
    player: Player!
  }

  enum CellState {
    ALIVE
    DEAD
  }
`;

const PERSISTENCE_URL =
  "https://0qh9zi3q9g.execute-api.eu-west-1.amazonaws.com/development";
const APPLICATION_ID = "c150eddd-a1be-4947-81e7-2e38ce3d98d1";

const resolvers = {
  Query: {
    player: async (_, { id }) => {
      const schema = Joi.string()
        .guid({ version: ["uuidv4"] })
        .required();

      await schema.validateAsync(id);

      const { value } = await fetchJson(
        `${PERSISTENCE_URL}/pairs/player>${id}`,
        {
          headers: { "x-application-id": APPLICATION_ID },
        }
      );

      return JSON.parse(value);
    },
    allPlayers: async () => {
      const pairs = await fetchJson(`${PERSISTENCE_URL}/collections/player>`, {
        headers: { "x-application-id": APPLICATION_ID },
      });

      return pairs
        .map((pair) => pair.value)
        .map((value) => JSON.parse(value))
        .filter((parsedValue) => parsedValue.__type === "player");
    },
  },
  Mutation: {
    createPlayer: async (_, args) => {
      const player = {
        __type: "player",
        id: uuid(),
        name: args.name,
      };

      await fetchJson(`${PERSISTENCE_URL}/pairs/player>${player.id}`, {
        body: JSON.stringify(player),
        headers: { "x-application-id": APPLICATION_ID },
        method: "PUT",
      });

      return player;
    },
    createGame: async (_, args) => {
      // TODO validate all rows have the same length.

      const game = {
        __type: "game",
        id: uuid(),
        initialState: args.initialState,
        currentGeneration: 0,
      };

      await fetchJson(
        `${PERSISTENCE_URL}/pairs/player>${args.playerId}>game>${game.id}`,
        {
          body: JSON.stringify(game),
          headers: { "x-application-id": APPLICATION_ID },
          method: "PUT",
        }
      );

      return game;
    },
    stepInTime: async (_, args) => {
      const pair = await fetchJson(
        `${PERSISTENCE_URL}/pairs/player>${args.playerId}>game>${args.gameId}`,
        {
          headers: { "x-application-id": APPLICATION_ID },
        }
      );

      if (pair == null) {
        throw new Error(
          `Trying to step in time unknown game ${args.gameId} of user ${args.userId}`
        );
      }

      const game = JSON.parse(pair.value);

      const updatedGame = {
        ...game,
        currentGeneration: game.currentGeneration + 1,
      };

      await fetchJson(
        `${PERSISTENCE_URL}/pairs/player>${args.playerId}>game>${args.gameId}`,
        {
          body: JSON.stringify(updatedGame),
          headers: { "x-application-id": APPLICATION_ID },
          method: "PUT",
        }
      );

      return updatedGame;
    },
  },
  Game: {
    currentState: (game) => {
      return range(game.currentGeneration).reduce(
        getNextGeneration,
        game.initialState
      );
    },
  },
  Player: {
    games: async (player) => {
      const pairs = await fetchJson(
        `${PERSISTENCE_URL}/collections/player>${player.id}>game`,
        {
          headers: { "x-application-id": APPLICATION_ID },
        }
      );

      const games = pairs
        .map((pair) => pair.value)
        .map((value) => JSON.parse(value))
        .filter((parsedValue) => parsedValue.__type === "game");

      return games.map((game) => ({ ...game, player }));
    },
  },
};

const server = new GraphQLServer({
  typeDefs: schema,
  resolvers,
});

server.start({
  playground: "/",
  port: process.env.PORT,
});
