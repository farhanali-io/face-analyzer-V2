import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const staticDir = fs.existsSync(path.join(__dirname, 'dist'))
  ? path.join(__dirname, 'dist')
  : __dirname;

// Serve static assets with trailing slash awareness
app.use(express.static(staticDir, {
  extensions: ['html']
}));

// Route handling for tool paths and clean URLs
app.get('*', (req, res, next) => {
  const reqPath = req.path.replace(/\/$/, '');
  const candidateHtml = path.join(staticDir, `${reqPath}.html`);
  if (reqPath && fs.existsSync(candidateHtml)) {
    return res.sendFile(candidateHtml);
  }

  const candidateIndex = path.join(staticDir, reqPath, 'index.html');
  if (fs.existsSync(candidateIndex)) {
    return res.sendFile(candidateIndex);
  }

  const fallbackIndex = path.join(staticDir, 'index.html');
  if (fs.existsSync(fallbackIndex)) {
    return res.sendFile(fallbackIndex);
  }
  next();
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
