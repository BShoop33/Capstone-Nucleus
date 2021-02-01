import React, { useContext, useEffect } from "react"
import FormControl from 'react-bootstrap/FormControl';
import "./Inventory.css";

export const ItemSearch = () => {
    // const { setSearchTerms } = useContext(ItemContext)

    // useEffect(() => {
    //     setSearchTerms("")
    // }, [setSearchTerms])

    return (
        <>
            <FormControl type="text"
                // className="SearchBar"
                id="itemSearch"
                // onKeyUp={
                //     (keyEvent) => setSearchTerms(keyEvent.target.value)
                // }
                placeholder="Search by Item Name" />
        </>
    )
}