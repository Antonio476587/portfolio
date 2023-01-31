import { resolve } from "https://deno.land/std@0.175.0/path/mod.ts";
import minimist from "https://esm.sh/minimist@1.2.7";

const argvFlags = minimist(Deno.args);

import pug, { LocalsObject, Options } from "https://esm.sh/pug@3.0.2";

import { __dirname as __root_dirname } from "../pathEMS.js";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import htmlSyntax from "../templates/head/gsapScriptsHTMLTemplate.js";

interface templateOptions extends Options {
  doctype: "html" | string;
}

interface pugTemplateObject {
  content: string;
}

type pugTemplate = string | pugTemplateObject;

function convertToValidPugInsertion(htmlSyntaxToConvert: string): string {
  const trimedHTMLSyntaxToConvert = htmlSyntaxToConvert.trim();
  if (!trimedHTMLSyntaxToConvert.match(/^<.+>$/s)) return "";
  return (trimedHTMLSyntaxToConvert.slice(
    1,
    trimedHTMLSyntaxToConvert.length - 1,
  ));
}

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
  pugTemplate: pugTemplate,
  localContent?: LocalsObject,
  options?: Options,
): Promise<string> {
  const templateOptions: templateOptions = {
    doctype: options?.doctype ?? "html",
    ...options,
  };

  let compilerPugFunction;

  if (typeof pugTemplate === "string") {
    const pugFile = await Deno.readFile(resolve(__root_dirname, pugTemplate));
    compilerPugFunction = pug.compile((new TextDecoder()).decode(pugFile), templateOptions);
  } else {
    compilerPugFunction = pug.compile(pugTemplate.content, templateOptions);;
  }

  return compilerPugFunction({ ...localContent });
}

if (argvFlags.help) {
  console.log(
    "If you want to create a file from a template, you must to provide the path and the content.\n Try `ts-node templateCompiler.ts 'path to read from' 'path to write to'`",
  );
} else if (
  argvFlags._.length >= 2 &&
  (typeof argvFlags._[0] == "string" && typeof argvFlags._[1] == "string")
) {
  const pugTemplate = await templateCompiler(argvFlags._[0], {
    headTags: convertToValidPugInsertion(htmlSyntax),
  }, { pretty: "\t" });
  createFileFromTemplate(argvFlags._[1], pugTemplate);
}

templateCompiler.convertToValidPugInsertion = convertToValidPugInsertion;
templateCompiler.createFileFromTemplate = createFileFromTemplate;

export default templateCompiler;
export { convertToValidPugInsertion, createFileFromTemplate };
