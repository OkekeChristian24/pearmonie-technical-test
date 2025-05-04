import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import Button from '@mui/material/Button'
import { useRecoilState, useRecoilValue } from 'recoil'
import { mylistState } from '../atoms/modalAtom.'
import { movieState } from '../atoms/modalAtom.'
import Row from '../components/Row'
import { Movie } from '../typings'

// interface Props {
//   mylist: Movie[]
//   userId: number
// }

function Account() {
  const { user, logout, loading } = useAuth()
  const [mylist, setmylist] = useRecoilState(mylistState)
  const movie = useRecoilValue(movieState)
  console.log(mylist)

  if (loading) return null

  return (
    <div className="">
      <Head>
        <title>About us - ChrisRecommend</title>
        <link rel="icon" href="/log.png" />
      </Head>
      <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
        <div className="grid place-items-center">
          <h1 className="text-3xl md:text-4xl">About</h1>
        </div>

        <div className="mt-6 grid place-items-center md:border-x-0 md:border-t md:border-b-0 md:px-0">
          {/* <h4 className="text-lg text-[gray]">Settings</h4> */}
          <p className="mt-6 text-justify mb-0">
            ChrisRecommend is an application that recommends contents to its
            users
          </p>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-0 md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">
            For Enterprise Inquiries Contact
          </h4>
          <p className="col-span-2 cursor-pointer text-blue-500 hover:underline">
            chrischimezie24@gmail.com
          </p>
        </div>
        <div className="mt-3 grid place-items-center">
          <Button variant="outlined" onClick={logout}>
            Sign out
          </Button>
        </div>
      </main>
    </div>
  )
}

export default Account

{
  /* <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div> */
}
