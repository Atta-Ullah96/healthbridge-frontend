import Button from "../../atoms/button"
import { FaSearch } from "react-icons/fa";
import { Icon } from "../../atoms/icon";



function SearchBar(){


    return (

        <>
        
        {/* Search Bar */}
        <div className="bg-white shadow-md rounded-full px-3 sm:px-4 py-2 flex flex-col sm:flex-row items-center gap-2 sm:gap-0 sm:justify-between max-w-2xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Search by doctor name, symptom, or specialty..."
            className="w-full px-4 py-2 outline-none text-sm text-dark font-inter"
          />
          <Icon icon={FaSearch} className={"size-7 cursor-pointer"} >
            Search
          </Icon>
        </div>
        </>
    )
}

export default SearchBar