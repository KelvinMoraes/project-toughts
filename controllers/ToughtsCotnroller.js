const { create } = require("express-handlebars");
const Tought = require("../models/Tought");
const User = require("../models/User");
const { Op } = require("sequelize");

module.exports = class ToughtsCotnroller {
  static async showToughts(req, res) {
    let search = "";
    let order = "DESC";

    if (req.query.search) {
      search = req.query.search;
    }

    if (req.query.order === "old") {
      order = "ASC";
    } else {
      order = "DESC";
    }

    const auxToughts = await Tought.findAll({
      include: User,
      where: {
        title: { [Op.like]: `%${search}%` },
      },
      order: [["createdAt", order]],
    });

    const toughts = auxToughts?.map((result) => result.get({ plain: true }));

    let toughtsQtd = toughts.length;

    if (toughtsQtd === 0) {
      toughtsQtd = false;
    }
    res.render("toughts/home", { toughts, search, toughtsQtd });
  }

  static async update(req, res) {
    const id = req.params.id;

    const tought = await Tought.findOne({ where: { id: id }, raw: true });

    res.render("toughts/update", { tought });
  }

  static async updateSave(req, res) {
    const id = req.body.id;

    const tought = {
      title: req.body.title,
    };

    try {
      await Tought.update(tought, { where: { id: id } });

      req.flash("message", "Pensamento atualizado com sucesso!");

      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
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

    if (!userId) {
      res.redirect("/login");
    }

    const toughts = user.Toughts?.map((result) => result.dataValues);

    let emptyToughts = false;

    if (toughts.length === 0) {
      emptyToughts = true;
    }

    res.render("toughts/dashboard", { toughts, emptyToughts });
  }

  static async create(req, res) {
    res.render("toughts/create");
  }

  static async delete(req, res) {
    const id = req.body.id;
    const userId = req.session.userId;
    try {
      await Tought.destroy({ where: { id: id, UserId: userId } });

      req.flash("message", "Pensamento removido com sucesso!");

      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async createSave(req, res) {
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
