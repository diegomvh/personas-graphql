var graphql = require('graphql');

var PersonaType = new graphql.GraphQLObjectType({
  name: 'Persona',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

module.exports = PersonaType;
