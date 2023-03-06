import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface LocalApiError {
  code: string;
}

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === 'string';
    };

    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      res.send(JSON.parse(result));
    } catch (err: any) {
      if (isLocalApiError(err)) {
        if (err.code === 'ENOENT') {
          await fs.writeFile(fullPath, '[]', 'utf-8');
          res.send([]);
        }
      } else {
        throw err;
      }
    }

    // Make sure the cell storage file exists
    // if it's not - add default list of cells
    // Read and parse the file, send it back to Browser
  });

  router.post('/cells', async (req, res) => {
    // Grab list of cells from the request object
    const { cells }: { cells: Cell[] } = req.body;

    // Serialize them and write to the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });
  return router;
};
