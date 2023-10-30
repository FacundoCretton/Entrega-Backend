import { Router } from "express";
import { newIssue } from "../controllers/issues";
import validarJWT from "../middlewares/validarJWT";
import { isAdmin } from "../middlewares/validarRol";
import { recoleccionDeErrores } from "../middlewares/recoleccionDeErrores";
import { check } from "express-validator";

const router = Router();

router.post ("/",
    [
        validarJWT,
        isAdmin,
        check ("title", "El titulo es obligatorio") .not().isEmpty(),
        check ("description", "La descripción es obligatoria").not().isEmpty(),
        check ("priority", "La prioridad es obligatoria") .not() .isEmpty(),
        recoleccionDeErrores
    ],
    newIssue
)
export default router;