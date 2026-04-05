const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'src', 'editor.html'), 'utf8');
const escaped = JSON.stringify(html);

const worker = `export default {
  async fetch(request) {
    return new Response(${escaped}, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'public, max-age=3600',
      },
    });
  },
};
`;

fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'dist', 'index.js'), worker);
console.log('Built dist/index.js (' + Math.round(worker.length / 1024) + ' KB)');
