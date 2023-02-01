import  { dirname } from "https://deno.land/std@0.175.0/path/mod.ts";
import { fileURLToPath } from "https://deno.land/std@0.175.0/node/url.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export { __dirname };