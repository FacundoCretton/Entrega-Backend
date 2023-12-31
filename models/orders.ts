import { Model, Schema, Types, model } from "mongoose";


interface IShippingDetails {
    name: String;
    cellphone: String;
    location: String;
    address: String;
};


interface IOrderItem {
    // desc: String;
    id: Number,
    price: Number,
    quantity: Number,
    name: String

};



export interface IOrder {
    createdAt: Date;
    user: Types.ObjectId;
    price: Number;
    shippingCost: Number;
    items: IOrderItem[];
    shippingDetails: IShippingDetails;
    status: String;
    total: Number;


};


export const OrdersSchema = new Schema <IOrder> ({

    createdAt: {
        type: Date,
        default: Date.now,
    },

    user:{

        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    price:{

        type: Number,
        required: true

    },
    shippingCost:{

        type: Number,
        required: true,

    },
    
    items:{
        type:[{

            id: {
                type: Number,
                required:true,
            },
            price:{
                type: Number,
                required:true,
            },
            quantity:{
                type: Number,
                required:true,
            },
            name:{
                type: String,
                required:true,
            },
        }]
    },
    shippingDetails:{
        name:{
            type: String,
            required:true,
        },
        cellphone:{
            type: String,
            required: true,

        },
        location:{
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true,
        },

    },
    status:{
        type: String,
        required: true,
    },
    total:{
        type: Number,
        required:true,
    },
    



});


const Order: Model<IOrder> = model <IOrder> ("Order", OrdersSchema)
export default Order;