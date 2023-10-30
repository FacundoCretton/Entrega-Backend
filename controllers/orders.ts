import { Request, Response } from "express";
import Order, { IOrder } from "../models/orders";
import { ObjectId } from "mongoose";

export const getOrder = async (req: Request, res:Response)=>{
    const userId: ObjectId = req.body.userConfirmed._id;
    
    const consulta = { user: userId };

    const orders = await Order.find (consulta);

    res.status(200).json({

        data:[
            ...orders
        ]
    })

   

};


export const createOrder = async (req: Request, res:Response)=>{
    const userId : ObjectId=  req.body.userConfirmed._id;
    const orderData: IOrder = req.body;
   
    
    const data ={
        ...orderData,
        user: userId,
        createdAt:new Date(),
        status: "Pendiente",
    }

    const order= new Order(data);
    await order.save();

    res.status(200).json({
        order
    })

};