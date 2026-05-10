(function () {
  'use strict';

  // ── Mobile nav toggle ────────────────────────────────────────────────────
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-menu-toggle]')) {
      var nav = document.querySelector('[data-site-nav]');
      if (nav) nav.classList.toggle('is-open');
    }
  });

  // ── Scroll-reveal ────────────────────────────────────────────────────────
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  // ── Shopify Inbox chat trigger ───────────────────────────────────────────
  // Buttons/links with [data-open-chat] open the Shopify Inbox widget.
  // Install Shopify Inbox (free) in your Shopify admin to enable the chat bubble.
  document.querySelectorAll('[data-open-chat]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      // Official Shopify Inbox API (available after app install)
      if (window.ShopifyInbox && window.ShopifyInbox.open) {
        window.ShopifyInbox.open();
        return;
      }
      // Fallback: click the injected chat badge element
      var badge = document.querySelector(
        '.shopify-inbox__chat-button, [aria-label*="chat" i], [data-shopify-inbox]'
      );
      if (badge) badge.click();
    });
  });

  // ── Product gallery ──────────────────────────────────────────────────────
  document.querySelectorAll('[data-product-gallery]').forEach(function (gallery) {
    var mainImg = gallery.querySelector('[data-product-main] img');
    gallery.querySelectorAll('[data-product-thumb]').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        gallery.querySelectorAll('[data-product-thumb]').forEach(function (t) {
          t.classList.remove('is-active');
        });
        thumb.classList.add('is-active');
        if (mainImg) mainImg.src = thumb.getAttribute('data-src') || mainImg.src;
      });
    });
  });

  // ── Quantity steppers ────────────────────────────────────────────────────
  document.querySelectorAll('[data-qty]').forEach(function (wrapper) {
    var input = wrapper.querySelector('input');
    wrapper.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var step  = parseInt(btn.getAttribute('data-step') || '1', 10);
        var value = Math.max(1, (parseInt(input.value, 10) || 1) + step);
        input.value = value;
        input.dispatchEvent(new Event('change'));
      });
    });
  });

  // ── Add to cart (AJAX) ───────────────────────────────────────────────────
  document.querySelectorAll('[data-add-to-cart]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      if (!window.fetch) return;
      e.preventDefault();
      var btn          = form.querySelector('[type=submit]');
      var originalText = btn ? btn.textContent : '';
      if (btn) btn.textContent = 'Adding…';

      fetch('/cart/add.js', {
        method:  'POST',
        headers: { Accept: 'application/json' },
        body:    new FormData(form)
      })
        .then(function (r) { return r.json(); })
        .then(function () {
          if (btn) btn.textContent = 'Added ✓';
          return fetch('/cart.js').then(function (r) { return r.json(); });
        })
        .then(function (cart) {
          var badge = document.querySelector('[data-cart-count]');
          if (badge) {
            badge.textContent    = cart.item_count;
            badge.style.display  = cart.item_count ? '' : 'none';
          }
          setTimeout(function () { if (btn) btn.textContent = originalText; }, 1500);
        })
        .catch(function () {
          if (btn) btn.textContent = 'Error — try again';
          setTimeout(function () { if (btn) btn.textContent = originalText; }, 2000);
        });
    });
  });
})();
