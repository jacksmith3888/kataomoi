// Keep track of shadow roots where styles have been injected
const styledShadowRoots = new WeakSet<ShadowRoot>();

const STYLES_TO_INJECT = `
ruby.kataomoi-ruby {
  background: rgba(0, 255, 255, 0.5);
  margin: 0 0.1em; /* Small horizontal margin */
}

rt.kataomoi-rt { /* Targeting the class directly for potential future direct styling */
  font-size: 90%; /* Adjust as needed */
  line-height: 1;
  text-align: center;
  background: rgba(0, 255, 255, 0.5);
}

rt.kataomoi-rt::before {
  content: attr(data-rt);
}
`;

const injectStylesIntoShadowRoot = (shadowRoot: ShadowRoot) => {
  if (!styledShadowRoots.has(shadowRoot)) {
    try {
      const styleElement = document.createElement('style');
      styleElement.textContent = STYLES_TO_INJECT;
      shadowRoot.appendChild(styleElement);
      styledShadowRoots.add(shadowRoot);
    } catch (e) {
      console.error('KatakanaTranslator: Failed to inject styles into shadowRoot', e);
    }
  }
};

let mainDocumentStylesInjected = false;
const injectStylesIntoHead = () => {
  if (mainDocumentStylesInjected) return;
  try {
    const styleElement = document.createElement('style');
    styleElement.textContent = STYLES_TO_INJECT;
    document.head.appendChild(styleElement);
    mainDocumentStylesInjected = true;
  } catch (e) {
    console.error('KatakanaTranslator: Failed to inject styles into document head', e);
  }
};

export { STYLES_TO_INJECT, injectStylesIntoShadowRoot, injectStylesIntoHead };
