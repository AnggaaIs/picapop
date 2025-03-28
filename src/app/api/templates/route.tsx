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
        const namaFile = file.replace(".png", "").replace(/-/g, " ");
        const label = namaFile.replace(/\s*\(\d{2} \d{2} \d{4}\)$/, "");
        const dateMatch = namaFile.match(/\((\d{2}) (\d{2}) (\d{4})\)/);
        let date;
        if (dateMatch) {
          const day = parseInt(dateMatch[1], 10);
          const month = parseInt(dateMatch[2], 10) - 1; // JavaScript Date() menggunakan index bulan 0-11
          const year = parseInt(dateMatch[3], 10);

          date = new Date(year, month, day);
        }
        return {
          label,
          date,
          filename: file,
        };
      });

    // Hitung batas waktu seminggu yang lalu
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Urutkan dari terbaru ke terlama
    const sortedTemplates = templates
      .map(item => ({
        ...item,
        isNew: item.date ? new Date(item.date) > oneWeekAgo : false // Cek apakah item lebih baru dari 7 hari terakhir
      }))
      .sort((a, b) => (b.date ? new Date(b.date).getTime() : 0) - (a.date ? new Date(a.date).getTime() : 0));

      const filterSpecialTemplate = sortedTemplates.map((item) => {
        // console.log(item.label)
        if(['Eid Mubarak', 'Blessed Ramadhan', 'Happy Ramadan'].includes(item.label)) {
          console.log(item.label)
          return {
            ...item,
            isSpecial: true,
          };
        } else {
          return {
            ...item,
            isSpecial: false,
          };
        }
      })

      // filter template spesial diletakan di paling atas
      const specialTemplate = filterSpecialTemplate.filter((item) => item.isSpecial);
      const normalTemplate = filterSpecialTemplate.filter((item) => !item.isSpecial);
      const sortedTemplate = [...specialTemplate, ...normalTemplate];

    return NextResponse.json(
      { statusCode: 200, success: true, data: sortedTemplate },
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
