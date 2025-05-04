import { connectToDatabase } from "@/lib/mongodb";
import DataImage from "@/models/data-image";
import { NextResponse } from "next/server";
import { verifyBearerToken } from "@/lib/auth";
import { createResponse } from "@/utils/response";

function generateRandomLinkId(length: number = 10): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function POST(req: Request) {
  const token = verifyBearerToken(req);

  if (!token) {
    return NextResponse.json(createResponse(401, "Unauthorized"), {
      status: 401,
    });
  }

  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return NextResponse.json(createResponse(400, "Missing required fields"), {
        status: 400,
      });
    }

    await connectToDatabase();

    let linkId: string;
    let linkExists: boolean;

    do {
      linkId = generateRandomLinkId();
      linkExists = !!(await DataImage.exists({ linkId }));
    } while (linkExists);

    await DataImage.create({ linkId, imageBase64 });

    return NextResponse.json(
      createResponse(201, "Image saved successfully", { linkId }),
      {
        status: 201,
      }
    );
  } catch (err) {
    console.error("[SAVE_IMAGE_ERROR]", err);
    return NextResponse.json(createResponse(500, "Internal server error"), {
      status: 500,
    });
  }
}
