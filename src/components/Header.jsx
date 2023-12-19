import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation';

export default function Header() {

    // const router = useRouter();
    // const checkActive = () => {
    //     if (router.usePathName() === '/') {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    const checkActive = () => {
        return false;
    }

  return (
    <>
        <div className='relative w-52 p-4 m-4'></div>
        <div className='bg-zinc-800 rounded-xl h-[97vh] m-4 p-4 w-52 fixed left-0'>
            <div className='flex flex-row items-center gap-4 mb-4 p-4'>
                <svg width="48" height="48" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="48.5" cy="33.5" r="22.5" fill="#D9D9D9"/>
                    <mask id="mask0_1_55" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="16" y="50" width="69" height="69">
                    <circle cx="50.5" cy="84.5" r="34.5" fill="#868686"/>
                    </mask>
                    <g mask="url(#mask0_1_55)">
                    <circle cx="39" cy="39" r="39" fill="#D9D9D9"/>
                    </g>
                </svg>
                <p className='inline font-bold text-xl'>User</p>
            </div>
            <div className='flex flex-col gap-1 text-zinc-200'>
                <Link className='mb-2' href="/">
                    <p className={
                        checkActive() ?
                            'px-4 py-3 w-full text-zinc-800 bg-teal-400 rounded-xl'
                            :
                            'px-4 py-3 w-full hover:bg-teal-700 hover:bg-opacity-25 hover:rounded-xl ease-in transition-all duration-75'
                            }
                    >
                        <i class="fa-solid fa-house mr-4"></i>
                            Home
                    </p>
                </Link>
                <Link className='mb-2' href="/logs">
                    <p className={
                        checkActive() ?
                            'px-4 py-3 w-full text-zinc-800 bg-teal-400 rounded-xl'
                            :
                            'px-4 py-3 w-full hover:bg-teal-700 hover:bg-opacity-25 hover:rounded-xl ease-in transition-all duration-75'
                            }
                    >
                        <i class="fa-regular fa-clipboard mr-4"></i>
                            Logs
                    </p>
                </Link>
                <Link className='mb-2' href={process.env.NEXT_PUBLIC_PHPMYADMIN} rel="noreferrer" target="_blank">
                    <p className='px-4 py-3 w-full hover:bg-teal-700 hover:bg-opacity-25 hover:rounded-xl ease-in transition-all duration-75'>
                        <i class="fa-solid fa-database mr-4"></i>
                            PhpMyAdmin
                    </p>
                </Link>
                <Link className='mb-2' href="http://178.62.204.252:8080/" rel="noreferrer" target="_blank">
                    <p className='px-4 py-3 w-full hover:bg-teal-700 hover:bg-opacity-25 hover:rounded-xl ease-in transition-all duration-75'>
                        <i class="fa-solid fa-network-wired mr-4"></i>
                            HAProxy
                    </p>
                </Link>
                <Link className='mb-2' href="https://github.com/Matteo-DP">
                    <p className='px-4 py-3 w-full hover:bg-teal-700 hover:bg-opacity-25 hover:rounded-xl ease-in transition-all duration-75'>
                        <i class="fa-brands fa-github mr-4"></i>
                            Github
                    </p>
                </Link>
            </div>
        </div>
    </>
  )
}
