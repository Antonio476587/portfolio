import * as fs from "std/node/fs.ts";

let envFileBuffer = null;

try {
    envFileBuffer = fs.readFileSync(".env");

    if (envFileBuffer) {
        const envFile = new TextDecoder().decode(envFileBuffer);

        const hasImportMetaURL = envFile.match(/import_meta_url_root[=]?([/-_-.\w]*)+/g);

        if (hasImportMetaURL) {
            const newEnvFile = envFile.replace(/import_meta_url_root[=]?([/-_-.\w]*)+/g, `import_meta_url_root=${import.meta.url}`);

            const importMetaURLContent = hasImportMetaURL[0].match(/[=](\w+[/-_-.\w]*)/);
            if (importMetaURLContent && importMetaURLContent !== import.meta.url) {
                fs.writeFileSync(".env", newEnvFile);
            } else if (importMetaURLContent === import.meta.url) {
                null;
            } else {
                fs.writeFileSync(".env", newEnvFile);
            }
        }
        else {
            const newEnvFile = envFile + `\rimport_meta_url_root=${import.meta.url}`;

            fs.writeFileSync(".env", newEnvFile);
        }
    } else {
        const newImportMetaURL = `import_meta_url_root=${import.meta.url}`;

        fs.writeFileSync(".env", newImportMetaURL);
    }
} catch (err) {
    if (err.toString().match(/no such file or directory/ig)[0].toLowerCase() == "no such file or directory") {
        const newImportMetaURL = `import_meta_url_root=${import.meta.url}`;

        fs.writeFileSync(".env", newImportMetaURL);
    }
    console.log(err);
}
