import app from "./app";

app.listen(app.get("port"),(error)=>{
    if(error){
        console.log("Error para iniciar servidor: " + error)
    }else{
        console.log("Servidor iniciado en el puerto " + app.get("port"))
    }
})