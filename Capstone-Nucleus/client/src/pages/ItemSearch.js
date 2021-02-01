import React, { useContext, useEffect } from "react"
import FormControl from 'react-bootstrap/FormControl';

export const ItemSearch = () => {
    // const { setSearchTerms } = useContext(ItemContext)

    // useEffect(() => {
    //     setSearchTerms("")
    // }, [setSearchTerms])

    return (
        <>
            <FormControl type="text"
                className="mr-sm-2"
                // className="SearchBar"
                id="input"
                // onKeyUp={
                //     (keyEvent) => setSearchTerms(keyEvent.target.value)
                // }
                placeholder="Search for an item " />
        </>
    )
}