import { getConnection, queries, sql } from "../database";

//GET###############################################################################################################################################################################################
export const getAllEndpoints = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllEndpoints);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


export const getEndpointByID = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_end", req.params.id_end)
      .query(queries.getEndpointByID);
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


//POST##############################################################################################################################################################################################
export const addMethodByCat = async (req, res) => {
  const { nombre_end, url_end, docum_end, id_tipo_end } = req.body;
  let { pruebas_end, expected_ans, body } = req.body;

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
  if (body == null || body == "") body = "Not provided";

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
      .input("body", sql.VarChar, body)
      .query(queries.addMethodByCat);

    res.json("Se ha añadido el metodo.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


//PUT###############################################################################################################################################################################################
export const updateMethodByID = async (req, res) => {
  const { nombre_end, url_end, docum_end, id_tipo_end } = req.body;
  let { pruebas_end, expected_ans, body } = req.body;

  // validating
  if (
    nombre_end == null ||
    url_end == null ||
    docum_end == null ||
    id_tipo_end == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  if (pruebas_end == null || pruebas_end == "") pruebas_end = "Not provided";
  if (expected_ans == null || expected_ans == "") expected_ans = "Not provided";
  if (body == null || body == "") body = "Not provided";

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
      .input("body", sql.VarChar, body)
      .query(queries.updateMethodByID);

    res.json("Se ha actualizado el metodo.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


//DELETE############################################################################################################################################################################################
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
};
