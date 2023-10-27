import jwt from 'jsonwebtoken';

export const generarJWT = (id: string ="") : Promise <string> => {

    return new Promise((res, rej) => {

        const payload = {id};

        jwt.sign(
            payload,
            process.env.SECRET_KEY as string,
            {//Objeto de configuración
                expiresIn: "8h",   
            },
            (err: Error | null, token: string | undefined) => {

                if (err){
                    console.log(err);
                    rej("No se pudo generar el token");
                    
                } else {
                    res(token as string);
                }
            }

        ) 
    });
};