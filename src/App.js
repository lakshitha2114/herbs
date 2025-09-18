import React from 'react';
import './App.css';
import HerbCard from './components/HerbCard';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';



function App() {
  const saveToDb = async () => {
    try {
      const plantsCollection = collection(db, "plants");
      for (const h of herbsData) {
        await addDoc(plantsCollection, {
          name: h.name,
          benefits: h.benefits,
          image: h.image,
        });
      }
      alert('Plants saved to Firebase Firestore successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to save plants to Firebase');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>🌿 Ayurvedic Herbs Collection 🌿</h1>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <button className="btn view-btn" onClick={saveToDb}>Save to DB</button>
        </div>
        
        <div className="herbs-grid">
          {herbsData.map(herb => (
            <HerbCard 
              key={herb.id}
              name={herb.name}
              state={herb.state}
              benefits={herb.benefits}
              image={herb.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;