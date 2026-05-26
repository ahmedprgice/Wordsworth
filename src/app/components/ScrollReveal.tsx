import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'));

    if (!sections.length) return;

    sections.forEach((section) => section.classList.add('scroll-reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight * 0.92;

      if (alreadyVisible) {
        section.classList.add('is-visible');
      } else {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
