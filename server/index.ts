import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { serializeError } from "@prisma/studio-core/data/bff";
import { createPrismaPostgresHttpClient } from "@prisma/studio-core/data/ppg";
import { type Query } from "@prisma/studio-core/data";

const app = new Hono().use("*", cors());

// On your server, create an endpoint for the Studio component
// This endpoint is privately executing against Prisma Postgres
app.post("/studio", async (c) => {
  // This receives Studio queries and optional payloads
  type Data = { query: Query, customPayload: { customValue: string } }
  const { query, customPayload } = await c.req.json() as Data

  // Studio can pass custom headers to the request
  const customHeader = c.req.header("X-Custom-Header");
  console.log("Received headers:", { customHeader });

  // Studio can also pass custom data to the request
  console.log("Received value:", customPayload.customValue)

  // The URL needs to be determined in the backend
  // Using the metadata above, determine the PPG URL
  const url = process.env.PPG_URL || null;
  
  if (!url) {
    console.error("PPG_URL environment variable is not set");
    return c.json([serializeError(new Error("URL not configured"))]);
  }

  // With our PPg client, execute/return the Studio queries
  const [error, results] = await createPrismaPostgresHttpClient({ url }).execute(query);

  
  if (error) {
    return c.json([serializeError(error)]);
  }
  
  return c.json([null, results]);
});

const port = parseInt(process.env.SERVER_PORT || "4242");
console.log(`Server is running on http://localhost:${port}`);
serve({ fetch: app.fetch, port, overrideGlobalObjects: false });
