export const queries = {
    //GET###############################################################################################################################################################################################
    //User
    getAllUsers: "EXEC sp_GetAllUsers",
    getUserByEmail: "EXEC sp_GetUserByEmail @email",

    //API
    getCatalogueData: "EXEC sp_GetCatalogueData",
    getApiDetailByID: "EXEC sp_ApiDetailByID @id_api",

    //Category
    getCategoriesByAPI: "EXEC sp_GetCategoriesByAPI @id_api",
    getAllCategories: "EXEC sp_GetAllCategories",

    //Endpoint
    getAllEndpoints: "EXEC sp_GetAllEndpoints",
    getEndpointByID: "EXEC sp_GetEndpointByID @id_end",
    
    //Param & Response
    getParamsByEndpoint: "EXEC sp_GetParamsByEndpoint @id_end",
    getResponseByEndpoint: "EXEC sp_GetResponseByEndpoint @id_end",

    //Favorite
    getSpecificFavByUser: "EXEC sp_GetSpecificFavByUser @id_api , @id_usr",
    getAllFavsByUser: "EXEC sp_GetAllFavsByUser @id_usr" ,

    getMethodCount:"EXEC SP_COUNT_METHODS",
    getApiCount:"EXEC SP_COUNT_APIS",
    getRandomAPI:"EXEC SP_RANDOM_API",

    //POST##############################################################################################################################################################################################
    //User
    addNewUser: "EXEC sp_AddNewUser @nombre_usr, @email, @id_tipo_usr",

    //API
    addNewAPI: "EXEC sp_AddNewAPI @nombre_api, @seguridad_api, @ult_conexion_api, @version_api, @url_base, @descripcion_api, @api_key, @disp_api, @url_prueba",
    
    //Category
    addCategoriesByAPI: "EXEC sp_AddCategoriesByAPI @nombre_cat, @id_api",

    //Endpoint
    addMethodByCat:"EXEC sp_AddMethodByCat @nombre_end, @url_end, @docum_end, @pruebas_end, @expected_ans, @id_cat, @id_tipo_end, @body",

    //Favorite
    addFavByUser: "EXEC sp_AddFavByUser @id_api , @id_usr",

    //Requests
    addParamsByEndpoint: "insert into dbo.Parametro values ( @nombre_param, @obligatorio_param, @id_end, @id_tipo_param, @query)",
    addResponseByEndpoint: "EXEC sp_AddResponseByEndpoint @name_resp, @id_end, @id_tipo_param ",


    //PUT###############################################################################################################################################################################################
    //User
    updateRoleByID: "EXEC sp_UpdateRoleByID @id_usr, @id_tipo_usr",
    
    //API
    updateAPIByID: "EXEC sp_UpdateAPIByID @nombre_api, @version_api, @url_base, @descripcion_api, @api_key, @id_api, @url_prueba",
    updateDispByID:"EXEC sp_UpdateDispByID @disp_api, @ult_conexion_api, @id_api",

    //Category
    updateCategoryByID: "EXEC sp_UpdateCategoryByID @nombre_cat, @id_cat",

    //Endpoint
    updateMethodByID:"EXEC sp_UpdateMethodByID @nombre_end, @url_end, @docum_end, @pruebas_end, @expected_ans, @id_tipo_end, @id_end, @body",

    //Favorite
    updateFavByUser: "EXEC sp_UpdateFavByUser @id_api , @id_usr",

    //Requests
    updateParamsByID: "EXEC sp_updateParamsByID @nombre_param, @obligatorio_param, @id_tipo_param, @query, @id_param",
    updateResponseByID: "EXEC sp_updateResponseByID @name_resp, @id_tipo_param, @id_respuestas_end",

    
    //DELETE############################################################################################################################################################################################
    //User
    logicDeleteUserByID: "EXEC sp_LogicDeleteUserByID @id_usr",
    logicActivationUserByID: "EXEC sp_LogicActivationUserByID @id_usr",
    deleteUserByID: "EXEC sp_DeleteUserByID @id_usr",

    //API
    deleteAPIByID: "EXEC sp_DeleteAPIByID @id_api",

    //Category
    deleteCategoryByID: "EXEC sp_DeleteCategoryByID @id_cat",

    //Endpoint
    deleteMethodByID: "EXEC sp_DeleteMethodByID @id_end",

    //Requests
    deleteParamByID :"EXEC sp_DeleteParamByID @id_param",
    deleteResponseByID :"EXEC sp_DeleteResponseByID @id_respuestas_end"
}
 