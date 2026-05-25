/* Shared navbar / footer + behaviors */

function injectNav(active) {
  const links = [
    ['index.html', 'Home'],
    ['about.html', 'About'],
    ['companies.html', 'Group Companies'],
    ['infrastructure.html', 'Infrastructure'],
    ['industries.html', 'Industries Served'],
    ['contact.html', 'Contact'],
  ];
  const nav = `
  <header class="nav">
    <div class="container nav-inner">
      <a class="brand" href="index.html">
        <div class="brand-mark">T</div>
        <div class="brand-text">
          <div class="name">TORQUE GROUP</div>
          <div class="sub">Maritime · Engineering · Since 1991</div>
        </div>
      </a>
      <nav class="nav-links">
        ${links.map(([h,l]) => `<a href="${h}" class="${active===h?'active':''}">${l}</a>`).join('')}
      </nav>
      <a href="contact.html" class="btn btn-accent btn-sm">
        Get In Touch
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
  </header>`;
  document.body.insertAdjacentHTML('afterbegin', nav);
}

function injectFooter() {
  const f = `
  <footer>
    <div class="container">
      <div class="footer-trust">
        <div class="footer-trust-head">
          <span class="eyebrow" style="color:rgba(255,255,255,0.65);">TRUST &amp; CERTIFICATIONS</span>
          <h4 style="font-family:'Barlow Condensed',sans-serif;font-size:22px;color:#fff;letter-spacing:0;text-transform:none;margin:6px 0 0;">Compliance-led maritime engineering</h4>
        </div>
        <div class="footer-certs">
          <div class="fc"><div class="code">ISO 9001</div><div class="desc">Quality Mgmt.</div></div>
          <div class="fc"><div class="code">IRS</div><div class="desc">Indian Register</div></div>
          <div class="fc"><div class="code">IACS</div><div class="desc">Class Aligned</div></div>
          <div class="fc"><div class="code">IMO</div><div class="desc">Compliant</div></div>
          <div class="fc"><div class="code">DIN</div><div class="desc">German Std.</div></div>
          <div class="fc"><div class="code">DGS</div><div class="desc">Approved</div></div>
        </div>
      </div>
      <div class="cols">
        <div>
          <a class="brand" href="index.html">
            <div class="brand-mark">T</div>
            <div class="brand-text">
              <div class="name">TORQUE GROUP</div>
              <div class="sub">Maritime · Engineering</div>
            </div>
          </a>
          <p class="desc">A maritime engineering holding group operating manufacturing, marine services, technical training and industrial systems across India and Germany since 1991.</p>
        </div>
        <div>
          <h4>Companies</h4>
          <a href="companies.html#institute">Torque Technics Institute</a>
          <a href="companies.html#chennai">Torque Technics Chennai</a>
          <a href="companies.html#subhags">Subhags Engineers</a>
          <a href="companies.html#nulite">Nulite</a>
          <a href="companies.html#wolff">Armaturen-Wolff LLP</a>
        </div>
        <div>
          <h4>Group</h4>
          <a href="about.html">About</a>
          <a href="infrastructure.html">Infrastructure</a>
          <a href="industries.html">Industries Served</a>
          <a href="contact.html">Contact</a>
        </div>
        <div>
          <h4>Offices</h4>
          <p class="desc">Pune · Mumbai · Chennai · Hamburg<br/>Operations across 4 cities, 2 countries.</p>
          <p class="desc" style="margin-top:10px;">+91 22 0000 0000<br/>contact@torquegroup.com</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 TORQUE GROUP · ALL RIGHTS RESERVED</span>
        <span>ISO 9001 · IRS · IACS · IMO COMPLIANT</span>
      </div>
    </div>
  </footer>`;
  document.body.insertAdjacentHTML('beforeend', f);
}

document.addEventListener('DOMContentLoaded', () => {
  const active = document.body.getAttribute('data-page') || 'index.html';
  injectNav(active);
  injectFooter();

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Company picker (contact)
  document.querySelectorAll('.div-pick .pick').forEach(p => {
    p.addEventListener('click', () => {
      document.querySelectorAll('.div-pick .pick').forEach(x => x.classList.remove('active'));
      p.classList.add('active');
      const target = p.getAttribute('data-target');
      const panel = document.getElementById('company-detail');
      if (target && panel) {
        document.querySelectorAll('#company-detail .cd').forEach(cd => cd.hidden = true);
        const active = document.querySelector(`#company-detail .cd[data-co="${target}"]`);
        if (active) active.hidden = false;
      }
    });
  });

  // Prevent default on inquiry submit (wireframe only)
  const f = document.getElementById('inquiry-form');
  if (f) f.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Inquiry routed (wireframe demo).');
  });
});
