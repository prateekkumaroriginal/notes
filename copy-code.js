async function writeToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall back for browsers that deny Clipboard API access.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    throw new Error("Copy command failed");
  }
}

document.querySelectorAll("pre").forEach((block) => {
  const code = block.querySelector("code");

  if (!code) {
    return;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy-code-button";
  button.textContent = "Copy";
  button.setAttribute("aria-label", "Copy code");
  button.setAttribute("aria-live", "polite");

  button.addEventListener("click", async () => {
    try {
      await writeToClipboard(code.innerText);
      button.textContent = "Copied";
      button.dataset.state = "copied";
    } catch {
      button.textContent = "Copy failed";
      button.dataset.state = "failed";
    }

    window.setTimeout(() => {
      button.textContent = "Copy";
      delete button.dataset.state;
    }, 1500);
  });

  block.append(button);
});
