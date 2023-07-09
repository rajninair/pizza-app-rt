const Menu = require("../../models/Menu");

function homeController() {
  // Factory functions - returns object {}
  return {
    async index(req, res) {
      const pizzas = await Menu.find();
      res.render("home", { pizzas: pizzas });

      // Menu.find().then(function (pizzas) {
      //   console.log("pizzas", pizzas);
      //   res.render("home", { pizzas: pizzas });
      // });
    },
  };
}

module.exports = homeController;
