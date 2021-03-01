import { SessionProvider, signIn, signOut } from 'next-auth/client'
import { FunctionComponent } from 'react'

import buttonStyles from '../../styles/components/button.module.scss'
import navigationStyles from '../../styles/components/navigation.module.scss'
import { TopNavigationProps } from './TopNavigation.d'

/**
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
  <header className={navigationStyles.header}>
    {session && (
      <>
        <span>Welcome, {session?.user?.name}!</span>
        <button
          className={buttonStyles.button}
          onClick={handleSignInButtonClick}
        >
          Log out
        </button>
      </>
    )}
    {!session && provider && (
      <button
        className={buttonStyles.button}
        onClick={handleSignOutButtonClick(provider?.id)}
      >
        Sign in with {provider?.name}
      </button>
    )}
  </header>
)

const handleSignInButtonClick = () => {
  signOut({ callbackUrl: window?.location?.origin })
}

const handleSignOutButtonClick = (providerId: SessionProvider['id']) => () => {
  const callbackUrl = `${window?.location?.origin}/dashboard`
  signIn(providerId, { callbackUrl })
}

export default TopNavigation
