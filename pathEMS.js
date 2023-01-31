import  { dirname } from "std/path/mod.ts";
import { fileURLToPath } from "std/node/url.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export { __dirname };