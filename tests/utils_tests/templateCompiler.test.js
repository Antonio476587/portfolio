import path from "path";
import fs from "fs";

import pug from "pug";


import { __dirname as __root_dirname } from "../../pathEMS";
import deleteFileSync from "../../utils/deleteFile";

import templateCompiler from "../../utils/templateCompiler";

import htmlSyntax from "../../templates/head/gsapScriptsHTMLTemplate.js";

describe("templateCompiler", () => {

    test("when a template file is passed", () => {

        expect(pug.renderFile(path.resolve(__root_dirname, "templates/head/head.pug"), { doctype: "html" }))
            .toEqual(templateCompiler("templates/head/head.pug"));

        expect(pug.renderFile(path.resolve(__root_dirname, "templates/head/head.pug"), { pretty: "\t", doctype: "html" }))
            .toEqual(templateCompiler("templates/head/head.pug", {}, { pretty: "\t" }));

        expect(pug.renderFile(path.resolve(__root_dirname, "templates/head/head.pug"), { pretty: "\t", headTags: "aaaa", doctype: "html" }))
            .toEqual(templateCompiler("templates/head/head.pug", { headTags: "aaaa" }, { pretty: "\t" }));

        expect(pug.renderFile(path.resolve(__root_dirname, "templates/head/head.pug"), { pretty: "\t", headTags: "aaaa", doctype: "xml" }))
            .toEqual(templateCompiler("templates/head/head.pug", { headTags: "aaaa" }, { pretty: "\t", doctype: "xml" }));

        expect(pug.renderFile(path.resolve(__root_dirname, "templates/head/head.pug"), { pretty: "\t", headTags: "aaaa", doctype: "html" }))
            .toEqual(templateCompiler("templates/head/head.pug", { headTags: "aaaa" }, { pretty: "\t", doctype: "html" }));

        // 

        expect(pug.renderFile(path.resolve(__root_dirname, "templates/head/head.pug"), { pretty: "\t", headTags: "aaaa", doctype: "xml" }))
            .not.toEqual(templateCompiler("templates/head/head.pug", { headTags: "aaaa" }, { pretty: "\t" }));

        expect(pug.renderFile(path.resolve(__root_dirname, "templates/head/head.pug"), { pretty: "\t", headTags: "bbbb", doctype: "html" }))
            .not.toEqual(templateCompiler("templates/head/head.pug", { headTags: "aaaa" }, { pretty: "\t" }));

        expect(pug.renderFile(path.resolve(__root_dirname, "templates/head/head.pug")))
            .not.toEqual(templateCompiler("templates/head/head.pug"));


    });

    test("when a template string is passed", () => {

        expect(pug.render("p #{name}'s Pug source code!", { doctype: "html" }))
            .toEqual(templateCompiler({ content: "p #{name}'s Pug source code!" }));

        expect(pug.render("p #{name}'s Pug source code!", { doctype: "html", name: "Timothy" }))
            .toEqual(templateCompiler({ content: "p #{name}'s Pug source code!" }, { name: "Timothy" }));

        // 

        expect(pug.render("p #{name}'s Pug source code!", { doctype: "html", name: "Timothy" }))
            .not.toEqual(templateCompiler({ content: "p #{name}'s Pug source code!" }, { name: "Sam" }));


    });

});

describe("convertToValidPugInsertion function", () => {

    it("should return an empty string", () => {
        expect(templateCompiler.convertToValidPugInsertion("aguacate")).toEqual("");
        expect(templateCompiler.convertToValidPugInsertion("<aguacate")).toEqual("");
        expect(templateCompiler.convertToValidPugInsertion("aguacate>")).toEqual("");
        expect(templateCompiler.convertToValidPugInsertion("aguacate>>")).toEqual("");
        expect(templateCompiler.convertToValidPugInsertion("<<aguacate")).toEqual("");
    });

    it("should make the htmlSyntax valid to insert it as tags in a pug template", () => {

        const pugTemplate = {
            content: "#{jumanyi}/"
        };

        expect(templateCompiler(pugTemplate, { jumanyi: templateCompiler.convertToValidPugInsertion("aguacate>") })).toEqual("</>");
        expect(templateCompiler(pugTemplate, { jumanyi: templateCompiler.convertToValidPugInsertion("<aguacate>") })).toEqual("<aguacate/>");
        expect(templateCompiler(pugTemplate, { jumanyi: templateCompiler.convertToValidPugInsertion("   <aguacate>") })).toEqual("<aguacate/>");
        expect(templateCompiler(pugTemplate, { jumanyi: templateCompiler.convertToValidPugInsertion("<aguacate>   ") })).toEqual("<aguacate/>");
        // The syntax is expected to be <aguacate></aguacate/> because the pug template insert the last slash and it cannot be prevented
        // the browser will fix this mistake removing the misplaced slash
        expect(templateCompiler(pugTemplate, { jumanyi: templateCompiler.convertToValidPugInsertion("<aguacate></aguacate>") })).toEqual("<aguacate></aguacate/>");
    });

});

describe("createFileFromTemplate function", () => {

    let fileCreatedToTest;
    let completePathToFileCreatedToTest;
    
    beforeAll(() => {
        fileCreatedToTest = "public/probando.html";
        completePathToFileCreatedToTest = path.resolve(__root_dirname, fileCreatedToTest);
    });

    afterAll(() => {
        fileCreatedToTest = null;
        completePathToFileCreatedToTest = null;
        if (fs.existsSync(completePathToFileCreatedToTest)) deleteFileSync(completePathToFileCreatedToTest);
    });

    it("should create a file", () => {
        const indexPug = templateCompiler("templates/index.pug", { headTags: templateCompiler.convertToValidPugInsertion(htmlSyntax) }, { pretty: "\t" });

        templateCompiler.createFileFromTemplate(fileCreatedToTest, indexPug);

        expect(fs.readFileSync(completePathToFileCreatedToTest, { encoding: "utf8" })).toEqual(indexPug);
    });

});