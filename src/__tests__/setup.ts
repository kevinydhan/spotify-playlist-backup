import 'isomorphic-fetch'

import dotenv from 'dotenv'

dotenv.config({
  path: '.env.local',
})

jest.mock('next-auth/client')
jest.mock('spotify-web-api-node')
