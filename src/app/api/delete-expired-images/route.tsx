import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import DataImage from "@/models/data-image";
import { DateTime } from "luxon";

const ACCESS_TOKEN = process.env.EXPIRED_DELETE_IMAGE_TOKEN;

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (token !== ACCESS_TOKEN) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid or missing token" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();

    const expirationTime = DateTime.now().minus({ hours: 1 }).toJSDate();

    const result = await DataImage.deleteMany({
      createdAt: { $lt: expirationTime },
    });

    if (result.deletedCount > 0) {
      return NextResponse.json(
        {
          message: `${result.deletedCount} expired images deleted successfully`,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "No expired images found to delete" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DELETE_EXPIRED_IMAGES_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to delete expired images" },
      { status: 500 }
    );
  }
}
