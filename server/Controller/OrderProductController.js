import OrderP from "../Models/OrderProductModel.js";  
//Data Create
export const CreateOrderProductDetails = async (req, res) => {
    const {name} = req.body;
    const {Phone} = req.body;
    const {Address} = req.body;
    const {Totalprice} = req.body;
    // const {Pname} = req.body;
    // const {weight} = req.body;
    // const {qty} = req.body;
    // const {price} = req.body;
    
  
    try{
      const NewOrder = new  OrderP({     // NewProduct=NewOrder  ProductP=OrderP
        name,Phone,Address,Totalprice
      })
      await NewOrder.save();
      res.status(201).json({ message: "create successfully", data: NewOrder});

    }
   catch  (error){
    console.error("Error creating details:", error);
    res.status(500).json({ message: "Failed to create" });
   }
   
  };

//Read details by ID
export const getOrderAllProductDetails = async (req, res) => {    
  try {
      const OrderDetails = await OrderP.find();       
      if (!OrderDetails || OrderDetails.length === 0) {
          return res.status(404).json({ message: "No details found" });
      }
      res.json({ message: "Details found", data: OrderDetails });
  } catch (error) {
      console.error("Error fetching details:", error);
      res.status(500).json({ message: "Failed to fetch details" });
  }
};




//Read details by ID
export const getOneOrderProductDetails   = async (req, res) => {   
  try {
      const OrderDetails = await OrderP.findById(req.params.id);
      if (!OrderDetails) {
          return res.status(404).json({ message: "No details found" });
      }
      res.json({ message: "Details found", data:OrderDetails});
  } catch (error) {
      console.error("Error fetching details:", error);
      res.status(500).json({ message: "Failed to fetch details" });
  }
};


 
// Update details by ID
export const  updateOrderProductDetailsById  = async (req, res) => {       
  const { id } = req.params;
  const {name} = req.body;
  const {Phone} = req.body;
  const {Address} = req.body;
  const {Totalprice} = req.body;
  // const {qty} = req.body;
  try {
      const updatedOrderDetails = await OrderP.findByIdAndUpdate(id, {    
        name,Phone,Address,Totalprice 
      }, { new: true });

      if (!updatedOrderDetails) {
          return res.status(404).json({ message: "Details not found" });
      }
      res.json({ message: "Details updated successfully", data:updatedOrderDetails });
  } catch (error) {
      console.error("Error updating details:", error);
      res.status(500).json({ message: "Failed to update details" });
  }
};

// Delete details by ID
export const deleteOrderProductDetailsById= async (req, res) => {  
  const { id } = req.params;

  try {
      const deletedOrderDetails = await OrderP.findByIdAndDelete(id);    
      if (!deletedOrderDetails) {
          return res.status(404).json({ message: "Details not found" });
      }
      res.json({ message: "Details deleted successfully", data: deletedOrderDetails });
  } catch (error) {
      console.error("Error deleting details:", error);
      res.status(500).json({ message: "Failed to delete details" });
  }
};


// name
//Address
//Phone
//Pname
// qty
// price
// Totalprice
