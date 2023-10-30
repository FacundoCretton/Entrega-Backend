import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user";

const validarJWT = async(req:Request, res: Response, next:NextFunction) =>{

    const token = req.headers["x-token"] as string;

    if (!token){

        res.status(401).json({
            msg: "No se encontró token en la petición"
        });
        return;
    }

    try {
        const secretKey= process.env.SECRET_KEY as string;
        const payload = jwt.verify(token, secretKey) as JwtPayload;
        const {id} = payload;

        const userConfirmed: IUser|null = await User.findById(id);

        if (!userConfirmed){
            res.status (404).json({
                msg: "Usuario no encontrado"
            });
            return;
        };

        req.body.userConfirmed = userConfirmed;
        next();
        


        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        });
        
    }


}


export default validarJWT;