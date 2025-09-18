require('dotenv').config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import admin from 'firebase-admin';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 4000;

// Firebase Admin Initialization
const serviceAccount = JSON.parse(
  fs.readFileSync('./firebaseServiceAccountKey.json', 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const plantsCollection = db.collection('plants');

// Middleware
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

// Health check route
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Bulk upsert plants to Firebase Firestore
app.post('/api/plants/bulk', async (req, res) => {
  try {
    const plants = req.body;
    if (!Array.isArray(plants) || plants.length === 0) {
      return res.status(400).json({ error: 'Body must be a non-empty array' });
    }

    const batch = db.batch();

    plants.forEach((plant) => {
      const docRef = plantsCollection.doc(plant.name); // Use plant name as ID
      batch.set(docRef, {
        name: plant.name,
        benefit: plant.benefit,
        image: plant.image,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true }); // merge: true ensures upsert behavior
    });

    await batch.commit();

    res.json({ ok: true, message: 'Plants saved/updated successfully in Firebase' });
  } catch (err) {
    console.error('Error saving to Firebase:', err);
    res.status(500).json({ error: 'Failed to save plants to Firebase' });
  }
});

// List all plants
app.get('/api/plants', async (_req, res) => {
  try {
    const snapshot = await plantsCollection.orderBy('name').get();
    const plants = snapshot.docs.map((doc) => doc.data());
    res.json(plants);
  } catch (err) {
    console.error('Error fetching plants:', err);
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});