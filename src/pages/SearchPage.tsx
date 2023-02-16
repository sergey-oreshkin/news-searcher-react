import React from "react";
import SearchForm from "../components/SearchForm";
import SearchInfo from "../components/SearchInfo";
import SearchResults from "../components/SearchResults";

const SearchPage = () => {
    return (
        <div className='flex flex-col'>
            <SearchForm />
            <SearchInfo />
            <SearchResults />
        </div>
    )
}

export default SearchPage;