document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('searchInput');
  const cards = Array.from(document.querySelectorAll('.member-card'));

  function normalize(str) {
    return (str || '').toLowerCase().trim();
  }

  function filterMembers(value) {
    const q = normalize(value);
    cards.forEach(card => {
      const name = normalize(card.dataset.name);
      const skills = normalize(card.dataset.skills);
      const show = name.includes(q) || skills.includes(q);
      card.style.display = show ? '' : 'none';
    });
  }

  if (search) {
    search.addEventListener('input', (e) => filterMembers(e.target.value));
  }

  // Simple scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.member-card, .glass-card').forEach(el => {
    el.classList.add('pre-reveal');
    observer.observe(el);
  });
});