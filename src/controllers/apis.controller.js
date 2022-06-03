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

//POST
export const addMethodByCat = async (req, res) =>{
  const { nombre_end, url_end, docum_end, id_tipo_end } = req.body;
  let {pruebas_end, expected_ans} = req.body;

  // validating
  if (
    nombre_end == null ||
    url_end == null ||
    docum_end == null ||
    id_tipo_end == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  if (pruebas_end == null || pruebas_end == " ") pruebas_end = "Not provided";
  if (expected_ans == null || expected_ans == " ") expected_ans = "Not provided";


  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre_end", sql.VarChar, nombre_end)
      .input("url_end", sql.VarChar, url_end)
      .input("docum_end", sql.VarChar, docum_end)
      .input("pruebas_end", sql.VarChar, pruebas_end)
      .input("expected_ans", sql.VarChar, expected_ans)
      .input("id_cat", req.params.id_cat)
      .input("id_tipo_end", sql.Int, id_tipo_end)
      .query(queries.addNewMethod);

    res.json("Se ha añadido el metodo.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

//DELETE
export const deleteAPIByID = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_api", req.params.id_api)
      .query(queries.deleteAPI);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.json("Se ha eliminado esta API.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteCategoryByID = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_cat", req.params.id_cat)
      .query(queries.deleteCat);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.json("Se ha eliminado esta categoria.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

export const deleteMethodByID = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_end", req.params.id_end)
      .query(queries.deleteMethodByID);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.json("Se ha eliminado esta metodo.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}


//PUT
export const updateGeneralAPI = async (req, res) => {
  const { nombre_api, version_api, url_base, descripcion_api, api_key } = req.body;
  // validating
  if (
    nombre_api == null ||
    version_api == null ||
    url_base == null ||
    descripcion_api == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

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
      .query(queries.updateAPI);

    res.json("Se ha actualizado la API.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateCategoryName = async (req, res) => {
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
      .input("id_cat", req.params.id_cat)
      .input("nombre_cat", sql.VarChar, nombre_cat)
      .query(queries.updateCategoryByID);
    res.json("Se ha actualizado el nombre de la categoria.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateMethod = async (req, res) => {
  const { nombre_end, url_end, docum_end, id_tipo_end } = req.body;
  let {pruebas_end, expected_ans} = req.body;

  // validating
  if (
    nombre_end == null ||
    url_end == null ||
    docum_end == null ||
    id_tipo_end == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  if (pruebas_end == null || pruebas_end == " ") pruebas_end = "Not provided";
  if (expected_ans == null || expected_ans == " ") expected_ans = "Not provided";


  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre_end", sql.VarChar, nombre_end)
      .input("url_end", sql.VarChar, url_end)
      .input("docum_end", sql.VarChar, docum_end)
      .input("pruebas_end", sql.VarChar, pruebas_end)
      .input("expected_ans", sql.VarChar, expected_ans)
      .input("id_end", req.params.id_end)
      .input("id_tipo_end", sql.Int, id_tipo_end)
      .query(queries.updateMethod);

    res.json("Se ha actualizado el metodo.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}