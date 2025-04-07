const orderModel = require('../models/order')

exports.getOrderByUser = async (req,res)=>{
    const user=req.body.user;

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User ID missing",
        });
    }

    try {
        const orders = await orderModel.find({ userId: user });
        res.status(200).json({
            success:true,
            orders:orders
        });
    } catch (err) {
        res.status(500).json({success:false, error: 'Server error while fetching orders' });
    }
}


exports.getNewOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({ status: 'placed' });
        res.status(200).json({
            success:true,
            orders:orders
        });
    } catch (err) {
        res.status(500).json({success:false, error: 'Server error while fetching orders' });
    }
}

exports.getShippedOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({ status: 'shipped' });
        res.status(200).json({
            success:true,
            orders:orders
        });
    } catch (err) {
        res.status(500).json({success:false, error: 'Server error while fetching orders' });
    }
}

exports.changeOrderStatus = async (req, res) => {
    const id = req.body.id;
    const status = req.body.status;

    try {
        const updatedOrder = await orderModel.findOneAndUpdate(
            { _id: id },
            { status: status },
            { new: true } // returns the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated', order: updatedOrder });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update order status', details: err.message });
    }
};
