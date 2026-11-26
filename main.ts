// Entry for make.fun's "Office Artifacts: The One-Line Placard Contest".
// A desk placard in one line: the thought every meeting survivor has.
// This script is deterministic, reads no files, uses no network, and
// writes the placard line to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const PLACARD = {
  text: "I survived another meeting that should have been an email.",
  limit: 140,
  target: "/output/entry.txt",
};

function problems(text: string, limit: number): string[] {
  const found: string[] = [];
  if (text.trim().length === 0) found.push("placard line is empty");
  if (text.length > limit) {
    found.push(`placard line is ${text.length} chars, limit is ${limit}`);
  }
  return found;
}

function emit(text: string, target: string): void {
  mkdirSync(target.slice(0, target.lastIndexOf("/")), { recursive: true });
  writeFileSync(target, text + "\n", "utf8");
}

function main(): void {
  const bad = problems(PLACARD.text, PLACARD.limit);
  if (bad.length > 0) {
    throw new Error(bad.join("; "));
  }
  emit(PLACARD.text, PLACARD.target);
  console.log(
    `placard (${PLACARD.text.length} chars) written to ${PLACARD.target}`,
  );
}

main();
