import React from 'react'

export default function TableSkeleton(isLogs = false, loops = 5) {

    // let loopMap = [];
    // for(var i = 0; i < loops; i++) {
    //     loopMap.push(i);
    // }
    // console.log(loopMap);

    const loopMap = [0, 1, 2, 3, 4]

    return (
        <table className="min-w-max text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
                <th scope="col" className="px-6 py-4">#</th>
                <th scope="col" className="px-6 py-4">Time</th>
                <th scope="col" className="px-6 py-4">Type</th>
                <th scope="col" className="px-6 py-4">
                    {isLogs ? "Message" : "Value"}
                </th>
            </tr>
            </thead>
            <tbody>
            {loopMap.map((i) => 
                <tr key={i} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                        <div className='bg-zinc-800 animate-pulse w-5 h-5 rounded-xl' />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                        <div className='bg-zinc-800 animate-pulse w-48 h-5 rounded-xl' />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                        <div className='bg-zinc-800 animate-pulse w-20 h-5 rounded-xl' />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                        <div className='bg-zinc-800 animate-pulse w-8 h-5 rounded-xl' />
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
}
