import { useMoralis } from 'react-moralis'

function Connect() {

    const {
        authenticate,
        authError,
        isAuthenticating,
        isAuthenticated,
        isUnauthenticated,
        user
    } = useMoralis();

    return (
        <>
            <div>
                <button onClick={authenticate} className="flex text-2xl px-3 py-3 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer">
                    {
                        isAuthenticated ? (
                            <p className='text-base pr-2'>{user.get("ethAddress").substring(0,5) + "..." + user.get("ethAddress").substring(38,42)}</p>
                        ) : (
                            !authError ? (
                                <p className='text-base pr-2'>Connect</p>
                            ) : (
                                <p className='text-base pr-2'>Denied</p>
                            )
                        )
                    }
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path></svg>
                </button>
            </div>
        </>
    )
}

export default Connect