export function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace('./', '')] = r(item);
    });
    console.log('Imported Images:', images); // Add this line to log imported images
    return images;
  }
  
  // Import all images from the specified directory
  export const images = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));
  