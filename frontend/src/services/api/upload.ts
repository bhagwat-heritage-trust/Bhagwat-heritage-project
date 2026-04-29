import { apiClient } from "./client";

export const uploadApi = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await apiClient.post<{
      message: string;
      imageUrl: string;
      publicId: string;
    }>("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },
};

