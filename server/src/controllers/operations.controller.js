import { response } from "express";
import { async } from "regenerator-runtime";
import { pool } from "../config/connectionDatabase";
import { userData } from "../config/provisorio";

const getOperations = async (req, res) => {
  let query = "select * from find_user($1)";
  const user_id = userData.user_id;
  const response = await pool.query(query, [user_id]);
  console.log(response);
  res.status(200).json(response.rows);
};

const getOperation = async (req, res) => {
  try {
    const id = userData.user_id;
    const response = await pool.query(
      "SELECT * FROM operations WHERE operation_id = $1 ",
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
    "INSERT INTO operations(operation_date,concept,amount,type,user_id) VALUES($1,$2,$3,$4,$5) returning operation_id",
    [operation_date, concept, amount, type, userData().user_id]
  );
  //TODO DESPUES con los datos que retorna crear la categoria
  //crear una category
  category.map(async (categoryObject) => {
    console.log("category", categoryObject);
    const newCategory = categoryObject.newCategory || false;
    console.log("que guarda", newCategory);

    if (!newCategory) {
      //TODO si existe agregar el id categoria y id operacion a la tabla intermedia
      insertConnection(
        categoryObject.category_id,
        respOperation.rows[0].operation_id
      );
      console.log("ya esta creada la categoria");
    } else {
      //TODO crear  la categoria
      const respCategory = await pool.query(
        "INSERT INTO categories(category,available) VALUES($1,$2) returning category_id ",
        [categoryObject.category, true]
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
    "INSERT INTO operations_categories(category_id,operation_id) VALUES($1,$2)",
    [category_id, operation_id]
  );
  console.log(valid.rows);
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
const updateCategory = async (req, res) => {
  const id = req.params.id;
  const { available, category } = req.body;
  console.log("Este dato se modifica", req.body);
  const response = await pool.query(
    "UPDATE categories set category=$1,available=$2 WHERE category_id =  $3",
    [category, available, id]
  );
  console.log(response);
  res.send("Category updated successfully");
};
const createCategory = async (req, res) => {
  console.log("dato nuevo", req.body);
  const { category } = req.body;
  const response = await pool.query(
    "INSERT INTO categories(category,available) VALUES($1,$2) returning category_id ",
    [category, true]
  );
  console.log(response);
  res.send("Category new successfully");
};

const deleteOperation = async (req, res) => {
  console.log("empesando a  eliminar", req.body);
  const operation_id = req.params.id;
  const { remove } = req.body;

  //TODO buscar las categorias que tiene asociadas la operacion
  const categories = await searchOperationCategory(operation_id);
  console.log("Categorias", categories.rows);
  //TODO  si tiene uno solo   se elimina directamente
  if (categories.rows.length === 0) {
    console.log("Solo se elimina la relacion -117");
    const resp = await removeOperation(operation_id);
    res.json(`The Operation deleted successfully`);
  } else {
    //TODO si tiene categorias
    //Todo primero se elimina las categorias
    try {
      await Promise.all(
        categories.rows.map(async (category) => {
          console.log("que es lo que hay", category.category_id);
          //eliminar categoria
          if (!remove) {
            console.log("Eliminando directamente la relacion");
            await removeOperationCategory(category.category_id, operation_id);
          }
          await removeCategory(category.category_id, operation_id);
        })
      );

      const resp = await removeOperation(operation_id);
      console.log("Fue eliminado", resp);
      res.json(`The Operation deleted successfully`);
    } catch (error) {
      console.error("ERROR - line 139-:", error);
    }
  }
};

const deleteCategory = async (req, res) => {
  const category_id = req.params.id;
  const { removeDirect } = req.body;

  console.log("------->", category_id);
  removeCategory(category_id, removeDirect);

  res.json(`Category ${category_id} deleted successfully`);
};

const searchOperationCategory = async (operation_id) => {
  const resp = await pool.query(
    `select category_id
  from operations_categories 
  where operation_id = $1 `,
    [operation_id]
  );
  console.log(operation_id, resp.rows);
  return resp;
};
const searchCategoryOperation = async (category_id, operation_id) => {
  const resp = await pool.query(
    `select operation_id
  from operations_categories 
  where category_id = $1 and operation_id != $2`,
    [category_id, operation_id]
  );
  console.log("Esto son las operacion que retorna", resp.rows);
  return resp;
};
const searchOperation = async (category_id) => {
  const resp = await pool.query(
    `select operation_id
  from operations_categories 
  where category_id = $1 `,
    [category_id]
  );
  console.log("Esto son las operacion que retorna", resp.rows);
  return resp;
};
const removeOperation = async (operation_id) => {
  const resp = await pool.query(
    `DELETE FROM operations WHERE operation_id = $1 `,
    [operation_id]
  );
  console.log(operation_id, resp.command);
  return resp;
};
const removeOperationCategory = async (category_id, operation_id) => {
  const resp = await pool.query(
    `DELETE FROM operations_categories WHERE category_id = $1 and operation_id = $2`,
    [category_id, operation_id]
  );
  console.log("se elimino la relacion", resp.command);
};

const removeCategory = async (category_id, operation_id) => {
  let directRemove = false;
  let val = {};
  if (typeof operation_id === "boolean") {
    directRemove = operation_id;
    //TODO BUSCA todas las operaciones  que esten relacionas con la categoria
    val = await searchOperation(category_id);
  } else {
    //todo busca todas las operaciones que estan relacionadas con la category menos la operacion que eliminara
    console.log("Eliminando");
    val = await searchCategoryOperation(category_id, operation_id);
  }

  //TODO  se elimina la categoria
  try {
    if (directRemove) {
      console.log("remove relation direct");
      console.table(val.rows);
      await Promise.all(
        val.rows.map(async (operationObject) => {
          await removeOperationCategory(
            category_id,
            operationObject.operation_id
          );
        })
      );
    } else {
      console.log("remove relation");
      await removeOperationCategory(category_id, operation_id);
    }
    if (val.rows.length === 0 || directRemove) {
      const resp = await pool.query(
        `DELETE FROM categories WHERE category_id = $1`,
        [category_id]
      );
      console.log("se elimino la categoria categoria", resp);
      return resp;
    }
  } catch (error) {
    console.error("ERROR-line-228:", error);
  }
};
const searchStringOperation = async (req, res) => {
  const string = req.params.str;
  console.log("Este dato se modifica", string);
  const response = await pool.query("select * from search_operations($1,$2)", [
    userData().user_id,
    `%${string}%`,
  ]);
  console.log(response.rows[0].user_operation[0].operations);
  res.status(200).json({
    status: "success",
    body: {
      operation: response.rows[0].user_operation[0].operations,
    },
  });
};

module.exports = {
  getOperations,
  getOperation,
  createOperation,
  updateOperation,
  deleteOperation,
  getCategory,
  updateCategory,
  deleteCategory,
  createCategory,
  searchStringOperation,
};
