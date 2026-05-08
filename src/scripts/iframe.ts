// Report document height to a parent window so this map can live in an iframe.

function reportHeight(): void {
  const h = document.documentElement.scrollHeight;
  window.parent.postMessage({ type: 'iframeHeight', height: h }, '*');
}

export function watchHeight(): void {
  window.addEventListener('load', reportHeight);
  new ResizeObserver(reportHeight).observe(document.body);
}

// Notify the parent page that the detail panel has opened so it can scroll
// the iframe into view. Only sent on mobile — desktop layout is self-contained.
export function notifyPanelOpen(): void {
  if (window.innerWidth > 768) return;
  window.parent.postMessage({ type: 'btc-l2-map:panel-open' }, '*');
}
