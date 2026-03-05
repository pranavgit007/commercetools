import { getProductsByCategory } from '../../../lib/products'
import { getformatedAmount } from '@/lib/formatPrice'
import Link from 'next/link'

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
                            {getformatedAmount(product)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}