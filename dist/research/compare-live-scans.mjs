import { readFile } from 'node:fs/promises';
import { compareScanExports } from './live-study.mjs';
const files = process.argv.slice(2);
try {
  const inputs = await Promise.all(files.map(async (path) => JSON.parse(await readFile(path, 'utf8'))));
  console.log(JSON.stringify(compareScanExports(inputs), null, 2));
} catch (error) { console.error(error.message); process.exitCode = 1; }
