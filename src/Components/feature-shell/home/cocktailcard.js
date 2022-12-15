import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { FaPlus } from "react-icons/fa";
import { getRandomCocktails, getDetailsById } from "../../../Helpers/Services/cocktails";

let ignoreFunction = false;
let dumyCocktailArray = [];
let selectedDataList = [];
export const Cocktailcard = ({
    handleEmitFav,
    refreshValue,
    filteredAlcoholic,
    filteredCategory,
    filteredGlass,
    singleItemDetail
  }) => {
  const [cocktailArray, setDataToCocktailArray] = useState([]);
  const [cocktailArrayDump, setDataToCocktailArrayDump] = useState([]);
  const [cocktailArrayFilterByAlcoholic, setDataToCocktailArrayFilterByAlcoholic] = useState([]);
  const [cocktailArrayFilterByCategory, setDataToCocktailArrayFilterByCategory] = useState([]);
  const [cocktailArrayFilterByGlass, setDataToCocktailArrayFilterByGlass] = useState([]);
  const [cocktailArraySearchDetaios, setDataToCocktailArraySearchDetaios] = useState([]);
  const [showComp, setdataToShowComp] = useState(true);

  useEffect(() => {
    if (ignoreFunction === false) {
      for (let i = 0; i < 8; i++) {
        handleGetRandomCocktailsDetails(1);
      }
      setdataToShowComp(false);
      ignoreFunction = !ignoreFunction;
    } else if (refreshValue) {
      dumyCocktailArray = [];
      for (let x = 0; x < 8; x++) {
        handleGetRandomCocktailsDetails(2);
      }
    } else if (filteredAlcoholic?.length !== 0) {
      dumyCocktailArray = [];
      for (let z = 0; z < filteredAlcoholic.length; z++) {
        handleGetRandomCocktailsDetails(3, filteredAlcoholic[z].idDrink);
      }
    } else if (filteredCategory?.length !== 0) {
      dumyCocktailArray = [];
      for (let c = 0; c < filteredCategory.length; c++) {
        handleGetRandomCocktailsDetails(4, filteredCategory[c].idDrink);
      }
    } else if (filteredGlass?.length !== 0) {
      dumyCocktailArray = [];
      for (let v = 0; v < filteredGlass.length; v++) {
        handleGetRandomCocktailsDetails(5, filteredGlass[v].idDrink);
      }
    } else if (singleItemDetail?.length !== 0) {
      dumyCocktailArray = [];
      handleGetRandomCocktailsDetails(6);
    }
  }, [
    refreshValue,
    filteredAlcoholic,
    filteredCategory,
    filteredGlass,
    singleItemDetail
  ]);

  const handleGetRandomCocktailsDetails = async (val,id) => {
    if (val === 1) {
      return getRandomCocktails().then((res) => {
        setDataToCocktailArray(cocktailArray.push(res.data.drinks[0]));
        dumyCocktailArray = cocktailArray;
      });
    } else if (val === 2) {
      return getRandomCocktails().then((res) => {
        setDataToCocktailArrayDump(cocktailArrayDump.push(res.data.drinks[0]));
        dumyCocktailArray = cocktailArrayDump;
        setDataToCocktailArrayDump([]);
      });
    } else if (val === 3) {
      return getDetailsById(id).then((res) => {
        setDataToCocktailArrayFilterByAlcoholic(cocktailArrayFilterByAlcoholic.push(res.data.drinks[0]));
        dumyCocktailArray = cocktailArrayFilterByAlcoholic;
        setDataToCocktailArrayFilterByAlcoholic([]);
      });
    } else if (val === 4) {
      return getDetailsById(id).then((res) => {
        setDataToCocktailArrayFilterByCategory(cocktailArrayFilterByCategory.push(res.data.drinks[0]));
        dumyCocktailArray = cocktailArrayFilterByCategory;
        setDataToCocktailArrayFilterByCategory([]);
      });
    } else if (val === 5) {
      return getDetailsById(id).then((res) => {
        setDataToCocktailArrayFilterByGlass(cocktailArrayFilterByGlass.push(res.data.drinks[0]));
        dumyCocktailArray = cocktailArrayFilterByGlass;
        setDataToCocktailArrayFilterByGlass([]);
      });
    } else if (val === 6) {
      setDataToCocktailArraySearchDetaios(cocktailArraySearchDetaios.push(singleItemDetail[0]));
      dumyCocktailArray = cocktailArraySearchDetaios;
      setDataToCocktailArraySearchDetaios([]);
    }
  };

  const handleAddToFav = (object) => {
    selectedDataList.push(object);
    let array = selectedDataList;
    selectedDataList = Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
    handleEmitFav(selectedDataList);
  }

  return (
    <>
      <Container>
        <Row className="commonBreakElement">
            {dumyCocktailArray.map((object, idx) => (
              <Col key={idx} xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
                <Card className="mt-3 helightCard select-element-test-id-item-card-section">
                  {showComp
                    ? <Spinner animation="border" size="sm" variant="warning" />
                    : null
                  }
                  <Card.Img
                    variant="top"
                    src={object.strDrinkThumb}
                  />
                  <Card.Body className="cardBodyCocktail">
                    <Card.Title id="select-element-test-id-item-card-heading" className="fontStylesInCardTitle">{object.strDrink}</Card.Title>
                    <Badge pill bg="warning" text="dark">
                      <span className="select-element-test-id-item-card-heading-badge-1">
                        {object.strCategory}
                      </span>
                      {' - '}
                      <span className="select-element-test-id-item-card-heading-badge-2">
                        {object.strAlcoholic}
                      </span>
                    </Badge>
                    <hr />
                    <Card.Text className="fontStylesInSradText">
                      {object.strInstructions !== undefined || null || "" ? object.strInstructions : "-"}
                      <div className="mt-4 select-element-test-id-item-card-body-for-glass-type">
                        <b>
                          Glass: {object.strGlass}
                        </b>
                      </div>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button id="select-element-test-id-item-add-to-fav-btn" onClick={event => handleAddToFav(object)} variant="outline-warning">
                      Add to favourites &nbsp;
                      <FaPlus className='verticalCenter' />
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};
