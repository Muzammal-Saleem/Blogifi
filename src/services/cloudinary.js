import conf from "../conf/conf";

export async function uploadImageToCloudinary(file) {
  if (!conf.cloudinaryCloudName || !conf.cloudinaryUploadPreset) {
    throw new Error("Cloudinary configuration is missing. Please set the env vars.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", conf.cloudinaryUploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${conf.cloudinaryCloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Image upload failed");
  }

  return data.secure_url;
}

