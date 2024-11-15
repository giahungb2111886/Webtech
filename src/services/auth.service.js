const knex = require('../database/knex');
const bcrypt = require('bcrypt');

function userRepository() {
  return knex("users");
}
// Đăng ký
exports.register = async (body) => {
  try {
    const { user_name, email, password } = body;

    const existingUser = await userRepository().where({ email, user_name }).first();
    if (existingUser) return res.status(400).json({ message: 'Email đã tồn tại' });

    const hashedPassword = await bcrypt.hash(password, 10);
    return await userRepository().insert({ name, email, password: hashedPassword });

  } catch (error) {
    console.log(error)
    return { message: 'Lỗi server', error };
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = body;

    const user = await userRepository().where({ email }).first();
    if (!user) return res.status(404).json({ message: 'Tài khoản không tồn tại' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Sai mật khẩu' });

    return { message: 'Đăng nhập thành công', userId: user.id };
  } catch (error) {
    console.log(error)
    return { message: 'Lỗi server', error };
  }
};

// Đăng xuất (client-side xử lý xóa session/cookie)
exports.logout = (req, res) => {

  return { message: 'Đăng xuất thành công' };
};
