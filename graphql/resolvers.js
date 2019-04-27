const axios = require('axios')
const { ApolloError } = require('apollo-server')

const resolvers = {
    Query: {
        board: (parent, args) => {
            return axios.get(`http://localhost:3200/boards/1`)
                .then(res => res.data)
        },
        list: (parent, args) => {
            return axios.get(`http://localhost:3200/lists/${args.id}`)
                .then(res => res.data)
        },
        lists: (parent, args) => {
            return axios.get(`http://localhost:3200/lists`)
                .then(res => res.data)
        },
        card: (parent, args) => {
            return axios.get(`http://localhost:3200/cards/${args.id}`)
                .then(res => res.data)
        },
        cards: (parent, args) => {
            return axios.get(`http://localhost:3200/cards`)
                .then(res => res.data)
        },
        comment: (parent, args) => {
            return axios.get(`http://localhost:3200/comments/${args.id}`)
                .then(res => res.data)
        },
        comments: (parent, args) => {
            return axios.get(`http://localhost:3200/comments`)
                .then(res => res.data)
        },
        user: (parent, args) => {
            return axios.get(`http://localhost:3200/users/${args.id}`)
                .then(res => res.data)
        },
        users: (parent, args) => {
            return axios.get(`http://localhost:3200/users`)
                .then(res => res.data)
        },
        label: (parent, args) => {
            return axios.get(`http://localhost:3200/labels/${args.id}`)
                .then(res => res.data)
        },
        labels: (parent, args) => {
            return axios.get(`http://localhost:3200/labels`)
                .then(res => res.data)
        },
    },
    Mutation: {
        addOrUpdateUser: (parent, args) => {
            if (args.id) {
                return axios.put(`http://localhost:3200/users/${args.id}`, {
                        id: args.id,
                        name: args.name,
                        email: args.email,
                        username: args.username,
                        boardId: args.boardId
                    })
                    .then(res => res.data)
            }
            return axios.post(`http://localhost:3200/users`, {
                    name: args.name,
                    email: args.email,
                    username: args.username,
                    boardId: args.boardId
                })
                .then(res => res.data)
        },
        addOrUpdateList: (parent, args) => {
            if (args.id) {
                return axios.put(`http://localhost:3200/lists/${args.id}`, {
                        name: args.name,
                        boardId: args.boardId
                    })
                    .then(res => res.data)
            }
            return axios.post(`http://localhost:3200/lists`, {
                    name: args.name,
                    boardId: args.boardId
                })
                .then(res => res.data)
        },
        addOrUpdateCard: (parent, args) => {
            if (args.id) {
                return axios.put(`http://localhost:3200/cards/${args.id}`, {
                        name: args.name,
                        description: args.description,
                        listId: args.listId,
                        labelId: args.labelId,
                        userId: args.userId
                    })
                    .then(res => res.data)
            }
            return axios.post(`http://localhost:3200/cards`, {
                    name: args.name,
                    description: args.description,
                    listId: args.listId,
                    labelId: args.labelId,
                    userId: args.userId
                })
                .then(res => res.data)
        },
        addOrUpdateComment: (parent, args) => {
            if (args.id) {
                return axios.put(`http://localhost:3200/comments/${args.id}`, {
                        userId: args.userId,
                        datetime: args.datetime,
                        content: args.content,
                        cardId: args.cardId
                    })
                    .then(res => res.data)
            }
            return axios.post(`http://localhost:3200/comments`, {
                    userId: args.userId,
                    datetime: args.datetime,
                    content: args.content,
                    cardId: args.cardId
                })
                .then(res => res.data)
        },
        removeUser: (parent, args) => {
            if (args.id) {
                return axios.delete(`http://localhost:3200/users/${args.id}`)
                    .then(() => args.id)
            }
        },
        removeList: (parent, args) => {
            if (args.id) {
                return axios.delete(`http://localhost:3200/lists/${args.id}`)
                    .then(() => args.id)
            }
        },
        removeCard: (parent, args) => {
            if (args.id) {
                return axios.delete(`http://localhost:3200/cards/${args.id}`)
                    .then(() => args.id)
            }
        },
        removeComment: (parent, args) => {
            if (args.id) {
                return axios.delete(`http://localhost:3200/comments/${args.id}`)
                    .then(() => args.id)
            }
        }
    },
    Board: {
        users: (parent, args) => {
            return axios.get(`http://localhost:3200/users/?boardId=${parent.id}`)
                .then(res => res.data)
        },
        lists: (parent, args) => {
            return axios.get(`http://localhost:3200/lists/?boardId=${parent.id}`)
                .then(res => res.data)
        }
    },
    List: {
        cards: (parent, args) => {
            return axios.get(`http://localhost:3200/cards/?listId=${parent.id}`)
                .then(res => res.data)
        }
    },
    Card: {
        list: (parent, args) => {
            if (parent.listId) {
                return axios.get(`http://localhost:3200/lists/${parent.listId}`)
                    .then(res => res.data)
            }
        },
        label: (parent, args) => {
            if (parent.labelId) {
                return axios.get(`http://localhost:3200/labels/${parent.labelId}`)
                    .then(res => res.data)
            }
        },
        user: (parent, args) => {
            if (parent.userId) {
                return axios.get(`http://localhost:3200/users/${parent.userId}`)
                    .then(res => res.data)
            }
        },
        comments: (parent, args) => {
            return axios.get(`http://localhost:3200/comments/?cardId=${parent.cardId}`)
                .then(res => res.data)
        }
    },
    Comment: {
        user: (parent, args) => {
            if (parent.userId) {
                return axios.get(`http://localhost:3200/users/${parent.userId}`)
                    .then(res => res.data)
            }
        },
        card: (parent, args) => {
            if (parent.cardId) {
                return axios.get(`http://localhost:3200/cards/${parent.cardId}`)
                    .then(res => res.data)
            }
        }
    }
}

module.exports = resolvers