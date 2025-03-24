const ProductModel = require("../models/product");

exports.getProduct = async (req, res) => {
    try {
        const { productId } = req.params; // ✅ Extract productId from URL

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is missing",
            });
        }

        const fetchedProduct = await ProductModel.findById(productId);

        if (!fetchedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: fetchedProduct
        });
    } catch (error) {
        console.error("Error fetching Product:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching Product from DB",
        });
    }
};


exports.getAllProduct = async (req, res) => {
    try {
        const fetchedProduct = await ProductModel.find();

        if (!fetchedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: fetchedProduct
        });
    } catch (error) {
        console.error("Error fetching Product:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching Product from DB",
        });
    }
};


exports.getCategoryProduct = async (req, res) => {
    const subcat= req.body.subcat;
    const cat = req.body.category;

    console.log(req.body);

    if(subcat){
        try {
            const fetchedProduct = await ProductModel.find({subcategory:subcat}).lean();
    
            if (!fetchedProduct) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
    
            return res.status(200).json({
                success: true,
                data: fetchedProduct
            });
        } catch (error) {
            console.error("Error fetching Product:", error);
            return res.status(500).json({
                success: false,
                message: "Error fetching Product from DB",
            });
        }
    }

    else{
        try {
            const fetchedProduct = await ProductModel.find({category:cat}).lean();
    
            if (!fetchedProduct) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
    
            return res.status(200).json({
                success: true,
                data: fetchedProduct
            });
        } catch (error) {
            console.error("Error fetching Product:", error);
            return res.status(500).json({
                success: false,
                message: "Error fetching Product from DB",
            });
        }
    }
    
};