import { apiRoot } from "./commercetools";

export async function getCategories() {
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
