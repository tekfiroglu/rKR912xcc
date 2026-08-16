const express = require('express');
const fs = require('fs');
const app = express();

// 1x1 şeffaf PNG (base64 olarak gömülü, dosyaya gerek yok)
const PIXEL = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
  'base64'
);

app.get('/pixel.png', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const email = req.query.email || 'bilinmiyor';
  const log = `${new Date().toISOString()} | email: ${email} | IP: ${ip}\n`;

  fs.appendFileSync('logs.txt', log);
  console.log(log);

  res.set('Content-Type', 'image/png');
  res.send(PIXEL);
});

app.get('/logs', (req, res) => {
  const data = fs.existsSync('logs.txt') ? fs.readFileSync('logs.txt', 'utf8') : 'Henüz log yok.';
  res.type('text/plain').send(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Çalışıyor: ${PORT}`));
