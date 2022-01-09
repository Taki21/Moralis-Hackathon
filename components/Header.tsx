import Connect from "./Connect"
import Search from "./Search"

function Header() {
    return (
        <>
            <div className="bg-[#0A0A0B] relative text-white flex justify-between mt-8 mx-8">
                <Search/>
                <Connect/>
            </div>
        </>
    )
}

export default Header