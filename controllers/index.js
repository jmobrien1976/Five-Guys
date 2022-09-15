const router = require("express").Router();

const apiRoutes = require("./api");
const home = require("./home.js");
const menuItemRoutes = require("./api/menu-items-routes.js");

router.use("/", home);
router.use("/api", apiRoutes);

//localhost:3001/menu
router.use("/menu", menuItemRoutes);

module.exports = router;
