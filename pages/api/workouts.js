import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    const { method, body, query } = req;
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("workouts");
    const collection = db.collection("use percentage");

    switch (method) {
        case "GET":
            try {
                const use_percentage = await collection.find({}).toArray();
                return res.status(200).json(workouts);
            } catch (error) {
                return res.status(500).json({ message: "Error fetching workouts", error });
            }
    }
}