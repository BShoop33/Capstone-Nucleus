import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Button, Col, Row } from "react-bootstrap"
// import { Modal, ModalBody } from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";
import ReactImageMagnify from 'react-image-magnify';

const ItemCard = ({ item, getItems }) => {
    const history = useHistory();
    // const [pendingDelete, setPendingDelete] = useState(false)
    const { getToken, getCurrentUser } = useContext(UserProfileContext);
    const currentUser = getCurrentUser();
    const totalPrice = (item.unitPrice * item.quantity)

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

    const Image = () => {
        if (item.itemPicture !== "" && item.itemPicture !== null) {
            return <ReactImageMagnify id="pictureBorder" {...{
                smallImage: {
                    alt: 'Item Picture',
                    isFluidWidth: false,
                    src: item.itemPicture,
                    width: 304,
                    height: 150
                },
                largeImage: {
                    src: item.itemPicture,
                    width: 1400,
                    height: 1400
                },
                enlargedImageContainerDimensions: {
                    width: '250%',
                    height: '250%'
                },
                lensStyle: {
                    background: 'hsla(0, 0%, 100%, .3)',
                    border: '1px solid #ccc'
                },
                isHintEnabled: false,
                shouldHideHintAfterFirstActivation: false
            }} />
        } else {
            return <>
                <img className="overflow-auto ml-2" alt="Unavailable" style={{ height: 150, width: 120, marginTop: 2, paddingTop: 10, paddingBottom: 10 }} md={2} src="\Images\noimage.gif" />
            </>
        }
    }

    const EditAndDelete = () => {
        if (currentUser.userTypeId !== 1) {
            return <Row className="itemEditAndDeleteButtons">
                {/* <Col> */}
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
                        // setPendingDelete(true)
                    }}
                    id="itemDeleteButton"
                    variant="danger"
                >Delete
                        </Button>
                {/* </Col> */}
            </Row>
        } else {
            return ""
        }
    }

    const Preview = () => {
        return <Row >
            <Col md={2} id="itemPicture" >
                <Image />
            </Col>
            <Col className="overflow-auto" id="itemDepartment" md={2}>{item.department.name}</Col>
            <Col className="overflow-auto" id="itemVendor" md={1}>{item.vendorName}</Col>
            <Col className="overflow-auto" id="itemName" md={2}>{item.itemName}</Col>
            <Col className="overflow-auto" id="itemSKU" md={1}>{item.itemSKU}</Col>
            <Col className="overflow-auto" id="itemPrice" md={1}>${item.unitPrice}</Col>
            <Col className="overflow-auto" id="itemPrice" md={1}>${totalPrice}</Col>
            <Col className="overflow-auto" id="itemQuantity" md={1}>{item.quantity}</Col>
            <Col id="itemEditAndDeleteButtons">
                <EditAndDelete />
            </Col>

            {/* DELETE CONFIRM MODAL */}
            {/* <Modal show={true}>
                <Modal.Header>Delete {item.itemName}?</Modal.Header>
                <ModalBody>
                    Are you sure you want to delete this item? This action cannot be undone.
                </ModalBody>
                <Modal.Footer>
                    <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
                    <Button className="btn btn-outline-danger" onClick={deleteItem}>Yes, Delete</Button>
                </Modal.Footer>
            </Modal> */}
        </Row>
    }
    return (
        <>
            <Preview />
        </>
    )
}

export default ItemCard;