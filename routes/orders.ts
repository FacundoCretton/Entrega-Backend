import { Router } from "express";
import { createOrder, getOrder } from "../controllers/orders";
import validarJWT from "../middlewares/validarJWT";
import { recoleccionDeErrores } from "../middlewares/recoleccionDeErrores";
import { isVerify } from "../middlewares/validarVerify";
import { check } from "express-validator";

const router = Router();

router.get("/", 

    [
        validarJWT,
        recoleccionDeErrores
    ]

,getOrder)

router.post("/", 
    
    [
        validarJWT,
        isVerify,
        check ("price", "El precio es obligatorio") .not() .isEmpty(),
        check("shippingCost", "El costo de envío es necesario") .not() .isEmpty(),
        check ("total", "El total es requerido") .not() .isEmpty(),
        check ("shippingDetails", "Los detalles del envío son obligatorios") .not() .isEmpty(),
        check ("items", "El array de productos es requerido") .not() .isEmpty(),
        recoleccionDeErrores
    ],

createOrder)

export default router;