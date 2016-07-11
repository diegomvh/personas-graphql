var graphql = require('graphql');

var data = require('./addresses.json');

var LatLngType = new graphql.GraphQLObjectType({
  name: 'LatLng',
  fields: () => ({
    lat: { type: graphql.GraphQLNumber },
    lng: { type: graphql.GraphQLNumber }
  })
});

var LatLngBoundsType = new graphql.GraphQLObjectType({
  name: 'LatLngBounds',
  fields: () => ({
    northeast: { type: LatLngType },
    southwest: { type: LatLngType }
  })
});

var AddressComponentType = new graphql.GraphQLObjectType({
  name: 'AddressComponent',
  fields: () => ({
    short_name: { type: graphql.GraphQLString },
    long_name: { type: graphql.GraphQLString },
    postcode_localities: {
      type: new graphql.GraphQLList(graphql.GraphQLString)
    },
    types: {
      type: new graphql.GraphQLList(graphql.GraphQLString)
    }
  })
});

var GeocoderLocationType = new graphql.GraphQLEnumType({
  name: 'GeocoderLocation',
  values: () => ({
    ROOFTOP: { value: 'ROOFTOP' },
    RANGE_INTERPOLATED: { value: 'RANGE_INTERPOLATED' },
    GEOMETRIC_CENTER: { value: 'GEOMETRIC_CENTER' },
    APPROXIMATE: { value: 'APPROXIMATE' }
  })
});

var GeometryType = new graphql.GraphQLObjectType({
  name: 'Geometry',
  fields: () => ({
    location: { type: LatLngType },
    location_type: { type: GeocoderLocationType },
    viewport: { type: LatLngBoundsType },
    bounds: { type: LatLngBoundsType }
  })
});

var AddressType = new graphql.GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    types: {
      type: new graphql.GraphQLList(graphql.GraphQLString)
    },
    formatted_address: { type: graphql.GraphQLString },
    address_components: {
      type: new graphql.GraphQLList(AddressComponentType)
    },
    place_id: { type: graphql.GraphQLString },
    postcode_localities: {
      type: new graphql.GraphQLList(graphql.GraphQLString)
    },
    geometry: { type: GeometryType }
  })
});

module.exports = AddressType;
