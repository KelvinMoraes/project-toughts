const express = require("express");
const router = express.Router();

const checkAuth = require("../helpers/auth").checkAuth;

const ToughtsCotnroller = require("../controllers/ToughtsCotnroller");

router.get("/", ToughtsCotnroller.showToughts);
router.get("/dashboard", checkAuth, ToughtsCotnroller.dashboard);
router.get("/create", checkAuth, ToughtsCotnroller.create);
router.post("/create", checkAuth, ToughtsCotnroller.createSave);
router.post("/delete", checkAuth, ToughtsCotnroller.delete);
router.get("/update/:id", checkAuth, ToughtsCotnroller.update);
router.post("/update", checkAuth, ToughtsCotnroller.updateSave);

module.exports = router;
