import { getProductsByCategory } from '@/lib/products'
import Link from 'next/link'

export default async function Home() {
    const products = await getProductsByCategory('bedding')

    return (
        <main className="p-10">
            <h1 className="text-2xl font-bold mb-6">Product Listing</h1>

            <div className="grid grid-cols-4 gap-6">
                {products.map((product: any) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4 shadow-sm"
                    >
                        <img
                            src={product.masterVariant.images?.[0]?.url}
                            alt={product.name?.['en-US']}
                            className="w-full h-48 object-cover mb-3"
                        />
                        <Link href={`/product/${product.slug?.['en-US']}`}>
                            <h2 className="font-semibold cursor-pointer">
                                {product.name?.['en-US'] || 'No Name'}
                            </h2>
                        </Link>

                        <p className="text-sm text-gray-500">
                            {product.description?.['en-US']}
                        </p>

                        <p className="mt-2 font-bold">
                            {product.masterVariant.prices?.[0]?.value?.centAmount / 100}
                        </p>
                    </div>
                ))}
            </div>
        </main>
    )
}