var graphql = require('graphql');

var PersonaType = new graphql.GraphQLObjectType({
  name: 'Persona',
  fields: {
    documento: { type: graphql.GraphQLNumber },
    clase: { type: graphql.GraphQLNumber },
    apellidos: { type: graphql.GraphQLString },
    nombres: { type: graphql.GraphQLString },
    nombre_completo: { type: graphql.GraphQLString },
    domicilio: { type: graphql.GraphQLString },
    sexo: { type: graphql.GraphQLString },
    tipo_documento: { type: graphql.GraphQLString }
  }
});

module.exports = PersonaType;
