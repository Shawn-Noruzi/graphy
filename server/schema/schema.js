const graphql = require('graphql');

//describes data,object types, relations between object types, 
//and how we can access the data (mutate,query)

//destructure function from graphQL 
const {GraphQLObjectType, GraphQLString} = graphql;

//declare new object type
//declaring fields helps avoid reference errors 
const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: {type: GraphQLString},
		name: {type: GraphQLString},
		genre: {type: GraphQLString}
	})
});


