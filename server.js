const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema')
const cors = require('cors')

const app = express()
app.use(cors())

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))


app.listen(4000, () => {
  console.log('Server running on port 4000.');
})