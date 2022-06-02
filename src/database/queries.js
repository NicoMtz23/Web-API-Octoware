export const queries = {
    getAllUsers: "SELECT * FROM [IPS_API_MANAGEMENT_8].dbo.Usuario",
    addNewUser: "IF NOT EXISTS (SELECT email FROM Dbo.Usuario WHERE email = @email)BEGIN INSERT INTO dbo.Usuario (nombre_usr, email, id_tipo_usr) VALUES(@nombre_usr,@email,@id_tipo_usr ); END",
    deleteUser: "DELETE FROM [IPS_API_MANAGEMENT_8].dbo.Usuario WHERE id_usr= @id_usr",
    updateRoleById: "UPDATE  [IPS_API_MANAGEMENT_8].dbo.Usuario SET id_tipo_usr  = @id_tipo_usr  WHERE id_usr = @id_usr",
    getTableData: "SELECT id_api, nombre_api, disp_api, seguridad_api, ult_conexion_api, version_api from API",
    getUserByEmail: "SELECT Usuario.id_usr, Usuario.nombre_usr, Usuario.email, Tipo_Usr.tipo_usr FROM Usuario JOIN Tipo_Usr ON Usuario.id_tipo_usr = Tipo_Usr.id_tipo_usr WHERE email=@email",
    getDetailedAPI: "SELECT *FROM [IPS_API_MANAGEMENT_8].dbo.API WHERE id_api = @id_api",
    addNewAPI: "INSERT INTO [IPS_API_MANAGEMENT_8].dbo.API (nombre_api, seguridad_api, ult_conexion_api, version_api, url_base, descripcion_api, api_key, disp_api) VALUES (@nombre_api, @seguridad_api, @ult_conexion_api, @version_api,@url_base,@descripcion_api,@api_key,@disp_api );",
    getAllCategories: "SELECT * FROM [IPS_API_MANAGEMENT_8].dbo.Categoria",
    getCategoriesByID: "SELECT id_cat, nombre_cat FROM Categoria WHERE id_api=@id_api",
    getEndpointsByCat: "SELECT Endpoint.id_end, Endpoint.nombre_end, Tipo_Endpoint.tipo_end, Endpoint.id_cat FROM dbo.Endpoint JOIN Tipo_Endpoint ON Endpoint.id_tipo_end = Tipo_Endpoint.id_tipo_end",
    getSpecificEndpointByID: "SELECT Endpoint.id_end,  Endpoint.nombre_end, Endpoint.url_end, Endpoint.docum_end, Endpoint.pruebas_end, Endpoint.expected_ans, Tipo_Endpoint.tipo_end FROM DBO.Endpoint JOIN Tipo_Endpoint ON Endpoint.id_tipo_end = Tipo_Endpoint.id_tipo_end WHERE id_end = @id_end",
    getParamsByID: "SELECT Parametro.id_param, Parametro.nombre_param, Parametro.obligatorio_param, Tipo_Param.tipo_param FROM DBO.Parametro JOIN Tipo_Param ON Parametro.id_tipo_param = Tipo_Param.id_tipo_param WHERE id_end = @id_end",
    getResponseByID: "SELECT Respuestas_End.id_respuestas_end, Respuestas_End.name_resp, Tipo_Param.tipo_param FROM Respuestas_End JOIN Tipo_Param ON Respuestas_End.id_tipo_param = Tipo_Param.id_tipo_param WHERE id_end = @id_end",
    addCategoriesByID: "INSERT INTO [IPS_API_MANAGEMENT_8].dbo.Categoria VALUES (@nombre_cat, @id_api);",
    getFavorite: "",
    addFavorite: ""
}
