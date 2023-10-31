import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({

    service: 'gmail',

    auth: {

        user: 'ladespensadelaabuelaok@gmail.com',

        pass: 'vtifcckhlwytccwa'

    },

    from: 'ladespensadelaabuelaok@gmail.com'


})



export const sendEmail = async (to: string, code: string, name: string): Promise<void> => {
    const mailOptions = {
        from: '"La Despensa de la Abuela" <ladespensadelaabuelaok@gmail.com>',
        to,
        subject: 'Código de verificación',
        html: `
            <p>¡Hola ${name}!</p>
            <p>Tu código de verificación es: ${code}</p>
            <img src="https://i.ibb.co/yWGf1rY/tu-imagen.png" alt="Logo">
            <p>La Despensa de la Abuela. Todos los derechos reservados</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email enviado');
    } catch (error) {
        console.log("Se produjo un error al enviar el email", error);
    }
}
