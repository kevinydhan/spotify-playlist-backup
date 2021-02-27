import { signIn, signOut } from 'next-auth/client'
import { FunctionComponent } from 'react'

import { Button, Header, Text } from '@/theme/components'

import { TopNavigationProps } from './TopNavigation.d'
import * as styles from './TopNavigation.styles'

/**
 *
 * @todo
 * - Figure out how to manage the dependency of `props.provider` and `props.
 *   session`. For the navigation to work properly, **every** page has to call
 *   `getProviders()` and `getSession()` in `getServerSideProps()`. Ideally,
 *   the navigation could independently determine whether or not a user is
 *   logged in.
 */
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
        <Button
          onClick={() => signOut({ callbackUrl: window?.location?.origin })}
        >
          Log out
        </Button>
      </>
    )}
    {!session && provider && (
      <Button
        onClick={() =>
          signIn(provider?.id, {
            callbackUrl: `${window?.location?.origin}/dashboard`,
          })
        }
      >
        Sign in with {provider?.name}
      </Button>
    )}
  </Header>
)

export default TopNavigation
