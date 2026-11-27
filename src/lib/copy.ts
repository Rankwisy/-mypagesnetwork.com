/** Wires a button to copy text, with a short confirmation in its label. */
export function copyButton(btn: HTMLButtonElement, text: () => string) {
  const label = btn.textContent;
  btn.addEventListener("click", async () => {
    const value = text();
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      btn.textContent = "Copied";
    } catch {
      btn.textContent = "Copy failed, select the text";
    }
    setTimeout(() => (btn.textContent = label), 2000);
  });
}
