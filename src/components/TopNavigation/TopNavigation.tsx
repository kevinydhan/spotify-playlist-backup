import { signIn, signOut } from 'next-auth/client'
import { FunctionComponent } from 'react'

import { TopNavigationProps } from './TopNavigation.d'

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
}) => {
  const handleSignInButtonClick = () => {
    signOut({ callbackUrl: window?.location?.origin })
  }

  const handleSignOutButtonClick = () => {
    const callbackUrl = `${window?.location?.origin}/dashboard`
    signIn(provider?.id, { callbackUrl })
  }

  return (
    <header>
      {session && (
        <>
          <span>Welcome, {session?.user?.name}!</span>
          <button onClick={handleSignInButtonClick}>Log out</button>
        </>
      )}
      {!session && provider && (
        <button onClick={handleSignOutButtonClick}>
          Sign in with {provider?.name}
        </button>
      )}
    </header>
  )
}

export default TopNavigation
