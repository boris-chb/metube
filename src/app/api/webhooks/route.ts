import { db } from "@/db";
import { users } from "@/db/schema";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req);

    if (event.type === "user.created") {
      const { data } = event;

      const userValues = {
        authId: data.id,
        avatarUrl: data.image_url,
        name: `${data.first_name} ${data.last_name ?? ""}`.trim(),
      };

      await db.insert(users).values(userValues);
    } else if (event.type === "user.deleted") {
      const { data } = event;

      if (!data.id) {
        return new Response("No ID to delete.", { status: 400 });
      }

      await db.delete(users).where(eq(users.authId, data.id));
    } else if (event.type === "user.updated") {
      const { data } = event;

      await db
        .update(users)
        .set({
          name: `${data.first_name} ${data.last_name ?? ""}`,
          avatarUrl: data.image_url,
        })
        .where(eq(users.authId, data.id));
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
