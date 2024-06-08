import { getWorkouts } from "@/library/mongo/workout";

const handler = async (req, res) => {
    if (req.method === "GET") {
        try {
            const { workouts, error } = await getWorkouts();
            if (error) {
                throw new Error(error);
            }
            res.status(200).json({ workouts });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    res.setHeader("Allow", ["GET"]);
    res.status(425).end(`Method ${req.method} Not Allowed`);
}

export default handler;