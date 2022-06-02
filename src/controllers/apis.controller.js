import { getConnection, queries, sql } from "../database";

export const getTableData = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getTableData);
    var obj = {
      count: 0,
      entries: result.recordset,
    };

    obj.count = Object.keys(result.recordset).length;

    res.json(obj);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getApiDetail = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id_api", req.params.id_api)
      .query(queries.getDetailedAPI);

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createAPI = async (req, res) => {
  const { nombre_api, version_api, url_base, descripcion_api } = req.body;
  let { seguridad_api, ult_conexion_api, api_key, disp_api } = req.body;

  // validating
  if (
    nombre_api == null ||
    version_api == null ||
    url_base == null ||
    descripcion_api == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  var dateTime = require("node-datetime");
  var dt = dateTime.create();
  var formatted = dt.format("Y-m-d H:M:S");

  if (seguridad_api == null) seguridad_api = true;
  if (ult_conexion_api == null) ult_conexion_api = formatted;
  if (api_key == null) api_key = "NA";
  if (disp_api == null) disp_api = "13/15";

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre_api", sql.VarChar, nombre_api)
      .input("seguridad_api", sql.Bit, seguridad_api)
      .input("ult_conexion_api", sql.VarChar, ult_conexion_api)
      .input("version_api", sql.VarChar, version_api)
      .input("url_base", sql.VarChar, url_base)
      .input("descripcion_api", sql.VarChar, descripcion_api)
      .input("api_key", sql.VarChar, api_key)
      .input("disp_api", sql.VarChar, disp_api)
      .query(queries.addNewAPI);

    res.json("Se ha añadido la API.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getCategories = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllCategories);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getCategoriesByID = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_api", req.params.id_api)
      .query(queries.getCategoriesByID);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getEndpointsByCat = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queries.getEndpointsByCat);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getSpecificEndpointByID = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_end", req.params.id_end)
      .query(queries.getSpecificEndpointByID);
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getParamsByID = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_end", req.params.id_end)
      .query(queries.getParamsByID);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getResponseByID = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_end", req.params.id_end)
      .query(queries.getResponseByID);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const addCategoriesByID = async (req, res) => {
  const { nombre_cat } = req.body;

  if (
    nombre_cat == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    
    const pool = await getConnection();

   const result = await pool
      .request()
      .input("id_api", req.params.id_api)
      .input("nombre_cat", sql.VarChar, nombre_cat)
      .query(queries.addCategoriesByID);
    res.json("Se ha añadido la Categoría.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
