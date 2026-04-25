/**
 * Fetches a PDF as an ArrayBuffer.
 *
 * - In development: uses the POST /api/asset/ endpoint to bypass IDM
 * - In production (GitHub Pages): fetches the static file directly via GET
 */
export async function fetchPdf(pdfPath: string): Promise<ArrayBuffer> {
  const isDev = import.meta.env.DEV;

  if (isDev) {
    // Dev server: POST to custom middleware to bypass IDM
    const res = await fetch(`/api/asset${pdfPath}`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/octet-stream',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.arrayBuffer();
  } else {
    // Production (static hosting): direct GET — base path is baked in by Vite
    const base = import.meta.env.BASE_URL;
    // pdfPath starts with '/', so trim leading slash to avoid double slash
    const cleanPath = pdfPath.startsWith('/') ? pdfPath.slice(1) : pdfPath;
    const res = await fetch(`${base}${cleanPath}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.arrayBuffer();
  }
}
