// components/SearchBox.tsx
"use client"

import { useRouter } from "next/navigation"
import { useRef, useState } from "react";
import FullPageLoader from './FullPageLoader';
import Swal from "sweetalert2";

export default function SearchBox() {
    const router = useRouter()
    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    // Function to convert file to Base64
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;

                img.onload = () => {
                    // 1. Create a hidden canvas
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // 2. Set dimensions (you can also downscale here if needed)
                    canvas.width = img.width;
                    canvas.height = img.height;

                    if (!ctx) {
                        reject(new Error("Canvas context failed"));
                        return;
                    }

                    // 3. Draw the image onto the canvas
                    ctx.drawImage(img, 0, 0);

                    // 4. Convert to JPEG (quality 0.9 is a good balance)
                    // This effectively converts WebP/PNG/etc to JPEG
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

                    // 5. Extract the base64 part
                    const base64String = dataUrl.split(',')[1];
                    resolve(base64String);
                };

                img.onerror = (error) => reject(error);
            };

            reader.onerror = (error) => reject(error);
        });
    };
    function handleSearch(e: React.SubmitEvent) {
        e.preventDefault()

        if (!query.trim()) return

        router.push(`/search?q=${encodeURIComponent(query)}`)
    }
    function handleImageClick() {
        fileInputRef.current?.click();
    }

    // 1. Added 'async' keyword here
    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        // Set this to true when you are ready to test the live API
        const useraws = true;
        let searchString = '';

        if (useraws) {
            // 2. Client-side size check (5MB)
            if (file.size > 5 * 1024 * 1024) {
                Swal.fire({
                    icon: "error",
                    text: "File is too large! Please upload an image under 5MB.",
                });
                return;
            }
            setIsLoading(true);
            try {
                // 3. Await the base64 conversion
                const base64Image = await fileToBase64(file);

                // We call our OWN local API route
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    body: JSON.stringify({ image: base64Image }),
                });

                const data = await response.json();
                setIsLoading(false);
                // 6. Safeguard: ensure labels exist before joining
                if (data && data.labels) {
                    console.log(data.labels);
                    searchString = data.labels.join(' ');
                } else {
                    console.error(data);
                    Swal.fire({
                        icon: "error",
                        text: "No Match Found. " + data?.details?.error,
                    });
                    return;
                }
            } catch (error) {
                setIsLoading(false);
                console.error("Error calling AWS Lambda:", error);
                Swal.fire({
                    icon: "error",
                    text: "ailed to process image. check console for details",
                });
                return;
            }
        } else {
            // Mock data for testing
            searchString = 'Glassware bar';
        }

        // 7. Redirect using the search string
        if (searchString != '')
            router.push(`/search?q=${encodeURIComponent(searchString.trim())}`);
    }
    return (
        <>
            {/* 1. Show loader over the entire page */}
            {isLoading && <FullPageLoader />}
            {/* 2. Your actual Search Input UI */}
            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="cursor-pointer border px-3 py-2"
                />
                <button className="bg-black text-white px-4">
                    Search
                </button>
                {/* Image Upload Button */}
                <button
                    type="button"
                    onClick={handleImageClick}
                    className="cursor-pointer border px-3 py-2 rounded hover:bg-gray-100"
                    title="Search by image"
                >
                    📷
                </button>

                {/* Hidden File Input */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </form>
        </>
    )
}