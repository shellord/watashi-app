import { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import { Point, Area } from 'react-easy-crop/types'
import { MdClose } from 'react-icons/md'

import { getCroppedImg } from '@/lib/cropImage'
import { useUpdateProfilePhoto } from '@/hooks/useUpdateProfilePhoto'

type Props = {
  setshowUploadModal: React.Dispatch<React.SetStateAction<boolean>>
}
const PhotoUpload = ({ setshowUploadModal }: Props) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [imageSrc, setImageSrc] = useState('')
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })

  const updateProfilePhotoMutation = useUpdateProfilePhoto()

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    []
  )
  const uploadImage = useCallback(async () => {
    try {
      const dataUri = await getCroppedImg(imageSrc, croppedAreaPixels)
      if (dataUri)
        updateProfilePhotoMutation.mutate(dataUri, {
          onSuccess: () => {
            setshowUploadModal(false)
          },
        })
    } catch (e) {
      console.error(e)
    }
  }, [
    croppedAreaPixels,
    imageSrc,
    updateProfilePhotoMutation,
    setshowUploadModal,
  ])

  function readFile(file: any) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      setImageSrc(imageDataUrl as any)
    }
  }
  return (
    <div className='absolute top-36 w-full max-w-xs p-5'>
      <div className='flex flex-col items-center rounded-3xl  bg-white'>
        <button
          className='flex w-full justify-end  pr-4 pt-4 text-pink-500'
          onClick={() => setshowUploadModal(false)}
        >
          <MdClose size={24} />
        </button>
        <div className='relative mt-10 h-52 w-52 rounded-full '>
          <Cropper
            image={imageSrc}
            cropShape='round'
            crop={crop}
            zoom={zoom}
            aspect={1}
            showGrid={false}
            restrictPosition
            zoomWithScroll={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            objectFit='horizontal-cover'
            style={{
              containerStyle: {
                borderRadius: '100%',
                width: '100%',
                backgroundColor: 'gray',
              },
              mediaStyle: {
                border: 0,
                borderRadius: '20%',
                objectFit: 'contain',
              },
              cropAreaStyle: {
                outline: '500px solid white',
              },
            }}
          />
        </div>
        <div className='m-5'>
          <input
            type='range'
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby='Zoom'
            onChange={(e) => {
              setZoom(e.target.value as any)
            }}
            className='zoom-range'
          />
        </div>
        <div>
          <label htmlFor='photoUpload' className='btn-secondary cursor-pointer'>
            Choose from gallery
          </label>
          <input
            type='file'
            onChange={onFileChange}
            accept='image/*'
            id='photoUpload'
            className='hidden'
          />
        </div>
        <button onClick={uploadImage} className='btn m-5'>
          Save
        </button>
      </div>
    </div>
  )
}

export default PhotoUpload
