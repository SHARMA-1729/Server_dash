import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error('Local file path is missing');
        }

        console.log('Uploading file:', localFilePath);
        
   
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto', 
            secure: true  
        });

        if (!response || !response.secure_url) {
            throw new Error('Failed to upload file to Cloudinary');
        }

        console.log('File uploaded successfully:', response.secure_url);
       
        try {
            fs.unlinkSync(localFilePath);
        } catch (unlinkError) {
            console.error('Error removing local file:', unlinkError.message);
        }

        return response;
    } catch (error) {
        console.error('Cloudinary upload error:', error.message);
       
        try {
            fs.unlinkSync(localFilePath);
        } catch (unlinkError) {
            console.error('Error removing local file after failed upload:', unlinkError.message);
        }

        return null;
    }
};

export { uploadOnCloudinary };
