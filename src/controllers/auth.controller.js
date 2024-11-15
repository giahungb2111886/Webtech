const authService = require("../services/auth.service.js");
const JSend = require("../jsend");
const ApiError = require("../api-error");

// Đăng ký
const register = async (req, res) => {
  try {
    const rs = await authService.register(req.body);
    res.status(201).json(JSend.success({ ...rs }));
  } catch (error) {
    console.log(error);
    return new ApiError(500, error.message);
  }
};

// Đăng nhập
const login = async (req, res) => {
  try {
    const rs = await authService.login(req.body);

    res.status(200).json(JSend.success({ ...rs }));
  } catch (error) {
    return new ApiError(500, error.message);
  }
};

const logout = async (req, res) => {
  try {
    const rs = authService.logout();

    res.status(200).json(JSend.success({ ...rs }));
  } catch (error) {
    return new ApiError(500, error.message);
  }
};

module.exports = {
  register,
  login,
  logout,
};
