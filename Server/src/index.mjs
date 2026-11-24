import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();  // Charge les variables d'environnement à partir d'un fichier .env

const app = express();

// Middleware pour autoriser les requêtes cross-origin
app.use(cors());

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Exemple de route API
app.get('/api/health', (req, res) => {
  res.json({ message: 'API is running' });
});

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error('MONGO_URI must be set');
}

await mongoose.connect(MONGO_URI);
console.log('Connected to MongoDB');

// Démarrer le serveur sur le port 9000
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
