/* eslint-disable no-undef */
const express = require("express");
const productsController = require("../controllers/products.controller");
const authController = require("../controllers/auth.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const avatarUpload = require("../middlewares/avatar-upload.middleware");

const router = express.Router();
module.exports.setup = (app) => {
  app.use("/api/v1/products", router);

  /**
   * @swagger
   * /api/v1/products:
   *   get:
   *     summary: Get products by filter
   *     description: Get products by filter
   *     parameters:
   *       - in: query
   *         name: productStatus
   *         schema:
   *           type: boolean
   *         description: Lọc bằng trạng thái sản phẩm
   *       - in: query
   *         name: productName
   *         schema:
   *           type: string
   *         description: Lọc bằng tên sản phẩm
   *       - $ref: '#/components/parameters/limitParam'
   *       - $ref: '#/components/parameters/pageParam'
   *     tags:
   *       - products
   *     responses:
   *       200:
   *         description: A list of products
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     products:
   *                       type: array
   *                       items:
   *                         $ref: '#/components/schemas/Product'
   *                     metadata:
   *                       $ref: '#/components/schemas/PaginationMetadata'
   */

  router.get("/", productsController.getProductsByFilter);

  /**
   * @swagger
   * /api/v1/products:
   *   post:
   *     summary: Create a new product
   *     description: Create a new product
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *     tags:
   *       - products
   *     responses:
   *       201:
   *         description: A new product
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     product:
   *                       $ref: '#/components/schemas/Product'
   */
  router.post("/", avatarUpload, productsController.createProduct);

  /**
   * @swagger
   * /api/v1/products:
   *   delete:
   *     summary: Delete all products
   *     description: Delete all products
   *     tags:
   *       - products
   *     responses:
   *       200:
   *         description: All products deleted
   *         $ref: '#/components/responses/200NoData'
   */
  router.delete("/", productsController.deleteAllProducts);
  router.all("/", methodNotAllowed);

  /**
   * @swagger
   * /api/v1/products/{id_sp}:
   *   get:
   *     summary: Get product by ID
   *     description: Get product by ID
   *     parameters:
   *       - $ref: '#/components/parameters/productIdParam'
   *     tags:
   *       - products
   *     responses:
   *       200:
   *         description: A product
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     product:
   *                       $ref: '#/components/schemas/Product'
   */
  router.get("/:id_sp", productsController.getProduct);

  /**
   * @swagger
   * /api/v1/products/{id_sp}:
   *   put:
   *     summary: Update product by ID
   *     description: Update product by ID
   *     parameters:
   *       - $ref: '#/components/parameters/productIdParam'
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *     tags:
   *       - products
   *     responses:
   *       200:
   *         description: An updated product
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     product:
   *                       $ref: '#/components/schemas/Product'
   */
  router.put("/:id_sp", avatarUpload, productsController.updateProduct);

  /**
   * @swagger
   * /api/v1/products/{id_sp}:
   *   delete:
   *     summary: Delete product by ID
   *     description: Delete product by ID
   *     parameters:
   *       - $ref: '#/components/parameters/productIdParam'
   *     tags:
   *       - products
   *     responses:
   *       200:
   *         description: Product deleted
   *         $ref: '#/components/responses/200NoData'
   */
  router.delete("/:id_sp", productsController.deleteProduct);
  router.all("/:id_sp", methodNotAllowed);

  router.post('register', authController.register)
  router.all("/register", methodNotAllowed);

  router.post('login', authController.login)
  router.all("/login", methodNotAllowed);

  router.get('logout', authController.logout)
  router.all("/logout", methodNotAllowed);

};

// /* eslint-disable no-undef */
// const express = require("express");
// const productsController = require("../controllers/products.controller");
// const { methodNotAllowed } = require("../controllers/errors.controller");
// const avatarUpload = require("../middlewares/avatar-upload.middleware");

// const router = express.Router();
// module.exports.setup = (app) => {
//   app.use("/api/v1/products", router);

//   /**
//    * @swagger
//    * /api/v1/products:
//    *   get:
//    *     summary: Get products by filter
//    *     description: Get products by filter
//    *     parameters:
//    *       - in: query
//    *         name: Trạng thái sản phẩm
//    *         schema:
//    *           type: boolean
//    *         description: Lọc bằng trạng thái sản phẩm
//    *       - in: query
//    *         name: Tên sản phẩm
//    *         schema:
//    *           type: string
//    *         description: Lọc bằng tên sản phẩm
//    *       - $ref: '#/components/parameters/limitParam'
//    *       - $ref: '#/components/parameters/pageParam'
//    *     tags:
//    *       - products
//    *     responses:
//    *       200:
//    *         description: A list of products
//    *         content:
//    *           application/json:
//    *             schema:
//    *               type: object
//    *               properties:
//    *                 status:
//    *                   type: string
//    *                   description: The response status
//    *                   enum: [success]
//    *                 data:
//    *                   type: object
//    *                   properties:
//    *                     products:
//    *                       type: array
//    *                       items:
//    *                         $ref: '#/components/schemas/product'
//    *                     metadata:
//    *                       $ref: '#/components/schemas/PaginationMetadata'
//    */

//   router.get("/", productsController.getProductsByFilter);

//   /**
//    * @swagger
//    * /api/v1/products:
//    *   post:
//    *     summary: Create a new contact
//    *     description: Create a new contact
//    *     requestBody:
//    *       required: true
//    *       content:
//    *         multipart/form-data:
//    *           schema:
//    *             $ref: '#/components/schemas/Product'
//    *     tags:
//    *       - contacts
//    *     responses:
//    *       201:
//    *         description: A new product
//    *         content:
//    *           application/json:
//    *             schema:
//    *               type: object
//    *               properties:
//    *                 status:
//    *                   type: string
//    *                   description: The response status
//    *                   enum: [success]
//    *                 data:
//    *                   type: object
//    *                   properties:
//    *                     contact:
//    *                       $ref: '#/components/schemas/Product'
//    */
//   router.post("/", avatarUpload, productsController.createProduct);

//   /**
//    * @swagger
//    * /api/v1/products:
//    *   delete:
//    *     summary: Delete all products
//    *     description: Delete all products
//    *     tags:
//    *       - products
//    *     responses:
//    *       200:
//    *         description: All products deleted
//    *         $ref: '#/components/responses/200NoData'
//    */
//   router.delete("/", productsController.deleteAllProducts);
//   router.all("/", methodNotAllowed);

//   /**
//    * @swagger
//    * /api/v1/products/{id_sp}:
//    *   get:
//    *     summary: Get product by ID
//    *     description: Get product by ID
//    *     parameters:
//    *       - $ref: '#/components/parameters/contactIdParam'
//    *     tags:
//    *       - products
//    *     responses:
//    *       200:
//    *         description: A product
//    *         content:
//    *           application/json:
//    *             schema:
//    *               type: object
//    *               properties:
//    *                 status:
//    *                   type: string
//    *                   description: The response status
//    *                   enum: [success]
//    *                 data:
//    *                   type: object
//    *                   properties:
//    *                     product:
//    *                       $ref: '#/components/schemas/Product'
//    */
//   router.get("/:id_sp", productsController.getProduct);

//   /**
//    * @swagger
//    * /api/v1/products/{id_sp}:
//    *   put:
//    *     summary: Update product by ID
//    *     description: Update product by ID
//    *     parameters:
//    *       - $ref: '#/components/parameters/productIdParam'
//    *     requestBody:
//    *       required: true
//    *       content:
//    *         multipart/form-data:
//    *           schema:
//    *             $ref: '#/components/schemas/product'
//    *     tags:
//    *       - products
//    *     responses:
//    *       200:
//    *         description: An updated product
//    *         content:
//    *           application/json:
//    *             schema:
//    *               type: object
//    *               properties:
//    *                 status:
//    *                   type: string
//    *                   description: The response status
//    *                   enum: [success]
//    *                 data:
//    *                   type: object
//    *                   properties:
//    *                     product:
//    *                       $ref: '#/components/schemas/product'
//    */
//   router.put("/:id_sp", avatarUpload, productsController.updateProduct);

//   /**
//    * @swagger
//    * /api/v1/products/{id_sp}:
//    *   delete:
//    *     summary: Delete product by ID
//    *     description: Delete product by ID
//    *     parameters:
//    *       - $ref: '#/components/parameters/productIdParam'
//    *     tags:
//    *       - products
//    *     responses:
//    *       200:
//    *         description: product deleted
//    *         $ref: '#/components/responses/200NoData'
//    */
//   router.delete("/:id_sp", productsController.deleteProduct);
//   router.all("/:id_sp", methodNotAllowed);
// };
