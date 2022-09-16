const router = require("express").Router();

const userRoutes = require("./user_routes");
const menuItemRoutes = require("./menu-items-routes");
const cartRoutes = require("./cart_routes");
//const testRoutes = require("./test_routes");

router.use("/users", userRoutes);
router.use("/cart",cartRoutes);

module.exports = router;
