import { ChangeEvent } from "react";

type props={
    searchVal:string,
    handleSearch:(event : ChangeEvent<HTMLInputElement>)=>{};
}

const SearchBox = ({handleSearch,searchVal}: any) => {
    return (
        <div className='col col-sm-4'>
            <input
                className='form-control'
                value={searchVal}
                onChange={(event) => handleSearch(event)}
                placeholder="Search Movie..."
            ></input>
        </div>
    );
}

export default SearchBox;

