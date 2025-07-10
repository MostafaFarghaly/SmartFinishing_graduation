import Image from "next/image";

export default function AboutUsTestimonials() {
return (
    <section className="bg-green-900 text-white py-16 px-4 md:px-16 my-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            {/* Left Side */}
            <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    What our customers are <br /> saying us?
                </h2>
                <p className="text-gray-200 mb-8 max-w-md">
                    Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like.
                </p>
                <div className="flex items-center gap-12">
                    <div>
                        <div className="text-2xl font-bold">10m+</div>
                        <div className="text-gray-300 text-sm">Happy People</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">4.88</div>
                        <div className="flex items-center gap-1 text-yellow-400 text-sm">
                            <span>★★★★★</span>
                        </div>
                        <div className="text-gray-300 text-sm">Overall rating</div>
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <div className="flex-1 flex flex-col items-start">
                <div className="flex items-center gap-4 mb-2">
                    <Image
                    src="/images/avatar1.png"
                    alt="Customer"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                    />
                    <div>
                        <div className="font-semibold">Cameron Williamson</div>
                        <div className="text-gray-300 text-sm">Ismailia</div>
                    </div>
                    <span className="ml-4 text-3xl text-yellow-400">“</span>
                </div>
                <blockquote className="text-lg font-medium mb-6">
                    "I was honestly surprised by how smooth everything wen<br />
                    Creating my project was simple, and I had full control ov<br />
                    every detail."
                </blockquote>
                <div className="flex gap-4">
                    <button className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-white hover:bg-green-800 transition">
                        &lt;
                    </button>
                    <button className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-white hover:bg-green-800 transition">
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    </section>
);
}