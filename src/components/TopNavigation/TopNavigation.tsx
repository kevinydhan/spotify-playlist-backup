import { signIn } from 'next-auth/client'
import { FunctionComponent, useCallback } from 'react'

import { TopNavigationProps } from './TopNavigation.d'

const TopNavigation: FunctionComponent<TopNavigationProps> = ({ provider }) => {
  const handleClick = useCallback(() => signIn(provider.id), [])

  return (
    <header>
      <button onClick={handleClick}>Sign in with {provider.name}</button>
    </header>
  )
}

export default TopNavigation
