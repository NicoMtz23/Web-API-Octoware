export const queries = {
    getAllUsers: "SELECT * FROM [IPS_API_MANAGEMENT_8].dbo.Usuario",
    addNewUser: "IF NOT EXISTS (SELECT email FROM Dbo.Usuario WHERE email = @email)BEGIN INSERT INTO dbo.Usuario (nombre_usr, email, id_tipo_usr) VALUES(@nombre_usr,@email,@id_tipo_usr ); END",
    deleteUser: "DELETE FROM [IPS_API_MANAGEMENT_8].dbo.Usuario WHERE id_usr= @id_usr",
    updateRoleById: "UPDATE  [IPS_API_MANAGEMENT_8].dbo.Usuario SET id_tipo_usr  = @id_tipo_usr  WHERE id_usr = @id_usr",
    getTableData: "SELECT id_api, nombre_api, disp_api, seguridad_api, ult_conexion_api, version_api from API",
    getUserByEmail: "SELECT Usuario.nombre_usr, Usuario.email, Tipo_Usr.tipo_usr FROM Usuario JOIN Tipo_Usr ON Usuario.id_tipo_usr = Tipo_Usr.id_tipo_usr WHERE email=@email",
    getDetailedAPI: "SELECT *FROM [IPS_API_MANAGEMENT_8].dbo.API WHERE id_api = @id_api",
    addNewAPI: "INSERT INTO [IPS_API_MANAGEMENT_8].dbo.API (nombre_api, seguridad_api, ult_conexion_api, version_api, url_base, descripcion_api, api_key, disp_api) VALUES (@nombre_api, @seguridad_api, @ult_conexion_api, @version_api,@url_base,@descripcion_api,@api_key,@disp_api );"
}
