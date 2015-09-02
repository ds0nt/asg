
import { GET, POST } from './lib/api'

import core from './core'

GET `/templates` (() => core.templates.list())
POST `/template` (() => core.templates.post())
