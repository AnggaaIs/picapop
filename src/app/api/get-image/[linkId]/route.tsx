import { connectToDatabase } from "@/lib/mongodb";
import DataImage from "@/models/data-image";
import { NextResponse } from "next/server";
import { createResponse } from "@/utils/response";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ linkId: string }> }
) {
  const { linkId } = await params;

  if (!linkId) {
    return NextResponse.json(createResponse(400, "Missing linkId parameter"), {
      status: 400,
    });
  }

  try {
    await connectToDatabase();

    const imageDoc = await DataImage.findOne({ linkId });

    if (!imageDoc) {
      return NextResponse.json(
        createResponse(404, "Image not found for provided linkId"),
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      createResponse(200, "Image retrieved successfully", {
        imageBase64: imageDoc.imageBase64,
      })
    );
  } catch (error) {
    console.error("[GET_IMAGE_ERROR]", error);
    return NextResponse.json(createResponse(500, "Internal server error"), {
      status: 500,
    });
  }
}
