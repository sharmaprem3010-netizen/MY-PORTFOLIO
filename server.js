const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const DATA_FILE = path.join(ROOT, 'portfolio-data.json');
const INDEX_FILE = path.join(ROOT, 'index.html');
const MAX_BODY_SIZE = 25 * 1024 * 1024;

function createDefaultData() {
  return {
    photo: null,
    tag: 'Available for work',
    title: 'Prem Sharma',
    subtitle: 'Data Entry Specialist · PDF Conversion · Form Filling · Excel Expert',
    badges: ['📍 West Bengal, India', '⚡ 24hr Delivery', '✅ 100% Accuracy', '🎓 BCA Student'],
    stats: [
      { num: '24h', label: 'Avg. Delivery' },
      { num: '100%', label: 'Accuracy Rate' },
      { num: '0', label: 'Missed Deadlines' },
    ],
    services: [
      {
        icon: '📄',
        title: 'PDF to Excel / Word',
        desc: 'Convert any PDF — scanned or digital — into clean, editable Excel spreadsheets or Word documents.',
        tag: 'Most Popular',
      },
      {
        icon: '📋',
        title: 'Form Filling & CRM Entry',
        desc: 'Accurate online form filling, CRM data input, and database management. Fast and confidential.',
        tag: 'High Demand',
      },
      {
        icon: '📊',
        title: 'Data Organization',
        desc: 'Clean, sort, and structure messy data into well-formatted Excel or Google Sheets.',
        tag: 'Excel Expert',
      },
    ],
    projects: [
      {
        id: '1',
        title: 'Invoice PDF → Excel',
        desc: 'Converted 50-page invoice PDF into organized Excel with totals.',
        type: 'PDF Conversion',
        emoji: '📄',
        link: '',
      },
      {
        id: '2',
        title: 'Student Data Entry',
        desc: 'Organized 80+ student records into a structured spreadsheet.',
        type: 'Data Entry',
        emoji: '📊',
        link: '',
      },
      {
        id: '3',
        title: 'Form Digitization',
        desc: 'Transcribed handwritten forms into clean Word documents.',
        type: 'Form Filling',
        emoji: '📝',
        link: '',
      },
    ],
    tools: ['Microsoft Excel', 'Google Sheets', 'MS Word', 'PDF Tools', 'Data Formatting', 'Web Research', 'Typing 45+ WPM'],
    ctaTitle: 'Ready to work together?',
    ctaSubtitle: 'Fast delivery · Zero errors · Clear communication',
    ctaBtn: 'Hire me on Fiverr →',
    ctaLink: 'https://www.fiverr.com',
    footer: '© 2026 Prem Sharma · Data Entry Specialist · West Bengal, India',
    servicesLabel: 'What I offer',
    servicesTitle: 'Services',
    portfolioLabel: 'My work',
    portfolioTitle: 'Portfolio',
    toolsLabel: 'My toolkit',
    toolsTitle: 'Tools & Skills',
  };
}

function normalizeData(data) {
  const base = createDefaultData();
  const source = data && typeof data === 'object' ? data : {};

  return {
    ...base,
    ...source,
    photo: typeof source.photo === 'string' ? source.photo : null,
    badges: Array.isArray(source.badges) ? source.badges : base.badges,
    stats: Array.isArray(source.stats) ? source.stats : base.stats,
    services: Array.isArray(source.services) ? source.services : base.services,
    projects: Array.isArray(source.projects) ? source.projects : base.projects,
    tools: Array.isArray(source.tools) ? source.tools : base.tools,
  };
}

async function ensureDataFile() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return normalizeData(JSON.parse(raw));
  } catch {
    const data = createDefaultData();
    await fs.writeFile(DATA_FILE, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    return data;
  }
}

async function saveData(data) {
  const normalized = normalizeData(data);
  await fs.writeFile(DATA_FILE, `${JSON.stringify(normalized, null, 2)}\n`, 'utf8');
  return normalized;
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(data));
}

function sendText(res, statusCode, text, contentType = 'text/plain; charset=utf-8') {
  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
  });
  res.end(text);
}

async function readBody(req) {
  const chunks = [];
  let totalSize = 0;

  for await (const chunk of req) {
    totalSize += chunk.length;
    if (totalSize > MAX_BODY_SIZE) {
      const error = new Error('Request body too large');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

async function readBodyText(req) {
  const chunks = [];
  let totalSize = 0;

  for await (const chunk of req) {
    totalSize += chunk.length;
    if (totalSize > MAX_BODY_SIZE) {
      const error = new Error('Request body too large');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString('utf8');
}

async function serveIndex(res) {
  const html = await fs.readFile(INDEX_FILE, 'utf8');
  sendText(res, 200, html, 'text/html; charset=utf-8');
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-store',
      });
      res.end();
      return;
    }

    if (req.url === '/api/portfolio' && req.method === 'GET') {
      const data = await ensureDataFile();
      sendJson(res, 200, data);
      return;
    }

    if (req.url === '/api/portfolio' && req.method === 'PUT') {
      const body = await readBody(req);
      const saved = await saveData(body);
      sendJson(res, 200, saved);
      return;
    }

    if (req.url === '/api/save-html' && req.method === 'PUT') {
      const bodyText = await readBodyText(req);
      if (!bodyText || !bodyText.trim().startsWith('<!DOCTYPE html>')) {
        sendJson(res, 400, { error: 'Invalid HTML format' });
        return;
      }
      await fs.writeFile(INDEX_FILE, bodyText, 'utf8');
      sendJson(res, 200, { message: 'HTML saved successfully' });
      return;
    }

    if (req.url === '/' || req.url === '/index.html') {
      await serveIndex(res);
      return;
    }

    sendText(res, 404, 'Not found');
  } catch (error) {
    const statusCode = error.statusCode || 500;
    sendJson(res, statusCode, {
      error: statusCode === 500 ? 'Server error' : error.message,
    });
  }
});

server.listen(PORT, () => {
  console.log(`Portfolio server running on http://localhost:${PORT}`);
});
