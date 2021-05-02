const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");
const { v4: uuid } = require("uuid");
const Joi = require("joi");

const fetchJson = (...args) =>
  fetch(...args)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response;
    })
    .then((response) => response.json());

const schema = `
  type Query {
    allPokemon: [Pokemon!]!
    pokemon(id: ID!): Pokemon
  }
  type Mutation {
    createPokemon(name: String!): Pokemon!
  }
  type Pokemon {
    id: ID!
    name: String!
    types: [Type!]!
  }
  type Type {
    id: ID!
    name: String!
    pokemons(offset: Int!, first: Int!): [Pokemon!]!
  }
`;

const PERSISTENCE_URL =
  "https://0qh9zi3q9g.execute-api.eu-west-1.amazonaws.com/development";
const APPLICATION_ID = "b733f396-bdee-4d4f-aca4-ffad489c4a93";

const resolvers = {
  Query: {
    pokemon: async (_, { id }) => {
      const schema = Joi.string()
        .guid({ version: ["uuidv4"] })
        .required();

      await schema.validateAsync(id);

      const { value } = await fetchJson(`${PERSISTENCE_URL}/pairs/${id}/`, {
        headers: { "x-application-id": APPLICATION_ID },
      });

      return JSON.parse(value);
    },
    allPokemon: async () => {
      const pair = await fetchJson(`${PERSISTENCE_URL}/pairs/`, {
        headers: { "x-application-id": APPLICATION_ID },
      });

      return pair.map((pair) => pair.value).map((value) => JSON.parse(value));
    },
  },
  Mutation: {
    createPokemon: async (_, args) => {
      const pokemon = {
        __type: "pokemon",
        id: uuid(),
        name: args.name,
        type: ["planta", "fuego"],
      };

      await fetch(`${PERSISTENCE_URL}/pairs/${pokemon.id}`, {
        body: JSON.stringify(pokemon),
        headers: { "x-application-id": APPLICATION_ID },
        method: "PUT",
      });

      return pokemon;
    },
  },
  Pokemon: {
    id: (pokemon) => pokemon.id,
    name: (pokemon) => pokemon.name,
    types: (pokemon) =>
      pokemon.types.map(({ type }) => type.url).map((url) => fetchJson(url)),
  },
  Type: {
    id: (type) => type.id,
    name: (type) => type.name,
    pokemons: (type, args) =>
      type.pokemon
        .slice(args.offset, args.first + args.offset)
        .map(({ pokemon }) => fetchJson(pokemon.url)),
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
