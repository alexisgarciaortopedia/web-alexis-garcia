import { renderPanelManifestJson } from "@/lib/panel/panel-frontend";

export async function GET() {
  const startUrl = "https://www.alexisgarciaortopedia.com/panel";
  return new Response(renderPanelManifestJson(startUrl), {
    status: 200,
    headers: {
      "Content-Type": "application/manifest+json",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
