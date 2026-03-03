import { getApiRoot } from '@/lib/commercetools'

export async function getCategoryBySlug(slug: string) {
  const apiRoot = getApiRoot()
  const response = await apiRoot
    .categories()
    .get({
      queryArgs: {
        where: `slug(en-US="${slug}")`,
      },
    })
    .execute()

  return response.body.results[0].id
}