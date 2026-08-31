import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const res = await fetch('https://www.pexels.com/video/video-of-a-moving-car-8345037/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0',
      'Accept': 'text/html,application/xhtml+xml'
    }
  });
  const html = await res.text();
  
  // Find video source URLs
  const mp4Matches = [];
  const re = /"(https:[^"]+\.mp4[^"]*)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    mp4Matches.push(m[1]);
    if (mp4Matches.length >= 10) break;
  }
  
  const hdMatches = [];
  const re2 = /"hd":"([^"]+)"/g;
  while ((m = re2.exec(html)) !== null) {
    hdMatches.push(m[1]);
    if (hdMatches.length >= 5) break;
  }
  
  console.log('MP4 URLs found:', mp4Matches.length);
  mp4Matches.forEach(u => console.log(' MP4:', u.slice(0, 120)));
  console.log('HD:', hdMatches);
  
  // Save a snippet for inspection
  const idx = html.indexOf('video');
  if (idx > 0) {
    fs.writeFileSync('pexels_snippet.txt', html.slice(idx - 200, idx + 2000));
    console.log('Saved snippet to pexels_snippet.txt');
  }
}
run().catch(e => console.error(e.message));
