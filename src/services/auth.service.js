const knex = require("../database/knex");
const bcrypt = require("bcrypt");
const ApiError = require("../api-error");

function userRepository() {
  return knex("users");
}
// Đăng ký
exports.register = async (body) => {
  try {
    const { user_name, user_email, password } = body;

    if (!user_name || !user_email || !password) {
      return new ApiError(
        400,
        "Bad request, user_name | user_email | password"
      );
    }
    const existingUser = await userRepository()
      .where({ user_email, user_name })
      .first();
    if (existingUser)
      return new ApiError(400, "user_name hoặc email đã tồn tại");

    const hashedPassword = await bcrypt.hash(password, 10);
    let created = await userRepository().insert({
      user_name,
      user_email,
      user_pass: hashedPassword,
    });
    if (created) {
      return { message: "Đăng ký thành công!" };
    }
  } catch (error) {
    console.log(error);
    return { message: "Lỗi server", error };
  }
};

// Đăng nhập
exports.login = async (body) => {
  try {
    const { user_name, password } = body;

    if (!user_name || !password) {
      return new ApiError(400, "Bad request, user_name  | password");
    }
    const user = await userRepository().where({ user_name }).first();
    if (!user) return new ApiError(404, "Tài khoản không tồn tại");

    const isPasswordValid = await bcrypt.compare(password, user.user_pass);
    if (!isPasswordValid) return new ApiError(404, "Sai mật khẩu");

    return {
      message: "Đăng nhập thành công",
      userId: user.user_id,
      user_email: user.user_email,
    };
  } catch (error) {
    console.log(error);
    return { message: "Lỗi server", error };
  }
};

// Đăng xuất (client-side xử lý xóa session/cookie)
exports.logout = (req, res) => {
  return { message: "Đăng xuất thành công" };
};
