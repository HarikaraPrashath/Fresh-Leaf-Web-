// import ProductP from "../Models/ProductModel.js";
import ProductP from "../Models/ProductModel.js";

//Data Create
export const CreateProductDetails = async (req, res) => {
    const {qty} = req.body;
  
    try{
      const NewProduct = new  ProductP({   
        qty   //alldeatils =deatils
      })
      await NewProduct.save();
      res.status(201).json({ message: "create successfully", data: NewProduct });

    }
   catch  (error){
    console.error("Error creating details:", error);
    res.status(500).json({ message: "Failed to create" });
   }
   
  };

//Read details by ID
export const getProductDetails = async (req, res) => {   
  try {
      const Details = await ProductP.find();     
      if (!Details || Details.length === 0) {
          return res.status(404).json({ message: "No details found" });
      }
      res.json({ message: "Details found", data: Details });
  } catch (error) {
      console.error("Error fetching details:", error);
      res.status(500).json({ message: "Failed to fetch details" });
  }
};




//Read details by ID
export const getOneProductDetails = async (req, res) => {    
  try {
      const Details = await ProductP.findById(req.params.id);
      if (!Details) {
          return res.status(404).json({ message: "No details found" });
      }
      res.json({ message: "Details found", data:Details });
  } catch (error) {
      console.error("Error fetching details:", error);
      res.status(500).json({ message: "Failed to fetch details" });
  }
};


 
// Update details by ID
export const updateProductDetailsById = async (req, res) => {    
  const { id } = req.params;
  const {qty} = req.body;

  try {
      const updatedDetails = await ProductP.findByIdAndUpdate(id, {
        qty
      }, { new: true });

      if (!updatedDetails) {
          return res.status(404).json({ message: "Details not found" });
      }
      res.json({ message: "Details updated successfully", data: updatedDetails });
  } catch (error) {
      console.error("Error updating details:", error);
      res.status(500).json({ message: "Failed to update details" });
  }
};

// Delete details by ID
export const deleteProductDetailsById = async (req, res) => {  
  const { id } = req.params;

  try {
      const deletedDetails = await ProductP.findByIdAndDelete(id);
      if (!deletedDetails) {
          return res.status(404).json({ message: "Details not found" });
      }
      res.json({ message: "Details deleted successfully", data: deletedDetails });
  } catch (error) {
      console.error("Error deleting details:", error);
      res.status(500).json({ message: "Failed to delete details" });
  }
};



