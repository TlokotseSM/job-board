class Application {
  static async create({ job_id, user_id, cover_letter }) {
    const [result] = await pool.execute(
      'INSERT INTO applications (job_id, user_id, cover_letter) VALUES (?, ?, ?)',
      [job_id, user_id, cover_letter]
    );
    return result.insertId;
  }

  static async findByJob(jobId) {
    const [rows] = await pool.execute(
      'SELECT applications.*, users.name, users.email FROM applications JOIN users ON applications.user_id = users.id WHERE job_id = ?',
      [jobId]
    );
    return rows;
  }

  static async findByUser(userId) {
    const [rows] = await pool.execute(
      'SELECT applications.*, jobs.title, jobs.company FROM applications JOIN jobs ON applications.job_id = jobs.id WHERE user_id = ?',
      [userId]
    );
    return rows;
  }
}

module.exports = Application;