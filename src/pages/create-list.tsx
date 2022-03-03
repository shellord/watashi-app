import { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import StepOne from '@/components/list/StepOne'
import StepTwo from '@/components/list/StepTwo'
import type { Category, ListItem } from '@/types/list'

const AddList: NextPage = () => {
  const [selected, setSelected] = useState<Category>('movie')
  const [step, setStep] = useState(1)
  const [listName, setlistName] = useState('')
  const [list, setList] = useState<ListItem[]>([])

  const createListHandler = () => {
    console.log(listName)
  }

  return (
    <>
      <Head>
        <title>Create a List</title>
      </Head>
      <div className='rounded bg-white px-5 pb-5 pt-2 shadow'>
        {step === 1 && (
          <StepOne setSelected={setSelected} setListName={setlistName} />
        )}
        {step === 2 && (
          <StepTwo
            selected={selected}
            setStep={setStep}
            list={list}
            setList={setList}
          />
        )}

        <div className='mt-3'>
          {step == 1 && (
            <div className='flex justify-end'>
              <button className='btn btn-primary' onClick={() => setStep(2)}>
                Next
              </button>
            </div>
          )}
          {step == 2 && (
            <div className='flex justify-end'>
              <button
                className='btn btn-primary'
                onClick={() => createListHandler()}
              >
                Create
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AddList
