import Link from 'next/link'

function Intro() {

    return (
        <>
            <div className="bg-intro-bg bg-cover bg-no-repeat max-w-full h-96 mt-4 mr-8 rounded-2xl flex flex-col justify-center p-16">
                <h1 className="text-4xl">3D NFT Marketplace</h1>
                <button className=" w-80 border border-[#D3B694] my-8 py-3 text-2xl rounded-2xl text-emerald-500 font-semibold hover:text-white hover:border-transparent hover:bg-[#D3B694] transition-all duration-600 ease-linear cursor-pointer">
                    Get Started
                </button>
            </div>
        </>
    )

}

export default Intro