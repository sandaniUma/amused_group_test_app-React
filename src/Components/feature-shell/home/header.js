import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import { FaSyncAlt, FaTrashAlt } from "react-icons/fa";

export const Header = ({handleRefresh, refreshValue, favouriteItemDetails}) => {

  const [lgShow, setLgShow] = useState(false);

  const handleRemoveItem = (index) => {
    favouriteItemDetails.splice(index, 1);
    setLgShow(!lgShow);
  }

  return (
    <>
      <Container className='fixedContainer'>
        <Row>
          <Col className='siteLogoHeader' xs={12} sm={12} md={7} lg={8} xl={8} xxl={8}>
            <img
              className="d-block"
              src="https://mcusercontent.com/6003ec7889e9bec09d681656c/images/0f088b26-c86f-236a-987a-83aa6eebf50a.png"
              alt="Web Site Logo"
            />
          </Col>
          <Col className='navigationBarHeader' xs={12} sm={12} md={5} lg={4} xl={4} xxl={4}>
            <Nav defaultActiveKey="" as="ul">
              <Nav.Item as="li">
                <Nav.Link href="" eventKey="link-1">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link id="select-element-test-id-favourites" onClick={() => setLgShow(true)} eventKey="link-2">Favourites</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Button variant="outline-warning" onClick={event => handleRefresh(!refreshValue)}>
                  <FaSyncAlt className='verticalCenter' />
                </Button>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          centered
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg" className='select-element-test-id-favourit-list'>
              Favourite List
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='overFlowAutoClass'>
            <Table striped responsive>
              <thead>
                  <tr>
                    <th></th>
                    <th className='tableDataInFav'>Name</th>
                    <th className='tableDataInFav'>Category</th>
                    <th className='tableDataInFav'>Alcoholic</th>
                    <th className='tableDataInFav'>Action</th>
                  </tr>
                </thead>
                {favouriteItemDetails.length === 0 ? 
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td className='tableDataInFavNoRec'>
                        <p>No records found.</p>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                :
                  <tbody>
                    {favouriteItemDetails.map((object, idx) => (
                      <tr key={idx}>
                        <td className='tableDataInFav'>
                          <img
                            className="d-block favImageInTable"
                            src={object.strDrinkThumb}
                            alt="Web Site Logo"
                          />
                        </td>
                        <td className='tableDataInFav'>
                          {object.strDrink}
                        </td>
                        <td className='tableDataInFav'>
                          <Badge pill bg="warning" text="dark">
                            {object.strCategory}
                          </Badge>
                        </td>
                        <td className='tableDataInFav'>
                          <Badge pill bg="warning" text="dark">
                            {object.strAlcoholic}
                          </Badge>
                        </td>
                        <td className='tableDataInFav'>
                          <Button variant="danger" className='verticalCenter' onClick={event => handleRemoveItem(idx)}>
                            <FaTrashAlt />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                }
            </Table>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};
