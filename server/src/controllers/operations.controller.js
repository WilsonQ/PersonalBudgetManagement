import { pool } from "../config/connectionDatabase";

const getOperations = async (req, res) => {
  const response = await pool.query("SELECT * FROM operations");
  res.status(200).json(response.rows);
};

const getOperation = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query(
      "SELECT * FROM operations WHERE operation_id = $1",
      [id]
    );
    res.status(200).json({
      status: "succes",
      body: {
        operation: response.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createOperation = async (req, res) => {
  const { operation_date, concept, amount, type } = req.body;
  console.log(
    "🚀 ~ file: operations.controller.js ~ line 28 ~ createOperation ",
    operation_date,
    concept,
    amount,
    type
  );

  const response = await pool.query(
    "INSERT INTO operations(operation_date,concept,amount,type) VALUES($1,$2,$3,$4)",
    [operation_date, concept, amount, type]
  );
  console.log(response);
  res.json({
    message: "Operation Added Successfully",
    body: {
      operation: { operation_date, concept, amount, type },
    },
  });
};

const updateOperation = async (req, res) => {
  const id = req.params.id;
  const { operation_date, concept, amount } = req.body;
  const response = await pool.query(
    "UPDATE operations SET operation_date=$1, concept=$2, amount=$3 WHERE operation_id = $4",
    [operation_date, concept, amount, id]
  );
  console.log(response);
  res.send("Operation updated successfully");
};

const deleteOperation = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query(
    "DELETE FROM operations WHERE operation_id = $1",
    [id]
  );
  console.log(response);
  res.json(`User ${id} deleted successfully`);
};

module.exports = {
  getOperations,
  getOperation,
  createOperation,
  updateOperation,
  deleteOperation,
};
