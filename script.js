document.addEventListener('DOMContentLoaded', function() {
  // Инициализация переключения темы (только если кнопка существует)
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const currentTheme = localStorage.getItem('theme') || 'light-theme';
    document.body.className = currentTheme;
    updateButtonText();

    themeToggle.addEventListener('click', function() {
      if (document.body.classList.contains('light-theme')) {
        document.body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark-theme');
      } else {
        document.body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light-theme');
      }
      updateButtonText();
    });
  } else {
    console.warn('Кнопка переключения темы (id="theme-toggle") не найдена — функционал темы отключён.');
  }

  function updateButtonText() {
    if (themeToggle) {
      themeToggle.textContent = document.body.classList.contains('dark-theme')
        ? 'Светлая☀️'
        : 'Тёмная🌙';
    }
  }

  // Инициализация слайдера (только если элементы существуют)
  const slider = document.querySelector('.slider');
  const line = document.querySelector('.slider-line');
  const titleNode = document.getElementById('city-title');
  const descNode = document.getElementById('city-desc');

  if (slider && line && titleNode && descNode) {
    const textData = [
      { title: "Токио, Япония", desc: "Ультрасовременный мегаполис, где неоновые небоскрёбы соседствуют с древними синтоистскими храмами." },
      { title: "Бангкок, Таиланд", desc: "Город контрастов с яркой уличной жизнью, великолепными дворцами и шумными ночными рынками." },
      { title: "Бали, Индонезия", desc: "Тропический рай, знаменитый своими изумрудными рисовыми террасами, пляжами и культурой сёрфинга." },
      { title: "Улан‑Батор, Монголия", desc: "Страна в Центральной Азии без выхода к морю, известна степями и пустыней Гоби. "},
      { title: "Пхеньян, Северная Корея (КНДР)", desc: "Изолированное государство на севере Корейского полуострова с административно‑командной системой и идеологией чучхе."},
      { title: "Сеул, Южная Корея (Республика Корея)", desc: "Высокоразвитая демократия на юге Корейского полуострова, мировой лидер в технологиях и автомобилестроении, известна K‑pop и дорамами."}
    ];

    let count = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    function startDrag(e) {
      isDragging = true;
      line.style.transition = 'none';
      startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    }

    function moveDrag(e) {
      if (!isDragging) return;
      currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const diffX = currentX - startX;
      const baseOffset = -count * slider.clientWidth;
      line.style.transform = `translateX(${baseOffset + diffX}px)`;
    }

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      line.style.transition = 'transform 0.3s ease-out';
      const diffX = currentX - startX;

      if (diffX < -50 && count < textData.length - 1) {
        count++;
      } else if (diffX > 50 && count > 0) {
        count--;
      }

      updateSlider();
    }

    function updateSlider() {
      line.style.transform = `translateX(-${count * slider.clientWidth}px)`;
      titleNode.textContent = textData[count].title;
      descNode.textContent = textData[count].desc;
    }

    // События мыши
    slider.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', moveDrag);
    window.addEventListener('mouseup', endDrag);

    // События тач-экрана
    slider.addEventListener('touchstart', startDrag);
    slider.addEventListener('touchmove', moveDrag);
    slider.addEventListener('touchend', endDrag);
  }
});
