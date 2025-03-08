import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const templateDir = path.join(process.cwd(), "public/template");

    if (!fs.existsSync(templateDir)) {
      return NextResponse.json(
        {
          statusCode: 404,
          success: false,
          message: "Template directory not found",
        },
        { status: 404 }
      );
    }

    const files = fs.readdirSync(templateDir);

    const templates = files
      .filter((file) => file.endsWith(".png"))
      .map((file) => {
        const label = file.replace(".png", "").replace(/-/g, " ");
        return {
          label,
          filename: file,
        };
      });

    return NextResponse.json(
      { statusCode: 200, success: true, data: templates },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        statusCode: 500,
        success: false,
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
