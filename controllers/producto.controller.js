const ProductoService = require('../services/porducto.services');

class ProductoController{
    async getProductoById(req, res) {
        try {
            const { id } = req.params;
            const producto = await ProductoService.getProductoById(id);
            res.json(producto);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async getProductoByNumSerie(req, res) {
        try {
            const { numSerie } = req.params;
            const producto = await ProductoService.getProductoByNumSerie(numSerie);
            res.json(producto);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    async getAllProductos(req,res){
    try{
        const productos=await ProductoService.getAllProductos();
        res.json(productos);
    }catch(error){
        res.status(400).json({message:error.message});
    }
    }

    async createProducto(req,res){
        try{
            const producto=req.body;
            const createdProducto=await ProductoService.createProducto(producto);
            res.status(201).json(createdProducto);
        }catch(error){
            res.status(400).json({message:error.message});
        }
    }
}
module.exports=new ProductoController();