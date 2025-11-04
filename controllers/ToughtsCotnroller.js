const Thought = require("../models/Tought");
const User = require("../models/User");

module.exports = class ToughtsCotnroller {
  static async showToughts(req, res) {
    res.render("toughts/home");
  }

  static async dashboard(req, res) {
    res.render("toughts/dashboard");
  }

  static async createThoughts(req, res) {
    res.render("toughts/create");
  }
};
