import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'
import { useEffect, useState } from 'react'

import DeleteIcon from '@/components/list/DeleteIcon'
import { useCurrentUserList } from '@/hooks/useCurrentUserList'
import ListItemCard from '@/components/list/ListItemCard'
import SearchListBar from '@/components/list/SearchListBar'
import useDebounce from '@/hooks/useDebounce'
import useSearchTMDB from '@/hooks/useSearchTMDB'
import PlusIcon from '@/components/list/PlusIcon'
import { ListItem } from '@/types/list'
import { useUpdateList } from '@/hooks/useUpdateList'
import Modal from '@/components/ui/Modal'
import DeleteListModal from '@/components/list/DeleteListModal'
import { useDeleteList } from '@/hooks/useDeleteList'

const EditList: NextPage = () => {
  const { data: lists, status } = useCurrentUserList()
  const router = useRouter()
  const [list, setList] = useState<ListItem[]>([])
  const [listName, setlistName] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 600)
  const { data } = useSearchTMDB(debouncedSearchQuery)
  const updateListMutation = useUpdateList()
  const deleteListMutation = useDeleteList()

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const { id } = router.query
  const listToEdit = lists?.find((list) => list.id === id)
  useEffect(() => {
    const finalList: ListItem[] = []

    if (listToEdit) {
      listToEdit.items.map((item) => {
        finalList.push({
          id: item.itemId,
          title: item.title,
          poster_path: item.posterPath,
        })
      })
      setList(finalList)
      setlistName(listToEdit.name)
    }
  }, [listToEdit])

  const addToList = (item: ListItem) => {
    if (list.includes(item)) return
    console.log(item)
    setList([...list, item])
  }
  const removeFromList = (item: ListItem) => {
    const newList = list.filter((i) => i.id !== item.id)
    setList(newList)
  }

  const onDeleteHandler = () => {
    if (!listToEdit) return
    deleteListMutation.mutate({
      id: listToEdit.id,
    })
    setShowDeleteModal(false)
    router.back()
  }

  const onSaveHandler = () => {
    if (!listToEdit) return
    const listIds = list.map((item) => item.id)
    updateListMutation.mutate({
      id: listToEdit.id,
      name: listName,
      items: listIds,
    })
  }

  if (!listToEdit || status === 'loading') {
    //TODO:Put Skeleton here
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>Edit List</title>
      </Head>
      <div className='rounded bg-white p-5 shadow'>
        <div className='mb-3 flex '>
          <Link href='/my-list'>
            <a>
              <BiArrowBack size={22} />
            </a>
          </Link>
          <p className='flex w-full justify-center font-semibold'>Edit List</p>
        </div>
        <label htmlFor='list-name'>
          <p>Change list name</p>
        </label>
        <input
          type='text'
          id='list-name'
          className='input-field w-full sm:w-1/2'
          defaultValue={listName}
          onChange={(event) => setlistName(event.target.value)}
        />
        {list && list.length > 0 && (
          <div className='mt-5 flex items-start space-x-3 overflow-x-auto'>
            {list.map((item) => (
              <button
                key={item.id}
                className='relative'
                onClick={() => removeFromList(item)}
              >
                <div className='absolute z-10 flex w-full justify-end'>
                  <DeleteIcon />
                </div>
                <div className=''>
                  <ListItemCard title={item.title} image={item.poster_path} />
                </div>
              </button>
            ))}
          </div>
        )}
        <div className='mt-2 pb-2'>
          <SearchListBar
            selected={listToEdit.category}
            onChange={onSearchChange}
          />
        </div>
        <div className='mt-3 flex items-start space-x-3 overflow-x-auto'>
          {data &&
            data.map((item) => (
              <button
                onClick={() => addToList(item)}
                key={item.id}
                className='relative'
              >
                <div className='absolute z-10 flex w-full justify-end'>
                  <PlusIcon />
                </div>
                <div>
                  <ListItemCard title={item.title} image={item.poster_path} />
                </div>
              </button>
            ))}
        </div>

        <div className='mt-5 flex justify-between'>
          <button
            className='btn bg-red-500'
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>
          <button className='btn' onClick={onSaveHandler}>
            Save
          </button>
        </div>
        <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
          <DeleteListModal
            setShowDeleteModal={setShowDeleteModal}
            onDelete={onDeleteHandler}
          />
        </Modal>
      </div>
    </>
  )
}

export default EditList
