import { NextResponse } from "next/server";
import { getUnifiedTimeline } from "../../actions/timeline";

export async function GET() {
  try {
    const rawEvents = await getUnifiedTimeline();
    return NextResponse.json(rawEvents);
  } catch (err) {
    console.error("Error fetching unified timeline:", err);
    return NextResponse.json({ error: "Failed to load timeline" }, { status: 500 });
  }
}