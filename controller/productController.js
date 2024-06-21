const Product = require('../models/Product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

exports.getAllProducts = async (req, res) => {
    const products = await Product.findAll();
    res.status(200).json({
        success: true,
        products
    });
};

exports.updateProduct = catchAsyncErrors(async (req, res) => {
    let product = await Product.findByPk(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
    product = await product.update(req.body);
    res.status(200).json({ success: true, product });
});

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        product
    });
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    await product.destroy();
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});
