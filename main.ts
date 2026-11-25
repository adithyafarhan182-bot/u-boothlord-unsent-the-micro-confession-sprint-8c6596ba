// Unsent: The Micro-Confession Sprint
// u-boothlord-unsent-the-micro-confession-sprint-8c6596ba
//
// A program that writes one two-part micro-confession to /output/entry.txt:
// a To: line naming who it was meant for, and the unsent message itself,
// one line written exactly as it was typed, with no explanation after it.
//
// Deterministic, no network, no dependencies, no secrets.
// Runs on Node 22.18+ (the grader runs Node 22.23.4).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "To: Dad\n" +
  "i kept your voicemail from march because it's the last time you said my name like you were proud of me";

// Gate self-check: the sealed scorer requires /output/entry.txt to be UTF-8
// text of 1 to 260 characters, and the judge's brief caps the message itself
// at one line of at most 200 characters. Fail loudly rather than emit an
// entry that could never be judged.
const lines = ENTRY.split("\n");
if (ENTRY.length < 1 || ENTRY.length > 260) {
  throw new Error(`entry is ${ENTRY.length} chars, gate allows 1-260`);
}
if (lines.length !== 2 || !lines[0].startsWith("To: ")) {
  throw new Error("entry must be exactly a To: line plus one message line");
}
if (lines[1].length > 200) {
  throw new Error(`message line is ${lines[1].length} chars, max 200`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
