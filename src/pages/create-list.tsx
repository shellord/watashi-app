import { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { toast } from 'react-toastify'

import StepOne from '@/components/list/StepOne'
import StepTwo from '@/components/list/StepTwo'
import type { Category, ListItem } from '@/types/list'

const AddList: NextPage = () => {
  const [category, setCategory] = useState<Category>('MOVIE')
  const [step, setStep] = useState(1)
  const [listName, setlistName] = useState('')
  const [list, setList] = useState<ListItem[]>([])

  const handleStep = (step: number) => {
    if (listName.length < 3) {
      return toast('List name must be at least 3 characters long', {
        type: 'error',
      })
    }
    setStep(step)
  }

  const createListHandler = () => {
    console.log(list)
  }

  return (
    <>
      <Head>
        <title>Create a List</title>
      </Head>
      <div className='rounded bg-white px-5 pb-5 pt-2 shadow'>
        {step === 1 && (
          <StepOne setCategory={setCategory} setListName={setlistName} />
        )}
        {step === 2 && (
          <StepTwo
            selected={category}
            setStep={setStep}
            list={list}
            setList={setList}
          />
        )}

        <div className='mt-3'>
          {step == 1 && (
            <div className='flex justify-end'>
              <button className='btn btn-primary' onClick={() => handleStep(2)}>
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
