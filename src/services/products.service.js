const knex = require("../database/knex");
const Paginator = require("./paginator");
const { unlink } = require("node:fs");
function productRepository() {
  return knex("products");
}
function readProduct(payload) {
  return {
    ten_sp: payload.ten_sp,
    gia_sp: payload.gia_sp,
    trangthai: payload.trangthai,
    avatar: payload.avatar,
  };
}
// Define functions for accessing the database
async function createProduct(payload) {
  const product = readProduct(payload);
  const [id_sp] = await productRepository().insert(product);
  return { id_sp, ...product };
}
function getManyProducts(query) {
  const { ten_sp, trangthai } = query;
  return productRepository()
    .where((builder) => {
      if (ten_sp) {
        builder.where("ten_sp", "like", `%${ten_sp}%`);
      }
      if (
        trangthai !== undefined &&
        trangthai !== "0" &&
        trangthai !== "false"
      ) {
        builder.where("trangthai", 1);
      }
    })
    .select("*");
}
async function getManyProducts(query) {
  const { ten_sp, trangthai, page = 1, limit = 5 } = query;
  const paginator = new Paginator(page, limit);
  let results = await productRepository()
    .where((builder) => {
      if (ten_sp) {
        builder.where("ten_sp", "like", `%${ten_sp}%`);
      }
      if (
        trangthai !== undefined &&
        trangthai !== "0" &&
        trangthai !== "false"
      ) {
        builder.where("trangthai", 1);
      }
    })
    .select(
      knex.raw("count(id_sp) OVER() AS recordCount"),
      "id_sp",
      "ten_sp",
      "gia_sp",
      "trangthai",
      "avatar"
    )
    .limit(paginator.limit)
    .offset(paginator.offset);
  let totalRecords = 0;
  results = results.map((result) => {
    totalRecords = result.recordCount;
    delete result.recordCount;
    return result;
  });
  return {
    metadata: paginator.getMetadata(totalRecords),
    products: results,
  };
}
async function getProductById(id_sp) {
  return productRepository().where("id_sp", id_sp).select("*").first();
}
async function updateProduct(id_sp, payload) {
  const updatedProduct = await productRepository()
    .where("id_sp", id_sp)
    .select("*")
    .first();
  if (!updatedProduct) {
    return null;
  }
  const update = readProduct(payload);
  if (!update.avatar) {
    delete update.avatar;
  }
  await productRepository().where("id_sp", id_sp).update(update);
  if (
    update.avatar &&
    updatedProduct.avatar &&
    update.avatar !== updatedProduct.avatar &&
    updatedProduct.avatar.startsWith("/public/uploads")
  ) {
    unlink(`.${updatedProduct.avatar}`, (err) => {});
  }
  return { ...updatedProduct, ...update };
}
async function deleteProduct(id_sp) {
  const deletedProduct = await productRepository()
    .where("id_sp", id_sp)
    .select("avatar")
    .first();
  if (!deletedProduct) {
    return null;
  }
  await productRepository().where("id_sp", id_sp).del();
  if (
    deletedProduct.avatar &&
    deletedProduct.avatar.startsWith("/public/uploads")
  ) {
    unlink(`.${deletedProduct.avatar}`, (err) => {});
  }
  return deletedProduct;
}
async function deleteAllProducts() {
  const products = await productRepository().select("avatar");
  await productRepository().del();
  products.forEach((product) => {
    if (product.avatar && product.avatar.startsWith("/public/uploads")) {
      unlink(`.${product.avatar}`, (err) => {});
    }
  });
}
module.exports = {
  createProduct,
  getManyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
