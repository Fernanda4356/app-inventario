const  ProductoRepository=require ('../repositories/producto.repository');
const Validaciones = require('../utils/validation');
const Utils = require('../utils/utils');
class ProductoService {
    async getAllProductos() {
        return await ProductoRepository.getAllProductos();
    }

    async getProductoById(id) {
        const producto = await ProductoRepository.getProductoById(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
        return producto;
    }

    async getProductoByNumSerie(numSerie) {
        const producto = await ProductoRepository.getProductoByNumSerie(numSerie);
        if (!producto) {
            throw new Error('Producto no encontrado con el número de serie proporcionado');
        }
        return producto;
    }

    async createProducto(producto) {
        if (!producto.nombre || !producto.precio || !producto.fechaAdquisicion || !producto.numSerie) {
            throw new Error('Todos los campos son requeridos');
        }
        // Validar que el número de serie no exista
        const productoByNumSerie = await ProductoRepository.getProductoByNumSerie(producto.numSerie);
        if (productoByNumSerie) {
            throw new Error('El número de serie ya existe');
        }
        // Validar que el precio no sea negativo
        if (producto.precio < 1) {
            throw new Error('El precio no puede ser negativo');
        }
        // Validar que la fecha de adquisición tenga el formato correcto
        if (!Validaciones.esFechaValida(producto.fechaAdquisicion)) {
            throw new Error('La fecha de adquisición no tiene el formato correcto');
        }
        // Generar número de inventario (ejemplo: 2025-001)
        const yearAdquisicion = producto.fechaAdquisicion.split('-')[0];
        let countYear = await ProductoRepository.contarProductosByYear(yearAdquisicion);
        countYear++;
        producto.numInventario = `${yearAdquisicion}-${countYear.toString().padStart(3, '0')}`;
        return await ProductoRepository.createProducto(producto);
    }
}

module.exports = new ProductoService();
