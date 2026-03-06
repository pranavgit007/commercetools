import { getProductsByCategory } from '@/lib/products'
import ProductListingGrid from '@/components/Listingpage'

export default async function Home() {
    const products = await getProductsByCategory('bedding')
    // Function to return a string
    return (
        <main className="p-10">
            <h1 className="text-2xl font-bold mb-6">Product Listing</h1>
            <ProductListingGrid products={products}/>
        </main >
    )
}