// Tiny module-level store so any component (navbar, lightbox) can
// pause/resume the Lenis smooth scroll instance created on the home page.
let lenisInstance = null;

export const setLenis = (instance) => { lenisInstance = instance; };
export const stopLenis = () => lenisInstance?.stop();
export const startLenis = () => lenisInstance?.start();
