import Connect from "./Connect"
import Search from "./Search"
import { useMoralis } from 'react-moralis'
import Link from "next/link"

function Header() {
    return (
        <>
            <div className="sticky top-8 text-white">
                <div className="flex justify-between mt-8 mr-8">
                    <Search placeholder="Search"/>
                    <div className="flex">
                        <Link href='/create'> 
                            <a>
                                <button className="text-base px-8 py-3 mx-4 rounded-2xl shadow-lg bg-[#dfdfdf] text-[#111111] hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer">
                                    Sell Your NFT
                                </button>
                            </a>
                        </Link>
                        <Connect/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header