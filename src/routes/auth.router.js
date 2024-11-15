const express = require("express");
const authController = require("../controllers/auth.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");

const router = express.Router();
/**
 * @swagger
 * /api/v1/products/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the user
 *               email:
 *                 type: string
 *                 description: The username for the user
 *               password:
 *                 type: string
 *                 description: The password for the user
 *     tags:
 *       - Auth
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                 data:
 *                   type: object
 */

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Handle unsupported methods
router.all("/register", methodNotAllowed);
router.all("/login", methodNotAllowed);
router.all("/logout", methodNotAllowed);

module.exports = router;
