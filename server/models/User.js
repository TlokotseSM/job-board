class User {
  static async create({ email, password, role, name }) {
    const [result] = await pool.execute(
      'INSERT INTO users (email, password, role, name) VALUES (?, ?, ?, ?)',
      [email, password, role, name]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = User;