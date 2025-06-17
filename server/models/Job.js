class Job {
  static async create({ title, description, company, location, remote, employer_id }) {
    const [result] = await pool.execute(
      'INSERT INTO jobs (title, description, company, location, remote, employer_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, company, location, remote, employer_id]
    );
    return result.insertId;
  }

  static async findAll({ search = '', remote = null, location = '' }) {
    let query = 'SELECT * FROM jobs WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND MATCH(title, description, company) AGAINST(?)';
      params.push(search);
    }

    if (remote !== null) {
      query += ' AND remote = ?';
      params.push(remote);
    }

    if (location) {
      query += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }

    const [rows] = await pool.execute(query, params);
    return rows;
  }

  static async findByEmployer(employerId) {
    const [rows] = await pool.execute('SELECT * FROM jobs WHERE employer_id = ?', [employerId]);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM jobs WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Job;