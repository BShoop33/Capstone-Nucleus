import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { Button, Col, Row } from "react-bootstrap"
import { UserProfileContext } from "../providers/UserProfileProvider";

const ItemCard = ({ item, getItems }) => {

    const history = useHistory();

    const { getToken, getCurrentUser } = useContext(UserProfileContext);

    const currentUser = getCurrentUser();

    const deleteItem = () => {
        const deletingItem = { id: item.id }
        getToken().then((token) =>
            fetch(`/api/item/deleteitem/${item.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(deletingItem)
            }).then(() => {
                getItems()
            })
        )
    }

    return (
        <>
            <Row >
                <Col md={2} id="itemPicture" >
                    <a href={item.itemPicture} target="_blank">
                        <img alt="Item Picture" src={item.itemPicture} style={{ maxWidth: 304, maxHeight: 150 }} />
                    </a>
                </Col>
                <Col className="overflow-auto" id="itemDepartment" md={2}>{item.department.name}</Col>
                <Col className="overflow-auto" id="itemVendor" md={1}>{item.vendorName}</Col>
                <Col className="overflow-auto" id="itemName" md={2}>{item.itemName}</Col>
                <Col className="overflow-auto" id="itemSKU" md={1}>{item.itemSKU}</Col>
                <Col className="overflow-auto" id="itemPrice" md={1}>${item.unitPrice}</Col>
                <Col className="overflow-auto" id="itemPrice" md={1}>${item.totalPrice.toFixed(2)}</Col>
                <Col className="overflow-auto" id="itemQuantity" md={1}>{item.quantity}</Col>
                <Col id="itemEditAndDeleteButtons">
                    {currentUser.userTypeId !== 1 ?
                        <Row className="itemEditAndDeleteButtons">
                            <Button
                                onClick={() => {
                                    history.push(`/edititem/${item.id}`)
                                }}
                                id="itemEditButton"
                                type="button"
                                variant="info"
                            >Edit
                        </Button>
                            <Button
                                onClick={() => {
                                    deleteItem()
                                }}
                                id="itemDeleteButton"
                                variant="danger"
                            >Delete
                        </Button>
                        </Row>
                        : ""
                    }
                </Col>
            </Row>
        </>
    )
}

export default ItemCard;