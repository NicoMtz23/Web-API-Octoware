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