import fs from 'fs';

const f = 'server/src/app.js';
let c = fs.readFileSync(f, 'utf8');

if (!c.includes('serveUploads')) {
  // Add serveUploads import after uploadRoutes import
  c = c.replace(
    'import uploadRoutes from "./routes/uploadRoutes.js";',
    'import uploadRoutes from "./routes/uploadRoutes.js";\nimport { serveUploads } from "./config/uploads.js";'
  );
  // Wire it after upload routes
  c = c.replace(
    'app.use("/api/upload", uploadRoutes);',
    'app.use("/api/upload", uploadRoutes);\nserveUploads(app);'
  );
  fs.writeFileSync(f, c, 'utf8');
  console.log('Upload serving added to app.js');
} else {
  console.log('Already configured');
}
