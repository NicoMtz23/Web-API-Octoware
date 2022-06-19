import { getConnection, queries, sql } from "../database";

//GET###############################################################################################################################################################################################
export const getAllCategories = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllCategories);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getCategoriesByAPI = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_api", req.params.id_api)
      .query(queries.getCategoriesByAPI);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


//POST##############################################################################################################################################################################################
export const addCategoriesByAPI = async (req, res) => {
  const { nombre_cat } = req.body;

  if (nombre_cat == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_api", req.params.id_api)
      .input("nombre_cat", sql.VarChar, nombre_cat)
      .query(queries.addCategoriesByAPI);
    res.json("Se ha añadido la Categoría.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


//PUT###############################################################################################################################################################################################
export const updateCategoryByID = async (req, res) => {
  const { nombre_cat } = req.body;

  if (nombre_cat == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_cat", req.params.id_cat)
      .input("nombre_cat", sql.VarChar, nombre_cat)
      .query(queries.updateCategoryByID);
    res.json("Se ha actualizado el nombre de la categoria.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


//DELETE############################################################################################################################################################################################
export const deleteCategoryByID = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_cat", req.params.id_cat)
      .query(queries.deleteCategoryByID);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.json("Se ha eliminado esta categoria.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};