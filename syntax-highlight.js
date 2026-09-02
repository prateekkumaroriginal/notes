const keywords = new Set([
  "as", "async", "await", "break", "case", "catch", "class", "const", "continue",
  "declare", "default", "else", "export", "extends", "finally", "for", "from",
  "function", "if", "implements", "import", "in", "interface", "let", "new",
  "of", "private", "protected", "public", "readonly", "return", "static",
  "switch", "throw", "try", "type", "typeof", "var", "while",
]);

const commands = new Set([
  "cd", "git", "mkdir", "node", "npm", "pnpm", "pwd", "sed", "tsc",
]);

const tokenPattern = /\/\/[^\n]*|#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\`(?:\\.|[^\`\\])*\`|\b(?:true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$-]*(?=\s*:)|\b[A-Za-z_$][\w$]*\b/g;

function tokenClass(token, source, offset) {
  if (token.startsWith("//") || token.startsWith("#")) return "token-comment";
  if (token.startsWith("\"") || token.startsWith("'") || token.startsWith("`")) {
    return source.slice(offset + token.length).match(/^\s*:/) ? "token-name" : "token-string";
  }
  if (/^(true|false|null|undefined)$/.test(token)) return "token-keyword";
  if (/^\d/.test(token)) return "token-number";
  if (keywords.has(token)) return "token-keyword";

  const lineStart = source.lastIndexOf("\n", offset) + 1;
  if (commands.has(token) && /^\s*$/.test(source.slice(lineStart, offset))) {
    return "token-function";
  }

  if (source.slice(offset + token.length).match(/^\s*:/)) return "token-name";
  return "";
}

for (const code of document.querySelectorAll("pre > code")) {
  const source = code.textContent;
  const fragment = document.createDocumentFragment();
  let cursor = 0;

  for (const match of source.matchAll(tokenPattern)) {
    const [token] = match;
    const offset = match.index;

    fragment.append(source.slice(cursor, offset));

    const className = tokenClass(token, source, offset);
    if (className) {
      const span = document.createElement("span");
      span.className = className;
      span.textContent = token;
      fragment.append(span);
    } else {
      fragment.append(token);
    }

    cursor = offset + token.length;
  }

  fragment.append(source.slice(cursor));
  code.replaceChildren(fragment);
}
