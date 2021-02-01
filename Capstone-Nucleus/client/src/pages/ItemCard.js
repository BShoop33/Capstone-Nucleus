import React from "react"
import { useHistory } from "react-router-dom"
import { Button, Col, Row } from "react-bootstrap"

const ItemCard = ({ item }) => {

    const history = useHistory();

    return (
        <>
            <Row >
                <Col className="overflow-auto" id="itemCardPicture" md={2}>{item.itemPicture}</Col>
                <Col className="overflow-auto" id="itemCardDepartment" md={2}>{item.department.name}</Col>
                <Col className="overflow-auto" id="itemCardVendor" md={2}>{item.vendorName}</Col>
                <Col className="overflow-auto" id="itemCardName" md={2}>{item.itemName}</Col>
                <Col className="overflow-auto" id="itemCardSKU" md={1}>{item.itemSKU}</Col>
                <Col className="overflow-auto" id="itemCardPrice" md={1}>{item.unitPrice}</Col>
                <Col className="overflow-auto" id="itemCardQuantity" md={1}>{item.quantity}</Col>

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
                    // onClick={() => {
                    //     deleteItem(item.id)
                    //         .then(() => {
                    //             history.push(`/`)
                    //         })
                    // }}
                    style={{ fontSize: 14, height: 50, marginTop: 1, width: 70 }}
                    type="button"
                    variant="danger"
                >Delete
                </Button>
            </Row>
        </>
    )
}

export default ItemCard;