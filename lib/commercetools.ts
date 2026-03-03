import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { ClientBuilder } from '@commercetools/sdk-client-v2'
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'

export function getApiRoot() {
  const {
    CTP_AUTH_URL,
    CTP_PROJECT_KEY,
    CTP_CLIENT_ID,
    CTP_CLIENT_SECRET,
    CTP_SCOPES,
    CTP_API_URL,
  } = process.env

  if (!CTP_AUTH_URL || !CTP_PROJECT_KEY || !CTP_CLIENT_ID || !CTP_CLIENT_SECRET || !CTP_API_URL) {
    throw new Error('Missing commercetools environment variables')
  }

  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: CTP_AUTH_URL,
    projectKey: CTP_PROJECT_KEY,
    credentials: {
      clientId: CTP_CLIENT_ID,
      clientSecret: CTP_CLIENT_SECRET,
    },
    scopes: [CTP_SCOPES || ''],
    fetch,
  })

  const httpMiddleware = createHttpMiddleware({
    host: CTP_API_URL,
    fetch,
  })

  const ctpClient = new ClientBuilder()
    .withMiddleware(authMiddleware)
    .withMiddleware(httpMiddleware)
    .build()

  return createApiBuilderFromCtpClient(ctpClient)
    .withProjectKey({ projectKey: CTP_PROJECT_KEY })
}