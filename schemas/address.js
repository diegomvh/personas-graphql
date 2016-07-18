var gql = require('graphql');

var data = require('./addresses.json');

var LatLngType = new gql.GraphQLObjectType({
  name: 'LatLng',
  fields: () => ({
    lat: { type: new gql.GraphQLNonNull(gql.GraphQLFloat) },
    lng: { type: new gql.GraphQLNonNull(gql.GraphQLFloat) }
  })
});

var LatLngBoundsType = new gql.GraphQLObjectType({
  name: 'LatLngBounds',
  fields: () => ({
    northeast: { type: LatLngType },
    southwest: { type: LatLngType }
  })
});

var AddressComponentType = new gql.GraphQLObjectType({
  name: 'AddressComponent',
  fields: () => ({
    short_name: { type: gql.GraphQLString },
    long_name: { type: gql.GraphQLString },
    postcode_localities: {
      type: new gql.GraphQLList(gql.GraphQLString)
    },
    types: {
      type: new gql.GraphQLList(gql.GraphQLString)
    }
  })
});

const GeocoderLocationType = new gql.GraphQLEnumType({
  name: 'GeocoderLocation',
  description: 'Stores additional data about the specified location.',
  values: {
    ROOFTOP: {
      value: 'ROOFTOP',
      description: 'Indicates that the returned result is a precise geocode for which we have location information accurate down to street address precision.'
    },
    RANGE_INTERPOLATED: {
      value: 'RANGE_INTERPOLATED',
      description: 'Indicates that the returned result reflects an approximation (usually on a road) interpolated between two precise points (such as intersections). Interpolated results are generally returned when rooftop geocodes are unavailable for a street address.'
    },
    GEOMETRIC_CENTER: {
      value: 'GEOMETRIC_CENTER',
      description: 'Indicates that the returned result is the geometric center of a result such as a polyline (for example, a street) or polygon (region).'
    },
    APPROXIMATE: {
      value: 'APPROXIMATE',
      description: 'Indicates that the returned result is approximate.'
    }
  }
});

var GeometryType = new gql.GraphQLObjectType({
  name: 'Geometry',
  fields: () => ({
    location: { type: LatLngType },
    location_type: { type: new gql.GraphQLNonNull(GeocoderLocationType) },
    viewport: { type: LatLngBoundsType },
    bounds: { type: LatLngBoundsType }
  })
});

var AddressType = new gql.GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    id: {
      type: new gql.GraphQLNonNull(gql.GraphQLString),
      resolve(address) {
        return address._key;
      }
    },
    types: {
      type: new gql.GraphQLList(gql.GraphQLString)
    },
    formatted_address: { type: gql.GraphQLString },
    address_components: {
      type: new gql.GraphQLList(AddressComponentType)
    },
    place_id: { type: gql.GraphQLString },
    postcode_localities: {
      type: new gql.GraphQLList(gql.GraphQLString)
    },
    geometry: { type: GeometryType }
  })
});

module.exports = AddressType;
