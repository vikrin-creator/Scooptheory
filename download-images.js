const fs = require('fs');
const https = require('https');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Image URLs (free stock photos from Unsplash)
const images = {
  'about_hero_bg.jpg': 'https://images.unsplash.com/photo-1551024601-bc78ca929c0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
  'ice_cream_cone.jpg': 'https://images.unsplash.com/photo-1516559828984-fb29b576af76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
  'cafe_interior.jpg': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
  'gallery_matcha.jpg': 'https://images.unsplash.com/photo-1551024601-bc78ca929c0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
  'gallery_friends.jpg': 'https://images.unsplash.com/photo-1551024601-bc78ca929c0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
  'gallery_boba.jpg': 'https://images.unsplash.com/photo-1551024601-bc78ca929c0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
  'gallery_neon_sign.jpg': 'https://images.unsplash.com/photo-1551024601-bc78ca929c0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80'
};

// Function to download a file
function downloadImage(url, filename) {
  const filePath = path.join(imagesDir, filename);
  const file = fs.createWriteStream(filePath);
  
  https.get(url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });  
  }).on('error', err => {
    fs.unlink(filePath, () => {}); // Delete the file if there's an error
    console.error(`Error downloading ${filename}:`, err.message);
  });
}

// Download all images
console.log('Starting image downloads...');
Object.entries(images).forEach(([filename, url]) => {
  downloadImage(url, filename);
});

console.log('All downloads started. Check the public/images directory once complete.');
