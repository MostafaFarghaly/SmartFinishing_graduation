import Image from "next/image";

export default function InstallApp() {
return (
    <section className="bg-black rounded-2xl my-8 px-4 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
        {/* Left Side */}
        <div className="flex-1 text-white mb-8 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Download the App</h2>
            <p className="mb-8 text-gray-300 max-w-sm">
            Download the logo app for free, and easily chat with service providers.
            </p>
            <div className="flex gap-4">
            <a href="#" aria-label="Download on the App Store">
                <Image
                src="/images/app_store.png"
                alt="App Store"
                width={140}
                height={44}
                className="rounded"
                />
            </a>
            <a href="#" aria-label="Get it on Google Play">
                <Image
                src="/images/googel_play.png"
                alt="Google Play"
                width={140}
                height={44}
                className="rounded"
                />
            </a>
            </div>
        </div>
        {/* Right Side */}
        <div className="flex-1 flex justify-center md:justify-end">
            <Image
            src="/images/phone.png"
            alt="App on phone"
            width={240}
            height={480}
            className="object-contain"
            />
        </div>
    </section>
);
}