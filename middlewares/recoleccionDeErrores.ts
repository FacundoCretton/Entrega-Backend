import { NextFunction, Request, Response } from "express";
import { Result, ValidationError,  validationResult } from "express-validator";

export const recoleccionDeErrores = (req: Request, res: Response, next: NextFunction):void =>{

    const errores: Result <ValidationError> = validationResult(req)

    if (!errores.isEmpty()){

        res.status(400).json(errores)
    }else{
        next();
    }

};