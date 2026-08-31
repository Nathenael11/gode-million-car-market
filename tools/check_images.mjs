import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(__dirname, '../client/public/img-check');
fs.mkdirSync(out, { recursive: true });

const images = [
  { id: '1503376780353-7e6692767b70', name: 'img1.jpg' },
  { id: '1525609004556-c46c7d6cf023', name: 'img2.jpg' },
  { id: '1494976388531-d1058494cdd8', name: 'img3.jpg' },
  { id: '1583121274602-3e2820c69888', name: 'img4.jpg' },
];

for (const img of images) {
  const url = `https://images.unsplash.com/photo-${img.id}?w=400&q=70`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(path.join(out, img.name), buf);
  console.log('Saved:', img.name, buf.length, 'bytes');
}
console.log('Done. Check client/public/img-check/');
