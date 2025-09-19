
const axios = require('axios');
const herbsData = require('./src/herbs-data').default;

const seedDatabase = async () => {
  try {
    const response = await axios.post('http://localhost:4000/api/plants/bulk', herbsData);
    console.log('Database seeded successfully:', response.data);
  } catch (error) {
    console.error('Error seeding database:', error.response ? error.response.data : error.message);
  }
};

seedDatabase();
