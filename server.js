import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const staticDir = fs.existsSync(path.join(__dirname, 'www.toolgenie.online'))
  ? path.join(__dirname, 'www.toolgenie.online')
  : fs.existsSync(path.join(__dirname, 'airateface.com'))
  ? path.join(__dirname, 'airateface.com')
  : __dirname;

app.use(express.json());

// In-memory mock session endpoint for auth-client
app.get('/api/session', (req, res) => {
  res.json({ configured: true, user: { name: 'Guest User', email: 'guest@example.com' }, credits: 10 });
});

app.post('/api/auth/sign-out', (req, res) => {
  res.json({ success: true });
});

// Middleware to serve static files with .html extension support
app.use(express.static(staticDir, { extensions: ['html'] }));
app.use(express.static(__dirname, { extensions: ['html'] }));

// Catch-all route to serve index.html for unrecognized routes
app.get('*', (req, res) => {
  const indexPath = fs.existsSync(path.join(staticDir, 'index.html'))
    ? path.join(staticDir, 'index.html')
    : path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Tool Genie server running on http://0.0.0.0:${PORT}`);
});
