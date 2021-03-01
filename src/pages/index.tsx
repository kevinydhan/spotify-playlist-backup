import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { getProviders } from 'next-auth/client'

import type { CommonPageProps } from '@/typings/pages'

type IndexPageProps = CommonPageProps

const IndexPage: NextPage<IndexPageProps> = () => (
  <div>
    <div>
      <Image
        src="/images/landing-hero.svg"
        alt="Girl standing next to a stack of windows with a play button"
        width="886.10205"
        height="518.69685"
      />
    </div>
    <div>
      <h1
        style={{
          fontSize: '36px',
          lineHeight: '1.2',
        }}
      >
        Spotify Playlist Backup
      </h1>
      <p>
        Download backup files for your Spotify playlists which can then be used
        to recreate your playlists
      </p>
    </div>
  </div>
)

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const providers = await getProviders()

  return {
    props: {
      provider: providers?.spotify,
    },
  }
}

export default IndexPage
