import { Router } from 'express';
import sharp from 'sharp';
import * as fs from 'fs';
import path from 'path';

const router = Router();

router.get('/:image', async (req, res) => {
  let height = +req.query.height || 400;

  if (height > 500) {
    height = 500;
  }

  const inputFile = path.resolve(`./public/images/${req.params.image}`);

  if (!fs.existsSync(inputFile)) {
    res.sendStatus(404);
    return;
  }

  const outputDirectory = `./public/cache/images/${req.params.image.slice(0, 2)}/`;

  const file = path.parse(inputFile);

  const outputFile = path.resolve(`${outputDirectory}${file.name}-${height}${file.ext}`);

  if (fs.existsSync(outputFile)) {
    res.sendFile(outputFile);
    return;
  }

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  await sharp(inputFile).resize({ height }).toFile(outputFile);

  res.sendFile(outputFile);
});

export default router;
