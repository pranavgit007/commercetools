import { getApiRoot } from '@/lib/commercetools'

export async function getCategories() {
  const apiRoot = getApiRoot()
  const response = await apiRoot
    .categories()
    .get({
      queryArgs: {
        limit: 10,
      },
    })
    .execute();

  return response.body.results;
}
