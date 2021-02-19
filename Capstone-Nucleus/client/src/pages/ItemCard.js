import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { Button, Col, Row } from "react-bootstrap"
import { UserProfileContext } from "../providers/UserProfileProvider";
import ReactImageMagnify from 'react-image-magnify';

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
                <img className="overflow-auto ml-2" alt="Unavailable" style={{ height: 150, width: 120, marginTop: 2, paddingTop: 10, paddingBottom: 10 }} md={2} src="https://res.cloudinary.com/dstfvbrwf/image/upload/v1612906044/ToolMeOnce/qcr8iyezvaocm9z8yj6o.gif" />
            </>
        }
    }

    const EditAndDelete = () => {
        if (currentUser.userTypeId !== 1) {
            return <Row className="itemEditAndDeleteButtons">
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
        } else {
            return ""
        }
    }

    const totalPrice = item.totalPrice.toFixed(2)

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
        </Row>
    }
    return (
        <>
            <Preview />
        </>
    )
}

export default ItemCard;