import { getProductsByCategory } from '../../../lib/products'
import ProductListingGrid from '@/components/Listingpage'
export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const products = await getProductsByCategory(slug)

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">
                Category: {slug}
            </h1>

            <ProductListingGrid products={products} />
        </div>
    )
}