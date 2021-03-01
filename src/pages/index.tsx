import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { getProviders, SessionProvider, signIn } from 'next-auth/client'

import type { CommonPageProps } from '@/typings/pages'

import buttonStyles from '../styles/components/_button.module.scss'
import pageStyles from '../styles/pages/home.module.scss'

type IndexPageProps = CommonPageProps

const IndexPage: NextPage<IndexPageProps> = ({ provider }) => (
  <div className={pageStyles.root}>
    <div>
      <h1 className={pageStyles.heading}>Spotify Playlist Backup</h1>
      <p className={pageStyles.description}>
        Download backup files for your Spotify playlists which can then be used
        to recreate your playlists
      </p>
      <button
        className={buttonStyles.button}
        onClick={handleSignOutButtonClick(provider?.id)}
      >
        Sign in with {provider?.name}
      </button>
    </div>
    <div>
      <Image
        src="/images/landing-hero.svg"
        alt="Girl standing next to a stack of windows with a play button"
        width="886.10205"
        height="518.69685"
      />
    </div>
  </div>
)

const handleSignOutButtonClick = (providerId: SessionProvider['id']) => () => {
  const callbackUrl = `${window?.location?.origin}/dashboard`
  signIn(providerId, { callbackUrl })
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const providers = await getProviders()

  return {
    props: {
      provider: providers?.spotify,
    },
  }
}

export default IndexPage
