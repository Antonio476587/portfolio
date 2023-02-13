import sass from "npm:sass-embedded";

if (import.meta.main) {
    const compiledSass = await sass.compileAsync(Deno.args[0], { sourceMap: true, style: "compressed" });
    
    const css = compiledSass.css;
    const sourceMap = JSON.stringify(compiledSass.sourceMap);

    await Deno.writeFile(Deno.args[1], new TextEncoder().encode(css), { create: true });
    await Deno.writeFile(Deno.args[1] + ".map", new TextEncoder().encode(sourceMap), { create: true });
    console.info("Sass compiled");
}
