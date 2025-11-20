import clientPromise from "@/lib/mongodb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Preflight for browser
export async function OPTIONS() {
  return new Response(null, {
    status: 200,     // MUST be 200 for Vercel
    headers: corsHeaders,
  });
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("tally_db");
    const sales = await db.collection("sales").find().toArray();

    return new Response(JSON.stringify(sales), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("tally_db");
    const data = await req.json();
    const result = await db.collection("sales").insertOne(data);

    return new Response(JSON.stringify({ success: true, insertedId: result.insertedId }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function DELETE(req) {
  try {
    const client = await clientPromise;
    const db = client.db("tally_db");
    const { account } = await req.json();

    const result = await db.collection("sales").deleteOne({ account });

    return new Response(JSON.stringify({
      success: result.deletedCount === 1,
      message: result.deletedCount === 1 ? "Sale deleted successfully" : "No sale found for this account",
    }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function PUT(req) {
  try {
    const client = await clientPromise;
    const db = client.db("tally_db");
    const { account, updateData } = await req.json();

    const result = await db.collection("sales").updateOne(
      { account },
      { $set: updateData }
    );

    return new Response(JSON.stringify({
      success: result.matchedCount > 0,
      message: result.matchedCount === 0 ? "No sale found with that account" : "Sale updated successfully",
      modifiedCount: result.modifiedCount,
    }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
