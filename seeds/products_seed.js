const { faker } = require("@faker-js/faker");
function createProduct() {
  return {
    ten_sp: faker.person.ten_sp(),
    gia_sp: faker.numeric.gia_sp(),
    trangthai: faker.number.int({
      min: 0,
      max: 1,
    }),
    avatar: "/public/images/blank-profile-picture.png",
  };
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("products").del();
  await knex("products").insert(Array(100).fill().map(createProduct));
};
