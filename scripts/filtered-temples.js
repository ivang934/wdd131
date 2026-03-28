
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Buenos Aires Argentina",
    location: "Buenos Aires, Argentina",
    dedicated: "1986, October, 9",
    area: 61900,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/buenos-aires-argentina/800x500/buenos-airies-argentina-temple-1009069-wallpaper.jpg"
  },
  {
    templeName: "Brigham City Utah",
    location: "Brigham City, Utah, United States",
    dedicated: "2012, September, 23",
    area: 16700,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/brigham-city-utah/800x500/brigham-city-temple-lds-1027480-wallpaper.jpg"
  },
  {
    templeName: "Columbia River Washington",
    location: "Vancouver, Washington, United States",
    dedicated: "2009, March, 22",
    area: 16250,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/columbia-river-washington/800x500/columbia-river-temple-lds-130323-wallpaper.jpg"
  }
];

const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menu');
const gallery = document.querySelector('.gallery');
const navLinks = document.querySelectorAll('.navigation a');

function parseYear(dedicated) {
  const match = dedicated.match(/\d{4}/);
  return match ? Number(match[0]) : NaN;
}

function createTempleCard(temple) {
  const article = document.createElement('article');
  article.className = 'temple-card';

  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = temple.imageUrl;
  img.alt = `${temple.templeName}`;
  img.loading = 'lazy';
  figure.appendChild(img);

  const caption = document.createElement('figcaption');
  caption.textContent = temple.templeName;
  figure.appendChild(caption);

  const details = document.createElement('div');
  details.className = 'temple-details';
  details.innerHTML = `
    <h3>${temple.templeName}</h3>
    <p><strong>Location:</strong> ${temple.location}</p>
    <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
    <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
  `;

  article.appendChild(figure);
  article.appendChild(details);
  return article;
}

function displayTemples(list) {
  gallery.innerHTML = '';
  list.forEach((temple) => gallery.appendChild(createTempleCard(temple)));
}

function filterTemples(category) {
  const filter = category.trim().toLowerCase();

  switch (filter) {
    case 'home':
      return temples;
    case 'old':
      return temples.filter((temple) => parseYear(temple.dedicated) < 1900);
    case 'new':
      return temples.filter((temple) => parseYear(temple.dedicated) > 2000);
    case 'large':
      return temples.filter((temple) => temple.area > 90000);
    case 'small':
      return temples.filter((temple) => temple.area < 10000);
    default:
      return temples;
  }
}

function setActiveLink(label) {
  navLinks.forEach((link) => {
    link.classList.toggle(
      'active',
      link.textContent.trim().toLowerCase() === label.trim().toLowerCase()
    );
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const category = event.currentTarget.textContent;
    setActiveLink(category);
    displayTemples(filterTemples(category));
  });
});

hambutton.addEventListener('click', () => {
  mainnav.classList.toggle('show');
  hambutton.classList.toggle('open');
});

setActiveLink('Home');
displayTemples(temples);
