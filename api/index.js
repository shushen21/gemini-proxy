export default async function handler(req, res) {
  // 核心修复：自动处理路径，确保不管是 /api 还是 /index 都能正确转发
  const path = req.url.replace(/^\/api/, "").replace(/^\/index/, "");
  const targetUrl = `https://generativelanguage.googleapis.com${path}`;

  const response = await fetch(targetUrl, {
    method: req.method,
    headers: {
      "content-type": "application/json",
      "x-goog-api-key": req.query.key || req.headers["x-goog-api-key"],
    },
    body: req.method !== 'GET' && req.method !== 'HEAD' ? await req.text() : undefined,
  });

  const data = await response.text();
  res.status(response.status).send(data);
}
