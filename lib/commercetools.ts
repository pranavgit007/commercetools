import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { ClientBuilder } from '@commercetools/sdk-client-v2'
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: process.env.CTP_AUTH_URL!,
  projectKey: process.env.CTP_PROJECT_KEY!,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID!,
    clientSecret: process.env.CTP_CLIENT_SECRET!,
  },
  scopes: [process.env.CTP_SCOPES!],
  fetch,
})

const httpMiddleware = createHttpMiddleware({
  host: process.env.CTP_API_URL!,
  fetch,
})

const ctpClient = new ClientBuilder()
  .withMiddleware(authMiddleware)
  .withMiddleware(httpMiddleware)
  .build()

export const apiRoot = createApiBuilderFromCtpClient(ctpClient)
  .withProjectKey({ projectKey: process.env.CTP_PROJECT_KEY! })