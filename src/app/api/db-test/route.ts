import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const tokens = await query("SELECT * FROM tokens LIMIT 1");
    return NextResponse.json({ ok: true, tokens });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
