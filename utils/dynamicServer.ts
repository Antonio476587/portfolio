type contentType = "application/x-javascript" | "text/css";

type dynamicServerOptions = {
  req: Request;
};

function fileMatcher(
  url: Request["url"],
  extension: string,
): Response | string {
  const regex = new RegExp(`\/(?<fileName>\\w+).${extension}$`);
  const urlMatch = url.match(regex);
  const fileName = urlMatch?.groups?.fileName;
  if (fileName == undefined) {
    return new Response("Bad URL recourse inquiry", { status: 400 });
  }
  return fileName;
}

async function dynamicServer(
  extension: string,
  contentType: contentType,
  options: dynamicServerOptions,
): Promise<Response> {
  const { req } = options;
  const cacheControl = req.headers.get("Cache-Control");

  const fileName = fileMatcher(req.url, extension);
  if (typeof fileName !== "string") return fileName;
  try {
    const file = await Deno.readFile(
      Deno.cwd() + "/frontend/dist/" + fileName + "." + extension,
    );
    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": cacheControl?.includes("no-cache")
          ? "public, max-age=1800"
          : "no-cache",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Recourse not found", { status: 404 });
  }
}

export default dynamicServer;