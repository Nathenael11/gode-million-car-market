import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const outDir = path.resolve(__dirname, '../client/public/videos');
fs.mkdirSync(outDir, { recursive: true });

// Try multiple known working bright exterior car videos
const candidates = [
  // Coverr.co - free stock videos, no auth needed
  { url: 'https://download.coverr.co/videos/coverr-car-driving-on-a-road-6584/1080p', name: 'coverr-car.mp4' },
  // Direct mp4 from known sources
  { url: 'https://download.coverr.co/videos/coverr-white-car-in-motion-7859/720p', name: 'coverr-car2.mp4' },
  // Pixabay video download  
  { url: 'https://pixabay.com/videos/download/video-26536_tiny.mp4', name: 'pixabay-car.mp4' },
  // Life of vids
  { url: 'https://www.lifeofvids.com/get/car-driving-street.mp4', name: 'lifeofvids.mp4' },
  // Mazwai
  { url: 'https://mazwai.com/videvo_files/video/free/2016-01/small_watermarked/160110_03_B_street-car_preview.webm', name: 'mazwai.webm' },
];

async function tryDownload(item) {
  try {
    console.log('Trying:', item.url.slice(0, 60));
    const r = await fetch(item.url, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://coverr.co/' },
      redirect: 'follow'
    });
    console.log('Status:', r.status, 'Type:', r.headers.get('content-type'));
    if (r.ok && r.headers.get('content-type')?.includes('video')) {
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length > 500000) {
        fs.writeFileSync(path.join(outDir, item.name), buf);
        console.log('SAVED:', item.name, buf.length, 'bytes');
        return true;
      }
      console.log('Too small:', buf.length);
    }
  } catch(e) {
    console.log('Error:', e.message);
  }
  return false;
}

for (const c of candidates) {
  if (await tryDownload(c)) break;
}
