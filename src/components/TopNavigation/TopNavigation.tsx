import { signIn, signOut } from 'next-auth/client'
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
} from 'react'

import { Header } from '@/theme/components'

import { TopNavigationProps } from './TopNavigation.d'

const TopNavigation: FunctionComponent<TopNavigationProps> = ({
  provider,
  session,
}) => {
  let button: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >

  if (session) {
    button = <button onClick={() => signOut()}>Log out</button>
  } else {
    button = (
      <button onClick={() => signIn(provider.id)}>
        Sign in with {provider.name}
      </button>
    )
  }

  return <Header>{button}</Header>
}

export default TopNavigation
