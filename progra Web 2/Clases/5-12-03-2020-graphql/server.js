const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");

const typeDefs = `
  type Query {
    pokemon(id: ID!): Pokemon
  }
  type Pokemon {
    id: ID
    name: String
    types: [Type!]!
  }
  type Type {
    id: ID
    name: String
    pokemons: [Pokemon!]!
  }
`;

const BASE_URL = "https://pokeapi.co/api/v2";

const resolvers = {
  Query: {
    pokemon: (_, { id }) =>
      fetch(`${BASE_URL}/pokemon/${id}/`).then(res => res.json())
  },
  Pokemon: {
    types: (root, args) => {
      /* TODO */
    }
  },
  Type: {
    pokemons: (root, args) => {
      /* TODO */
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start({
  playground: "/playground",
  port: process.env.PORT
});
