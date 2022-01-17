function Search({placeholder, data}) {
    return (
        <>

            <div className="search w-1/3 bg-[#101011] rounded-2xl  px-4 flex items-center text-slate-700 text-xl text-[#444444]">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"></path></svg>
                <div className = "searchInputs">
                <input className="form-control w-96 relative focus:outline-none flex-auto min-w-0 block px-3 py-1.5 text-base font-normal focus:text-[#9ca3af] placeholder-[#475569] placeholder-opacity-50 bg-[#101011] bg-clip-padding border-none transition ease-in-out m-0 focus:border-none" type="text" placeholder={placeholder}></input>
                <div className = "searchIcon">
                
                </div>
                </div>
                <div className="dataResult">
                 
                </div>
            </div>
        </>
    )
}

export default Search