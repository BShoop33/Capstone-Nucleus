import React from "react"
import { useHistory } from "react-router-dom"
import { Button, Col, Row } from "react-bootstrap"

const ItemCard = ({ item }) => {

    const history = useHistory();

    return (
        <>
            <Row className="justify-content-md-left">
                <Col className="overflow-auto" id="border" md={2}>{item.itemImage}</Col>
                <Col className="overflow-auto" id="border" md={2}>{item.itemLocation}</Col>
                <Col className="overflow-auto" id="border" md={3}>{item.VendorName}</Col>
                <Col className="overflow-auto" id="border" md={1}>{item.itemName}</Col>
                <Col className="overflow-auto" id="border" md={3}>{item.itemSKU}</Col>
                <Col className="overflow-auto" id="border" md={3}>{item.itemPrice}</Col>
                <Col className="overflow-auto" id="border" md={3}>{item.itemQuantity}</Col>
                <Button
                    // onClick={() => {
                    //     history.push(`/edititem/${item.id}`)
                    // }
                    // }
                    style={{ fontSize: 14, height: 50, marginLeft: 2, marginRight: 2, marginTop: 1, width: 70 }}
                    type="button"
                    variant="outline-dark"
                >Edit
                </Button>
                <Button
                    // onClick={() => {
                    //     deleteItem(item.id)
                    //         .then(() => {
                    //             history.push(`/`)
                    //         })
                    // }}
                    style={{ width: 70, fontSize: 14, height: 50, marginTop: 1 }}
                    type="button"
                    variant="outline-danger"
                >Delete
                </Button>
            </Row>
        </>
    )
}

export default ItemCard;