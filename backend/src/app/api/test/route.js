import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("tally_db");
    
    // Just a test: count how many collections exist
    const collections = await db.listCollections().toArray();

    return Response.json({
      success: true,
      message: "Connected to MongoDB successfully!",
      collections: collections.map(c => c.name),
    });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}

