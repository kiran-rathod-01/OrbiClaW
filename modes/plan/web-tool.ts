import { tool } from "ai";
import { z } from "zod";
import Firecrawl from "@mendable/firecrawl-js";
import type { ActionTracker } from "../agent/action-tracker.ts";

let client: Firecrawl | null = null;

function getClient(): Firecrawl {
    if (client) return client;
    client = new Firecrawl({
        apiKey: process.env.FIRECRAWL_API_KEY,
    });
    return client;
}

function clip(s: string, n = 8000): string {//result bohoit bada ho sakta hai isliye usko chote chote part me cut kar rahe hai dihane ke liye
  return s.length > n ? s.slice(0, n) + "\n…[truncated]" : s;
}

