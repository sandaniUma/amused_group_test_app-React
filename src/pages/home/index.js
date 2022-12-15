import React, { useState } from "react";
import { Header } from '../../Components/feature-shell/home/header';
import { Cocktailcard } from '../../Components/feature-shell/home/cocktailcard';
import { Searchandfilter } from '../../Components/feature-shell/home/searchandfilter';

const Index = () => {

  const [refresh, setdataToRefresh] = useState(false);
  const [favourites, setdataToFavourites] = useState([]);
  const [singleItemDetail, setdataToSingleItemDetail] = useState([]);
  const [filterDetailsAlcoholic, setdataToFilterDetailsAlcoholic] = useState([]);
  const [filterDetailsCategory, setdataToFilterDetailsCategory] = useState([]);
  const [filterDetailsGlass, setdataToFilterDetailsGlass] = useState([]);

  const handleRefresh = value => {
    setdataToRefresh(value);
  };

  const handleEmitFilterDetails = (condition, details) => {
    if (condition === "Alcoholic") {
      setdataToFilterDetailsAlcoholic(details);
    } else if (condition === "Category") {
      setdataToFilterDetailsCategory(details);
    } else {
      setdataToFilterDetailsGlass(details);
    }
  };

  const handleEmitSearch = array => {
    setdataToSingleItemDetail(array)
  };

  const handleEmitFav = array => {
    setdataToFavourites(array);
  };

  return (
    <>
      <Header
        handleRefresh={handleRefresh}
        refreshValue={refresh}
        favouriteItemDetails={favourites}
      />
      <Searchandfilter
        handleEmitFilterDetails={handleEmitFilterDetails}
        handleEmitSearch={handleEmitSearch}
      />
      <Cocktailcard
        refreshValue={refresh}
        handleEmitFav={handleEmitFav}
        filteredAlcoholic={filterDetailsAlcoholic}
        filteredCategory={filterDetailsCategory}
        filteredGlass={filterDetailsGlass}
        singleItemDetail={singleItemDetail}
      />
    </>
  );
};

export default Index;