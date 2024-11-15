const express = require("express");
const cors = require("cors");
const JSend = require("./jsend");
const contactsRouter = require("./routes/products.router");
const authRouter = require("./routes/auth.router");

const {
  resourceNotFound,
  handleError,
} = require("./controllers/errors.controller");
const { specs, swaggerUi } = require("./docs/swagger");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  return res.json(JSend.success());
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/public", express.static("public"));
app.use("/api/v1/auth", authRouter);
contactsRouter.setup(app);

//404
app.use(resourceNotFound);
//define
app.use(handleError);

module.exports = app;
