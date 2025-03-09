const userModel = require('../models/user');

exports.addAddress = async (req, res) => {
    try {
        console.log("Printing req body: ",req.body);
        const userId = req.body.id; // or req.id, depending on how you pass the user info
        const newAddress = req.body.address;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID missing",
            });
        }

        if (!newAddress) {
            return res.status(400).json({
                success: false,
                message: "Address is missing",
            });
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            {_id:userId},
            { $push: { address: newAddress } },
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
            message: "Address added successfully",
            updatedUser,
        });

    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while adding address",
        });
    }
};

exports.deleteAddress = async (req, res) => {
    try {
      const userId = req.body.id;
      const addressId = req.body.addressId;
  
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID missing",
        });
      }
  
      if (!addressId) {
        return res.status(400).json({
          success: false,
          message: "Address ID missing",
        });
      }
  
      // Pull address from address array where id matches
      const updatedUser = await userModel.findByIdAndUpdate(
        { _id: userId },
        { $pull: { address: { id: addressId } } }, // <-- This removes the address with id = addressId
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
        message: "Address deleted successfully",
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
  
