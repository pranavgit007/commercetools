'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    async function handleLogin() {
        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json()

        if (data.success) {
            router.push('/')     // navigate
            router.refresh()     // force server re-render
        } else {
            alert('Login failed')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20">
            <h1 className="text-2xl mb-6">Login</h1>

            <input
                className="border p-2 w-full mb-4"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                className="border p-2 w-full mb-4"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={handleLogin}
                className="bg-black text-white px-4 py-2"
            >
                Login
            </button>
        </div>
    )
}