import { useState } from "react";
import { uploadApi } from "../../services/api/upload";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onFileChange = (event) => {
    const selected = event.target.files?.[0];
    setError("");
    setUploadedUrl("");

    if (!selected) {
      setFile(null);
      setPreviewUrl("");
      return;
    }

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const onUpload = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const result = await uploadApi.uploadImage(file);
      setUploadedUrl(result.imageUrl);
    } catch (err) {
      setError(err?.response?.data?.message || "Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-[#e6d5b3] bg-white p-4 shadow-sm">
      <label className="mb-2 block text-sm font-semibold text-[#1f3550]">Upload Image</label>
      <input type="file" accept="image/*" onChange={onFileChange} className="block w-full text-sm" />

      <button
        type="button"
        onClick={onUpload}
        disabled={loading}
        className="mt-3 rounded-full bg-[#cb7413] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Uploading..." : "Upload to Cloudinary"}
      </button>

      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}

      {previewUrl ? (
        <div className="mt-4">
          <p className="mb-1 text-xs font-semibold text-[#596a78]">Local Preview</p>
          <img src={previewUrl} alt="Selected preview" className="h-40 w-full rounded-lg object-cover" />
        </div>
      ) : null}

      {uploadedUrl ? (
        <div className="mt-4">
          <p className="mb-1 text-xs font-semibold text-[#596a78]">Uploaded Image</p>
          <img src={uploadedUrl} alt="Uploaded from Cloudinary" className="h-40 w-full rounded-lg object-cover" />
          <p className="mt-2 break-all text-xs text-[#5b6874]">{uploadedUrl}</p>
        </div>
      ) : null}
    </div>
  );
}

