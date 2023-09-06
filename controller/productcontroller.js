import productmodel from '../model/productmodel.js'
import fs from 'fs'
// Create a Job API
export const addproduct = async (req, res) => {
  try {
    const { name, description, price, id,quantity, phone } = req.body; // Retrieve the user ID from req.user
     // Assuming you are using an authentication middleware or 
    //function that populates the req.user object with the authenticated user's information, 
    //you can access the user's ID through req.user._id. you can pass these middleware in route folder
    if (!name || !description || !id || !price||!quantity||!phone) {
      return res.status(400).json({ success: false, message: 'Value is required' });
    }
    if (req.file){

      const product = new productmodel({
        name,
        description,
        quantity,
        price,
        description,
        phone,
        user: id,
        image: {
          data: await fs.promises.readFile("uploads/" + req.file.filename), // Read image file asynchronously
          contentType: req.file.mimetype,
        },
        // Set the date field to the current date and time
      });

    const savedproduct = await product.save();
    res.status(201).json({ message: ' created successfully', product: savedproduct});
    }
    else{
      return res.status(400).json({ success: false, message: 'image is required' });
  
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create ' });
  }
};
  
//get jobs by id it used to retieve alljobs posted by one farmer/...
export const getproductbyuserid = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * pageSize;
    //const endIndex = startIndex + pageSize;
    const searchQuery = req.query.search || '';
    const userId = req.query.id;

     // Assuming you are using an authentication middleware or 
    //function that populates the req.user object with the authenticated user's information, 
    //you can access the user's ID through req.user._id. you can pass these middleware in route folder
    const searchOptions = {
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        
        
      ],
      user: userId,
    };

    const count = await productmodel.countDocuments(searchOptions);

    const products = await productmodel.find(searchOptions)
    .sort({ date: -1 }) // Sort by date field in descending order (-1)
    .skip(startIndex)
    .limit(pageSize)
    .exec();
    const profileData = products.map((farmer) => {
      return {
        _id: farmer._id,
        name: farmer.name,
        phone: farmer.phone,
        quantity: farmer.quantity,
        price: farmer.price,
        description: farmer.description,
        image: {
          contentType: farmer.image.contentType,
        
          data: farmer.image.data.toString('base64'),
          
        },
      };
    });

    res.status(200).json({ 
         data: profileData,
          count,
          message: "List of farmers",});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve ' });
  }
};


//get all product
export const getproduct = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * pageSize;
    //const endIndex = startIndex + pageSize;
    const searchQuery = req.query.search || '';
   

     // Assuming you are using an authentication middleware or 
    //function that populates the req.user object with the authenticated user's information, 
    //you can access the user's ID through req.user._id. you can pass these middleware in route folder
    const searchOptions = {
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        
      ],
      
    };

    const count = await productmodel.countDocuments(searchOptions);

    const products = await productmodel.find(searchOptions)
    .sort({ date: -1 }) // Sort by date field in descending order (-1)
    .skip(startIndex)
    .limit(pageSize)
    .exec();
    const profileData = products.map((farmer) => {
      return {
        _id: farmer._id,
        name: farmer.name,
        phone: farmer.phone,
        quantity: farmer.quantity,
        price: farmer.price,
        date:farmer.date,
        description: farmer.description,
        image: {
          contentType: farmer.image.contentType,
        
          data: farmer.image.data.toString('base64'),
          
        },
      };
    });

    res.status(200).json({ 
         data: profileData,
          count,
          message: "List of farmers",});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve ' });
  }
};


/// Update product API
export const updateproduct = async (req, res, next) => {
  const { name, description, price, id,quantity, phone } = req.body; // Retrieve the user ID from req.user

 if (!name || !description || !id || !price||!quantity||!phone) {
   return res.status(400).json({ success: false, message: 'Value is required' });
 }
 if (!req.file){return res.status(400).json({ success: false, message: 'image is required' });
 }
 const { id:userId } = req.params;

  try {
  //  const userId = req.user._id; // Retrieve the user ID from req.user assumming you are using authenticate middleware

    const updatedData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        phone: req.body.phone,
        user: id, // Associate the job with the user
        date: new Date(), // Set the date field to the current date and time
        image: {
          data: await fs.promises.readFile("uploads/" + req.file.filename), // Read image file asynchronously
          contentType: req.file.mimetype,
        },
    }

    const updatedproduct = await productmodel.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!updatedproduct) {
      return res.status(404).json({ error: 'product not found with this id' });
    }

    res.status(200).json({ message: 'product updated successfully', product: updatedproduct});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};



export const deleteproduct = async (req, res, next) => {
  try {
  const { id: userId } = req.params;
  const product = await productmodel.findOneAndRemove({ _id: userId });
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: `No product with id: ${userId} found.`,
    });
  }

  res.status(200).json({ success: true, message: "product deleted successfully." });
} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, message: "An error occurred while deleting the product." });
}
};


    
  
     