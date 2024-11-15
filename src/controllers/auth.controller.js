const authService = require("../services/auth.service.js");
const ApiError = require("../api-error");
const JSend = require("../jsend");

// Đăng ký
const register = async (req, res) => {
  try {
    const rs = await authService.register(req.body);
    res.status(201).json(JSend.success({ rs }));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Đăng nhập
const login = async (req, res) => {
  try {
    const rs = await authService.login(req.body);

    res.status(200).json(JSend.success({ rs }));
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

const logout = (req, res) => {
  res.status(200).json(JSend.success({ rs }));
};

module.exports = {
  register,
  login,
  logout,
};
