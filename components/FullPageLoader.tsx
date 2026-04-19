export default function FullPageLoader() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative">
                {/* Outer Spinner */}
                <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
                {/* Inner Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="text-2xl">📷</span>
                </div>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-white">Analyzing Image</h2>
            <p className="mt-2 text-gray-300 animate-pulse">Identifying products for you...</p>
        </div>
    )
}