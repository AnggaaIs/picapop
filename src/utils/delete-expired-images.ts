import { connectToDatabase } from "@/lib/mongodb";
import DataImage from "@/models/data-image";

export async function deleteExpiredImages() {
  await connectToDatabase();

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const result = await DataImage.deleteMany({ createdAt: { $lt: oneHourAgo } });

  console.log(`${result.deletedCount} expired images deleted.`);
}

setInterval(deleteExpiredImages, 60 * 60 * 1000);
