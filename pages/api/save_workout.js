import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        const db = client.db('test');
        const workoutsCollection = db.collection('workouts');
        if (req.method === 'POST') {
            const { workout } = req.body;
            const result = await workoutsCollection.insertOne({ workout });
            res.status(200).json({ success: true, message: 'Workout saved successfully', data: result });
        } else if (req.method === 'GET') {
            const workouts = await workoutsCollection.find({}).toArray();
            res.status(200).json({ success: true, data: workouts });
        } else {
            res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
}


