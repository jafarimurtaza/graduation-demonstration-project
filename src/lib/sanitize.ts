// Shared input sanitizers for graduation messages. Used by the form for
// immediate feedback and by the /api/messages route as the authoritative check.

export const MAX_MESSAGE_LENGTH = 500;
export const MAX_NAME_LENGTH = 100;

// ASCII control characters except tab (\t) and newline (\n), plus DEL/C1.
const CONTROL_CHARS = /[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g;
// Zero-width space, BOM and bidi embedding/override/isolate characters, which
// can be used to hide or spoof text. ZWNJ/ZWJ (U+200C/U+200D) and LRM/RLM
// (U+200E/U+200F) are kept because Persian/Pashto text relies on them.
const INVISIBLE_CHARS = /[​﻿‪-‮⁦-⁩]/g;
const HTML_TAGS = /<[^>]*>/g;
const ANGLE_BRACKETS = /[<>]/g;

function baseClean(value: string): string {
  return value
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARS, "")
    .replace(INVISIBLE_CHARS, "")
    .replace(HTML_TAGS, "")
    .replace(ANGLE_BRACKETS, "");
}

/** Multi-line message: keeps line breaks but collapses runs of blank lines. */
export function sanitizeMessage(value: unknown): string {
  if (typeof value !== "string") return "";
  return baseClean(value)
    .replace(/\t/g, " ")
    .replace(/[  ]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

/** Single-line name: all whitespace collapsed to single spaces. */
export function sanitizeName(value: unknown): string {
  if (typeof value !== "string") return "";
  return baseClean(value).replace(/\s+/g, " ").trim().slice(0, MAX_NAME_LENGTH);
}

/** Graduate slugs are URL-safe identifiers; reject anything else. */
export function isValidSlug(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= 200 &&
    /^[A-Za-z0-9_-]+$/.test(value)
  );
}
