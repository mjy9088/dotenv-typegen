#!/usr/bin/env node

import { parse } from "dotenv-ts";
import { promises as fs } from "fs";

(async () => {
  let value;
  try {
    const contents = (await fs.readFile(".env")).toString();
    value = parse(contents);
  } catch (e) {
    console.error(e);
    return;
  }
  const keys = Object.keys(value);
  const lines = keys.map((key) => `    "${key}": string;`);
  await fs.writeFile(
    "dotenv.d.ts",
    `declare namespace NodeJS {
  interface ProcessEnv {
${lines.join("\n")}
  }
}
`
  );
})();
