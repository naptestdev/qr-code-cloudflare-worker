import qrImage from "qr-image";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
/**
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const searchParams = Object.fromEntries(params.entries());

  if (!searchParams.text) {
    return new Response("No text provided", { status: 400 });
  }

  const qr = generateQRCode(searchParams.text);

  return new Response(qr, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}

function generateQRCode(text) {
  const qr = qrImage.imageSync(text, { type: "png", margin: 1, size: 10 });
  return qr;
}
