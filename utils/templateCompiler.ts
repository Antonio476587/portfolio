import path from "node:path";
import fs from "node:fs";
import minimist from "https://esm.sh/minimist@1.2.7";
import { argv } from "node:process";

const argvFlags = minimist(argv.slice(2));

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

function createFileFromTemplate(
  pathToCreateTheFile: string,
  contentToWrite: string,
): void {
  fs.writeFileSync(
    path.resolve(__root_dirname, pathToCreateTheFile),
    contentToWrite,
  );
}

function templateCompiler(
  pugTemplate: pugTemplate,
  localContent?: LocalsObject,
  options?: Options,
): string {
  const templateOptions: templateOptions = {
    doctype: options?.doctype ?? "html",
    ...options,
  };
  const compilerPugFunction = typeof pugTemplate === "string"
    ? pug.compileFile(
      path.resolve(__root_dirname, pugTemplate),
      templateOptions,
    )
    : pug.compile(pugTemplate.content, templateOptions);

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
  const pugTemplate = templateCompiler(argvFlags._[0], {
    headTags: convertToValidPugInsertion(htmlSyntax),
  }, { pretty: "\t" });
  createFileFromTemplate(argvFlags._[1], pugTemplate);
}

templateCompiler.convertToValidPugInsertion = convertToValidPugInsertion;
templateCompiler.createFileFromTemplate = createFileFromTemplate;

export default templateCompiler;
export { convertToValidPugInsertion, createFileFromTemplate };
