// server.js or server.mjs
import express from 'express';
import { exec } from 'child_process';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'  // Adjust this to match your front-end URL or an array of URLs
}));

app.get('/generate-proof', async (req, res) => {
  exec('npx tsx prove.ts', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(stderr);
    }
    res.json({ proof: stdout });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


