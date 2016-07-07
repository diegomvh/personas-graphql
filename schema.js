var graphql = require('graphql');

var data = require('./personas.json');

var personaType = new graphql.GraphQLObjectType({
  name: 'Persona',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      persona: {
        type: personaType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: (root, args) => {
          return data[args.id];
        }
      }
    }
  })
});

module.exports = schema;
