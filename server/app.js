const express = require('express');
const graphqlHTTP = require('express-graphql'); 
const schema = require('./schema/schema');

const app = express();

//setting up middleware
app.use('/graphql', graphqlHTTP({
	//scheme: schema but in es6 just schema
	schema,
	graphiql: true
}));

app.listen(4000, () => {
	console.log('listening for requests on port 4000');
});