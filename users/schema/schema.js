const grqphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } = grqphql;

const users = [
  { id: "1", firstName: "hari", age: 24 },
  { id: "2", firstName: "raj", age: 23 },
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
