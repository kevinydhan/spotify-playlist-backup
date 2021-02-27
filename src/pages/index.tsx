import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { getProviders } from 'next-auth/client'

import { Box, Heading } from '@/theme/components'
import type { CommonPageProps } from '@/typings/pages'

type IndexPageProps = CommonPageProps

const IndexPage: NextPage<IndexPageProps> = () => (
  <Box
    css={{
      marginTop: '20px',
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <Box>
      <Image
        src="/images/landing-hero.svg"
        alt="Girl standing next to a stack of windows with a play button"
        width="886.10205"
        height="518.69685"
      />
    </Box>
    <Box>
      <Heading
        css={{
          fontSize: '36px',
          lineHeight: '1.2',

          tablet0: {
            fontSize: '42px',
          },
        }}
      >
        Spotify Playlist Backup
      </Heading>
      <p>
        Download backup files for your Spotify playlists which can then be used
        to recreate your playlists
      </p>
    </Box>
  </Box>
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
