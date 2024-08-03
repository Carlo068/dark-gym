import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db('test');
    const collection = db.collection('schedule');

    if (req.method === 'GET') {
        const { userId } = req.query;
        try {
            const schedule = await collection.findOne({ userId });
            if (!schedule) {
                return res.status(200).json({
                    userId,
                    Monday: null,
                    Tuesday: null,
                    Wednesday: null,
                    Thursday: null,
                    Friday: null,
                    Saturday: null,
                    Sunday: null
                });
            }
            res.status(200).json(schedule);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch weekly schedule' });
        }
    } else if (req.method === 'POST') {
        const { userId, workoutId, day } = req.body;
        try {
            const existingSchedule = await collection.findOne({ userId });
            if (existingSchedule) {
                await collection.updateOne(
                    { userId },
                    { $set: { [day]: { workoutId } } }
                );
            } else {
                const newSchedule = {
                    userId,
                    Monday: null,
                    Tuesday: null,
                    Wednesday: null,
                    Thursday: null,
                    Friday: null,
                    Saturday: null,
                    Sunday: null,
                    [day]: { workoutId }
                };
                await collection.insertOne(newSchedule);
            }
            res.status(201).json({ message: 'Workout assigned to day' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to assign workout to day' });
        }
    } else if (req.method === 'PUT') {
        const { userId, schedule } = req.body;
        try {
            await collection.updateOne(
                { userId },
                { $set: schedule },
                { upsert: true }
            );
            res.status(201).json({ message: 'Schedule saved successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to save schedule' });
        }
    }
}