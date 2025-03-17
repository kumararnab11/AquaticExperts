const productModel =require("../models/product")

exports.newProduct = (req,res)=>{
    console.log("came");
    const product = req.body;

    if(!product){
        return res.status(401).json({
            success:'false',
            message:'product not found'
        })
    }

    console.log("pro",product);

    try{
        const newProduct = productModel.create(product);

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


exports.updateProduct=(req,res)=>{
    const product = req.body;

    if(!product){
        return res.status(401).json({
            success:'false',
            message:'product not found'
        })
    }

    try{
        const updatedProduct = productModel.findByIdAndUpdate(product.id,{
            image:product.image,
            name:product.name,
            price:product.price,
            discount:product.discount,
            quantity:product.quantity,
            desc:product.desc,
            howToUse:product.howToUse,
            benifits:product.benifits,
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