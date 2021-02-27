import type { GetServerSideProps, NextPage } from 'next'
import { getProviders } from 'next-auth/client'

import { AddNewPlaylist, PlaylistCard } from '@/components/index'
import type { CommonPageProps } from '@/typings/pages'

type IndexPageProps = CommonPageProps

const IndexPage: NextPage<IndexPageProps> = () => <div></div>

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const providers = await getProviders()
  const result = {
    props: {
      provider: providers?.spotify,
    },
  }

  return result
}

export default IndexPage
