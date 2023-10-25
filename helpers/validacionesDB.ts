import User, { IUser } from "../models/user";


export const emailExiste = async (email: string): Promise<void> => {

    const emailExiste: IUser | null = await User.findOne({ email });

    if (emailExiste) {
        throw new Error(`El email ${email} ya está registrado`);
    }


};