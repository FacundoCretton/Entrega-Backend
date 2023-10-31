import { Router } from "express";
import { login, register, verifyUser } from "../controllers/auth";
import { check } from "express-validator";
import { recoleccionDeErrores } from "../middlewares/recoleccionDeErrores";
import { emailExiste } from "../helpers/validacionesDB";

const router = Router();

router.post( "/register", 

    //check sirve para validar los campos que vienen en el body. En este caso, el name no puede estar vacío, en caso de estarlo, se devuelve un mensaje de error
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email").custom (emailExiste),
        check("email", "El email es obligatorio") .isEmail(),
        check("password", "El password debe tener al menos 8 caracteres").isLength({min: 8}),
        recoleccionDeErrores
    ],


    register
);

router.post( "/login",
    [
        check("email", "El email no es valido") .isEmail(),
        check("email" ,"El email es obligatorio").not().isEmpty(),
        check("password", "El password debe tener al menos 8 caracteres").isLength({min: 8}),
        recoleccionDeErrores
    ],
    login

);

router.patch(
    "/verify",
    [
        check("code", "El código es obligatorio").not().isEmpty(),
        check("code", "El código debe tener 10 caracteres").isLength({min: 10}),
        check("email", "El email no es valido") .isEmail(),
        check("email" ,"El email es obligatorio").not().isEmpty(),
        recoleccionDeErrores
    ],
    verifyUser
);

export default router;