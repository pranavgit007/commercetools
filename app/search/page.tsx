import { searchProducts } from "@/lib/search"
import ProductListingGrid from '@/components/Listingpage'

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string, category?: string, price?: string }>
}) {
    const { q, category, price } = await searchParams
    const data = await searchProducts(q || "", {
        category, price
    })
    const products = data.results

    const facets = data.facets
    const categoryFacet = facets?.["categories.id"] as any
    const rangeFacet = facets?.["variants.price.centAmount"] as any
    const categoryMap: Record<string, string> = {}
    products.forEach(p => {
        p.categories.forEach((c: any) => {
            categoryMap[c.id] = c.obj.name["en-US"]
        })
    });
    return (
        <div className="p-10">
            <h1 className="text-xl mb-6">
                Search results for &quot;{q}&quot;
            </h1>
            <div className="flex flex-col md:flex-row gap-4 p-4">

                <div className="w-full md:w-1/4 p-4 border rounded">
                    <b>Categories</b>

                    {categoryFacet?.terms
                        ?.filter((c: any) => categoryMap[c.term])
                        .map((c: any) => (
                            <div key={c.term}>
                                <a href={`/search?q=${q}&category=${c.term}`}>
                                    {categoryMap[c.term]} ({c.count})
                                </a>
                            </div>
                        ))}
                    <b>Price</b>
                    {rangeFacet?.ranges?.map((r: any, i: number) => (
                        <div key={i}>
                            <a
                                href={`/search?q=${q}&price=${r.from || 0}-${r.to || "max"}`}
                            >
                                ${(r.from / 100) || 0} - ${(r.to / 100) || "∞"} ({r.count})
                            </a>
                        </div>
                    ))}
                </div>
                <div className="w-full  grid-cols-2 lg:grid-cols-3 gap-4">
                    <ProductListingGrid products={products} />
                </div>
            </div>
        </div>
    )
}