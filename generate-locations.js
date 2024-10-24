const fs = require('fs');
const path = require('path');

// Function to generate a random coordinate
function getRandomCoordinate() {
    return (Math.random() * 180 - 90).toFixed(6);
}

// Function to generate a random location name
function getRandomLocationName(index) {
    return `location ${index}`;
}

// Generate new locations
const locations = [];
for (let i = 0; i < 500000; i++) {
    const name = getRandomLocationName(i + 1);
    const latitude = getRandomCoordinate();
    const longitude = getRandomCoordinate();
    locations.push([name, parseFloat(latitude), parseFloat(longitude)]);
}

// Write the locations to the JSON file
const filePath = path.join(__dirname, 'src/assets/locations.json');
fs.writeFileSync(filePath, JSON.stringify(locations), 'utf8');

console.log('Locations generated and saved successfully.');
