var graphql = require('graphql');

var PersonaType = require('./persona');
var AddressType = require('./address');

var personas = require('./personas.json');
var addresses = require('./addresses.json');

var QuerySchema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      persona: {
        type: PersonaType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: (root, args) => {
          return personas[args.id];
        }
      },
      address: {
        type: AddressType,
        args: {
          place_id: { type: graphql.GraphQLString }
        },
        resolve: (root, args) => {
          return addresses[args.place_id];
        }
      }
    }
  })
});

module.exports = QuerySchema;
