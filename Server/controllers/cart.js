const userModel = require('../models/user')

exports.addItem = async (req,res)=>{
    const user = req.body.user;
    const item= req.body.item;

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User ID missing",
        });
    }
    if (!item) {
        return res.status(400).json({
            success: false,
            message: "Item missing",
        });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
        {_id:user},
        { $push: { cart: item } },
        { new: true } // returns the updated document
    );

    if (!updatedUser) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Item added successfully",
        updatedUser,
    });
}

exports.deleteItem = async (req, res) => {
    try {
      const user = req.body.user;
      const itemId = req.body.item._id;
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User ID missing",
        });
      }
  
      if (!itemId) {
        return res.status(400).json({
          success: false,
          message: "Item ID missing",
        });
      }
  
      // Pull address from address array where id matches
      const updatedUser = await userModel.findByIdAndUpdate(
        { _id: user },
        { $pull: { cart: { _id: itemId } } }, // <-- This removes the address with id = addressId
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Item deleted successfully",
        updatedUser,
      });
  
    } catch (error) {
      console.error("Error deleting address:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error while deleting address",
      });
    }
  };


  exports.updateItem = async (req, res) => {
    try {
      const user = req.body.user;
      const item = req.body.item;
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User ID missing",
        });
      }
  
      if (!item) {
        return res.status(400).json({
          success: false,
          message: "Item missing",
        });
      }
  
      // Pull address from address array where id matches
      const updatedUser = await userModel.findOneAndUpdate(
        { _id: user, "cart._id": item._id }, // Find the user with the matching cart item
        { $set: { "cart.$.quantity": item.quantity } }, // Increment the quantity of the matched cart item
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Item deleted successfully",
        updatedUser,
      });
  
    } catch (error) {
      console.error("Error deleting address:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error while deleting address",
      });
    }
  };