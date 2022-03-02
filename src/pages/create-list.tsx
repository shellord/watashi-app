import { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import StepOne from '@/components/list/StepOne'
import StepTwo from '@/components/list/StepTwo'
import { List } from '@/types/list'

const AddList: NextPage = () => {
  const [selected, setSelected] = useState<List>('movie')

  return (
    <>
      <Head>
        <title>Create a List</title>
      </Head>
      <StepOne setSelected={setSelected} />
      <StepTwo selected={selected} />
    </>
  )
}

export default AddList
