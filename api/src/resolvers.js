/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pets(
      _rootResolver,
      { input },
      ctx,
      _info // the query info from the AST (among other things)
    ) {
      const { models } = ctx;
      const pets = models.Pet.findMany(input);
      return [...pets];
    },
    pet(_, { id }, ctx) {
      const { models } = ctx;
      const pet = models.Pet.findOne({ id });
      return pet;
    },
  },
  Mutation: {
    createPet(_, { input }, ctx) {
      return ctx.models.Pet.create(input);
    },
  },
  Pet: {
    img(pet) {
      return pet.type.toUpperCase() === "DOG"
        ? "https://placedog.net/300/300"
        : "http://placekitten.com/300/300";
    },
    owner(_pet, _, { user }) {
      return user;
    },
  },
  User: {
    pets(_user, _, ctx) {
      return ctx.models.Pet.findMany({});
    },
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport && typeof shoe.sport === "string") return "Sneaker";
      return "Boot";
    },
  },
  Clothes: {
    __resolveType(_clothing) {
      // just an example
      return "Shoe";
    },
  },
};
