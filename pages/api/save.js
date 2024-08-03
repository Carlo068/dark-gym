// pages/api/save_workout.js

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Extract workout data and user data from request body
    const { user, workout } = req.body;

    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(process.env.MONGODB_DB);

        // Get the workouts collection
        const workoutsCollection = db.collection('workouts');

        // Insert workout data into the database
        const result = await workoutsCollection.insertOne({ user, workout });

        // Close the connection
        client.close();

        // Send response indicating success
        res.status(200).json({ success: true, message: 'Workout saved successfully' });
    } catch (err) {
        // Handle errors
        console.error('Error saving workout:', err);
        res.status(500).json({ success: false, message: 'Error saving workout' });
    }
}