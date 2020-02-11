const express = require('express');
const graphqlHTTP = require('express-graphql'); 
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

//connect to mlab DB
mongoose.connect("mongodb://GandalfTheWeezard:docter22@ds037358.mlab.com:37358/books")

//to remove parser warning
const URL_MLAB = 'mongodb://GandalfTheWeezard:docter22@ds037358.mlab.com:37358/books';
mongoose.connect(URL_MLAB, { useNewUrlParser: true });

//when established connection to DB 
mongoose.connection.once('open', () => {
	console.log('connected to Database');
})


//setting up middleware
app.use('/graphql', graphqlHTTP({
	//scheme: schema but in es6 just schema
	schema,
	graphiql: true
}));

app.listen(4000, () => {
	console.log('listening for requests on port 4000');
});