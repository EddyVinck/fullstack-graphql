const { gql } = require("apollo-server");

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  """
  A pet can only be one of these types.

  (This text will show up in the GraphQL playground for PetType!)
  """
  enum PetType {
    DOG
    CAT
    BIRD
    FISH
  }
  type Query {
    pet(id: ID!): Pet
    pets(input: PetInput): [Pet]!
    user: User!
  }

  type Mutation {
    createPet(input: CreatePetInput!): Pet!
    # Pet is non-null because the bang doesn't imply that it cannot error.
    # Errors are handled differently.
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String
    type: PetType
    img: String
    owner: User
  }
  input PetInput {
    type: PetType
  }
  input CreatePetInput {
    name: String!
    type: PetType!
  }

  type User {
    id: ID!
    username: String!
    pets: [Pet]!
  }

  # ⤵ this is just example schema, not fully implemented in resolvers

  interface Shoe {
    # Still have to copy these fiels to types that implement this interface
    size: Int!
    brand: String!
  }
  type Sneaker implements Shoe {
    size: Int!
    brand: String!
    sport: String!
  }
  type Boot implements Shoe {
    size: Int!
    brand: String!
    waterRisistant: Boolean!
  }
  type Shirt {
    size: Int!
    color: String
  }

  """
  Union types are very similar to interfaces, but they don't get to specify any common fields between the types.

  Unfortunately you can't use interfaces inside unions.
  """
  union Clothes = Sneaker | Boot | Shirt
`;

const fragmentExample = gql`
  query iNeedSneakers {
    shoes {
      brand
      size
      __typename
      ... on Sneaker {
        sport
      }
    }
  }
`;

const unionExample = gql`
  {
    clothes {
      __typename
      # there are no common fields when using unions
      ... on Shoe {
        size
      }
      ... on Shirt {
        color
      }
    }
  }
`;

const relationExample = gql`
  query {
    pet(id: "3") {
      owner {
        username
      }
    }
  }
`;

const otherExamples = gql`
  query allPets {
    pets {
      id
      name
      type
      createdAt
      img # from resolver, not in db
    }
  }

  query allDogs {
    pets(input: { type: DOG }) {
      id
      name
      createdAt
      img
    }
  }

  query singlePet {
    pet(id: "1") {
      id
      name
      type
    }
  }

  mutation createPet {
    createPet(input: { name: "Bobby", type: DOG }) {
      id
      name
      type
    }
  }
`;

module.exports = typeDefs;
