const User = require("../models/User");

const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static async postLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash("message", "Usuário não encontrado!");
      res.render("auth/login");
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash("message", "Senha inválida!");
      res.render("auth/login");
      return;
    }

    req.session.userId = user.id;

    req.flash("message", "Usuário logado com sucesso!");

    req.session.save(() => {
      res.redirect("/");
    });
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async postRegister(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
      // mensagem para o front
      req.flash("message", "As senhas não conferem, tente novamente!");
      res.render("auth/register");
      return;
    }

    const checkIfuserExists = await User.findOne({ where: { email: email } });

    if (checkIfuserExists) {
      req.flash("message", "O e-mail já está em uso!");
      res.render("auth/register");
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createUser = await User.create(user);

      req.session.userId = createUser.id;

      req.flash("message", "Cadastro realizado com sucesso!");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(err);
    }
  }

  static async logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
};
