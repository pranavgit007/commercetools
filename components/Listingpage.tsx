import Link from 'next/link'
import { getformatedAmount } from '@/lib/formatPrice'
import Image from  'next/image'
import AddToCartButton from '@/components/addtocartbutton'

export default function ProductListingGrid({
    products
}: {
    products: any
}) {

    return (
        <div className="grid grid-cols-4 gap-6">
            {products.map((product: any) => (
                <div
                    key={product.id}
                    className="border rounded-lg p-4 shadow-sm"
                >
                    <Image src={product.masterVariant.images?.[0]?.url}
                        width={300}
                        height={300}
                        alt={product.name?.['en-US']}
                        className="w-full h-48 object-cover mb-3" />
                    <Link href={`/product/${product.slug?.['en-US']}`}>
                        <h2 className="font-semibold cursor-pointer">
                            {product.name?.['en-US'] || 'No Name'}
                        </h2>
                    </Link>

                    <p className="product-shotdescription text-sm text-gray-500">
                        {product.description?.['en-US']}
                    </p>

                    <p className="text-2xl font-semibold">
                        {getformatedAmount(product)}
                    </p>
                    <AddToCartButton
                        productId={product.id}
                        variantId={product.masterVariant.id}
                    />
                </div>
            ))}
        </div>
    )
}