import { getApiRoot } from '@/lib/commercetools'

export async function getProductBySlug(slug: string) {
  const apiRoot = getApiRoot()
  const response = await apiRoot
    .productProjections()
    .get({
      queryArgs: {
        where: `slug(en-US="${slug}")`,
        priceCurrency:'USD',
        priceCountry:'US'
      },
    })
    .execute();

  return response.body.results[0];
}
