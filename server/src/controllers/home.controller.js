import { pool } from "../config/connectionDatabase";

export const getLastOperations = async (req, res) => {
  const response = await Promise.all([
    pool.query("SELECT SUM(amount) FROM operations"),
    pool.query("SELECT * FROM operations ORDER BY operation_id DESC LIMIT 10"),
  ]);
  console.log(response);
  const resp = response.map((n) => n.rows);
  res.status(200).json(resp);
};
