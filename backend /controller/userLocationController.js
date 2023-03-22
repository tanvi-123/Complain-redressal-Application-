const userlocation=require("../Model/userLocations")
exports.getuserLocation = async (req, res) => {
    try {
        const userLocations = await userlocation.find();
        res.json(userLocations)
    } catch (error) {
        res.json({ message: error })
    }
   
}