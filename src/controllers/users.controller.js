import { getConnection, queries, sql } from "../database";

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
    const { email } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("email", sql.VarChar, email )
            .query(queries.getUserByEmail);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const createUser = async (req, res) => {
    const { nombre_usr, email } = req.body;
    let { id_tipo_usr } = req.body;

    // validating
    if (nombre_usr == null || email == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }

    if (id_tipo_usr == null) id_tipo_usr = "User";

    try {
        const pool = await getConnection();

        await pool
            .request()
            .input("nombre_usr", sql.VarChar, nombre_usr)
            .input("email", sql.VarChar, email)
            .input("id_tipo_usr", sql.Int, id_tipo_usr)
            .query(queries.addNewUser);


        res.json("Se ha creado el usuario.");
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

        return res.json("Se ha eliminado este usuario.");;
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const updateRoleById = async (req, res) => {
    const { id_tipo_usr } = req.body;

    // validating
    if (id_tipo_usr  == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }

    try {
        const pool = await getConnection();
        await pool
            .request()
            .input("id_tipo_usr", sql.Int, id_tipo_usr )
            .input("id_usr", req.params.id_usr)
            .query(queries.updateRoleById);
        res.json("Se ha modificado con éxito el rol de este usuario.");
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

