import { getConnection, queries, sql } from "../database";

//GET###############################################################################################################################################################################################
export const getSpecificFavByUser = async (req, res) => {
  try {
    const pool = await getConnection();

    const result  = await pool
      .request()
      .input("id_api", req.query.id_api)
      .input("id_usr", req.query.id_usr)
      .query(queries.getSpecificFavByUser);
  
      res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getAllFavsByUser = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_usr", req.query.id_usr)
      .query(queries.getAllFavsByUser);

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


//POST##############################################################################################################################################################################################
export const addFavByUser = async (req, res) => {
  const { id_api, id_usr } = req.body;

  // validating
  if (id_api == null || id_usr == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("id_api", sql.Int, id_api)
      .input("id_usr", sql.Int, id_usr)
      .query(queries.addFavByUser);

    res.json("Favorite added succesfully!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


//PUT###############################################################################################################################################################################################
export const updateFavByUser = async (req, res) => {
  const { id_api, id_usr } = req.body;

  // validating
  if (id_usr == null || id_api == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("id_api", sql.Int, id_api)
      .input("id_usr", sql.Int, id_usr)
      .query(queries.updateFavByUser);

    res.json("Favorite updated succesfully!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


//DELETE############################################################################################################################################################################################
  