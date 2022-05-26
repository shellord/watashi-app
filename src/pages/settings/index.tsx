import { Switch } from '@headlessui/react'
import { NextPage } from 'next'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import { HiUser } from 'react-icons/hi'
import { MdDarkMode, MdLanguage } from 'react-icons/md'

export type LinkButtonProps = {
  href: string
  icon: React.ComponentType<React.ComponentProps<'svg'>>
  label: string
  right?: React.ReactElement
  target?: '_blank' | '_self' | '_parent' | '_top'
}

export type ActionButtonProps = {
  icon: React.ComponentType<React.ComponentProps<'svg'>>
  label: string
  onClick: () => void
  right?: React.ReactElement
}

export const LinkButton = ({
  icon: Icon,
  href,
  label,
  right,
  target,
}: LinkButtonProps) => (
  <Link href={href}>
    <a target={target ? target : '_self'}>
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

export const ActionButton = ({
  onClick,
  icon: Icon,
  right,
  label,
}: ActionButtonProps) => (
  <button className='flex items-center w-full py-4' onClick={onClick}>
    <span>
      <Icon className='w-6 h-6' />
    </span>
    <p className='flex w-full justify-center font-semibold'>{label}</p>
    {right && <span className='flex items-center'>{right}</span>}
  </button>
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
            <ActionButton
              icon={MdLanguage}
              label='🇺🇸 English'
              onClick={() => null}
            />
          </div>
        </div>

        <div className='shadow rounded bg-primary p-2 px-5 sm:px-10'>
          <p className='text-center  font-semibold'>Dark Mode</p>
          <ActionButton
            onClick={() => null}
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

        <div className='shadow rounded bg-primary p-2 px-5 sm:px-10'>
          <p className='text-center font-semibold'>Community</p>
          <div className='mt-3 divide-y flex flex-col'>
            <LinkButton
              href='https://twitter.com/watashiapp'
              target='_blank'
              icon={FaTwitter}
              label='Follow us on Twitter'
            />
            <LinkButton
              href='https://discord.gg/g7C7mgZ5Qp'
              target='_blank'
              icon={FaDiscord}
              label='Join our Discord'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings
