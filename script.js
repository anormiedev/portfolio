// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const THEME_KEY = 'portfolio-dark-mode';

const setTheme = (isDark) => {
    html.classList.toggle('dark-mode', isDark);
    localStorage.setItem(THEME_KEY, isDark);
};

const initTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    setTheme(saved !== null ? saved === 'true' : prefersDark);
};

themeToggle?.addEventListener('click', () => setTheme(!html.classList.contains('dark-mode')));
window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem(THEME_KEY) === null) setTheme(e.matches);
});

initTheme();

// Custom Scroll Indicator
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    if (!sections.length) return;

    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);

    const dots = Array.from(sections).map((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'scroll-dot';
        dot.onclick = () => section.scrollIntoView({ behavior: 'smooth' });
        indicator.appendChild(dot);
        return dot;
    });

    let timeout;
    const updateIndicator = () => {
        indicator.classList.add('visible');
        clearTimeout(timeout);
        timeout = setTimeout(() => indicator.classList.remove('visible'), 1500);

        const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
        let current = isBottom ? sections.length - 1 : 0;

        if (!isBottom) {
            let minDist = Infinity;
            sections.forEach((section, i) => {
                const dist = Math.abs(section.getBoundingClientRect().top);
                if (dist < minDist) {
                    minDist = dist;
                    current = i;
                }
            });
        }

        dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    };

    window.addEventListener('scroll', updateIndicator);
    updateIndicator();
});
