const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql `
  type Board {
    id: ID!
    name: String!
    favorite: Boolean!
    backgroundImage: String!
    users: [User] 
    lists: [List]
  }

  type List {
    id: ID!
    name: String!
    boardId: ID!
    cards: [Card]
  }

  type Card {
    id: ID!
    name: String!
    description: String
    listId: ID!
    labelId: ID
    userId: ID
    list: List 
    label: Label
    user: User
    comments: [Comment]
  }

  type Comment {
    id: ID!
    userId: ID!
    datetime: String!
    content: String!
    cardId: ID!
    user: User
    card: List
  }

  type User {
    id: ID!
    name: String!
    email: String!
    username: String!
    boardId: ID!
  }

  type Label {
    id: ID!
    color: String!
  }

  type Query {
    board(id: ID): Board
    list(id: ID): List
    lists: [List]
    card(id: ID): Card
    cards: [Card]
    comment(id: ID): Comment
    comments: [Comment]
    user(id: ID): User
    users: [User]
    label(id: ID): Label
    labels: [Label]  
  }

  type Mutation {
    addOrUpdateUser(id: ID, name: String!, email: String!, username: String!, boardId: ID!): User
    addOrUpdateList(id: ID, name: String!, boardId: ID!): List
    addOrUpdateCard(id: ID, name: String!, description: String, listId: ID!, labelId: ID, userId: ID): Card
    addOrUpdateComment(id: ID, userId: ID!, datetime: String!, content: String!, cardId: ID!): Comment
    removeUser(id: ID!): ID
    removeList(id: ID!): ID
    removeCard(id: ID!): ID
    removeComment(id: ID!): ID

  }
`

module.exports = typeDefs