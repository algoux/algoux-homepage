import './tailwind.css';
import './index.less';

const productGrid = document.querySelector('[data-product-grid]');
const productCards = productGrid
  ? Array.from(productGrid.querySelectorAll('[data-product-card]'))
  : [];
const contactAction = document.querySelector('[data-contact-action]');
const desktopPointerQuery = window.matchMedia(
  '(hover: hover) and (pointer: fine) and (min-width: 901px)'
);

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const updateProductLighting = (event) => {
  productCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const localX = clamp(event.clientX - rect.left, 0, rect.width);
    const localY = clamp(event.clientY - rect.top, 0, rect.height);
    const outsideX = Math.max(rect.left - event.clientX, 0, event.clientX - rect.right);
    const outsideY = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom);
    const distance = Math.hypot(outsideX, outsideY);
    const strength = clamp(1 - distance / 220, 0, 1);

    card.style.setProperty('--card-x', `${localX}px`);
    card.style.setProperty('--card-y', `${localY}px`);
    card.style.setProperty('--card-light-opacity', strength.toFixed(3));
  });
};

const clearProductLighting = () => {
  productCards.forEach((card) => {
    card.style.setProperty('--card-light-opacity', '0');
  });
};

let productLightingEnabled = false;

const setProductLightingEnabled = (enabled) => {
  if (!productGrid || !productCards.length || productLightingEnabled === enabled) {
    return;
  }

  productLightingEnabled = enabled;

  if (enabled) {
    productGrid.addEventListener('pointermove', updateProductLighting);
    productGrid.addEventListener('pointerleave', clearProductLighting);
    return;
  }

  productGrid.removeEventListener('pointermove', updateProductLighting);
  productGrid.removeEventListener('pointerleave', clearProductLighting);
  clearProductLighting();
};

const syncProductLightingMode = () => {
  setProductLightingEnabled(desktopPointerQuery.matches);
};

if (productGrid && productCards.length) {
  syncProductLightingMode();

  if (desktopPointerQuery.addEventListener) {
    desktopPointerQuery.addEventListener('change', syncProductLightingMode);
  } else if (desktopPointerQuery.addListener) {
    desktopPointerQuery.addListener(syncProductLightingMode);
  }
}

if (contactAction) {
  contactAction.addEventListener('click', () => {
    const protocol = ['mai', 'lto'].join('');
    const local = ['algoux', 'org'].join('.');
    const domain = ['gmail', 'com'].join('.');

    window.location.href = `${protocol}:${local}@${domain}`;
  });
}
