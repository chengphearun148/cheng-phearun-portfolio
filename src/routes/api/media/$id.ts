import { createFileRoute } from "@tanstack/react-router";
import { getSql } from "@/lib/db";

export const Route = createFileRoute("/api/media/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const sql = await getSql();
        const rows = await sql<{ mime_type: string; data: string }>`
          select mime_type, data from media where id = ${params.id}
        `;
        const row = rows[0];
        if (!row) return new Response("Not found", { status: 404 });
        const bytes = Buffer.from(row.data, "base64");
        return new Response(bytes, {
          headers: {
            "Content-Type": row.mime_type,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
