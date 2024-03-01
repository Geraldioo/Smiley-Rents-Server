'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let data = [
    {
      name: "Oyo",
      facility: "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
      roomCapacity: 6,
      imgUrl: "https://tse2.mm.bing.net/th?id=OIP.xgXRB7T0cEhUFBYtPOu4CgHaFj&pid=Api&P=0&h=180",
      location: "Cilandak",
      price: 300000,
      createdAt : new Date(),
      updatedAt : new Date(),
      typeId : 1,
      authorId : 1
    }
   ]

   for (let i = 1; i <= 20; i++){
     await queryInterface.bulkInsert("Lodgings", data)
    }
   },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Lodgings", null, {})
  }
};
