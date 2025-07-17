import { resolve } from "https://deno.land/std@0.175.0/path/mod.ts";
import minimist from "https://esm.sh/minimist@1.2.7";

const argvFlags = minimist(Deno.args);

import { __dirname as __root_dirname } from "../pathEMS.js";

type template = string

async function createFileFromTemplate(
  pathToCreateTheFile: string,
  contentToWrite: string,
): Promise<void> {
  await Deno.writeFile(
    resolve(__root_dirname, pathToCreateTheFile),
    (new TextEncoder()).encode(contentToWrite),
  );
}

async function templateCompiler(
  template: template,
): Promise<string> {
  try {
    const file = await Deno.readFile(resolve(__root_dirname, template));
    return (new TextDecoder("utf-8")).decode(file);
  } catch (e) {
    console.error(e);
    return "Loading...";
  }
}

if (argvFlags.help) {
  console.log(
    "If you want to create a file from a template, you must to provide the path and the content.\n Try `ts-node templateCompiler.ts 'path to read from' 'path to write to'`",
  );
} else if (
  argvFlags._.length >= 2 &&
  (typeof argvFlags._[0] == "string" && typeof argvFlags._[1] == "string")
) {
  const template = await templateCompiler(argvFlags._[0]);
  createFileFromTemplate(argvFlags._[1], template);
}

templateCompiler.createFileFromTemplate = createFileFromTemplate;

export default templateCompiler;
export { createFileFromTemplate };