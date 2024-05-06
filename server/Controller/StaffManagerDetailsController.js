import StaffManagerDetails from "../Models/StaffManagerDetails.js";

//Data Create
export const CreateDetails = async (req, res) => {
    const {name,email,gender,exprience,branch} = req.body;
  
    try{
      const newDetails = new StaffManagerDetails({
        name,email,gender,exprience,branch
      })
      await newDetails.save();
      res.status(201).json({ message: "Details created successfully", data: newDetails });

    }
   catch  (error){
    console.error("Error creating details:", error);
    res.status(500).json({ message: "Failed to create details" });
   }
   
  };

//Read details by ID
export const getAllDetails = async (req, res) => {
  try {
      const allDetails = await StaffManagerDetails.find();
      if (!allDetails || allDetails.length === 0) {
          return res.status(404).json({ message: "No details found" });
      }
      res.json({ message: "Details found", data: allDetails });
  } catch (error) {
      console.error("Error fetching details:", error);
      res.status(500).json({ message: "Failed to fetch details" });
  }
};




//Read details by ID
export const getOneDetails = async (req, res) => {
  try {
      const oneDetails = await StaffManagerDetails.findById(req.params.id);
      if (!oneDetails) {
          return res.status(404).json({ message: "No details found" });
      }
      res.json({ message: "Details found", data: oneDetails });
  } catch (error) {
      console.error("Error fetching details:", error);
      res.status(500).json({ message: "Failed to fetch details" });
  }
};


 
// Update details by ID
export const updateDetailsById = async (req, res) => {
  const { id } = req.params;
  const {name,email,gender,exprience,branch} = req.body;

  try {
      const updatedDetails = await StaffManagerDetails.findByIdAndUpdate(id, {
        name,email,gender,exprience,branch

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
export const deleteDetailsById = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedDetails = await StaffManagerDetails.findByIdAndDelete(id);
      if (!deletedDetails) {
          return res.status(404).json({ message: "Details not found" });
      }
      res.json({ message: "Details deleted successfully", data: deletedDetails });
  } catch (error) {
      console.error("Error deleting details:", error);
      res.status(500).json({ message: "Failed to delete details" });
  }
};

