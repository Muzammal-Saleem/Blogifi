import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Select, Input, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { uploadImageToCloudinary } from "../../services/cloudinary";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const [formError, setFormError] = useState("");
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setFormError("");
    const currentSlug = data.slug?.trim();
    if (post) {
      let featuredImageUrl = post.featuredImage;
      const newImageFile = data.image?.[0];
      if (newImageFile) {
        try {
          const uploadedUrl = await uploadImageToCloudinary(newImageFile);
          if (uploadedUrl && uploadedUrl.startsWith("http")) {
            featuredImageUrl = uploadedUrl;
          } else {
            setFormError("Image upload failed. Please check your Cloudinary configuration.");
            return;
          }
        } catch (error) {
          console.error("Cloudinary upload error:", error);
          setFormError(error.message || "Failed to upload image. Please check your Cloudinary setup.");
          return;
        }
      }
      delete data.image;
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: featuredImageUrl,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      if (!currentSlug) {
        setFormError("Slug is required.");
        return;
      }

      const existingPost = await appwriteService.getPost(currentSlug);
      if (existingPost) {
        setFormError("That slug already exists. Try something unique.");
        return;
      }

      const imageFile = data.image?.[0];
      if (!imageFile) {
        setFormError("Please upload a featured image.");
        return;
      }

      try {
        const imageUrl = await uploadImageToCloudinary(imageFile);
        if (!imageUrl || !imageUrl.startsWith("http")) {
          setFormError("Image upload failed. Please check your Cloudinary configuration.");
          return;
        }
        delete data.image;
        data.featuredImage = imageUrl;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        } else {
          setFormError("Could not save your post. Please try again.");
        }
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        setFormError(error.message || "Failed to upload image. Please check your Cloudinary setup.");
      }
    }
  };

  const slugTransormation = useCallback(
    (value) => {
      if (value && typeof value === "string") {
        const slug = value
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-") // non-alphanumeric → hyphen
          .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
        return slug;
      }
      return "";
    },
    []
  );
  //  const slugTransform = useCallback((value) => {
  //       if(value && typeof value === "string") return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-')
  //       .replace(/\s/g, "-")
  //   }, [])

  React.useEffect(() => {
    watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransormation(value.title), {
          shouldValidate: true,
        });
      }
    });
  }, [watch, slugTransormation, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-10 lg:flex-row">
      {formError && (
        <div className="w-full rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">
          {formError}
        </div>
      )}
      <div className="flex-1 space-y-4">
        <Input
          label="Title"
          placeholder="Title"
          {...register("title", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransormation(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          {...register("slug", { required: true })}
        />
        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full space-y-4 lg:w-1/3">
        <Input
          label="Featured Image"
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          {...register("image", { required: !post })}
        />
        {post?.featuredImage && (
          <div className="w-full">
            <img
              src={
                post.featuredImage?.startsWith("http")
                  ? post.featuredImage
                  : appwriteService.getFilePreview(post.featuredImage)
              }
              alt={post.title}
              className="rounded-2xl border border-white/10"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-emerald-500 text-white hover:bg-emerald-400" : undefined}
          className="w-full justify-center"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
