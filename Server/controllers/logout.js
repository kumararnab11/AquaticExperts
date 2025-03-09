exports.logout = (req, res) => {
    try {
      res.clearCookie('token_cookie', {
        httpOnly: true,
        secure: true,       
        sameSite: 'None'  
      });
  
      return res.status(200).json({
        success: true,
        message: "Logged out successfully"
      });
    } catch (error) {
      console.error("Error during logout:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error during logout"
      });
    }
  };
  