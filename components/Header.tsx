import Connect from "./Connect"
import Search from "./Search"

function Header() {
    return (
        <>
            <div className="sticky top-8 text-white">
                <div className="flex justify-between mt-8 mx-8">
                    <Search/>
                    <Connect/>
                </div>
            </div>
        </>
    )
}

export default Header