import crypto from "crypto";

const ITERATIONS = 120000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST)
    .toString("hex");

  return `${ITERATIONS}:${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  if (!password || !storedHash) return false;

  const [iterations, salt, originalHash] = storedHash.split(":");
  const hash = crypto
    .pbkdf2Sync(password, salt, Number(iterations), KEY_LENGTH, DIGEST)
    .toString("hex");

  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(originalHash));
}

function getSecret() {
  return process.env.SESSION_SECRET || "dev-only-change-this-session-secret";
}

export function signSession(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(body)
    .digest("base64url");

  return `${body}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || !token.includes(".")) return null;

  const [body, signature] = token.split(".");
  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(body)
    .digest("base64url");

  if (
    signature.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!session.expiresAt || Date.now() > session.expiresAt) return null;
    return session;
  } catch {
    return null;
  }
}

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
