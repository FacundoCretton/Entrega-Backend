import { Model, Schema, model } from "mongoose";
import { ROLES } from "../helpers/constants";

export interface IUser {
    name: string;
    email: string;
    password: string;
    rol?: string;
    code?: string;
    verified?: boolean;
};

//El ? indica que es opcional


const userSchema = new Schema<IUser>({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    rol: {
        type: String,
        default: ROLES.user,
    },
    code: {
        type: String,
        // default: ''
    },
    verified: {
        type: Boolean,
        default: false
    }
});

//Ahora vamos a crear esto que es un método que trae el esquema para pasar la data que traigo de la BD directamente a JSON, y lo voy a pisar con una function

userSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    return user;
};

const User : Model<IUser> = model <IUser>('User', userSchema);

export default User;
