import { getConnection, queries, sql } from "../database";
import { config } from "dotenv";
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);
var jwt = require("jsonwebtoken");

//GET###############################################################################################################################################################################################
export const getAllUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllUsers);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("email", req.query.email)
      .query(queries.getUserByEmail);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


//POST##############################################################################################################################################################################################
export const addNewUser = async (req, res) => {
  const { nombre_usr, email } = req.body;
  let { id_tipo_usr } = req.body;

  // validating
  if (nombre_usr == null || email == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  if (id_tipo_usr == null) id_tipo_usr = 1;

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre_usr", sql.VarChar, nombre_usr)
      .input("email", sql.VarChar, email)
      .input("id_tipo_usr", sql.Int, id_tipo_usr)
      .query(queries.addNewUser);

    res.json("User has registered.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


//PUT###############################################################################################################################################################################################
export const updateRoleByID = async (req, res) => {
  const { id_tipo_usr } = req.body;

  // validating
  if (id_tipo_usr == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("id_tipo_usr", sql.Int, id_tipo_usr)
      .input("id_usr", req.params.id_usr)
      .query(queries.updateRoleByID);
    res.json("Se ha modificado con éxito el rol de este usuario.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const logicDeleteUserByID = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_usr", sql.Int, req.params.id_usr)
      .query(queries.logicDeleteUserByID);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.json("Se ha eliminado de forma logica este usuario.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const logicActivationUserByID = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_usr", sql.Int, req.params.id_usr)
      .query(queries.logicActivationUserByID);

    return res.json("Se ha activado de forma logica este usuario.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}


//DELETE############################################################################################################################################################################################
export const deleteUserByID = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_usr", req.params.id_usr)
      .query(queries.deleteUserByID);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.json("Se ha eliminado este usuario.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//AUTH##############################################################################################################################################################################################
export const generateGoogleToken = async (req, res) => {
  const { id_token } = req.body;

  var dataToken = "";

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: config.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];

    dataToken = { name: payload.name, email: payload.email };
  }
  verify()
    .then(() => {
        var token = generateAccessToken(dataToken);
        res.json(token);
    })
    .catch(console.error);
};

export const generateMSToken = async (req, res) => {
  const {name, email} = req.body;

  var dataToken = { name: name, email: email };
  var token = generateAccessToken(dataToken);
  res.json(token);
};

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}
