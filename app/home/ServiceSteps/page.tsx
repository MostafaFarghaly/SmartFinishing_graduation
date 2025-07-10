import Image from "next/image";

export default function JoinProviderSection() {
return (
    <section className="flex flex-col md:flex-row items-center bg-gray-50 rounded-2xl shadow p-4 md:p-0 my-12 overflow-hidden">
        {/* Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <Image
            src="/images/provider.png" // Change to your image path
            alt="Service Provider"
            className="object-cover"
            width={500}
            height={400}
            />
        </div>
        {/* Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            join us as a service provider
            </h2>
            <p className="text-gray-500 mb-6">
            logo receives over a million customer service requests each year. If you’re a skilled worker and looking for new clients, this is your chance to join us. Registration is free.
            </p>
            <button className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold px-8 py-3 rounded-lg shadow hover:from-green-500 hover:to-green-700 transition">
            Join Now <span className="ml-2">→</span>
            </button>
        </div>
    </section>
);
}