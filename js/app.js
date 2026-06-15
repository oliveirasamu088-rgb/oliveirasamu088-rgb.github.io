(function () {
    var loaded = false;

    function loadAnalytics() {
        if (loaded) return;
        loaded = true;

        ['scroll', 'click', 'touchstart', 'mousemove', 'keydown'].forEach(function (e) {
            window.removeEventListener(e, loadAnalytics);
        });

                (function () {
            var s = document.createElement('script');
            s.async = true;
            s.src = 'https://www.googletagmanager.com/gtag/js?id=G-L4VX98GW06';
            document.head.appendChild(s);

            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-L4VX98GW06');
        })();
        
                (function () {
            var s = document.createElement('script');
            s.async = true;
            s.setAttribute('data-id', '101415475');
                        s.src = 'https://static.getclicky.com/js';
                        document.head.appendChild(s);
        })();
            }

    ['scroll', 'click', 'touchstart', 'mousemove', 'keydown'].forEach(function (e) {
        window.addEventListener(e, loadAnalytics, { passive: true });
    });
})();
 document.addEventListener('alpine:init', () => {
            if (!Alpine.store('theme')) {
            Alpine.store('theme', {
                init() {
                    const savedTheme = localStorage.getItem('theme');
                    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    this.theme = savedTheme || systemTheme || 'dark';
                    this.updateTheme();
                },
                theme: 'dark',
                toggle() {
                    this.theme = this.theme === 'light' ? 'dark' : 'light';
                    localStorage.setItem('theme', this.theme);
                    this.updateTheme();
                },
                updateTheme() {
                    if (this.theme === 'dark') {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                }
            });
        }
        });
        (function () {
            try {
                const saved = localStorage.getItem('theme');
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isDark = saved ? saved === 'dark' : true;
                if (isDark) {
                    document.documentElement.classList.add('dark');
                }
            } catch (e) {}
        })();