import { Switch } from '@headlessui/react'
import { NextPage } from 'next'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { HiUser } from 'react-icons/hi'
import { MdDarkMode, MdLanguage } from 'react-icons/md'

export type LinkButtonProps = {
  href: string
  icon: React.ComponentType<React.ComponentProps<'svg'>>
  label: string
  right?: React.ReactElement
}

export const LinkButton = ({
  icon: Icon,
  href,
  label,
  right,
}: LinkButtonProps) => (
  <Link href={href}>
    <a>
      <div className='flex items-center w-full py-4'>
        <span>
          <Icon className='w-6 h-6' />
        </span>
        <p className='flex w-full justify-center font-semibold'>{label}</p>
        {right && <span className='flex items-center'>{right}</span>}
      </div>
    </a>
  </Link>
)

const Settings: NextPage = () => {
  const [enabledDarkMode, setEnabledDarkMode] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setEnabledDarkMode(theme === 'dark')
  }, [])

  useEffect(() => {
    if (enabledDarkMode) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [enabledDarkMode, setTheme])

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <div className='space-y-5'>
        <div className='shadow rounded bg-primary p-2 px-5 sm:px-10'>
          <p className='text-center font-semibold'>General Settings</p>
          <div className='mt-3 divide-y flex flex-col'>
            <LinkButton
              href='/settings/edit-profile'
              icon={HiUser}
              label='Edit Profile'
            />
            <LinkButton href='' icon={MdLanguage} label='🇺🇸 English' />
          </div>
        </div>

        <div className='shadow rounded bg-primary p-2 px-5 sm:px-10'>
          <p className='text-center  font-semibold'>Dark Mode</p>
          <LinkButton
            href='/settings/dark-mode'
            icon={MdDarkMode}
            label={enabledDarkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
            right={
              <Switch
                checked={enabledDarkMode}
                onChange={setEnabledDarkMode}
                className={`${
                  enabledDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className='sr-only'>Enable DarkMode</span>
                <span
                  className={`${
                    enabledDarkMode ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white`}
                />
              </Switch>
            }
          />
        </div>
      </div>
    </>
  )
}

export default Settings
