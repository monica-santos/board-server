const axios = require('axios')

const resolvers = {
  Query: {
    board: (parent, args) => {
      return axios.get(`http://localhost:3200/boards/${args.id}`)
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
    addUser: (parent, args) => {
      return axios.post(`http://localhost:3200/users`, {
					name: args.name,
					email: args.email,
					username: args.username,
					boardId: args.boardId
				})
				.then(res => res.data)
    },
    addList: (parent, args) => {
      return axios.post(`http://localhost:3200/lists`, {
					name: args.name,
					boardId: args.boardId
				})
				.then(res => res.data)
    },
    addCard: (parent, args) => {
      return axios.post(`http://localhost:3200/cards`, {
					name: args.name,
					description: args.description,
					listId: args.listId,
					labelId: args.labelId,
					userId: args.userId
				})
				.then(res => res.data)
    },
    addComment: (parent, args) => {
      return axios.post(`http://localhost:3200/comments`, {
					userId: args.userId,
					datetime: args.datetime,
					content: args.content,
					cardId: args.cardId
				})
				.then(res => res.data)
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
      return axios.get(`http://localhost:3200/lists/${parent.listId}`)
        .then(res => res.data)
    },
    label: (parent, args) => {
      return axios.get(`http://localhost:3200/labels/${parent.labelId}`)
        .then(res => res.data)
    },
    user: (parent, args) => {
      return axios.get(`http://localhost:3200/users/${parent.userId}`)
        .then(res => res.data)
    }
  },
  Comment: {
    user: (parent, args) => {
      return axios.get(`http://localhost:3200/users/${parent.userId}`)
        .then(res => res.data)
    },
    card: (parent, args) => {
      return axios.get(`http://localhost:3200/cards/${parent.cardId}`)
        .then(res => res.data)
    }
  }
}

module.exports = resolvers