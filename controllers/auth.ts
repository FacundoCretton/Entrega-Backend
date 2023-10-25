import { Request, Response } from "express";
import User , { IUser } from "../models/user";
import bcryptjs from "bcryptjs";
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring";



export const register = async (req: Request, res: Response) => {
    //Al saber que el usuario me va a estar mandando data en la request, lo puedo desestructurar del request body

    const{nombre, email, password, rol}:IUser= req.body;
    //Yo sé que esta data que viene del body tiene que ver con el usuario, entonces como me aseguro que todo esté bien? Yo puedo tipar la data de adentro y le puedo decir que tiene que respetar el interface de user

    const user = new User({nombre, email, password, rol}); 

    const salt = bcryptjs.genSaltSync();

    user.password = bcryptjs.hashSync(password, salt);

    const adminKey = req.headers["admin-key"];

    if (adminKey === process.env.ADMINKEY) {
        user.rol = ROLES.admin;
    }

    const newCode = randomstring.generate(10);
    user.code = newCode;
    await user.save();
    res.status(201).json({user});
};