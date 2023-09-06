import fs from 'fs';
import newsmodel from '../model/newsmodel.js';

// Add a new News record:
export const addnews = async (req, res, next) => {
  console.log(req.body)
  const { category, title,id, description } = req.body;
  // Assuming your authentication middleware attaches the user ID to req.user._id
  if (!category || !title || !id || !description) {
    return res.status(400).json({ success: false, message: 'Value is required' });
  }
  if(!req.file){
    return res.status(400).json({ success: false, message: 'image is required' });

  }
  

  try {
    const news = new newsmodel({
      category,
      title,
      description,
      image: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: req.file.mimetype,
      },
      user: id, // Add the user ID to the news article
    });

    const savedNews = await news.save();
    res.status(201).json({ message: 'News created successfully', news: savedNews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
    // Call the error handling middleware
    next(err);
  }
};

// Retrieve all News records:
export const getnews = async (req, res, next) => {
  try {
   
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * pageSize;
  //const endIndex = startIndex + pageSize;
  const search = req.query.search || "";
  const filter = req.query.filter || ""; // by category
  
  const searchOptions = {
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
    ],
  
  };
  
  if (filter) {
    searchOptions.category = filter;
  }
  
const count = await newsmodel.countDocuments(searchOptions);
const newfeed = await newsmodel.find(searchOptions)
.sort({ date: -1 }) // Sort by date field in descending order (-1)
.skip(startIndex)
.limit(pageSize)
.exec();
const NData = newfeed.map((farmer) => {
  return {
    _id: farmer._id,
    title: farmer.title,
    category: farmer.category,
    description: farmer.description,
    date:farmer.date,
    image: {
      contentType: farmer.image.contentType,
      data: farmer.image.data.toString('base64'),
      
    },
  };
});
    res.status(200).json({ message: 'News retrieved successfully', data: NData, count});
    console.log(NData)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
    // Call the error handling middleware
    next(err);
  }

   
}; 

// Retrieve News records by user ID:
export const getnewsbyuserid = async (req, res, next) => {
  try {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * pageSize;
  //const endIndex = startIndex + pageSize;
  const search = req.query.search || "";
  const filter = req.query.filter || ""; // by category
  const userId = req.query.id;// Assuming your authentication middleware attaches the user ID to req.user._id
  

  const searchOptions = {
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
    ],
    user: userId,
  };
  
  if (filter) {
    searchOptions.category = filter;
  }
  
const count = await newsmodel.countDocuments(searchOptions);
const newfeed = await newsmodel.find(searchOptions)
.sort({ date: -1 }) // Sort by date field in descending order (-1)
.skip(startIndex)
.limit(pageSize)
.exec();
const NData = newfeed.map((farmer) => {
  return {
    _id: farmer._id,
    title: farmer.title,
    category: farmer.category,
    description: farmer.description,
    date:farmer.date,
    image: {
      contentType: farmer.image.contentType,
      data: farmer.image.data.toString('base64'),
      
    },
  };
});


    res.status(200).json({ message: 'News retrieved successfully', data: NData, count});
    console.log(NData)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
    // Call the error handling middleware
    next(err);
  }
};

// Update a News record by ID:
export const updatenews = async (req, res) => {
    console.log(req.body)
  const { category, title,id, description } = req.body;
  // Assuming your authentication middleware attaches the user ID to req.user._id
  if (!category || !title || !id || !description) {
    return res.status(400).json({ success: false, message: 'Value is required' });
  }
  if(!req.file){
    return res.status(400).json({ success: false, message: 'image is required' });

  }
 
  const { id:userId } = req.params;
 
  try {
    const updatedNews = await newsmodel.findByIdAndUpdate(
      userId,
      {
        category,
        title,
        description,
        image: {
          data: fs.readFileSync("uploads/" + req.file.filename),
          contentType: req.file.mimetype,
        },
        user: id, // Add the user ID to the news article
      },
      { new: true }
    );
    if (!updatedNews) {
      return res.status(404).json({ message: 'Cant update' });
    }
    res.status(200).json({ message: 'News updated successfully', news: updatedNews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete News record by ID:
export const deletenews = async (req, res) => {
  const { id } = req.params;
console.log(id)
  try {
    const deletedNews = await newsmodel.findByIdAndDelete({ _id: id });
    if (!deletedNews) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json({ message: 'News deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
