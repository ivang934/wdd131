const landscapes = [
  {
    id: 1,
    name: 'Perito Moreno Glacier',
    region: 'patagonia-sur',
    regionLabel: 'South Patagonia',
    province: 'Santa Cruz',
    description: 'One of the most active glaciers in the world, with a 60-meter-high ice face that advances towards Lake Argentino. Declared a World Heritage Site by UNESCO.',
    img: 'https://torresdelpaine.com/wp-content/uploads/sites/6/2023/08/atractivo-glaciar-perito-moreno-1.jpg',
    alt: 'Blue face of the Perito Moreno Glacier with icebergs floating in the lake'
  },
  {
    id: 2,
    name: 'Iguazu Falls',
    region: 'noreste',
    regionLabel: 'Northeast',
    province: 'Misiones',
    description: 'The widest waterfall system in the world: 275 drops spread across 2.7 km, surrounded by subtropical jungle. The Devil\'s Throat is its most impressive point.',
    img: 'https://iguazufalls.com/wp-content/uploads/bg-new-demo-iguazu-1024x576.jpg',
    alt: 'Iguazu Falls viewed from the lower walkway with a visible rainbow'
  },
  {
    id: 3,
    name: 'Quebrada de Humahuaca',
    region: 'noroeste',
    regionLabel: 'Northwest',
    province: 'Jujuy',
    description: 'Andean valley inhabited for ten thousand years, famous for its colorful hills that change hues with the daylight. Cultural and Natural Heritage of Humanity.',
    img: 'https://static1.evcdn.net/images/reduction/1144506_w-3840_h-2160_q-70_m-crop.jpg',
    alt: 'Ochre and red colored hills of the Quebrada de Humahuaca at sunset'
  },
  {
    id: 4,
    name: 'Nahuel Huapi Lake',
    region: 'patagonia-norte',
    regionLabel: 'North Patagonia',
    province: 'Río Negro',
    description: 'Turquoise glacial lake surrounded by Andean-Patagonian forests and snow-capped peaks. Center of the first National Park in Argentina, with Bariloche as its gateway.',
    img: 'https://cdn.britannica.com/01/122401-050-BCF5A6DB/Nahuel-Huapi-National-Park-Argentina.jpg',
    alt: 'Nahuel Huapi Lake with snow-capped mountains and forests reflected in the water'
  },
  {
    id: 5,
    name: 'Valle de la Luna',
    region: 'cuyo',
    regionLabel: 'Cuyo',
    province: 'San Juan',
    description: 'Lunar landscape formed by erosion over 230 million years in the Ischigualasto Provincial Park. Some of the world\'s oldest prehistoric reptiles were found here.',
    img: 'https://elcairotravel.tur.ar/ievt/assets/agencias/elcairo/img/exc-54-Valle-de-la-luna1-1.jpg',
    alt: 'Reddish rock formations of the Valle de la Luna at sunset'
  },
  {
    id: 6,
    name: 'Mount Aconcagua',
    region: 'cuyo',
    regionLabel: 'Cuyo',
    province: 'Mendoza',
    description: 'The highest peak in the Western Hemisphere, at 6,960 meters above sea level. It attracts mountaineers from all over the world and offers high mountain landscapes of exceptional grandeur.',
    img: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/95/b8/8f.jpg',
    alt: 'Snowy peak of Mount Aconcagua against the blue sky of the Andes'
  }
];

function loadFavorites() {
  return JSON.parse(localStorage.getItem('ar-favorites') || '[]');
}

function saveFavorites(favorites) {
  localStorage.setItem('ar-favorites', JSON.stringify(favorites));
  if (typeof updateFavoritesCount === 'function') {
    updateFavoritesCount();
  }
}

function toggleFavorite(id) {
  const favorites = loadFavorites();
  const index     = favorites.indexOf(id);

  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }

  saveFavorites(favorites);
  updateFavoritesBar();

  const btn     = document.querySelector(`[data-fav-id="${id}"]`);
  const isSaved = favorites.includes(id);

  if (btn) {
    btn.classList.toggle('saved', isSaved);
    btn.setAttribute('aria-pressed', String(isSaved));
    btn.textContent = `${isSaved ? '❤' : '♡'} ${isSaved ? 'Saved' : 'Save'}`;
  }
}

function buildCard(place) {
  const favorites = loadFavorites();
  const isFav     = favorites.includes(place.id);

  return `
    <article class="card">
      <div class="card-img-wrap">
        <img
          src="${place.img}"
          alt="${place.alt}"
          width="800"
          height="500"
          loading="lazy"
        >
        <span class="card-region-badge">${place.regionLabel}</span>
      </div>
      <div class="card-body">
        <h2 class="card-title">${place.name}</h2>
        <p class="card-desc">${place.description}</p>
        <div class="card-footer">
          <span class="card-province"><strong>Province:</strong> ${place.province}</span>
          <button
            class="fav-btn ${isFav ? 'saved' : ''}"
            data-fav-id="${place.id}"
            aria-pressed="${String(isFav)}"
            onclick="toggleFavorite(${place.id})"
          >
            ${isFav ? '❤ Saved' : '♡ Save'}
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderCards(data) {
  const grid = document.getElementById('places-grid');
  if (!grid) return;

  if (data.length === 0) {
    grid.innerHTML = `<p class="no-results">No places available for this region.</p>`;
    return;
  }

  grid.innerHTML = data.map(place => buildCard(place)).join('');
}

function filterByRegion(region) {
  const result = region === 'all'
    ? landscapes
    : landscapes.filter(place => place.region === region);

  renderCards(result);
}

function updateFavoritesBar() {
  const bar = document.getElementById('fav-counter');
  if (!bar) return;

  const favorites = loadFavorites();

  if (favorites.length === 0) {
    bar.textContent = 'You haven\'t saved any favorite places yet.';
    return;
  }

  const names = favorites
    .map(id => {
      const place = landscapes.find(p => p.id === id);
      return place ? place.name : null;
    })
    .filter(Boolean);

  const count = favorites.length;
  bar.innerHTML = `❤ You have <strong>${count}</strong> saved place${count === 1 ? '' : 's'}: ${names.join(', ')}`;
}

function initFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterByRegion(btn.dataset.region);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCards(landscapes);
  updateFavoritesBar();
  initFilterButtons();
});