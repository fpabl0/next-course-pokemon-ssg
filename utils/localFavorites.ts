

const toggleFavorite = (id: number) => {
  let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || "[]");

  if (favorites.includes(id)) {
    favorites = favorites.filter(pokeId => id !== pokeId);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const existsInFavorites = (id: number) => {
  const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || "[]");
  return favorites.includes(id);
};

const pokemons = (): number[] => {
  return JSON.parse(localStorage.getItem('favorites') || "[]");
};

export default {
  toggleFavorite,
  existsInFavorites,
  pokemons,
};