export default async function OrderSuccess({ params }: any) {
    const { id } = await params;

    return (
        <div className="p-10 text-center">
            <h1 className="text-3xl mb-4">Order placed successfully 🎉</h1>

            <p className="mb-6">Order ID: {id}</p>

            <a href="/" className="text-blue-600">
                Continue shopping
            </a>
        </div>
    );
}