(function () {
    var colors = [
        { bg: '#000000', ink: '#f4f1ea' },
        { bg: '#1A43FF', ink: '#f4f1ea' },
        { bg: '#8B1E3F', ink: '#f4f1ea' },
        { bg: '#2EE0D0', ink: '#101418' }
    ];

    var words = [
        { text: 'OPREZNO!', lang: 'sr' },
        { text: 'ОСТОРОЖНО!', lang: 'ru' },
        { text: 'CAUTION!', lang: 'en' }
    ];

    var root = document.documentElement;
    var caution = document.getElementById('caution');
    var wordEl = document.getElementById('caution-word');
    var still = document.getElementById('caution-still');

    var HOLD = 3600;
    var FADE = 420;
    var step = 0;
    var fadeTimer = 0;
    var cycleTimer = 0;

    var params = new URLSearchParams(location.search);
    var frozen = params.has('at') ? parseInt(params.get('at'), 10) : NaN;
    if (!isNaN(frozen) && frozen >= 0) step = frozen;

    function applyColor(color) {
        root.style.setProperty('--bg', color.bg);
        root.style.setProperty('--ink', color.ink);
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', color.bg);
    }

    function applyWord(word) {
        wordEl.textContent = word.text;
        wordEl.lang = word.lang;
    }

    function paint(index, animate) {
        var color = colors[index % colors.length];
        var word = words[index % words.length];

        if (!animate) {
            applyColor(color);
            applyWord(word);
            caution.classList.remove('is-leaving');
            return;
        }

        caution.classList.add('is-leaving');
        clearTimeout(fadeTimer);
        fadeTimer = setTimeout(function () {
            applyColor(color);
            applyWord(word);
            void caution.offsetWidth;
            caution.classList.remove('is-leaving');
        }, FADE);
    }

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var locked = !isNaN(frozen) && frozen >= 0;

    if (reduce && !locked) {
        applyColor(colors[0]);
        caution.hidden = true;
        still.hidden = false;
        return;
    }

    paint(step, false);

    if (!locked && !reduce) {
        cycleTimer = setInterval(function () {
            step += 1;
            paint(step, true);
        }, HOLD);
    }

    window.addEventListener('pagehide', function () {
        clearInterval(cycleTimer);
        clearTimeout(fadeTimer);
    });
})();
