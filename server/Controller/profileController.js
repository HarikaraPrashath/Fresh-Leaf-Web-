import supplierProfile from '../Models/profileModel.js';

// Data Create
export const createProfile = async (req, res) => {
    const { Id, Name, Email_address, Contact_No, NIC_number } = req.body;
    
    try {
        // Validate input fields
        const validationResult = await supplierProfile.validate({ Id, Name, Email_address, Contact_No, NIC_number });
        if (validationResult.error) {
            return res.status(400).json({ message: validationResult.error.details[0].message });
        }

        const newDetails = new supplierProfile({
            Id, Name, Email_address, Contact_No, NIC_number
        });
        await newDetails.save();
        res.status(201).json({ message: "Profile details created successfully", data: newDetails });
    } catch (error) {
        console.error("Error creating profile:", error);
        res.status(500).json({ message: "Failed to create profile details" });
    }
};

// Data read
export const getAllProfileDetails = async (req, res) => {
    try {
        const allDetails = await supplierProfile.find();
        if (!allDetails || allDetails.length === 0) {
            return res.status(404).json({ message: "No details found" });
        }
        res.json({ message: "Details found", data: allDetails });
    } catch (error) {
        console.error("Error fetching details:", error);
        res.status(500).json({ message: "Failed to fetch details" });
        }
    };

    //Read details by id
export const getOneProfileDetail = async (req, res) => {
    try {
        const oneDetails = await supplierProfile.findById(req.params.id);
        if (!oneDetails) {
            return res.status(404).json({ message: "No details found" });
        }
        res.json({ message: "Details found", data: oneDetails });
    } catch (error) {
        console.error("Error fetching details:", error);
        res.status(500).json({ message: "Failed to fetch details" });
        }
    };


    
// Update details by ID
export const updateProfileDetailsById = async (req, res) => {
    const { id } = req.params;
    const {Id, Name, Email_address, Contact_No, NIC_number} = req.body;

    try {
        const updatedDetails = await supplierProfile.findByIdAndUpdate(id, {
            Id, Name, Email_address, Contact_No, NIC_number
        }, { new: true });

        if (!updatedDetails) {
            return res.status(404).json({ message: "Details not found" });
        }
        res.json({ message: "Details updated successfully", data: updatedDetails });
    } catch (error) {
        console.error("Error updating details:", error);
        res.status(500).json({ message: "Failed to update details" });
}
};

// Delete details by ID
export const deleteProfileDetailsById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedDetails = await supplierProfile.findByIdAndDelete(id);
        if (!deletedDetails) {
            return res.status(404).json({ message: "Details not found" });
        }
        res.json({ message: "Details deleted successfully", data: deletedDetails });
    } catch (error) {
        console.error("Error deleting details:", error);
        res.status(500).json({ message: "Failed to delete details" });
        }
    };
