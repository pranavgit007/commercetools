import { getProductBySlug } from '../../../lib/product'
import Image from 'next/image'

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const product = await getProductBySlug(slug)

    if (!product) {
        return <div className="p-10">Product not found</div>
    }

    const image = product.masterVariant.images?.[0]
    const price = product.masterVariant.prices?.[0]?.value?.centAmount
    return (
        <div className="grid grid-cols-2 gap-10">
            {image && (
                <Image
                    src={image.url}
                    alt={product.name?.['en-US']}
                    width={600}
                    height={600}
                    className="rounded-lg"
                />
            )}

            <div>
                <h1 className="text-3xl font-bold mb-4">
                    {product.name?.['en-US']}
                </h1>

                <p className="mb-4 text-gray-600">
                    {product.description?.['en-US']}
                </p>

                <p className="text-2xl font-semibold">
                    {price ? `$${price / 100}` : 'Price not available'}
                </p>
            </div>
        </div>
    )
}