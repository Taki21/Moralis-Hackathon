import Connect from "./Connect"
import Search from "./Search"
import { useMoralis } from 'react-moralis'

function Header() {
    return (
        <>
            <div className="sticky top-8 text-white">
                <div className="flex justify-between mt-8 mr-8">
                    <Search/>
                    <div className="flex">
                        <button className="text-base px-8 py-3 mx-4 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer">
                            Sell Your NFT
                        </button>
                        <Connect/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header