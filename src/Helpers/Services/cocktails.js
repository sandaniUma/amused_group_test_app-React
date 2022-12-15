import { get } from '../APICore';
import * as url from '../URLs';

// Get Random Cocktails
export const getRandomCocktails = async () =>
  get(url.GET_RANDOM_COCKTAILS, {
    headers: {
      'Content-type': 'application/json'
    },
  });

// Search Cocktails
export const searchCocktailsByName = async (
  searchText
) => {
  const res = await get(
    url.SEARCH_COCKTAILS_BY_NAME +
      `?s=${searchText}`,
    null,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return res;
};

// Filter Cocktails By Alcoholic
export const filterCocktailsByAlcoholic = async (
  filterText
) => {
  const res = await get(
    url.FILTER_COCKTAILS +
      `?a=${filterText}`,
    null,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return res;
};

// Filter Cocktails By Category
export const filterCocktailsByCategory = async (
  filterText
) => {
  const res = await get(
    url.FILTER_COCKTAILS +
      `?c=${filterText}`,
    null,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return res;
};

// Filter Cocktails By Glass
export const filterCocktailsByGlass = async (
  filterText
) => {
  const res = await get(
    url.FILTER_COCKTAILS +
      `?g=${filterText}`,
    null,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return res;
};

// Get Details By ID
export const getDetailsById = async (
  id
) => {
  const res = await get(
    url.GET_COCKTAILS_BY_ID +
      `?i=${id}`,
    null,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return res;
};