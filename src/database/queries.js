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
    getFavorite: "EXEC SP_GET_FAV @id_end , @id_usr",
    addFavorite: "EXEC SP_POST_FAV @id_end , @id_usr",
    updateFavoriteState: "EXEC SP_PUT_FAV @id_end , @id_usr",
    getAllFavoritesByUserID: "SELECT API.nombre_api,  Categoria.nombre_cat, Endpoint.nombre_end, Tipo_Endpoint.tipo_end FROM DBO.Favorito JOIN Endpoint ON Favorito.id_end = Endpoint.id_end JOIN Tipo_Endpoint ON Tipo_Endpoint.id_tipo_end = Endpoint.id_tipo_end  JOIN Categoria ON Endpoint.id_cat= Categoria.id_cat JOIN API ON Categoria.id_api = API.id_api WHERE Favorito.id_usr = @id_usr;",
    deleteAPI: "EXEC SP_TRANS_DELETEAPI @id_api",
    updateAPI: "UPDATE API SET nombre_api = @nombre_api, version_api = @version_api, url_base = @url_base, descripcion_api = @descripcion_api, api_key = @api_key WHERE id_api = @id_api",
    updateCategoryByID: "UPDATE Categoria SET nombre_cat = @nombre_cat WHERE id_cat = @id_cat",
    deleteCat: "EXEC SP_TRANS_DELETECategoria @id_cat",
    addNewMethod:"INSERT INTO dbo.Endpoint VALUES (@nombre_end, @url_end, @docum_end, @pruebas_end, @expected_ans, @id_cat, @id_tipo_end);",
    deleteMethodByID: "EXEC SP_TRANS_DELETEEndpoint @id_end",
    updateMethod:"UPDATE Endpoint SET nombre_end = @nombre_end, url_end = @url_end, docum_end = @docum_end, pruebas_end = @pruebas_end, expected_ans = @expected_ans, id_tipo_end = @id_tipo_end WHERE id_end = @id_end"
}
 