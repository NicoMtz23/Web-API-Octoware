import { getConnection, queries, sql } from "../database";

//GET###############################################################################################################################################################################################
export const getParamsByEndpoint = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_end", req.params.id_end)
      .query(queries.getParamsByEndpoint);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getResponseByEndpoint = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_end", req.params.id_end)
      .query(queries.getResponseByEndpoint);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


//POST##############################################################################################################################################################################################

export const addParamByEndpoint = async (req, res) => {
  const { nombre_param, obligatorio_param, id_tipo_param, query } = req.body;

  // validating
  if (nombre_param == null || obligatorio_param == null || id_tipo_param == null || query == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre_param", sql.VarChar, nombre_param)
      .input("obligatorio_param", sql.Bit, obligatorio_param)
      .input("id_tipo_param", sql.Int, id_tipo_param)
      .input("query", sql.Bit, query)
      .input("id_end", req.params.id_end)
      .query(queries.addParamsByEndpoint);
    res.json('Se ha añadido el parametro.');
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const addResponseByEndpoint = async (req, res) => {
  const { name_resp, id_tipo_param } = req.body;

  // validating
  if (name_resp == null || id_tipo_param == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("name_resp", sql.VarChar, name_resp)
      .input("id_tipo_param", sql.Int, id_tipo_param)
      .input("id_end", req.params.id_end)
      .query(queries.addResponseByEndpoint);
    res.json('Se ha añadido la respuesta.');
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


//PUT###############################################################################################################################################################################################
export const updateParamsByID = async (req, res) => {
  const { nombre_param, obligatorio_param, id_tipo_param, query } = req.body;

  // validating
  if (nombre_param == null || obligatorio_param == null || id_tipo_param == null || query == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre_param", sql.VarChar, nombre_param)
      .input("obligatorio_param", sql.Bit, obligatorio_param)
      .input("id_tipo_param", sql.Int, id_tipo_param)
      .input("query", sql.Bit, query)
      .input("id_param", req.params.id_param)
      .query(queries.updateParamsByID);

    res.json("Se ha actualizado el parametro.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateResponseByID = async (req, res) => {
  const { name_resp, id_tipo_param } = req.body;

  // validating
  if (name_resp == null || id_tipo_param == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("name_resp", sql.VarChar, name_resp)
      .input("id_tipo_param", sql.Int, id_tipo_param)
      .input("id_respuestas_end", req.params.id_respuestas_end)
      .query(queries.updateResponseByID);

    res.json("Se ha actualizado la respuesta.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


//DELETE############################################################################################################################################################################################
export const deleteParamByID = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_param", req.params.id_param)
      .query(queries.deleteParamByID);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.json("Se ha eliminado este parametro.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteResponseByID = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_respuestas_end", req.params.id_respuestas_end)
      .query(queries.deleteResponseByID);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.json("Se ha eliminado esta respuesta.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};