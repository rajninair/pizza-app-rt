const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");

function initRoutes(app) {
  // Home

  app.get("/", homeController().index);

  // Cart
  app.get("/cart", cartController().cart);
  app.post("/update-cart", cartController().update);

  // Auth
  app.get("/register", authController().register);
  app.get("/login", authController().login);
}

module.exports = initRoutes;
