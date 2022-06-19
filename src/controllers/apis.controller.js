import { getConnection, queries, sql } from "../database";

//GET###############################################################################################################################################################################################
export const getCatalogueData = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getCatalogueData);
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

export const getApiDetailByID = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id_api", req.params.id_api)
      .query(queries.getApiDetailByID);

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getApiCount = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queries.getApiCount);

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getMethodCount = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queries.getMethodCount);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getRandomAPI = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queries.getRandomAPI);

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


//POST##############################################################################################################################################################################################
export const addNewAPI = async (req, res) => {
  const { nombre_api, version_api, url_base, descripcion_api, url_prueba } = req.body;
  let { seguridad_api, ult_conexion_api, api_key, disp_api } = req.body;

  // validating
  if (
    nombre_api == null ||
    version_api == null ||
    url_base == null ||
    descripcion_api == null ||
    url_prueba == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }
  
  var moment = require('moment-timezone');
  var a = moment.tz("America/Monterrey");

  if (seguridad_api == null) seguridad_api = true;
  if (ult_conexion_api == null) ult_conexion_api = a.format();
  if (api_key == null || api_key == "") api_key = "NA";
  if (disp_api == null) disp_api = "No";

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre_api", sql.VarChar, nombre_api)
      .input("seguridad_api", sql.Bit, seguridad_api)
      .input("ult_conexion_api", sql.DateTime, ult_conexion_api)
      .input("version_api", sql.VarChar, version_api)
      .input("url_base", sql.VarChar, url_base)
      .input("descripcion_api", sql.VarChar, descripcion_api)
      .input("api_key", sql.VarChar, api_key)
      .input("disp_api", sql.VarChar, disp_api)
      .input("url_prueba", sql.VarChar, url_prueba)
      .query(queries.addNewAPI);

    res.json("Se ha añadido la API.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


//PUT###############################################################################################################################################################################################
export const updateAPIByID = async (req, res) => {
  const { nombre_api, version_api, url_base, descripcion_api, url_prueba } = req.body;
  let {api_key} = req.body;
  // validating
  if (
    nombre_api == null ||
    version_api == null ||
    url_base == null ||
    descripcion_api == null ||
    url_prueba == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  if (api_key == null || api_key == "") api_key = "NA";

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("id_api", req.params.id_api)
      .input("nombre_api", sql.VarChar, nombre_api)
      .input("version_api", sql.VarChar, version_api)
      .input("url_base", sql.VarChar, url_base)
      .input("descripcion_api", sql.VarChar, descripcion_api)
      .input("api_key", sql.VarChar, api_key)
      .input("url_prueba", sql.VarChar, url_prueba)
      .query(queries.updateAPIByID);

    res.json("Se ha actualizado la API.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateDispByID = async (req, res) => {
  const { state } = req.body;
  let {ult_conexion_api} = req.body;
  let disp_api = "";
  // validating
  if (
    state == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  var moment = require('moment-timezone');
  var a = moment.tz("America/Monterrey");

  if(state == "success"){
    disp_api = "Yes"
    ult_conexion_api = a.format();
  }else{
    disp_api = "No"
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("id_api", req.params.id_api)
      .input("ult_conexion_api", sql.DateTime, ult_conexion_api)
      .input("disp_api", sql.VarChar, disp_api)
      .query(queries.updateDispByID);

    res.json("Se ha actualizado la disponibilidad de la API.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


//DELETE############################################################################################################################################################################################
export const deleteAPIByID = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_api", req.params.id_api)
      .query(queries.deleteAPIByID);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.json("Se ha eliminado esta API.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};