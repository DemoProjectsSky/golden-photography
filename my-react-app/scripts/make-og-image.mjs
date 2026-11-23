import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
await sharp(path.join(root, 'assets-src/images/goldenphoto5.jpg'))
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.join(root, 'public/og-image.jpg'))
console.log('public/og-image.jpg written')
