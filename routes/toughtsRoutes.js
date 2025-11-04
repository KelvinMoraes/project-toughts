const express = require("express");
const router = express.Router();

const checkAuth = require("../helpers/auth").checkAuth;

const ToughtsCotnroller = require("../controllers/ToughtsCotnroller");

router.get("/", ToughtsCotnroller.showToughts);
router.get("/dashboard", checkAuth, ToughtsCotnroller.dashboard);
router.get("/create", checkAuth, ToughtsCotnroller.createThoughts);

module.exports = router;
