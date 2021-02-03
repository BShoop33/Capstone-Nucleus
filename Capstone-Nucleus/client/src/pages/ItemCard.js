import React, { useEffect, useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Button, Col, Modal, ModalBody, Row } from "react-bootstrap"
import { UserProfileContext } from "../providers/UserProfileProvider";

const ItemCard = ({ item, getItems }) => {

    const history = useHistory();

    const [pendingDelete, setPendingDelete] = useState(false);
    const [items, setItems] = useState([])
    const { getToken, getCurrentUser } = useContext(UserProfileContext);

    useEffect(() => {
        fetch("/api/item")
            .then((res) => res.json())
            .then((items) => {
                setItems(items);
            });
    }, []);

    const deleteItem = () => {
        console.log(item.id)
        debugger;
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





    const Preview = () => {
        if (item.itemPicture !== "") {
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
                        deleteItem()
                    }}
                    style={{ fontSize: 14, height: 50, marginLeft: 2, marginRight: 2, marginTop: 50, width: 70 }}
                    variant="danger"
                >Delete
                        </Button>
            </Row>

            {/* DELETE CONFIRM MODAL */ }
            <Modal isOpen={pendingDelete}>
                <Modal.Header>Delete {item.itemName}?</Modal.Header>
                <ModalBody>
                    Are you sure you want to delete this category? This action cannot be
                    undone.
            </ModalBody>
                <Modal.Footer>
                    <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
                    <Button className="btn btn-outline-danger" onClick={deleteItem}>Yes, Delete</Button>
                </Modal.Footer>
            </Modal>
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
                        deleteItem()
                    }}
                    style={{ fontSize: 14, height: 50, marginLeft: 2, marginRight: 2, marginTop: 1, width: 70 }}
                    variant="danger"
                >Delete
                        </Button>
            </Row>

            {/* DELETE CONFIRM MODAL */ }
            <Modal isOpen={pendingDelete}>
                <Modal.Header>Delete {item.itemName}?</Modal.Header>
                <ModalBody>
                    Are you sure you want to delete this item? This action cannot be
                    undone.
            </ModalBody>
                <Modal.Footer>
                    <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
                    <Button className="btn btn-outline-danger" onClick={deleteItem}>Yes, Delete</Button>
                </Modal.Footer>
            </Modal>
        }
    }
    return (
        <>
            <Preview />
        </>
    )
}

export default ItemCard;