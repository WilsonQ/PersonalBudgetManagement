import { response } from "express";
import { async } from "regenerator-runtime";
import { pool } from "../config/connectionDatabase";
import { userData } from "../config/provisorio";

const getOperations = async (req, res) => {
  let query =
    "SELECT * FROM  users u  INNER JOIN operations o ON u.user_id  = o.fk_user_id INNER JOIN operations_categories oc ON o.operation_id = oc.operation_id INNER JOIN categories c ON oc.category_id = c.category_id";

  const response = await pool.query(query);
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
      status: "success",
      body: {
        operation: response.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createOperation = async (req, res) => {
  const { operation_date, concept, amount, type, category } = req.body;

  console.log("Este es el usuario", userData());
  console.log("el cuerpo", req.body);
  //TODO primero tenemos que crear la operacion
  //agrega una nueva operacion
  const respOperation = await pool.query(
    "INSERT INTO operations(operation_date,concept,amount,type,fk_user_id) VALUES($1,$2,$3,$4,$5) returning operation_id",
    [operation_date, concept, amount, type, userData().user_id]
  );
  //TODO DESPUES con los datos que retorna crear la categoria
  //crear una category
  category.map(async (cat) => {
    //TODO si esta creada ya tengo la categoria
    const valid = await pool.query(
      `SELECT * FROM categories WHERE category = $1`,
      [cat.title]
    );
    console.log(valid.rows);
    if (valid.rows.length > 0) {
      //TODO agregar el id categoria y id operacion a la tabla intermedia
      insertConnection(
        valid.rows[0].category_id,
        respOperation.rows[0].operation_id
      );
      console.log("ya esta creada la categoria");
    } else {
      //TODO crear  la categoria
      const respCategory = await pool.query(
        "INSERT INTO categories(category,available) VALUES($1,$2) returning category_id ",
        [cat.title, true]
      );
      console.log(respCategory.rows);
      //TODO crear relacion
      insertConnection(
        respCategory.rows[0].category_id,
        respOperation.rows[0].operation_id
      );
      console.log(
        "que tiene ",
        respCategory.rows[0].category_id,
        respOperation.rows[0].operation_id
      );
    }
  });

  console.log(respOperation.rows);
};

const insertConnection = async (category_id, operation_id) => {
  const valid = await pool.query(
    `SELECT * FROM categories WHERE category = $1`,
    [cat.title]
  );
  console.log(valid.rows);
};
const validConnection = async (category_id, operation_id) => {
  const respConnection = await pool.query(
    "INSERT INTO operations_categories(category_id,operation_id) VALUES($1,$2) ",
    [category_id, operation_id]
  );
  console.log(respConnection.rows);
};
const getCategory = async (req, res) => {
  const resp = await pool.query(`SELECT * FROM categories `);
  console.log(resp.rows);
  res.status(200).json(resp.rows);
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
  getCategory,
};
