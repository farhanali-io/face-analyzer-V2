// Download this file and the three modules linked on the Research page into one directory.
// Run with Node.js 22 or newer: node reproduce.mjs
import { allExperiments } from './research-experiments.mjs';
console.log(JSON.stringify(allExperiments(), null, 2));
