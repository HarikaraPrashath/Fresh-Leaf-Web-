import paymentDetails from '../Models/paymentModel.js';

export const createPaymentDetails = async (req, res) => {
    try {
        const payment = await paymentDetails.create(req.body);
        res.status(201).json(payment);
    } catch (error) {
        if (error.name === 'ValidationError') {
        // Extract validation error messages
        const validationErrors = Object.values(error.errors).map((error) => error.message);
        return res.status(400).json({ errors: validationErrors });
        }
        res.status(500).json({ error: error.message });
    }
    };


//Read details by id
export const getPaymentDetails = async (req, res) => {
    try {
        const oneDetails = await paymentDetails.findById(req.params.id);
        if (!oneDetails) {
            return res.status(404).json({ message: "No details found" });
        }
        res.json({ message: "Details found", data: oneDetails });
    } catch (error) {
        console.error("Error fetching details:", error);
        res.status(500).json({ message: "Failed to fetch details" });
        }
    };

//Read details by id
export const getAllPaymentDetails = async (req, res) => {
    try {
        const allDetails = await paymentDetails.find();
        if (!allDetails || allDetails.length === 0) {
            return res.status(404).json({ message: "No details found" });
        }
        res.json({ message: "Details found", data: allDetails });
    } catch (error) {
        console.error("Error fetching details:", error);
        res.status(500).json({ message: "Failed to fetch details" });
        }
    };

    export const deletePaymentDetailsById = async (req, res) => {
        const { id } = req.params;
    
        try {
            const deletedDetails = await paymentDetails.findByIdAndDelete(id);
            if (!deletedDetails) {
                return res.status(404).json({ message: "Details not found" });
            }
            res.json({ message: "Details deleted successfully", data: deletedDetails });
        } catch (error) {
            console.error("Error deleting details:", error);
            res.status(500).json({ message: "Failed to delete details" });
            }
        };

   export const updatePaymentDetailsById = async (req, res) => {
    const { id } = req.params;
    const { Card_Holder_Name,Name_of_Bank,Card_Number,cvc,Expiry_Month,Expiry_Year,Branch} = req.body;

    try {
        const updatedDetails = await paymentDetails.findByIdAndUpdate(id, {
            Card_Holder_Name,Name_of_Bank,Card_Number,cvc,Expiry_Month,Expiry_Year,Branch
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
