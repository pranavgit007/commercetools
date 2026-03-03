import { apiRoot } from './commercetools'
import { getCategoryBySlug } from './category'

export async function getProductsByCategory(slug: string) {
  const catid = await getCategoryBySlug(slug)

  if (!catid) {
    return []
  }
  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: [`categories.id:"${catid}"`],
        limit: 12,
      },
    })
    .execute()

  return response.body.results
}