import productModel from "../models/productModel.js";
import apiResponce from "../utils/apiResponce.js";

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      imageUrl,
      stock,
      imagePublicId,
      originalName,
    } = req.body;

    if (!name || price === undefined || stock === undefined || !imageUrl) {
      return res
        .status(400)
        .json(apiResponce(false, 400, "Missing required fields", []));
    }

    const product = new productModel({
      name,
      price,
      description,
      imageUrl,
      stock,
      imagePublicId,
      originalName,
    });
    const newProduct = await product.save();
    return res
      .status(201)
      .json(apiResponce(true, 201, "Product created successfully", newProduct));
  } catch (error) {
    console.error("Error creating product:", error);
    return res
      .status(500)
      .json(apiResponce(false, 500, "Internal server error", []));
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    return res
      .status(200)
      .json(apiResponce(true, 200, "Products fetched successfully", products));
  } catch (error) {
    console.error("Error fetching products:", error);
    return res
      .status(500)
      .json(apiResponce(false, 500, "Internal server error", []));
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
      return res
        .status(404)
        .json(apiResponce(false, 404, "Product not found", []));
    }

    return res
      .status(200)
      .json(apiResponce(true, 200, "Product fetched successfully", product));
  } catch (error) {
    console.error("Error fetching product:", error);
    return res
      .status(500)
      .json(apiResponce(false, 500, "Internal server error", []));
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, imageUrl, stock } = req.body;

    const updateData = { name, price, description, stock, imageUrl };

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json(apiResponce(false, 404, "Product not found", []));
    }

    return res
      .status(200)
      .json(
        apiResponce(true, 200, "Product updated successfully", updatedProduct)
      );
  } catch (error) {
    console.error("Error updating product:", error);
    return res
      .status(500)
      .json(apiResponce(false, 500, "Internal server error", []));
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json(apiResponce(false, 404, "Product not found", []));
    }

    return res
      .status(200)
      .json(apiResponce(true, 200, "Product deleted successfully", []));
  } catch (error) {
    console.error("Error deleting product:", error);
    return res
      .status(500)
      .json(apiResponce(false, 500, "Internal server error", []));
  }
};

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
