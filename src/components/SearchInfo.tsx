import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const SearchInfo = () => {

    const state = useSelector((state: RootState) => state);

    return (
        <div>{state.search.message}</div>
    );
}

export default SearchInfo;