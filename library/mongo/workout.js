import clientPromise from "./mongodb";

let client
let db
let workouts

async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = client.db(process.env.MONGODB_DB)
        workouts = db.collection("workouts")
    } catch (error) {
        throw new Error("Could not connect to database")
    }
}

;(async () => {
    await init()
})()

export async function getWorkouts() {
    try {
        if (!workouts) await init()
        const result = await workouts
            .find({})
            .limit(20)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        
        return { workouts: result }
    } catch (error) {
        return { error: "Failed to fetch workouts" }
    }
}