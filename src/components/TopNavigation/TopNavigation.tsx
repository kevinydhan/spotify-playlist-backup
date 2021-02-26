import { signIn, signOut } from 'next-auth/client'
import { FunctionComponent } from 'react'

import { Button, Header, Text } from '@/theme/components'

import { TopNavigationProps } from './TopNavigation.d'
import * as styles from './TopNavigation.styles'

const TopNavigation: FunctionComponent<TopNavigationProps> = ({
  provider,
  session,
}) => (
  <Header alignX="right">
    {session && (
      <>
        <Text as="span" css={styles.welcomeText}>
          Welcome, {session?.user?.name}!
        </Text>
        <Button onClick={() => signOut()}>Log out</Button>
      </>
    )}
    {!session && provider && (
      <Button onClick={() => signIn(provider?.id)}>
        Sign in with {provider?.name}
      </Button>
    )}
  </Header>
)

export default TopNavigation
