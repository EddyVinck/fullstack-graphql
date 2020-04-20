const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    avatar: String! # There is a default value in the database
    friends: [User]! # The array is always there, but it can be empty
    # Other Scalars: Int, Float, Boolean
  }
  type Query {
    me: User!
    # user(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    me: () => ({
      id: "lkKJlkiOSDFdsdf",
      email: "hey@gmail.com",
      avatar: "https://placekitten.com/g/300/300",
      friends: [
        /* no friends :( */
      ],
    }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(() => console.log("http://localhost:4000"));
