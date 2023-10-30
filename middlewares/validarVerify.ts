import { NextFunction, Request, Response } from "express";


export const isVerify = async (req: Request, res:Response, next: NextFunction)=>{

    const {verified}= req.body.userConfirmed
    if (!verified) {
        return res.status(401).json({
            msg: "El usuario no está verificado"
        })
        return;
    }
    next();
};