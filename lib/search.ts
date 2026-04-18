import { getApiRoot } from "@/lib/commercetools";

export async function searchProducts(query: string, filters: any = {}) {
  const apiRoot = getApiRoot();
  const filter: string[] = [];
  console.log(filters);
  if (filters.category) {
    filter.push(`categories.id:"${filters.category}"`);
  }
  if (filters.price) {
    const [from, to] = filters.price.split("-");
    filter.push(
      `variants.price.centAmount:range(${from} to ${to === "max" ? "*" : to})`
    );
  }
  const res = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        "text.en-US": query,
        priceCurrency: "USD",
        priceCountry: "US",
        limit: 12,
        filter,
        facet: [
          "categories.id",
          "variants.price.centAmount:range (* to 50000), (50000 to 100000), (100000 to 200000), (200000 to *)",
        ],
        expand: ["categories[*]"]
      },
    })
    .execute();

  return res.body;
}
