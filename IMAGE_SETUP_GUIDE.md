# Image Setup Guide for Wordsworth Language Centre

## Teacher Images

### Required Images:
Place the following teacher images in the `public/assets/images/teachers/` folder:

1. **sarah-johnson.jpg** - Dr. Sarah Johnson (Senior IELTS Instructor)
2. **ahmad-rashid.jpg** - Mr. Ahmad Rashid (Business English Specialist)
3. **li-wei.jpg** - Ms. Li Wei (Conversation & Fluency Coach)
4. **david-thompson.jpg** - Mr. David Thompson (Grammar & Writing Expert)

### Image Requirements:
- **Format**: JPG or PNG
- **Recommended Size**: 800x800px (square/portrait)
- **Aspect Ratio**: 1:1 or 3:4 (portrait)
- **File Size**: Under 500KB each (optimized for web)
- **Quality**: High resolution, professional photos

### Folder Structure:
```
public/
├── assets/
│   ├── images/
│   │   └── teachers/
│   │       ├── sarah-johnson.jpg
│   │       ├── ahmad-rashid.jpg
│   │       ├── li-wei.jpg
│   │       └── david-thompson.jpg
│   └── videos/
│       └── intro.mp4
```

---

## Video Setup

### Introduction Video:
Place your introduction video at: `public/assets/videos/intro.mp4`

### Video Requirements:
- **Format**: MP4 (H.264 codec recommended)
- **Recommended Size**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Aspect Ratio**: 16:9
- **Duration**: 1-3 minutes recommended
- **File Size**: Under 50MB (for faster loading)

---

## Fallback Images

### Current Implementation:
The website includes automatic fallback images using UI Avatars service:
- If a teacher image fails to load, it automatically generates a colored avatar with the teacher's initials
- Example: "Dr. Sarah Johnson" → Blue avatar with "SJ"

This ensures the website always looks professional even if image files are missing.

---

## How to Add Images:

### Option 1: Manual Upload
1. Create the folder structure: `public/assets/images/teachers/`
2. Copy your teacher images into this folder
3. Rename them to match the exact names listed above
4. Refresh the website

### Option 2: Update Image Paths in Code
If your images have different names or locations, update the paths in:
- File: `/src/app/pages/HomePage.tsx`
- Look for the `teachers` array (around line 140)
- Update the `photo` property for each teacher

Example:
```typescript
{
  id: 1,
  name: 'Dr. Sarah Johnson',
  photo: '/assets/images/teachers/your-custom-name.jpg', // Update this
  ...
}
```

---

## Tips for Best Results:

### Photography:
- Use professional headshots or portraits
- Good lighting and neutral backgrounds work best
- Teachers should be looking at the camera
- Smiling, approachable expressions

### Image Editing:
- Crop to center the face
- Ensure consistent lighting across all images
- Consider using the same background or style for all teachers
- Remove any distracting elements

### Optimization:
Use tools like:
- **TinyPNG** (tinypng.com) - Free image compression
- **Squoosh** (squoosh.app) - Google's image optimizer
- **ImageOptim** (Mac) or **FileOptimizer** (Windows)

Compress images before uploading to improve page load speed!

---

## Testing:

After adding images:
1. Refresh the homepage
2. Check the "Meet Our Expert Teachers" section
3. Click each teacher card to verify the modal shows the correct image
4. Test on mobile to ensure images look good on smaller screens

---

## Need Help?

If images aren't showing:
1. Check the browser console (F12) for errors
2. Verify file names match exactly (case-sensitive)
3. Ensure images are in the correct folder
4. Clear browser cache and refresh

The fallback system will display avatar placeholders until real images are added!
