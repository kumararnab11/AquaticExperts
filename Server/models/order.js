const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId:{
        type:string,
        required:true,
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    items:{
        type:Array,//{product_id , price , quantity}
        default:[],
    },
    status: {
        type: String,
        enum: ['placed', 'shipped', 'delivered', 'cancelled'],
        default: 'placed',
    }
})

module.exports = mongoose.model("order", orderSchema);