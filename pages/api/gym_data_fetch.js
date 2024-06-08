import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    const { method, body, query } = req;
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("workouts");
    const collection = db.collection("workouts");

    switch (method) {
        case "POST":
            try {
                const { name, sets, reps} = body;
                if (!name || !sets || !reps) {
                    throw new Error("Missing required fields");
                }
                const newWorkout = await collection.insertOne({
                    name,
                    sets,
                    reps,
                });
                return res.status(201).json(newWorkout);
            } catch (error) {
                return res
                    .status(400)
                    .json({ message: "Error creating workout", error });
            }
            break;
        case "GET":
            try {
                const workouts = await collection.find({}).toArray();
                return res.status(200).json(workouts);
            } catch (error) {
                return res.status(500).json({ message: "Error fetching workouts", error });
            }
    }
}
