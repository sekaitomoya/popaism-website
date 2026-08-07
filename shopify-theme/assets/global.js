/* Brillante theme — global scripts */
(function () {
  'use strict';

  /* ---- Mobile drawer -------------------------------------------------- */
  const drawer = document.querySelector('[data-drawer]');
  const drawerOpen = document.querySelector('[data-drawer-open]');

  if (drawer && drawerOpen) {
    const setDrawer = (open) => {
      drawer.hidden = !open;
      drawerOpen.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    drawerOpen.addEventListener('click', () => setDrawer(true));
    drawer.querySelectorAll('[data-drawer-close]').forEach((el) => {
      el.addEventListener('click', () => setDrawer(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !drawer.hidden) setDrawer(false);
    });
  }

  /* ---- Announcement bar rotation -------------------------------------- */
  document.querySelectorAll('[data-announcement-rotator]').forEach((rotator) => {
    const messages = rotator.querySelectorAll('.announcement-bar__message');
    if (messages.length < 2) return;
    let index = 0;
    setInterval(() => {
      messages[index].classList.remove('is-active');
      index = (index + 1) % messages.length;
      messages[index].classList.add('is-active');
    }, 4000);
  });

  /* ---- Slideshow ------------------------------------------------------- */
  document.querySelectorAll('[data-slideshow]').forEach((slideshow) => {
    const slides = slideshow.querySelectorAll('.slideshow__slide');
    const dots = slideshow.querySelectorAll('.slideshow__dot');
    if (slides.length < 2) return;

    let current = 0;
    let timer = null;

    const goTo = (index) => {
      slides[current].classList.remove('is-active');
      if (dots[current]) dots[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      if (dots[current]) dots[current].classList.add('is-active');
    };

    const startAutoplay = () => {
      if (slideshow.dataset.autoplay !== 'true') return;
      const interval = parseInt(slideshow.dataset.interval, 10) || 5000;
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), interval);
    };

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        goTo(parseInt(dot.dataset.slideTo, 10));
        startAutoplay();
      });
    });

    startAutoplay();
  });

  /* ---- Collection sort ------------------------------------------------- */
  const sortSelect = document.querySelector('[data-sort-select]');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', sortSelect.value);
      url.searchParams.delete('page');
      window.location.href = url.toString();
    });
  }

  /* ---- Product page ---------------------------------------------------- */
  const productEl = document.querySelector('[data-product]');
  if (!productEl) return;

  /* Gallery */
  const galleryImages = productEl.querySelectorAll('.product__image[data-media-index]');
  const thumbnails = productEl.querySelectorAll('[data-thumbnail-index]');
  const showMedia = (index) => {
    galleryImages.forEach((img) => {
      img.classList.toggle('is-active', img.dataset.mediaIndex === String(index));
    });
    thumbnails.forEach((thumb) => {
      thumb.classList.toggle('is-active', thumb.dataset.thumbnailIndex === String(index));
    });
  };
  thumbnails.forEach((thumb) => {
    thumb.addEventListener('click', () => showMedia(thumb.dataset.thumbnailIndex));
  });

  /* Quantity stepper */
  const qtyInput = productEl.querySelector('[data-quantity-input]');
  const qtyMinus = productEl.querySelector('[data-quantity-minus]');
  const qtyPlus = productEl.querySelector('[data-quantity-plus]');
  if (qtyInput) {
    if (qtyMinus) {
      qtyMinus.addEventListener('click', () => {
        qtyInput.value = Math.max(1, parseInt(qtyInput.value, 10) - 1);
      });
    }
    if (qtyPlus) {
      qtyPlus.addEventListener('click', () => {
        qtyInput.value = parseInt(qtyInput.value, 10) + 1;
      });
    }
  }

  /* Variant selection */
  const jsonEl = document.querySelector('[data-product-json]');
  const form = productEl.querySelector('[data-product-form]');
  if (!jsonEl || !form) return;

  const variants = JSON.parse(jsonEl.textContent);
  const variantIdInput = form.querySelector('[data-variant-id]');
  const addToCart = form.querySelector('[data-add-to-cart]');
  const optionFieldsets = form.querySelectorAll('[data-option-index]');

  const selectedOptions = () =>
    Array.from(optionFieldsets).map((fieldset) => {
      const checked = fieldset.querySelector('input:checked');
      return checked ? checked.value : null;
    });

  /* Shopifyのvariant JSONは通貨に関わらず最小単位×100（セント）で価格を返す */
  const money = (cents) => '¥' + Math.round(cents / 100).toLocaleString('ja-JP');

  const updateVariant = () => {
    const options = selectedOptions();
    const variant = variants.find((v) =>
      options.every((value, i) => v.options[i] === value)
    );

    if (!variant) {
      addToCart.disabled = true;
      addToCart.textContent = addToCart.dataset.textUnavailable || 'SOLD OUT';
      return;
    }

    variantIdInput.value = variant.id;
    addToCart.disabled = !variant.available;
    addToCart.textContent = variant.available
      ? (addToCart.dataset.textAdd || addToCart.textContent)
      : (addToCart.dataset.textSoldOut || 'SOLD OUT');

    /* 価格表示の更新（Shopifyの通貨フォーマットは money フィルタが基準。
       JPYは最小単位が1円のため cents/100 で表示する） */
    const priceWrap = document.querySelector('[data-product-price] .price');
    if (priceWrap) {
      const current = priceWrap.querySelector('.price__current');
      if (current) current.textContent = money(variant.price);
      const compare = priceWrap.querySelector('.price__compare');
      if (compare) {
        if (variant.compare_at_price > variant.price) {
          compare.textContent = money(variant.compare_at_price);
          compare.hidden = false;
        } else {
          compare.hidden = true;
        }
      }
    }

    /* バリアントに画像があれば切り替え */
    if (variant.featured_media && typeof variant.featured_media.position === 'number') {
      showMedia(variant.featured_media.position - 1);
    }

    const url = new URL(window.location.href);
    url.searchParams.set('variant', variant.id);
    window.history.replaceState({}, '', url.toString());
  };

  if (addToCart) {
    addToCart.dataset.textAdd = addToCart.textContent.trim();
  }

  optionFieldsets.forEach((fieldset) => {
    fieldset.addEventListener('change', updateVariant);
  });
})();
