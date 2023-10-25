import mongoose from "mongoose"



export const DBConection =async (): Promise <void> => {


    try {
        
        const dbURL = process.env.DB_URL;
        if(!dbURL){
            throw new Error('No se ha definido la variable de entorno DB_URL')
        }


        await mongoose.connect(dbURL);    
    } 
    catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos')
        
    }
    
}