const axios = require('axios')
const {
	GraphQLObjectType, 
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull,
	GraphQLID,
	GraphQLBoolean
} = require('graphql');

const BoardType = new GraphQLObjectType({
	name: 'Board',
	fields:() => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		favorite: { type: GraphQLBoolean },
		backgroundImage: { type: GraphQLString },
		users : {
			type: new GraphQLList(ListType),
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/users/?boardId=${parent.id}`)
					.then(res => res.data)
			}
		},
		lists: {
			type: new GraphQLList(ListType),
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/lists/?boardId=${parent.id}`)
					.then(res => res.data)
			}
		}
	})
})

const ListType = new GraphQLObjectType({
	name: 'List',
	fields:() => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		boardId: { type: GraphQLID },
		cards: {
			type: new GraphQLList(CardType),
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/cards/?listId=${parent.id}`)
					.then(res => res.data)
			}
		}
	})
})

const CardType = new GraphQLObjectType({
	name: 'Card',
	fields:() => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		listId: { type: GraphQLID },
		labelId: { type: GraphQLID },
		userId: { type: GraphQLID },
		list: {
			type: ListType,
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/lists/${parent.listId}`)
					.then(res => res.data)
			}
		},
		label: {
			type: LabelType,
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/labels/${parent.labelId}`)
					.then(res => res.data)
			}
		},
		user: {
			type: UserType,
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/users/${parent.userId}`)
					.then(res => res.data)
			}
		},
		comments: {
			type: new GraphQLList(CommentType),
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/comments/?cardId=${parent.id}`)
					.then(res => res.data)
			}
		}
	})
})

const CommentType = new GraphQLObjectType({\
	name: 'Comment',
	fields:() => ({
		id: { type: GraphQLID },
		userId: { type: GraphQLID },
		datetime: { type: GraphQLString },
		content: { type: GraphQLString },
		cardId: { type: GraphQLID },
		user: {
			type: UserType,
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/users/${parent.userId}`)
					.then(res => res.data)
			}
		},
		card: {
			type: CardType,
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/cards/${parent.cardId}`)
					.then(res => res.data)
			}
		}
	})
})

const UserType = new GraphQLObjectType({
	name: 'User',
	fields:() => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		username: { type: GraphQLString },
		boardId: { type: GraphQLID }
	})
})

const LabelType = new GraphQLObjectType({
	name: 'Label',
	fields:() => ({
		id: { type: GraphQLID },
		color: { type: GraphQLString },
	})
})

const query = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		board: {
			type: BoardType,
			args: { id: { type: GraphQLID} },
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/boards/${args.id}`)
					.then(res => res.data)
			}
		},
		list: {
			type: ListType,
			args: { id: { type: GraphQLID} },
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/lists/${args.id}`)
					.then(res => res.data)
			}
		},
		lists: {
			type: new GraphQLList(ListType),
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/lists`)
					.then(res => res.data)
			}
		},
		card: {
			type: CardType,
			args: { id: { type: GraphQLID} },
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/cards/${args.id}`)
					.then(res => res.data)
			}
		},
		cards: {
			type: new GraphQLList(CardType),
			args: { id: { type: GraphQLID} },
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/cards`)
					.then(res => res.data)
			}
		},
		comment: {
			type: CommentType,
			args: { id: { type: GraphQLID} },
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/comments/${args.id}`)
					.then(res => res.data)
			}
		},
		comments: {
			type: new GraphQLList(CommentType),
			args: { id: { type: GraphQLID} },
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/comments`)
					.then(res => {
						console.log(res.data);
						return res.data
					})
			}
		},
		user: {
			type: UserType,
			args: { id: { type: GraphQLID} },
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/users/${args.id}`)
					.then(res => res.data)
			}
		},
		users: {
			type: new GraphQLList(UserType),
			args: { id: { type: GraphQLID} },
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/users`)
					.then(res => res.data)
			}
		},
		label: {
			type: LabelType,
			args: { id: { type: GraphQLID} },
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/labels/${args.id}`)
					.then(res => res.data)
			}
		},
		labels: {
			type: new GraphQLList(LabelType),
			args: { id: { type: GraphQLID} },
			resolve(parent, args) {
				return axios.get(`http://localhost:3200/labels`)
					.then(res => res.data)
			}
		},
	}
});

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addUser: {
			type: UserType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				username: { type: new GraphQLNonNull(GraphQLString) },
				boardId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return axios.post(`http://localhost:3200/users`, {
					name: args.name,
					email: args.email,
					username: args.username,
					boardId: args.boardId
				})
				.then(res => res.data)
			}
		},
		addList: {
			type: ListType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				boardId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return axios.post(`http://localhost:3200/lists`, {
					name: args.name,
					boardId: args.boardId
				})
				.then(res => res.data)
			}
		},
		addCard: {
			type: CardType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				description: { type: new GraphQLNonNull(GraphQLString) },
				listId: { type: new GraphQLNonNull(GraphQLID) },
				labelId: { type: GraphQLID },
				userId: { type: GraphQLID }
			},
			resolve(parent, args) {
				return axios.post(`http://localhost:3200/cards`, {
					name: args.name,
					description: args.description,
					listId: args.listId,
					labelId: args.labelId,
					userId: args.userId
				})
				.then(res => res.data)
			}
		},
		addComment: {
			type: CommentType,
			args: {
				userId: { type: new GraphQLNonNull(GraphQLID) },
				datetime: { type: new GraphQLNonNull(GraphQLString) },
				content: { type: new GraphQLNonNull(GraphQLString) },
				cardId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return axios.post(`http://localhost:3200/comments`, {
					userId: args.userId,
					datetime: args.datetime,
					content: args.content,
					cardId: args.cardId
				})
				.then(res => res.data)
			}
		}
	}
})

module.exports = new GraphQLSchema({ query, mutation })