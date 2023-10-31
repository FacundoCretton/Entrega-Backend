import { sendEmail } from "../mailer/mailer";
import User, { IUser } from "../models/user";


export const emailExiste = async (email: string): Promise<void> => {

    const emailExiste: IUser | null = await User.findOne({ email });

    if (emailExiste && !emailExiste.verified) {
        await sendEmail (email, emailExiste.code as string, emailExiste.name);
        throw new Error(`El email ${email} ya está registrado. Te enviamos un nuevo código de verificación para que puedas completar tu registro`);
    }


};