import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import News from "./UI/News";

const SearchResults = () => {

    const state = useSelector((state: RootState) => state);

    return (
        <div className='m-6'>
            {
                state.search.news.map(e => <News key={crypto.randomUUID()} {...e} />)
            }
        </div>
    )
}

export default SearchResults;