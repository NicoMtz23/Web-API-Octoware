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

        var json = JSON.stringify(obj);
        res.json(obj)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};