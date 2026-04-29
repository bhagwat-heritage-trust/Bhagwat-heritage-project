import type { Request, Response } from "express";
import cloudinary from "../config/cloudinary";

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).json({ message: "Image file is required." });
      return;
    }

    const base64 = file.buffer.toString("base64");
    const dataUri = `data:${file.mimetype};base64,${base64}`;

    // Using uploader.upload as requested.
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "bhagwat-heritage/uploads",
      resource_type: "image",
    });

    res.status(200).json({
      message: "Image uploaded successfully.",
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Image upload failed.";
    res.status(500).json({ message });
  }
};

