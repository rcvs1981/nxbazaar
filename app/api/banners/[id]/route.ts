import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bannerSchema } from "@/lib/validators/banner.schema";

// ================= GET ONE =================
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const banner = await db.banner.findUnique({
      where: { id: params.id },
    });

    if (!banner)
      return NextResponse.json(
        { message: "Banner not found" },
        { status: 404 }
      );

    return NextResponse.json(banner);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch banner" },
      { status: 500 }
    );
  }
}

// ================= UPDATE =================
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const validated = bannerSchema.parse(body);

    const updated = await db.banner.update({
      where: { id: params.id },
      data: validated,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update banner" },
      { status: 500 }
    );
  }
}

// ================= DELETE =================
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const existingBanner = await db.banner.findUnique({
      where: { id: params.id },
    });

    if (!existingBanner) {
      return NextResponse.json(
        { message: "Banner not found" },
        { status: 404 }
      );
    }

    await db.banner.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: "Banner deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to delete banner" },
      { status: 500 }
    );
  }
}