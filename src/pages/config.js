import React, { useRef, useEffect, useState } from 'react'

export default function Config() {

    const [loading, setLoading] = useState(true);
    const [blooming, setBlooming] = useState(false);
    const [coldwhite, setColdwhite] = useState(false);
    const [infrared, setInfrared] = useState(false);

    useEffect(() => {
        const getConfig = async () => {
            const res =  await fetch('/api/getConfig');
            const data = await res.json();
            data.map((e) => {
                if(e.name === 'USE_BLOOMING') {
                    setBlooming(Boolean(e.value));
                }
                if(e.name === 'USE_COLDWHITE') {
                    setColdwhite(Boolean(e.value));
                }
                if(e.name === 'USE_INFRARED') {
                    setInfrared(Boolean(e.value));
                }
                setLoading(false)
            })
        }
        getConfig();
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
    }

  return (
    <main className='py-4'>
        <h1 className='text-3xl mb-8'>Lamps config</h1>
        <form className='flex flex-col gap-2' onSubmit={(e) => onSubmit(e)}>
            <div>
                <p className='inline mr-4'>Blooming: </p>
                <input type='checkbox' checked={blooming} onChange={(e) => setBlooming(e.target.checked)} className='border border-teal-400 rounded-sm px-2 text-zinc-900 text-center' />
            </div>
            <div>
                <p className='inline mr-4'>Cold white: </p>
                <input type='checkbox' checked={coldwhite} onChange={(e) => setColdwhite(e.target.checked)} className='border border-teal-400 rounded-sm px-2 text-zinc-900 text-center' />
            </div>
            <div>
                <p className='inline mr-4'>Infrared: </p>
                <input type='checkbox' checked={infrared} onChange={(e) => setInfrared(e.target.checked)} className='border border-teal-400 rounded-sm px-2 text-zinc-900 text-center' />
            </div>
        </form>
    </main>
  )
}
