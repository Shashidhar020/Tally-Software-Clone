import clientPromise from "@/lib/mongodb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS,PUT",
  "Access-Control-Allow-Headers": "Content-Type",
};
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("tally_db");
    const sales = await db.collection("sales").find().toArray();
    return Response.json(sales, { headers: corsHeaders });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { headers: corsHeaders });
  }
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("tally_db");
    const data = await req.json();
    const result = await db.collection("sales").insertOne(data);
    return Response.json({ success: true, insertedId: result.insertedId }, { headers: corsHeaders });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { headers: corsHeaders });
  }
}
// 🗑 DELETE sale by account
export async function DELETE(req) {
  try {
    const client = await clientPromise;
    const db = client.db("tally_db");
    const { account } = await req.json();

    const result = await db.collection("sales").deleteOne({ account });
    if (result.deletedCount === 1) {
      return Response.json({ success: true, message: "Sale deleted successfully" }, { headers: corsHeaders });
    } else {
      return Response.json({ success: false, message: "No sale found for this account" }, { headers: corsHeaders });
    }
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { headers: corsHeaders });
  }
}

export async function PUT(req) {
  try {
    const client = await clientPromise;
    const db = client.db("tally_db");
    const { account, updateData } = await req.json();
    const result = await db.collection("sales").updateOne(
      { account: account },    
      { $set: updateData }    
    );
    if (result.matchedCount === 0) {
      return Response.json(
        { success: false, message: "No sale found with that account" },
        { headers: corsHeaders }
      );
    }
    return Response.json(
      { success: true, message: "Sale updated successfully", modifiedCount: result.modifiedCount },
      { headers: corsHeaders }
    );
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { headers: corsHeaders }
    );
  }
}


