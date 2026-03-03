import { apiRoot } from "./commercetools";

export async function getProductBySlug(slug: string) {
  const response = await apiRoot
    .productProjections()
    .get({
      queryArgs: {
        where: `slug(en-US="${slug}")`,
      },
    })
    .execute();

  return response.body.results[0];
}
