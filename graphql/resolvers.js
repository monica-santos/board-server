const axios = require('axios')

const resolvers = {
    Query: {
        board: async(parent, args) => {
            const board = await axios.get(`http://localhost:3200/boards/1`)
            return board.data
        },
        list: async(parent, args) => {
            const list = await axios.get(`http://localhost:3200/lists/${args.id}`)
            return list.data
        },
        lists: async(parent, args) => {
            const lists = await axios.get(`http://localhost:3200/lists`)
            return lists.data
        },
        card: async(parent, args) => {
            const card = await axios.get(`http://localhost:3200/cards/${args.id}`)
            return card.data
        },
        cards: async(parent, args) => {
            const cards = await axios.get(`http://localhost:3200/cards`)
            return cards.data
        },
        comment: async(parent, args) => {
            const comment = await axios.get(`http://localhost:3200/comments/${args.id}`)
            return comment.data
        },
        comments: async(parent, args) => {
            const comments = await axios.get(`http://localhost:3200/comments`)
            return comments.data
        },
        user: async(parent, args) => {
            const user = await axios.get(`http://localhost:3200/users/${args.id}`)
            return user.data
        },
        users: async(parent, args) => {
            const users = await axios.get(`http://localhost:3200/users`)
            return users.data
        },
        label: async(parent, args) => {
            const label = await axios.get(`http://localhost:3200/labels/${args.id}`)
            return label.data
        },
        labels: async(parent, args) => {
            const labels = await axios.get(`http://localhost:3200/labels`)
            return labels.data
        },
    },
    Mutation: {
        addOrUpdateUser: async(parent, args) => {
            const { name, email, username, boardId } = args
            const user = { name, email, username, boardId }
            const result = args.id ?
                await axios.put(`http://localhost:3200/users/${args.id}`, user) :
                await axios.post(`http://localhost:3200/users`, user)
            return result.data
        },
        addOrUpdateList: async(parent, args) => {
            const { name, boardId } = args
            const list = { name, boardId }
            const result = args.id ?
                await axios.put(`http://localhost:3200/lists/${args.id}`, list) :
                await axios.post(`http://localhost:3200/lists`, list)
            return result.data
        },
        addOrUpdateCard: async(parent, args) => {
            const { name, description, listId, labelId, userId } = args
            const card = { name, description, listId, labelId, userId }
            const result = args.id ?
                await axios.put(`http://localhost:3200/cards/${args.id}`, card) :
                await axios.post(`http://localhost:3200/cards`, card)
            return result.data
        },
        addOrUpdateComment: async(parent, args) => {
            const { userId, datetime, content, cardId } = args
            const comment = { userId, datetime, content, cardId }
            const result = args.id ?
                await axios.put(`http://localhost:3200/comments/${args.id}`, comment) :
                await axios.post(`http://localhost:3200/comments`, comment)
            return result.data
        },
        removeUser: async(parent, args) => {
            if (args.id) {
                await axios.delete(`http://localhost:3200/users/${args.id}`)
                return args.id
            }
        },
        removeList: async(parent, args) => {
            if (args.id) {
                await axios.delete(`http://localhost:3200/lists/${args.id}`)
                return args.id
            }
        },
        removeCard: async(parent, args) => {
            if (args.id) {
                await axios.delete(`http://localhost:3200/cards/${args.id}`)
                return args.id
            }
        },
        removeComment: async(parent, args) => {
            if (args.id) {
                await axios.delete(`http://localhost:3200/comments/${args.id}`)
                return args.id
            }
        }
    },
    Board: {
        users: async(parent) => {
            const users = await axios.get(`http://localhost:3200/users/?boardId=${parent.id}`)
            return users.data
        },
        lists: async(parent) => {
            const lists = await axios.get(`http://localhost:3200/lists/?boardId=${parent.id}`)
            return lists.data
        }
    },
    List: {
        cards: async(parent) => {
            const cards = await axios.get(`http://localhost:3200/cards/?listId=${parent.id}`)
            return cards.data
        }
    },
    Card: {
        list: async(parent) => {
            if (parent.listId) {
                const list = await axios.get(`http://localhost:3200/lists/${parent.listId}`)
                return list.data
            }
        },
        label: async(parent) => {
            if (parent.labelId) {
                const label = await axios.get(`http://localhost:3200/labels/${parent.labelId}`)
                return label.data
            }
        },
        user: async(parent) => {
            if (parent.userId) {
                const user = await axios.get(`http://localhost:3200/users/${parent.userId}`)
                return user.data
            }
        },
        comments: async(parent) => {
            const comments = await axios.get(`http://localhost:3200/comments/?cardId=${parent.id}`)
            return comments.data
        }
    },
    Comment: {
        user: async(parent) => {
            if (parent.userId) {
                const user = await axios.get(`http://localhost:3200/users/${parent.userId}`)
                return user.data
            }
        },
        card: async(parent) => {
            if (parent.cardId) {
                const card = await axios.get(`http://localhost:3200/cards/${parent.cardId}`)
                return card.data
            }
        }
    }
}

module.exports = resolvers