function createInfiniteSlider() {
  const sliderContainer = document.querySelector('.js-slider');
  const slider = sliderContainer.querySelector('.slider');
  const sliderItems = slider.querySelectorAll('.slider__item');
  const nextButton = sliderContainer.querySelector('.slider__arrow_next');
  const slideWidth = sliderItems[0].offsetWidth + 24;
  let currentIndex = 0;

  function cloneAndAppendSlide() {
    const firstSlideClone = sliderItems[currentIndex].cloneNode(true);
    slider.appendChild(firstSlideClone);
  }

  function nextSlide() {
    currentIndex++;
    if (currentIndex >= sliderItems.length) {
      currentIndex = 0;
      cloneAndAppendSlide();
    }
    slider.style.transition = 'transform 0.3s ease-in-out';
    slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

    // Проверка, достиг ли слайдер крайнего правого положения
    const totalWidth = slideWidth * (sliderItems.length + 1);
    const currentOffset = slideWidth * (currentIndex + 1);
    if (currentOffset >= totalWidth) {
      setTimeout(() => {
        slider.style.transition = 'none';
        slider.style.transform = `translateX(0)`;
        currentIndex = 0;
      }, 300);
    }
  }

  nextButton.addEventListener('click', nextSlide);

  let touchStartX = 0;
  let touchEndX = 0;

  sliderContainer.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
  });

  sliderContainer.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) {
      nextSlide();
    }
  });
}

createInfiniteSlider();