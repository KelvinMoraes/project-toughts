const { create } = require("express-handlebars");
const Tought = require("../models/Tought");
const User = require("../models/User");

module.exports = class ToughtsCotnroller {
  static async showToughts(req, res) {
    res.render("toughts/home");
  }

  static async dashboard(req, res) {
    const userId = req.session.userId;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: Tought,
      plain: true,
    });

    const toughts = user.Toughts?.map((result) => result.dataValues);

    if (!userId) {
      res.redirect("/login");
    }

    res.render("toughts/dashboard", { toughts });
  }

  static async createToughts(req, res) {
    res.render("toughts/create");
  }

  static async createToughtsSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userId,
    };

    try {
      Tought.create(tought);

      req.flash("message", "Pensamento criado com sucesso!");

      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }
};
