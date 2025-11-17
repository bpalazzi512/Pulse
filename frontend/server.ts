import express, { Request, Response } from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine the dist directory: if we're in dist, use it; otherwise use dist subdirectory
const distPath = existsSync(path.join(__dirname, 'index.html'))
  ? __dirname
  : path.join(__dirname, 'dist');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(express.static(distPath));

// SPA fallback - serve index.html for all routes
app.use((_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});