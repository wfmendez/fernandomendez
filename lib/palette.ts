// Dispatch this on window to open the command palette from anywhere.
export const OPEN_PALETTE = 'palette:open';

export const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE));

// For useSyncExternalStore: the platform never changes after load.
export const noSubscribe = () => () => {};
export const platformMod = () => (/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl ');
