import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll } from 'vitest'

import { handlers as browseHandlers } from './browse'
import { handlers as highlightsHandlers } from './highlights'
import { handlers as presetsHandlers } from './presets'
import { handlers as recommendationsHandlers } from './recommendations'
import { handlers as similarSearchHandlers } from './similar-search'
import { handlers as suggestHandlers } from './suggest'

const server = setupServer(
  ...browseHandlers,
  ...highlightsHandlers,
  ...presetsHandlers,
  ...recommendationsHandlers,
  ...similarSearchHandlers,
  ...suggestHandlers,
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
