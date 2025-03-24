const productModel =require("../models/product")

exports.newProduct =async (req,res)=>{
    const product = req.body;

    if(!product){
        return res.status(401).json({
            success:'false',
            message:'product not found'
        })
    }

    try{
        const newProduct =await productModel.create(product);

        return res.status(200).json({
            success:'true',
            message:'new product in db',
            data:newProduct
        })
    }
    catch{
        return res.status(402).json({
            success:'false',
            message:'error in posting product in db'
        })
    }
}


exports.updateProduct= async (req,res)=>{
    const product = req.body;
    // console.log("product",product)

    if(!product){
        return res.status(401).json({
            success:'false',
            message:'product not found'
        })
    }

    try{
        const updatedProduct =await productModel.findByIdAndUpdate(product._id,{
            image:product.image,
            name:product.name,
            price:product.price,
            discount:product.discount,
            quantity:product.quantity,
            desc:product.desc,
            howToUse:product.howToUse,
            benefits:product.benefits,
            keyPoints:product.keyPoints,
            category:product.category,
            subcategory:product.subcategory
        });

        return res.status(200).json({
            success:'true',
            message:'product updated in db',
            data:updatedProduct
        })
    }
    catch{
        return res.status(402).json({
            success:'false',
            message:'error in updating product in db'
        })
    }
}