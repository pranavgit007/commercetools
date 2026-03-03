import { apiRoot } from './commercetools'

export async function getCategoryBySlug(slug: string) {
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