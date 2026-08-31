import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../client/public/videos');
fs.mkdirSync(outDir, { recursive: true });

const candidates = [
  // Pexels direct CDN - video 8345037 by Pavel Danilyuk
  'https://videos.pexels.com/video-files/8345037/8345037-hd_1920_1080_25fps.mp4',
  'https://videos.pexels.com/video-files/8345037/8345037-sd_960_540_25fps.mp4',
  'https://videos.pexels.com/video-files/8345037/8345037-sd_426_240_25fps.mp4',
  // Internet Archive open car driving videos (completely free/open)
  'https://archive.org/download/DrivingForward/DrivingForward.mp4',
  'https://ia800207.us.archive.org/4/items/DrivingForward/DrivingForward.mp4',
  // Other open car videos
  'https://archive.org/download/HondaCRV2007Advertisement/HondaCRV2007Advertisement.mp4',
  'https://archive.org/download/cars_202210/cars.mp4',
];

async function tryDownload(url) {
  try {
    console.log('Trying:', url.split('/').slice(-1)[0]);
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.pexels.com/',
        'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8'
      },
      redirect: 'follow'
    });
    const ct = res.headers.get('content-type') || '';
    const cl = parseInt(res.headers.get('content-length') || '0');
    console.log('  Status:', res.status, 'Type:', ct.slice(0,20), 'Size:', cl);
    if (res.ok && (ct.includes('video') || ct.includes('octet')) && cl > 500000) {
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(path.join(outDir, 'hero-car.mp4'), buf);
      console.log('✅ SAVED hero-car.mp4 -', buf.length, 'bytes from:', url);
      return true;
    }
  } catch(e) {
    console.log('  Error:', e.message.slice(0, 60));
  }
  return false;
}

for (const url of candidates) {
  if (await tryDownload(url)) break;
}
console.log('Done.');
