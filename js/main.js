
document.addEventListener('DOMContentLoaded', function () {
  const charactersList = document.getElementById('characters-list');
  const paginationContainer = document.getElementById('pagination');

  const charactersPerPage = 10;
  let currentPage = 1;

  //получения данных с SWAPI
  async function fetchCharacters(page) {
    try {
      const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Функция для отображения персонажей на странице
  function displayCharacters(characters) {
    charactersList.innerHTML = ''; // Очищаем предыдущий контент

    characters.results.forEach(character => {
      const characterCard = document.createElement('div');
      characterCard.classList.add('character-card');

      characterCard.innerHTML = `
              <h2>${character.name}</h2>
              <p>Height: ${character.height} cm</p>
              <p>Mass: ${character.mass} kg</p>
              <p>Hair Color: ${character.hair_color}</p>
              <img src="https://starwars-visualguide.com/assets/img/characters/${getCharacterId(character.url)}.jpg" alt="${character.name}">
          `;

      charactersList.appendChild(characterCard);
    });

    // Отображение пагинации
    displayPagination(characters);
  }

  // Функция для отображения пагинации
  function displayPagination(characters) {
    const totalPages = Math.ceil(characters.count / charactersPerPage);

    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.innerText = i;
      pageButton.addEventListener('click', () => changePage(i));

      if (i === currentPage) {
        pageButton.classList.add('active');
      }

      paginationContainer.appendChild(pageButton);
    }
  }

  // Функция для изменения текущей страницы
  function changePage(page) {
    currentPage = page;
    fetchCharacters(page).then(displayCharacters);
  }

  // Функция для извлечения ID персонажа из URL
  function getCharacterId(url) {
    const idRegex = /\/(\d+)\/$/;
    const match = url.match(idRegex);
    return match ? match[1] : '';
  }

  // Инициируем загрузку и отображение данных (начинаем с первой страницы)
  fetchCharacters(currentPage).then(displayCharacters);
});
