import { Router } from "express";
import { register } from "../controllers/auth";
import { check } from "express-validator";
import { recoleccionDeErrores } from "../middlewares/recoleccionDeErrores";
import { emailExiste } from "../helpers/validacionesDB";

const router = Router();

router.post( "/register", 

    //check sirve para validar los campos que vienen en el body. En este caso, el nombre no puede estar vacío, en caso de estarlo, se devuelve un mensaje de error
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("email").custom (emailExiste),
        check("email", "El email es obligatorio") .isEmail(),
        check("password", "El password debe tener al menos 8 caracteres").isLength({min: 8}),
        recoleccionDeErrores
    ],


    register
);



export default router;