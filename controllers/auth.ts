import { Request, Response } from "express";
import User , { IUser } from "../models/user";
import bcryptjs from "bcryptjs";
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring";
import { sendEmail } from "../mailer/mailer";
import { generarJWT } from "../helpers/generarJWT";



export const register = async (req: Request, res: Response) => {
    //Al saber que el usuario me va a estar mandando data en la request, lo puedo desestructurar del request body

    const{name, email, password, rol}:IUser= req.body;
    //Yo sé que esta data que viene del body tiene que ver con el usuario, entonces como me aseguro que todo esté bien? Yo puedo tipar la data de adentro y le puedo decir que tiene que respetar el interface de user

    const user = new User({name, email, password, rol}); 

    const salt = bcryptjs.genSaltSync();

    user.password = bcryptjs.hashSync(password, salt);

    const adminKey = req.headers["admin-key"];

    if (adminKey === process.env.ADMINKEY) {
        user.rol = ROLES.admin;
    }

    const newCode = randomstring.generate(10);
    user.code = newCode;
    await user.save();

    await sendEmail (email, newCode, name);
    res.status(201).json({user});
};


export const login =async(req:Request, res:Response): Promise <void> =>{
    const{ email, password}:IUser= req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
         res.status(400).json({msg: "Usuario no encontrado"})
         return;
        }

        const verificarPassword = bcryptjs.compareSync(password, user.password);

        if (!verificarPassword) {
            res.status(400).json({msg: "Contraseña incorrecta"});
            return;
        }

        const token = await generarJWT(user.id);

        res.status(200).json({user, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error al iniciar sesión"});
        
    }

    

};
export const verifyUser = async(req: Request, res: Response) => {

    const {email, code} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            res.status(404).json({msg: "Usuario no encontrado"});
            return;
        }
        
        if (user.verified){
            res.status(400).json({msg: "Usuario ya verificado"});
            return;
        }

        if (code !== user.code) {
            res.status(400).json({msg: "Código incorrecto"});
            return;
        }
        await User.findOneAndUpdate(
            {email},
            {verified: true},
            
        );
       res.status(200).json({msg: "Usuario verificado correctamente"}); 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error al verificar usuario"});
        
    }

        
};
