import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Local stub API routes for account & session checks
app.get('/api/session', (_req, res) => {
  res.json({ configured: false, user: null });
});

app.get('/api/credits', (_req, res) => {
  res.json({
    balance: 0,
    adjustmentDue: 0,
    reportCost: 10,
    canCreateReport: false,
    transactions: []
  });
});

app.get('/api/reports', (_req, res) => {
  res.json({ reports: [] });
});

app.post('/api/auth/sign-out', (_req, res) => {
  res.json({ ok: true });
});

const staticDir = fs.existsSync(path.join(__dirname, 'dist'))
  ? path.join(__dirname, 'dist')
  : __dirname;

// Serve static assets with trailing slash awareness and cache revalidation
app.use(express.static(staticDir, {
  extensions: ['html'],
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html') || filePath.includes('_astro') || filePath.endsWith('manifest.json')) {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    }
  }
}));

// Route handling for tool paths, encoded query links, and clean URLs
app.get('*', (req, res, next) => {
  let reqPath = req.path.replace(/\/$/, '');

  // Handle wget-style encoded query strings in static links (e.g. /login?next=%2Faccount.html)
  if (reqPath.includes('?')) {
    const [basePath, rawQuery] = reqPath.split('?');
    const cleanBase = basePath.replace(/\.html$/, '');
    const cleanQuery = rawQuery.replace(/\.html$/, '');
    return res.redirect(302, `${cleanBase}?${cleanQuery}`);
  }

  const candidateHtml = path.join(staticDir, `${reqPath}.html`);
  if (reqPath && fs.existsSync(candidateHtml)) {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    return res.sendFile(candidateHtml);
  }

  const candidateIndex = path.join(staticDir, reqPath, 'index.html');
  if (fs.existsSync(candidateIndex)) {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    return res.sendFile(candidateIndex);
  }

  const fallbackIndex = path.join(staticDir, 'index.html');
  if (fs.existsSync(fallbackIndex)) {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    return res.sendFile(fallbackIndex);
  }
  next();
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
