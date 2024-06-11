import kleur from "kleur";

export const kLeftSeparator = "└──";

export function bytesToKB(bytes: number): string {
  const kilobytes = (bytes / 1024).toFixed(2);

  return kleur.bold().yellow(`${kilobytes} KB`);
}

export function makeIndents(numberOfIndents: number): string {
  return Array.from({ length: numberOfIndents }, () => " ").join("");
}
