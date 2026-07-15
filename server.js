/**
 * Volunteer Compass AI — local demo server
 * ------------------------------------------------------------------
 * Purpose: fixes the "Something went wrong" error you get when
 * opening the HTML file directly (file://...). That error happens
 * because the frontend was calling api.anthropic.com straight from
 * the browser, which only works inside Claude.ai's own artifact
 * preview (it has a built-in proxy). Outside that, there's no
 * authenticated way for the browser to reach Anthropic directly.
 *
 * This server does exactly what the README already said a real
 * deployment would need: it sits between the browser and Anthropic,
 * holds the API key server-side, and forwards requests. No
 * framework, no dependencies — just Node's built-in http/https
 * modules, so there's nothing to npm install.
 *
 * SETUP:
 *   1. Get an API key from https://console.anthropic.com
 *   2. In this folder, run:
 *        export ANTHROPIC_API_KEY=your-key-here      (Mac/Linux)
 *        set ANTHROPIC_API_KEY=your-key-here          (Windows cmd)
 *   3. Run:  node server.js
 *   4. Open: http://localhost:3000
 *
 * Do NOT open the HTML file directly (file://) anymore — always go
 * through http://localhost:3000 so the requests route through this
 * server instead of failing in the browser.
 * ------------------------------------------------------------------ */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const API_KEY = process.env.ANTHROPIC_API_KEY;
const HTML_FILE = path.join(__dirname, 'Volunteer_Compass_AI_Prototype.html');

if (!API_KEY) {
  console.warn('\n⚠️  ANTHROPIC_API_KEY is not set. The app will load, but AI features (orientation, reflection, Q&A) will fail until you set it.\n   export ANTHROPIC_API_KEY=your-key-here\n');
}

const server = http.createServer((req, res) => {
  // Serve the prototype itself
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    fs.readFile(HTML_FILE, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Could not load Volunteer_Compass_AI_Prototype.html — make sure it is in the same folder as server.js.');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    return;
  }

  // Proxy AI requests to Anthropic, with the key attached server-side
  if (req.method === 'POST' && req.url === '/api/claude') {
    if (!API_KEY) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Server is missing ANTHROPIC_API_KEY. Set it and restart the server.' }));
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const upstreamReq = https.request({
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }, upstreamRes => {
        let responseBody = '';
        upstreamRes.on('data', chunk => { responseBody += chunk; });
        upstreamRes.on('end', () => {
          res.writeHead(upstreamRes.statusCode, { 'Content-Type': 'application/json' });
          res.end(responseBody);
        });
      });

      upstreamReq.on('error', (err) => {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Could not reach Anthropic API: ' + err.message }));
      });

      upstreamReq.write(body);
      upstreamReq.end();
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`\nVolunteer Compass AI is running at http://localhost:${PORT}\n`);
});
