const express = require("express");
const router = express.Router();

const ToughtsCotnroller = require("../controllers/ToughtsCotnroller");

router.get("/", ToughtsCotnroller.showToughts);

module.exports = router;
