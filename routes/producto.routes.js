const express=require('express');
const ProductoController=require('../controllers/producto.controller');
const router=express.Router();
// Obtener producto por número de serie
router.get('/serie/:numSerie', ProductoController.getProductoByNumSerie);

// Obtener producto por ID
router.get('/id/:id', ProductoController.getProductoById);

// Obtener todos los productos
router.get('/', ProductoController.getAllProductos);

// Crear un nuevo producto
router.post('/', ProductoController.createProducto);

module.exports = router;