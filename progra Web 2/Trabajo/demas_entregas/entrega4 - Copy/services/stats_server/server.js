import { GraphQLServer } from 'graphql-yoga'
import { obtenerUsuario, obtenerUsuarios, CrearUsuario, ModificarUsuario } from './userPers.js'
import { obtenerPartida, obtenerPartidas, crearPartida } from './partidaPers.js'
import crypto from 'crypto'
import uuid from 'uuid'

const { v4: uuidv4 } = uuid

const typeDefs = `
type User {
  nombreUsuario: String!
  numeroJuegos:  Int
  numeroVictorias:  Int
  numeroDerrotas:  Int
}


type Partida{
partida: String!
}



type Query {
  getUsers: [User!]!
  getUser(nombreUsuario: String!): User
  getPartidas(nombreUsuario: String!): [Partida!]!
  getPartida(nombreUsuario: String!, id: Int!): Partida
  
}

type Mutation {
  crearPartida(partida: String!): Partida!
  modificarUsuario(nombreUsuario: String!,ganadas: Int!,perdidas: Int!,partidas: Int!): User!
  crearUsuario(nombreUsuario: String!): User!
}
`

const resolvers = {
  Query: {
    async getUsers() {
      const users = await obtenerUsuarios()
      console.log(users)
      return users
    },

    async getUser(_, { nombreUsuario }) {

      const user = (await obtenerUsuario(nombreUsuario))
      return JSON.parse(user)
    },

    async getPartida(_, { nombreUsuario, id }) {
      const partida = (await obtenerPartida(id, nombreUsuario))
    
     console.log("-------------------------------")
      return {partida}
    },
    async getPartidas(_,{ nombreUsuario }) {
      const partidas = await obtenerPartidas(nombreUsuario)
      console.log(partidas)
      return partidas
    },
  },
  Mutation: {
    async crearUsuario(_, { nombreUsuario }) {

      const UsuarioCreado = await CrearUsuario(nombreUsuario);

      return UsuarioCreado

    },

    async modificarUsuario(_, { nombreUsuario,ganadas,perdidas,partidas }) {

      const UsuarioModificado = await ModificarUsuario(nombreUsuario,ganadas,perdidas,partidas);
      console.log(UsuarioModificado)
      return UsuarioModificado

    },


    async crearPartida(_, { partida }) {
console.log("creandoPartida")
let buff = new Buffer(partida, 'base64');
let text = buff.toString('ascii');
console.log(text)
      const partidaCreada = await crearPartida(text);
      console.log(partidaCreada)

      return {partida: partidaCreada}

    },
    
  },
};
const server = new GraphQLServer({ typeDefs, resolvers })

server.start({ port: process.env.PORT || 4000,  playground: '/graphiql' }, () => console.log('Server started at 4000.'))
