import Link from 'next/link'
import {useMoralis} from 'react-moralis'

function Sidebar() {
    
    const {isAuthenticated, logout} = useMoralis()

    return (
        <>
            <div className="flex sticky top-0 left-0 h-screen w-48 m-0 flex-col bg-[#0A0A0B] text-white shadow">
                <div className="bg-[#101011] h-full my-8 mx-8 rounded-3xl flex flex-col justify-between">
                    <div className="h-16 w-16 rounded-2xl my-8 mx-auto shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer">

                    </div>

                    <div>
                        <Link href='../'> 
                            <a>
                                <div className="group relative flex items-center justify-center h-16 w-16 rounded-2xl my-8 mx-auto shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    <span className="group-hover:scale-100 z-50 absolute w-auto p-2 m-2 min-w-max left-24 rounded-md shadow-md text-white bg-[#1C1C1C] text-xs font-bold tansition-all duration-100 scale-0">Home</span>
                                </div>
                            </a>
                        </Link>

                        <Link href='/marketplace'> 
                            <a>
                                <div className="group relative flex items-center justify-center h-16 w-16 rounded-2xl my-8 mx-auto shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 616 512" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M602 118.6L537.1 15C531.3 5.7 521 0 510 0H106C95 0 84.7 5.7 78.9 15L14 118.6c-33.5 53.5-3.8 127.9 58.8 136.4 4.5.6 9.1.9 13.7.9 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18.1 20.1 44.3 33.1 73.8 33.1 4.7 0 9.2-.3 13.7-.9 62.8-8.4 92.6-82.8 59-136.4zM529.5 288c-10 0-19.9-1.5-29.5-3.8V384H116v-99.8c-9.6 2.2-19.5 3.8-29.5 3.8-6 0-12.1-.4-18-1.2-5.6-.8-11.1-2.1-16.4-3.6V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V283.2c-5.4 1.6-10.8 2.9-16.4 3.6-6.1.8-12.1 1.2-18.2 1.2z"></path></svg>
                                    <span className="group-hover:scale-100 z-50 absolute w-auto p-2 m-2 min-w-max left-24 rounded-md shadow-md text-white bg-[#1C1C1C] text-xs font-bold tansition-all duration-100 scale-0">Marketplace</span>
                                </div>
                            </a>
                        </Link>

                        <Link href='/create'> 
                            <a>
                                <div className="group relative flex items-center justify-center h-16 w-16 rounded-2xl my-8 mx-auto shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a2 2 0 012-2h6a2 2 0 012 2v12l-5-3-5 3V3z" clip-rule="evenodd"></path></svg>
                                    <span className="group-hover:scale-100 z-50 absolute w-auto p-2 m-2 min-w-max left-24 rounded-md shadow-md text-white bg-[#1C1C1C] text-xs font-bold tansition-all duration-100 scale-0">Create</span>
                                </div>
                            </a>
                        </Link>

                        <Link href='/Profile'> 
                            <a>
                                <div className="group relative flex items-center justify-center h-16 w-16 rounded-2xl my-8 mx-auto shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                                    <span className="group-hover:scale-100 z-50 absolute w-auto p-2 m-2 min-w-max left-24 rounded-md shadow-md text-white bg-[#1C1C1C] text-xs font-bold tansition-all duration-100 scale-0">Profile</span>
                                </div>
                            </a>
                        </Link>
                    </div>

                    <div onClick={logout} className="group relative flex items-center justify-center h-16 w-16 rounded-2xl my-8 mx-auto shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer">
                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>                        
                        <span className="group-hover:scale-100 z-50 absolute w-auto p-2 m-2 min-w-max left-24 rounded-md shadow-md text-white bg-[#1C1C1C] text-xs font-bold tansition-all duration-100 scale-0">Logout</span>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Sidebar