// Local development API. Runs the exact same handlers that Vercel runs in production (../api),
// so validation, limits and email logic live in ONE place.
require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(express.json({ limit: '50kb' }));

const mount = (route, file) =>
  app.all(route, async (req, res) => {
    const { default: handler } = await import(file);
    res.status = res.status.bind(res);
    return handler(req, res);
  });

mount('/api/health', '../api/health.js');
mount('/api/bookings', '../api/bookings.js');

app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
