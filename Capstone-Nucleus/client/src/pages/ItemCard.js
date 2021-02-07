import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Button, Col, Modal, ModalBody, Row } from "react-bootstrap"
import { UserProfileContext } from "../providers/UserProfileProvider";
// import ReactImageMagnify from 'react-image-magnify';

const ItemCard = ({ item, getItems }) => {

    const history = useHistory();

    // const [pendingDelete, setPendingDelete] = useState(false);
    const { getToken } = useContext(UserProfileContext);

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

    const totalPrice = (item.unitPrice * item.quantity)

    const Image = () => {
        if (item.itemPicture !== "" && item.itemPicture !== null) {
            return <img className="overflow-auto ml-2" alt="Item" style={{ height: 120, width: 300 }} md={2} src={item.itemPicture} />
        } else {
            return <>
                <img className="overflow-auto ml-2" alt="Unavailable" style={{ height: 80, width: 120, marginTop: 2 }} md={2} src="\Images\noimage.gif" />
            </>
        }
    }

    const Preview = () => {
        return <Row >
            {/* <ReactImageMagnify id="pictureBorder" {...{
                    smallImage: {
                        alt: 'Tool Picture',
                        isFluidWidth: false,
                        src: item.itemPicture,
                        width: 327,
                        height: 200,

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
                    isHintEnabled: true,
                    shouldHideHintAfterFirstActivation: false
                }} /> */}
            <Col md={2} id="itemCardPicture-Image" >
                <Image />
            </Col>
            <Col className="overflow-auto" id="itemCardDepartment-Image" md={2}>{item.department.name}</Col>
            <Col className="overflow-auto" id="itemCardVendor-Image" md={1}>{item.vendorName}</Col>
            <Col className="overflow-auto" id="itemCardName-Image" md={2}>{item.itemName}</Col>
            <Col className="overflow-auto" id="itemCardSKU-Image" md={1}>{item.itemSKU}</Col>
            <Col className="overflow-auto" id="itemCardPrice-Image" md={1}>${item.unitPrice}</Col>
            <Col className="overflow-auto" id="itemCardPrice-Image" md={1}>${totalPrice}</Col>
            <Col className="overflow-auto" id="itemCardQuantity-Image" md={1}>{item.quantity}</Col>
            <Col id="itemEditAndDeleteButtons-Image">
                <Row className="itemEditAndDeleteButtons">
                    <Button
                        onClick={() => {
                            history.push(`/edititem/${item.id}`)
                        }}
                        className="itemEditButton"
                        // style={{ fontSize: 14, height: 50, marginLeft: 2, marginRight: 2, marginTop: 35, width: 70 }}
                        type="button"
                        variant="info"
                    >Edit
                    </Button>
                    <Button
                        onClick={() => {
                            deleteItem()
                        }}
                        className="itemDeleteButton"
                        // style={{ fontSize: 14, height: 50, marginLeft: 2, marginRight: 2, marginTop: 35, width: 70 }}
                        variant="danger"
                    >Delete
                    </Button>
                </Row>
            </Col>
        </Row>

        {/* DELETE CONFIRM MODAL 
        <Modal isOpen={pendingDelete}>
            <Modal.Header>Delete {item.itemName}?</Modal.Header>
            <ModalBody>
                Are you sure you want to delete this category? This action cannot be undone.
            </ModalBody>
            <Modal.Footer>
                <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
                <Button className="btn btn-outline-danger" onClick={deleteItem}>Yes, Delete</Button>
            </Modal.Footer>
        </Modal>*/ }
    }
    return (
        <>
            <Preview />
        </>
    )
}

export default ItemCard;
















// const Preview = () => {
//     if (item.itemPicture !== "") {
//         return <Row >
//             {/* <ReactImageMagnify id="pictureBorder" style={{ backgroundColor: "blue" }} {...{
//                 smallImage: {
//                     alt: 'Tool Picture',
//                     isFluidWidth: false,
//                     src: item.itemPicture,
//                     width: 327,
//                     height: 200,

//                 },
//                 largeImage: {
//                     src: item.itemPicture,
//                     width: 1400,
//                     height: 1400
//                 },
//                 enlargedImageContainerDimensions: {
//                     width: '250%',
//                     height: '250%'
//                 },
//                 lensStyle: {
//                     background: 'hsla(0, 0%, 100%, .3)',
//                     border: '1px solid #ccc'
//                 },
//                 isHintEnabled: true,
//                 shouldHideHintAfterFirstActivation: false
//             }} /> */}



//             <img className="overflow-auto ml-2" id="itemCardPicture-Image" md={2} src={item.itemPicture} />
//             <Col className="overflow-auto" id="itemCardDepartment-Image" md={2}>{item.department.name}</Col>
//             <Col className="overflow-auto" id="itemCardVendor-Image" md={2}>{item.vendorName}</Col>
//             <Col className="overflow-auto" id="itemCardName-Image" md={2}>{item.itemName}</Col>
//             <Col className="overflow-auto" id="itemCardSKU-Image" md={1}>{item.itemSKU}</Col>
//             <Col className="overflow-auto" id="itemCardPrice-Image" md={1}>{item.unitPrice}</Col>
//             <Col className="overflow-auto" id="itemCardQuantity-Image" md={1}>{item.quantity}</Col>
//             <Col id="itemEditAndDeleteButtons-Image">
//                 <Row>
//                     <Button
//                         onClick={() => {
//                             history.push(`/edititem/${item.id}`)
//                         }}
//                         style={{ fontSize: 14, height: 50, marginLeft: 2, marginRight: 2, marginTop: 50, width: 70 }}
//                         type="button"
//                         variant="info"
//                     >Edit
//                     </Button>
//                     <Button
//                         onClick={() => {
//                             deleteItem()
//                         }}
//                         style={{ fontSize: 14, height: 50, marginLeft: 2, marginRight: 2, marginTop: 50, width: 70 }}
//                         variant="danger"
//                     >Delete
//                     </Button>
//                 </Row>
//             </Col>
//         </Row>

//         {/* DELETE CONFIRM MODAL */ }
//         <Modal isOpen={pendingDelete}>
//             <Modal.Header>Delete {item.itemName}?</Modal.Header>
//             <ModalBody>
//                 Are you sure you want to delete this category? This action cannot be
//                 undone.
//         </ModalBody>
//             <Modal.Footer>
//                 <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
//                 <Button className="btn btn-outline-danger" onClick={deleteItem}>Yes, Delete</Button>
//             </Modal.Footer>
//         </Modal>
//     } else {
//         return <Row>

//             {/* <div id="noImage">No Image Available</div> */}
//             {/* <img className="overflow-auto ml-2" id="noImage" md={2} src="Images\noimage.gif" /> */}
//             <Col className="overflow-auto" id="#itemCardPicture-Image" md={2}>No Image Available</Col>
//             <Col className="overflow-auto" id="itemCardDepartment-Image" md={2}>{item.department.name}</Col>
//             <Col className="overflow-auto" id="itemCardVendor-NoImage" md={2}>{item.vendorName}</Col>
//             <Col className="overflow-auto" id="itemCardName-NoImage" md={2}>{item.itemName}</Col>
//             <Col className="overflow-auto" id="itemCardSKU-NoImage" md={1}>{item.itemSKU}</Col>
//             <Col className="overflow-auto" id="itemCardPrice-NoImage" md={1}>{item.unitPrice}</Col>
//             <Col className="overflow-auto" id="itemCardQuantity-NoImage" md={1}>{item.quantity}</Col>
//             <Button
//                 onClick={() => {
//                     history.push(`/edititem/${item.id}`)
//                 }}
//                 style={{ fontSize: 14, height: 50, marginLeft: 2, marginRight: 2, marginTop: 1, width: 70 }}
//                 type="button"
//                 variant="info"
//             >Edit
//                     </Button>
//             <Button
//                 onClick={() => {
//                     deleteItem()
//                 }}
//                 style={{ fontSize: 14, height: 50, marginLeft: 2, marginRight: 2, marginTop: 1, width: 70 }}
//                 variant="danger"
//             >Delete
//                     </Button>
//         </Row>

//         {/* DELETE CONFIRM MODAL */ }
//         <Modal isOpen={pendingDelete}>
//             <Modal.Header>Delete {item.itemName}?</Modal.Header>
//             <ModalBody>
//                 Are you sure you want to delete this item? This action cannot be
//                 undone.
//         </ModalBody>
//             <Modal.Footer>
//                 <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
//                 <Button className="btn btn-outline-danger" onClick={deleteItem}>Yes, Delete</Button>
//             </Modal.Footer>
//         </Modal>
//     }
// }
// return (
//     <>
//         <Preview />
//     </>
// )
// }

// export default ItemCard;