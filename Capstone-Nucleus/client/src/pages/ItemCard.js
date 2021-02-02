import React from "react"
import { useHistory } from "react-router-dom"
import { Button, Col, Row } from "react-bootstrap"

const ItemCard = ({ item }) => {

    const history = useHistory();

    console.log(item.itemPicture)
    const Preview = () => {
        if (item.itemPicture !== null) {
            return <Row >
                <img className="overflow-auto ml-2" id="itemCardPicture-Image" md={2} src={item.itemPicture} />
                <Col className="overflow-auto" id="itemCardDepartment-Image" md={2}>{item.department.name}</Col>
                <Col className="overflow-auto" id="itemCardVendor-Image" md={2}>{item.vendorName}</Col>
                <Col className="overflow-auto" id="itemCardName-Image" md={2}>{item.itemName}</Col>
                <Col className="overflow-auto" id="itemCardSKU-Image" md={1}>{item.itemSKU}</Col>
                <Col className="overflow-auto" id="itemCardPrice-Image" md={1}>{item.unitPrice}</Col>
                <Col className="overflow-auto" id="itemCardQuantity-Image" md={1}>{item.quantity}</Col>
                <Button
                    onClick={() => {
                        history.push(`/edititem/${item.id}`)
                    }}
                    style={{ fontSize: 14, height: 50, marginLeft: 2, marginRight: 2, marginTop: 50, width: 70 }}
                    type="button"
                    variant="info"
                >Edit
                        </Button>
                <Button
                    onClick={() => {
                    }}
                    style={{ fontSize: 14, height: 50, marginLeft: 2, marginRight: 2, marginTop: 50, width: 70 }}
                    variant="danger"
                >Delete
                        </Button>
            </Row>
        } else {
            return <Row>
                <Col className="overflow-auto ml-2" id="itemCardPicture-NoImage" md={2}>No Image Available</Col>
                <Col className="overflow-auto" id="itemCardDepartment-NoImage" md={2}>{item.department.name}</Col>
                <Col className="overflow-auto" id="itemCardVendor-NoImage" md={2}>{item.vendorName}</Col>
                <Col className="overflow-auto" id="itemCardName-NoImage" md={2}>{item.itemName}</Col>
                <Col className="overflow-auto" id="itemCardSKU-NoImage" md={1}>{item.itemSKU}</Col>
                <Col className="overflow-auto" id="itemCardPrice-NoImage" md={1}>{item.unitPrice}</Col>
                <Col className="overflow-auto" id="itemCardQuantity-NoImage" md={1}>{item.quantity}</Col>
                <Button
                    onClick={() => {
                        history.push(`/edititem/${item.id}`)
                    }}
                    style={{ fontSize: 14, height: 50, marginLeft: 2, marginRight: 2, marginTop: 1, width: 70 }}
                    type="button"
                    variant="info"
                >Edit
                        </Button>
                <Button
                    onClick={() => {
                    }}
                    style={{ fontSize: 14, height: 50, marginLeft: 2, marginRight: 2, marginTop: 1, width: 70 }}
                    variant="danger"
                >Delete
                        </Button>
            </Row>
        }
    }
    return (
        <>
            <Preview />
        </>
    )
}

export default ItemCard;