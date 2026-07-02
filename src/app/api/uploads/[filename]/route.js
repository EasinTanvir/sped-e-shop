import { readFile } from "fs/promises";
import path from "path";

const contentTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(_request, { params }) {
  const { filename } = await params;
  const safeFilename = path.basename(filename);
  const extension = path.extname(safeFilename).toLowerCase();

  if (!contentTypes[extension]) return new Response("Not found", { status: 404 });

  try {
    const file = await readFile(path.join(process.cwd(), "uploads", safeFilename));

    return new Response(file, {
      headers: {
        "Content-Type": contentTypes[extension],
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
