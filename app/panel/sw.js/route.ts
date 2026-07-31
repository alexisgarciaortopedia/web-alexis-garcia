import { renderPanelServiceWorkerJs } from "@/lib/panel/panel-frontend";

export async function GET() {
  const shellUrl = "https://www.alexisgarciaortopedia.com/panel";
  return new Response(renderPanelServiceWorkerJs(shellUrl), {
    status: 200,
    headers: {
      "Content-Type": "text/javascript; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
