export const queries = {
    getAllUsers: "SELECT * FROM Usuario",
    addNewUser:  "INSERT INTO [IPS_API_MANAGEMENT_8].dbo.Usuario(nombre_usr, email, id_tipo_usr ) VALUES (@nombre_usr,@email,@id_tipo_usr );",
    deleteUser: "DELETE FROM [IPS_API_MANAGEMENT_8].dbo.Usuario WHERE id_usr= @id_usr",
    updateRoleById: "UPDATE  [IPS_API_MANAGEMENT_8].dbo.Usuario SET id_tipo_usr  = @id_tipo_usr  WHERE id_usr = @id_usr",
    getTableData: "SELECT API.nombre_api, Disponibilidad.tipo_disp, API.seguridad_api, API.ult_conexion_api, API.version_api FROM API JOIN Disponibilidad ON API.id_disp = Disponibilidad.id_disp",
    getUserByEmail: "SELECT email FROM [IPS_API_MANAGEMENT_8].dbo.Usuario WHERE email=@email"
}
