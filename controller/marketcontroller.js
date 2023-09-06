import cropmodel from "../model/cropmodel.js";
import Crop from "../model/cropmodel.js"
import marketmodel from "../model/marketmodel.js";
import xlsx from 'xlsx';
//ልክ እንደ ነውስ የለቀቀው ሰውየ user አልገባም ካስፈልገ ማስገባት ይችሃላል
// Create a new crop
export const addcrops=async(req,res,next)=>{
  const workbook = xlsx.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);
  data.forEach((row) => {
    const crop = new marketmodel({
      name: row.name,
      price: row.price,
   
    });
    crop.save()
      .then(() => {
        console.log('Crop saved successfully');
      })
      .catch((err) => {
        console.error(err);
      });
  });
  

  
  res.send('Data uploaded successfully.');
};




  // cropmodel.findOne({ name })
  //   .then((existingCrop) => {
  //     if (existingCrop) {
  //       // Crop already exists, reuse the existing crop ID
  //       const newMarketData = new marketmodel({
  //         crop: existingCrop._id,
  //         date: new Date(),
  //         price: price, // Replace with the actual price
  //       });

  //       newMarketData.save()
  //         .then(() => {
  //           console.log('Market data saved successfully');
  //           res.sendStatus(200);
  //         })
  //         .catch((error) => {
  //           console.error('Error saving market data:', error);
  //           res.sendStatus(500);
  //         });
  //     } else {
  //       // Crop does not exist, create a new crop entry
  //       const newCrop = new cropmodel({
  //         name,
  //       });

  //       newCrop.save()
  //         .then((crop) => {
  //           const newMarketData = new marketmodel({
  //             crop: crop._id,
  //             date: new Date().toLocaleDateString(),
  //             price: 10.5, // Replace with the actual price
  //           });

  //           newMarketData.save()
  //             .then(() => {
  //               console.log('Market data saved successfully');
  //               res.sendStatus(200);
  //             })
  //             .catch((error) => {
  //               console.error('Error saving market data:', error);
  //               res.sendStatus(500);
  //             });
  //         })
  //         .catch((error) => {
  //           console.error('Error saving crop:', error);
  //           res.sendStatus(500);
  //         });
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('Error finding crop:', error);
  //     res.sendStatus(500);
  //   });




// Retrieve crop data for a specific crop name within a one-month period
///crop-data/:cropName'
export const getcrops=async(req,res,next)=>{
    const {id:filter } = req.params;
 console.log(`wwwwwwwwwwwwwwwwwwww${filter}`)
    // Calculate the start and end dates
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    marketmodel.find({
          name: filter,
          // date: { $gte: startDate, $lte: endDate },
        })
          .then((cropData) => {
            console.log(cropData)
            res.json(cropData);
          })
          .catch((error) => {
            console.log("n")
            console.error('Error retrieving crop data:', error);
            res.status(500).json({ error: 'Failed to retrieve crop data' });
          });



}
  
  //   Crop.findOne({ name: cropName })
  //     .then((crop) => {
  //       if (!crop) {
  //           console.log("m")
  //         res.status(404).json({ error: 'Crop not found' });
  //         return;
  //       }
  
  //       marketmodel.find({
  //         crop: crop._id,
  //         date: { $gte: startDate, $lte: endDate },
  //       })
  //         .then((cropData) => {
  // 

  //delete all crop by crop name
  // Delete crop data by crop name
export const deleteCrop = async (req, res) => {
  const { cropName } = req.params;

  try {
    const crop = await cropmodel.findOne({ name: cropName });
    if (!crop) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    await marketmodel.deleteMany({ crop: crop._id });

    res.status(200).json({ message: 'Crop data deleted successfully' });
  } catch (error) {
    console.error('Error deleting crop data:', error);
    res.status(500).json({ error: 'Failed to delete crop data' });
  }
};


// Update market data by ID list of user retrieve adrgo then medelet
export const updateMarketData = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  try {
    const marketData = await marketmodel.findById(id);
    if (!marketData) {
      return res.status(404).json({ error: 'Market data not found' });
    }

    marketData.price = price;
    await marketData.save();

    res.status(200).json({ message: 'Market data updated successfully', marketData });
  } catch (error) {
    console.error('Error updating market data:', error);
    res.status(500).json({ error: 'Failed to update market data' });
  }
};

// Delete market data by ID like list of user retrieve adrgo then medelet
export const deleteMarketData = async (req, res) => {
  const { id } = req.params;

  try {
    const marketData = await marketmodel.findByIdAndDelete(id);
    if (!marketData) {
      return res.status(404).json({ error: 'Market data not found' });
    }

    res.status(200).json({ message: 'Market data deleted successfully' });
  } catch (error) {
    console.error('Error deleting market data:', error);
    res.status(500).json({ error: 'Failed to delete market data' });
  }
};
