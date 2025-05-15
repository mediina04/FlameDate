// ------------------ IMÁGENES Y SWIPE ------------------
const images = document.querySelectorAll('.card-img');
const indicators = document.querySelectorAll('.indicator');
const likeBtn = document.querySelector('[aria-label="Like"]');
const nopeBtn = document.querySelector('[aria-label="Nope"]');
const profileCard = document.querySelector('.profile-card');

let currentIndex = 0;

// Función para mostrar la imagen activa
function showImage(index) {
  if (index < 0 || index >= images.length) return;
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
    indicators[i]?.classList.toggle('active', i === index);
  });
  currentIndex = index;
}

// Función para manejar el swipe visual y lógica
function swipeCard(direction) {
  const animClass = direction === 'left' ? 'swipe-left' : 'swipe-right';
  profileCard.classList.add(animClass);

  setTimeout(() => {
    profileCard.classList.remove(animClass);
    console.log(direction === 'left' ? 'Nope' : 'Like');
  }, 500);
}

// Función para pasar a la siguiente imagen
function nextImage() {
  if (currentIndex < images.length - 1) {
    showImage(currentIndex + 1);
  }
}

// Función para regresar a la imagen anterior
function prevImage() {
  if (currentIndex > 0) {
    showImage(currentIndex - 1);
  }
}

// Evento para los botones de "Like" y "Nope"
likeBtn?.addEventListener('click', () => {
  swipeCard('right');
});

nopeBtn?.addEventListener('click', () => {
  swipeCard('left');
});

// Evento para hacer clic en los bordes de las imágenes
images.forEach(img => {
  img.addEventListener('click', (e) => {
    const rect = img.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX < rect.width / 2) {
      prevImage();
    } else {
      nextImage();
    }
  });
});

// Inicializar la primera imagen como activa
window.addEventListener('DOMContentLoaded', () => {
  showImage(currentIndex);
});

// ------------------ PANEL DE CONFIGURACIÓN ------------------
const configIcon = document.getElementById("toggleConfig");
const configPanel = document.getElementById("config-panel");
const flameList = document.getElementById("flameList");
const distanceRange = document.getElementById("distanceRange");
const distanceValue = document.getElementById("distanceValue");
const minAgeSlider = document.getElementById("minAge");
const maxAgeSlider = document.getElementById("maxAge");
const ageValue = document.getElementById("ageValue");

let configVisible = false;

configIcon?.addEventListener("click", () => {
  configVisible = !configVisible;
  configPanel?.classList.toggle("d-none", !configVisible);
  flameList?.classList.toggle("d-none", configVisible);

  const tabs = document.querySelector(".tabs");
  const configTitle = document.querySelector(".config-title");

  if (configVisible) {
    tabs?.classList.add("d-none");
    configTitle?.classList.remove("d-none");
  } else {
    tabs?.classList.remove("d-none");
    configTitle?.classList.add("d-none");
  }
});

function updateSingleSliderBackground(input) {
  const val = parseInt(input.value);
  const min = parseInt(input.min);
  const max = parseInt(input.max);
  const percent = ((val - min) / (max - min)) * 100;
  input.style.background = `linear-gradient(to right, #ff4d4d 0%, #ff4d4d ${percent}%, rgba(255,255,255,0.2) ${percent}%)`;
}

function updateDualSliderBackground() {
  const min = parseInt(minAgeSlider.min);
  const max = parseInt(maxAgeSlider.max);
  const minVal = parseInt(minAgeSlider.value);
  const maxVal = parseInt(maxAgeSlider.value);

  const minPercent = ((minVal - min) / (max - min)) * 100;
  const maxPercent = ((maxVal - min) / (max - min)) * 100;

  const gradient = `
    linear-gradient(to right,
      rgba(255,255,255,0.2) ${minPercent}%,
      #ff4d4d ${minPercent}%,
      #ff4d4d ${maxPercent}%,
      rgba(255,255,255,0.2) ${maxPercent}%)
  `;

  minAgeSlider.style.background = gradient;
  maxAgeSlider.style.background = gradient;
}

function updateDualSlider() {
  const minVal = parseInt(minAgeSlider.value);
  const maxVal = parseInt(maxAgeSlider.value);

  ageValue.textContent = `${minVal} - ${maxVal}`;
  updateDualSliderBackground();
}

distanceRange?.addEventListener("input", () => {
  distanceValue.textContent = `${distanceRange.value} km`;
  updateSingleSliderBackground(distanceRange);
});

minAgeSlider.addEventListener("input", () => {
  let minVal = parseInt(minAgeSlider.value);
  let maxVal = parseInt(maxAgeSlider.value);

  if (minVal > maxVal - 1) {
    minVal = maxVal - 1;
    minAgeSlider.value = minVal;
  }

  updateDualSlider();
});

maxAgeSlider.addEventListener("input", () => {
  let minVal = parseInt(minAgeSlider.value);
  let maxVal = parseInt(maxAgeSlider.value);

  if (maxVal < minVal + 1) {
    maxVal = minVal + 1;
    maxAgeSlider.value = maxVal;
  }

  updateDualSlider();
});

window.addEventListener("DOMContentLoaded", () => {
  if (distanceRange) {
    distanceValue.textContent = `${distanceRange.value} km`;
    updateSingleSliderBackground(distanceRange);
  }
  if (minAgeSlider && maxAgeSlider) {
    updateDualSlider();
  }
});