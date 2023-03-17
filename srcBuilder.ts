import { sleep } from "https://deno.land/x/sleep@v1.2.1/mod.ts";

const toDeno = [
  "src/About/About.tsx",
  "src/Errors/NotFound.tsx",
  "src/MainPage/MainPage.tsx",
  "src/Work/Work.tsx",
  "src/Works/Works.ts",
];
const fromDeno = [
  "dist/DenoAbout.js",
  "dist/DenoNotFound.js",
  "dist/DenoMainPage.js",
  "dist/DenoWork.js",
  "dist/DenoWorks.js",
];
const fromEsbuild = [
  "dist/About.js",
  "dist/NotFound.js",
  "dist/MainPage.js",
  "dist/WorkWrapper.js",
  "dist/Works.js",
];

//  Deno Bundle functions
async function _createDenoBundle(from: string, to: string) {
    const denoBuildProcess = Deno.run({
        cmd: ["deno", "bundle", "--no-check", from, to],
        cwd: Deno.cwd(),
    })
    
    return (await denoBuildProcess.status()).success;
}

async function createDenoBundle() {
    let count = 0;
    const maxTimeout = 15;
    let timeout = 0;

    for (const filePath in toDeno) {
        _createDenoBundle(toDeno[filePath], fromDeno[filePath]).then(success => {
            if (!success) {
                console.error("There was an error! Something wasn't bundled correctly on _createDenoBundle function");
            } else {
                count++;
            }
        });
    }

    while (count !== toDeno.length) {
        if (timeout == maxTimeout) return;
        await sleep(1);
        timeout++;
    }
    return
}

// Esbuild Bundle functions
async function _createEsbuildBundle(from: string, to: string) {
    const outfile="--outfile=" + to;

    const esbuildBuildProcess = Deno.run({
        cmd: ["deno", "run", "-A", "npm:esbuild", "--bundle", from, "--minify", outfile],
        cwd: Deno.cwd(),
    });

    return (await esbuildBuildProcess.status()).success;
}

function createEsbuildBundle(from: string, to: string) {
    _createEsbuildBundle(from, to).then(success => {
        if (!success) {
            console.error("There was an error! Something wasn't bundled correctly on _createEsbuildBundle function")
        } else {
            Deno.removeSync(from);
        }
    });
}

// Sass compiler function

async function compileSass() {
    const sassBuildProcess = Deno.run({
        cmd: ["deno", "run", "-A", "sassBuilder.ts", "styles/index.scss", "dist/index.css"],
        cwd: Deno.cwd(),
    });

    return (await sassBuildProcess.status());
}

// Astro compiler function

function compileAstro() {
    Deno.run({
        cmd: ["deno", "run", "-A", "npm:astro", "build"],
        cwd: Deno.cwd(),
    })
}

/* I made this from the srcBuilder.sh function, the problem to solve is that it works with node_modules */
// Bundle creator function
// It will create the bundles from Deno first
// and then those bundles with will bundled again with esbuild
// It's pretty fast everything
async function createBundles() {
    const installEsbuildProcess = Deno.run({
        cmd: ["deno", "cache", "npm:esbuild"]
    });
    await installEsbuildProcess.status();

    await createDenoBundle();
    // createEsbuildBundle depends on createDenoBundle
    // We have to wait until the deno bundle is created
    // To create the esbuild bundle
    for (const filePath in fromDeno) {
        createEsbuildBundle(fromDeno[filePath], fromEsbuild[filePath]);
    }

    const installSassProcess = Deno.run({
        cmd: ["deno", "cache", "npm:sass-embedded"]
    });
    installSassProcess.status().then(async (_val) => {
        await compileSass();
    });
    // compileAstro();
}

await createBundles(); 