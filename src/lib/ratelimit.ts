import { redis } from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const ratelimt = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10s"),
});
