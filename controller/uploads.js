import multer from "multer";
import path from 'path';
// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
      // It specifies the location on the server's file system where the files will be saved.
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  });
  // Multer file filter configuration
// const fileFilter = (req, file, cb) => {
//   // Accept only specific file types (e.g., images)
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only image files are allowed.'), false);
//   }
// };

// Multer upload instance
// export  const  upload = multer({ storage: storage, fileFilter: fileFilter });
export  const  upload = multer({ storage: storage})
