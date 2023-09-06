import jobmodel from '../model/jobmodel.js'
// Create a Job API
export const addJob = async (req, res) => {
  try {
    const { title, description, company, location, id } = req.body;

    if (!company || !title || !id || !description|| !location) {
      return res.status(400).json({ success: false, message: 'Value is required' });
    }
    const job = new jobmodel({
      title,
      description,
      company,
      location,
      user: id,// Set the date field to the current date and time
    });
console.log(job)

    const savedJob = await job.save();
    res.status(201).json({ message: 'Job created successfully', job: savedJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

  
//get jobs by id it used to retieve alljobs posted by one farmer/...
export const getjobsbyuserid = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * pageSize;
    const searchQuery = req.query.search || '';
    const userId = req.query.id;

    const searchOptions = {
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { location: { $regex: searchQuery, $options: 'i' } },
        { company: { $regex: searchQuery, $options: 'i' } },
      ],
      user: userId,
    };

    const count = await jobmodel.countDocuments(searchOptions);
    
    const jobs = await jobmodel
      .find(searchOptions)
      .sort({ date: -1 }) // Sort by date field in descending order (-1)
      .skip(startIndex)
      .limit(pageSize);


    res.status(200).json({ message: 'Jobs retrieved successfully', jobs, count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while fetching the jobs." });
  }
};



//get all jobs
export const getjobs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * pageSize;
    const searchQuery = req.query.search || '';
   

    const searchOptions = {
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { location: { $regex: searchQuery, $options: 'i' } },
        { company: { $regex: searchQuery, $options: 'i' } },
      ],
     
    };

    const count = await jobmodel.countDocuments(searchOptions);
    
    const jobs = await jobmodel
      .find(searchOptions)
      .sort({ date: -1 }) // Sort by date field in descending order (-1)
      .skip(startIndex)
      .limit(pageSize);

 
   

    res.status(200).json({ message: 'Jobs retrieved successfully', jobs, count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while fetching the jobs." });
  }
  
};


/// Update Job API
export const updatejobs = async (req, res, next) => {
  const { title, description, company, location, id } = req.body;

  if (!company || !title || !id || !description|| !location) {
    return res.status(400).json({ success: false, message: 'Value is required' });
  }
  const {id:userId} = req.params;
console.log('hiiiiiiiiiiiiii')
  try {
   // Retrieve the user ID from req.user assumming you are using authenticate middleware

    const updatedData = {
      title,
      description,
      location,
      company,
      user: id, // Associate the job with the user
      date: new Date(), // Set the date field to the current date and time
    };


    const updatedJob = await jobmodel.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update job' });
  }
};



export const deletejobs = async (req, res, next) => {
  try {
  const { id: userId } = req.params;

  const job = await jobmodel.findOneAndRemove({ _id: userId });
  
  if (!job) {
    return res.status(404).json({
      success: false,
      message: `No job with id: ${userId} found.`,
    });
  }

  res.status(200).json({ success: true, message: "job deleted successfully." });
} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, message: "An error occurred while deleting the job." });
}
};


    
  
     