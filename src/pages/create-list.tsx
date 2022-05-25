import type { ListItem } from '@/types/list'
import type { Category } from '@prisma/client'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { useCreateList } from '@/hooks/useCreateList'

import StepOne from '@/components/list/StepOne'
import StepTwo from '@/components/list/StepTwo'

const AddList: NextPage = () => {
  const [category, setCategory] = useState<Category>('MOVIE')
  const [step, setStep] = useState(1)
  const [listName, setlistName] = useState('')
  const [list, setList] = useState<ListItem[]>([])
  const createListMutation = useCreateList()
  const router = useRouter()

  const handleStep = (step: number) => {
    if (listName.length < 3) {
      return toast('List name must be at least 3 characters long', {
        type: 'error',
      })
    }
    setStep(step)
  }

  const createListHandler = () => {
    if (list.length < 1) {
      return toast('List must have at least 1 item', {
        type: 'error',
      })
    }
    const listIds = list.map(({ id }) => id)
    createListMutation.mutate(
      {
        name: listName,
        category,
        items: listIds,
      },
      {
        onSuccess: () => {
          router.push('/my-list')
        },
      }
    )
  }

  return (
    <>
      <Head>
        <title>Create a List</title>
      </Head>
      <div className='rounded bg-primary px-5 pb-5 pt-2 shadow'>
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
