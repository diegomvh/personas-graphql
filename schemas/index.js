const graphql = require('graphql');
const db = require('../db');

const PersonaType = require('./persona');
const AddressType = require('./address');

const personas = require('./personas.json');
const addresses = require('./addresses.json');

const personasCollection = db.collection('personas');
const addressesCollection = db.collection('addresses');

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
          return personasCollection.document(args.id);
        }
      },
      address: {
        type: AddressType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: (root, args) => {
          return addressesCollection.document(args.id);
        }
      }
    }
  })
});

module.exports = QuerySchema;
