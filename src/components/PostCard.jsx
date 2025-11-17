import React, { useState } from 'react'
import {Link} from "react-router-dom"
import appwriteService from "../appwrite/config.js"
import parse from "html-react-parser"

function PostCard({
    $id, title, featuredImage, content   // in appwrite id is in $id variable 
}) {
  const [hasImage, setHasImage] = useState(Boolean(featuredImage))
  const [imageError, setImageError] = useState(false)
  
  // Check if it's a Cloudinary URL (starts with http) or Appwrite file ID
  const previewUrl = featuredImage 
    ? (featuredImage.startsWith("http") 
        ? featuredImage 
        : appwriteService.getFilePreview(featuredImage))
    : null

  // Truncate HTML content while preserving formatting
  const getContentPreview = (htmlContent) => {
    if (!htmlContent) return "";
    
    // Get plain text length for truncation
    const textContent = htmlContent.replace(/<[^>]*>/g, "").trim();
    const maxLength = 150;
    
    if (textContent.length <= maxLength) {
      return htmlContent;
    }
    
    // Find a good truncation point (try to break at word boundary)
    let truncateAt = maxLength;
    const lastSpace = htmlContent.lastIndexOf(' ', truncateAt);
    if (lastSpace > maxLength * 0.7) {
      truncateAt = lastSpace;
    }
    
    // Truncate HTML while trying to preserve tags
    let truncated = htmlContent.substring(0, truncateAt);
    
    // Close any open tags (simple approach - just add ellipsis)
    truncated += "...";
    
    return truncated;
  }
  return (
    <Link to={`/post/${$id}`}>
        <div
        className='group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-lg transition hover:-translate-y-1 hover:border-blue-400/60'
        >
            <div
            className='w-full justify-center mb-4 overflow-hidden rounded-2xl'
            >
                {previewUrl && hasImage && !imageError ? (
                  <img
                    src={previewUrl}
                    alt={title}
                    className='h-48 w-full object-cover transition duration-700 group-hover:scale-105'
                    onError={(e) => {
                      console.error("Image load error for:", featuredImage, "URL:", previewUrl);
                      setImageError(true);
                      setHasImage(false);
                    }}
                    onLoad={() => {
                      setImageError(false);
                    }}
                  />
                ) : (
                  <div className="h-48 w-full bg-gradient-to-br from-slate-800 to-slate-900 text-slate-500 flex items-center justify-center text-sm tracking-wide uppercase">
                    {imageError ? "Image unavailable" : "Image coming soon"}
                  </div>
                )}
            </div>
            <div className="space-y-2">
              <h2 className='text-xl font-semibold text-white line-clamp-2'>{title}</h2>
              {content && (
                <div className='text-sm text-slate-400 line-clamp-3 leading-relaxed prose prose-invert prose-sm prose-headings:text-slate-400 prose-p:text-slate-400 prose-strong:text-slate-300 prose-em:text-slate-300 prose-a:text-blue-400'>
                  {parse(getContentPreview(content))}
                </div>
              )}
            </div>
            
        </div>
    </Link>
  )
}

export default PostCard