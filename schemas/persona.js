var gql = require('graphql');

const SexoType = new gql.GraphQLEnumType({
  name: 'Sexo',
  values: {
    F: {
      value: 'F',
    },
    M: {
      value: 'M',
    }
  }
});

var PersonaType = new gql.GraphQLObjectType({
  name: 'Persona',
  fields: () => ({
    _key: { type: gql.GraphQLString },
    documento: { type: new gql.GraphQLNonNull(gql.GraphQLInt) },
    clase: { type: gql.GraphQLInt },
    apellidos: { type: gql.GraphQLString },
    nombres: { type: gql.GraphQLString },
    nombre_completo: { type: gql.GraphQLString },
    domicilio: { type: gql.GraphQLString },
    sexo: { type: new gql.GraphQLNonNull(SexoType) },
    tipo_documento: { type: gql.GraphQLString }
  })
});

module.exports = PersonaType;
