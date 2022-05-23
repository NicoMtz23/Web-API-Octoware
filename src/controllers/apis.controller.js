import { getConnection, queries, sql } from "../database";

export const getTableData = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getTableData);
        var obj = {
            count : 0,
            entries: result.recordset
        };

        obj.count = Object.keys(result.recordset).length;

        res.json(obj)
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
    const { nombre_api, version_api, url_base, descripcion_api} = req.body;
    let { seguridad_api, ult_conexion_api, api_key, id_disp} = req.body;

    // validating
    if (nombre_api == null || version_api == null || url_base == null || descripcion_api == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }

    
    if (seguridad_api == null) seguridad_api = true;
    if (ult_conexion_api == null) ult_conexion_api = '05-03-22 14:20:09 PM';
    if (api_key == null) api_key = 'NA';
    if (id_disp == null) id_disp = 1;


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
            .input("id_disp", sql.Int, id_disp)
            .query(queries.addNewAPI);

        res.json("Se ha añadido la API.");
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};