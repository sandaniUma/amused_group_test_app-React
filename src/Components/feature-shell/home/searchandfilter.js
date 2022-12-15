import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { FaSearch } from "react-icons/fa";
import dataJson from "./data.json";
import {
    searchCocktailsByName,
    filterCocktailsByAlcoholic,
    filterCocktailsByCategory,
    filterCocktailsByGlass
} from "../../../Helpers/Services/cocktails";

export const Searchandfilter = ({handleEmitFilterDetails, handleEmitSearch}) => {

    const [searchText, setSearchText] = useState("");
    const handleSearch = async () => {
        return searchCocktailsByName(searchText).then((res) => {
            handleEmitSearch(res.data.drinks);
        });
    }

    const setDataToFilterByCategory = async (condition, filterText) => {
        if (filterText !== "") {
            if (condition === "Alcoholic") {
                return filterCocktailsByAlcoholic(filterText).then((res) => {
                    handleEmitFilterDetails("Alcoholic", res.data.drinks);
                });
            } else if (condition === "Category") {
                return filterCocktailsByCategory(filterText).then((res) => {
                    handleEmitFilterDetails("Category", res.data.drinks);
                });
            } else {
                return filterCocktailsByGlass(filterText).then((res) => {
                    handleEmitFilterDetails("Glass", res.data.drinks);
                });
            }
        }
    }

  return (
    <>
        <Container className='searchAndFilterSection'>
            <Card className="filterContainer">
                <Card.Body>
                    <Row className="mt-3">
                        <Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8} className="textAllignFilterSection">
                            <Row>
                                <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                    <Form.Label>
                                        Filter By Alcoholic
                                    </Form.Label>
                                    <Form.Select
                                        aria-label="Default select"
                                        id="select-element-test-id-alcoholic"
                                        onClick={(event) => setDataToFilterByCategory("Alcoholic", event.target.value)}
                                    >
                                        {dataJson.alcoholicArray.map((object, idx) => (
                                            <option key={idx} value={object.value} >
                                                {object.text}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                    <Form.Label>
                                        Filter By Category
                                    </Form.Label>
                                    <Form.Select
                                        aria-label="Default select"
                                        id="select-element-test-id-category"
                                        onClick={(event) => setDataToFilterByCategory("Category", event.target.value)}
                                    >
                                        {dataJson.categoryArray.map((object1, idx1) => (
                                            <option key={idx1} value={object1.value} >
                                                {object1.text}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                    <Form.Label>
                                        Filter By Glasses
                                    </Form.Label>
                                    <Form.Select
                                        aria-label="Default select"
                                        id="select-element-test-id-glass"
                                        onClick={(event) => setDataToFilterByCategory("Glass", event.target.value)}
                                    >
                                        {dataJson.glassArray.map((object2, idx2) => (
                                            <option key={idx2} value={object2.value} >
                                                {object2.text}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} className="marginTopInMobile textAllignFilterSection">
                            <Form.Label>
                            Search by name
                            </Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter item ..."
                                    id="select-element-test-id-search-bar"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                                <Button
                                    variant="outline-warning"
                                    id="button-addon2"
                                    className="select-element-test-id-search-btn"
                                    onClick={event => handleSearch()}
                                >
                                    Search &nbsp;
                                    <FaSearch className='verticalCenter' />
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    </>
  );
};
