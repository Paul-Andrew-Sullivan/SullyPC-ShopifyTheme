/* SullyPC theme — minimal interactivity */
(function(){
  // Mobile menu toggle
  document.addEventListener('click', function(e){
    var t = e.target.closest('[data-menu-toggle]');
    if (t) {
      var nav = document.querySelector('[data-site-nav]');
      if (nav) nav.classList.toggle('is-open');
    }
  });

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('is-in'); });
  }

  // Product gallery thumb swap
  document.querySelectorAll('[data-product-gallery]').forEach(function(g){
    var main = g.querySelector('[data-product-main]');
    g.querySelectorAll('[data-product-thumb]').forEach(function(thumb){
      thumb.addEventListener('click', function(){
        g.querySelectorAll('[data-product-thumb]').forEach(function(t){ t.classList.remove('is-active'); });
        thumb.classList.add('is-active');
        if (main) {
          var img = main.querySelector('img');
          var src = thumb.getAttribute('data-src');
          if (img && src) img.src = src;
        }
      });
    });
  });

  // Qty steppers
  document.querySelectorAll('[data-qty]').forEach(function(q){
    var input = q.querySelector('input');
    q.querySelectorAll('button').forEach(function(b){
      b.addEventListener('click', function(){
        var d = parseInt(b.getAttribute('data-step') || '1', 10);
        var v = Math.max(1, (parseInt(input.value, 10) || 1) + d);
        input.value = v;
        input.dispatchEvent(new Event('change'));
      });
    });
  });

  // Add to cart (AJAX) — simple flash
  document.querySelectorAll('[data-add-to-cart]').forEach(function(form){
    form.addEventListener('submit', function(e){
      // graceful enhancement; falls back to normal submit if fetch unsupported
      if (!window.fetch) return;
      e.preventDefault();
      var btn = form.querySelector('[type=submit]');
      var originalText = btn ? btn.textContent : '';
      if (btn) btn.textContent = 'Adding…';
      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function(r){ return r.json(); }).then(function(){
        if (btn) btn.textContent = 'Added ✓';
        // bump cart badge
        fetch('/cart.js').then(function(r){ return r.json(); }).then(function(c){
          var badge = document.querySelector('[data-cart-count]');
          if (badge) { badge.textContent = c.item_count; badge.style.display = c.item_count ? '' : 'none'; }
        });
        setTimeout(function(){ if (btn) btn.textContent = originalText; }, 1500);
      }).catch(function(){
        if (btn) btn.textContent = 'Error';
        setTimeout(function(){ if (btn) btn.textContent = originalText; }, 1500);
      });
    });
  });
})();
