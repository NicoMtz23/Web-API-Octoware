import { getConnection, queries, sql } from "../database";
import { config } from "dotenv";
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);
var jwt = require("jsonwebtoken");

export const getUsers = async (req, res) => {
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

export const getFavByIDs = async (req, res) => {
  try {
    const pool = await getConnection();

    const result  = await pool
      .request()
      .input("id_end", req.query.id_end)
      .input("id_usr", req.query.id_usr)
      .query(queries.getFavorite);
  
      res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const postFav = async (req, res) => {
  const { id_end, id_usr } = req.body;

  // validating
  if (
    id_usr == null ||
    id_end == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("id_end", sql.Int, id_end)
      .input("id_usr", sql.Int, id_usr)
      .query(queries.addFavorite);

    res.json("Favorite added succesfully!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const putFav = async (req, res) => {
  const { id_end, id_usr } = req.body;

  // validating
  if (
    id_usr == null ||
    id_end == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("id_end", sql.Int, id_end)
      .input("id_usr", sql.Int, id_usr)
      .query(queries.updateFavoriteState);

    res.json("Favorite updated succesfully!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

export const getAllFavoritesByUserID = async (req,res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_usr", req.query.id_usr)
      .query(queries.getAllFavoritesByUserID);
    
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
}

export const createUser = async (req, res) => {
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

export const deleteUserById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_usr", req.params.id_usr)
      .query(queries.deleteUser);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.json("Se ha eliminado este usuario.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateRoleById = async (req, res) => {
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
      .query(queries.updateRoleById);
    res.json("Se ha modificado con éxito el rol de este usuario.");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

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
