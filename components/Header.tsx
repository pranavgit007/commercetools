import Link from 'next/link'
import { cookies } from 'next/headers'
import { getCategories } from '../lib/categories'

export default async function Header() {
    const categories = await getCategories()

const cookieStore = await cookies()
const token = cookieStore.get('ct_customer_token')
console.log('fjlsafjlsf',token);
    const isLoggedIn = !!token

    return (
        <header className="border-b bg-white shadow-sm">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    CT Store
                </Link>

                <nav className="flex gap-6 items-center">
                    {categories.map((cat: any) => (
                        <Link
                            key={cat.id}
                            href={`/category/${cat.slug?.['en-US']}`}
                            className="hover:text-blue-600"
                        >
                            {cat.name?.['en-US']}
                        </Link>
                    ))}

                    {!isLoggedIn ? (
                        <Link href="/login" className="text-blue-600">
                            Login
                        </Link>
                    ) : (
                        <form action="/api/logout" method="POST">
                            <button className="text-red-600 cursor-pointer">
                                Logout
                            </button>
                        </form>
                    )}
                </nav>
            </div>
        </header>
    )
}