  // import multer from "multer";
  // import { v2 as Cloudinary } from "multer-storage-cloudinary";

  // Cloudinary.config({
  //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  //   api_key: process.env.CLOUDINARY_API_KEY,
  //   api_secret: process.env.CLOUDINARY_API_SECRET,
  // });

  // const storage = new Cloudinary.storage({
  //   Cloudinary,
  //   params: {
  //     folder: "HireHunt",
  //     format: async (req, file) => "png",
  //     public_id: (req, file) =>
  //       file.fieldname + "-" + Math.random() + "-" + Date.now(),
  //   },
  // });

  // const upload = multer({
  //   storage: storage,
  //   limits: { fileSize: 5 * 1024 * 1024 },
  // });

  // export default upload;

  import { v2 as cloudinary } from "cloudinary";
  import { CloudinaryStorage } from "multer-storage-cloudinary";
  import multer from "multer";



  // Cloudinary config
  cloudinary.config({
    cloud_name: "dkbzki9l1",
    api_key: "697332489539515",
    api_secret: "mdpOC5othaknh4ewVrMq38vyWtg",
  });

  // Set up Cloudinary storage
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "HireHunt",
      format: async (req, file) => "png", // optional, automatically detects by default
      public_id: (req, file) =>
        file.fieldname +
        "-" +
        Math.random() +  "-" +      Date.now(),
    },
  });

  // Set up multer
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  });

  console.log("upload controller");
  export default upload;
