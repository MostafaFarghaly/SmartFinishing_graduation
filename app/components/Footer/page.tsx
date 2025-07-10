import Link from "next/link";
import Image from "next/image";

export default function Footer() {
return (
    <footer className="bg-gray-900 text-white p-8">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-6 gap-8">
            {/* Start Section */}
            <div className="text-center md:col-span-2">
                <h3 className="text-lg font-bold mb-2">Ready to get started?</h3>
                <div className="space-y-4">
                    <Link href="/signup" className="bg-green-500 text-white text-center py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                        Get Started
                    </Link>
                </div>
            </div>

            {/* Services Section */}
            <div>
                <h3 className="text-green-500 text-2xl mb-3">Top Services</h3>
                <ul className="text-gray-300 space-y-2">
                    <li>Handyman</li>
                    <li>Plumbers</li>
                    <li>Electricians</li>
                    <li>House Cleaning</li>
                </ul>
            </div>

            {/* HomeGuide Section */}
            <div>
                <h3 className="text-green-500 text-2xl mb-3">LOGO</h3>
                <ul className="text-gray-300 space-y-2">
                    <li>Home</li>
                    <li>Log in</li>
                    <li>About</li>
                </ul>
            </div>

            {/* Help Section */}
            <div>
                <h3 className="text-green-500 text-2xl mb-3">Help</h3>
                <ul className="text-gray-300 space-y-2">
                    <li>FAQs</li>
                </ul>
            </div>

            {/* Install App Section */}
            <div>
                <h3 className="text-green-500 text-2xl mb-3">Install App</h3>
                <div className="space-y-2">
                    <Link href="#" className="block mb-2">
                        <Image src="/images/app_store.png" alt="App Store" width={150} height={45} />
                    </Link>
                    <Link href="#" className="block mt-2">
                        <Image src="/images/googel_play.png" alt="Google Play" width={150} height={45} />
                    </Link>
                </div>
            </div>
        </div>
        <div className="flex space-x-4">
                <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
                <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            </div>
        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            
            <p>© address</p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
            <Link href="#" className="hover:text-green-500 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22.213 5.656a8.4 8.4 0 0 1-2.402.658A4.2 4.2 0 0 0 21.649 4c-.82.488-1.719.83-2.655 1.015a4.182 4.182 0 0 0-7.126 3.814a11.87 11.87 0 0 1-8.621-4.37a4.17 4.17 0 0 0-.566 2.103c0 1.45.739 2.731 1.86 3.481a4.2 4.2 0 0 1-1.894-.523v.051a4.185 4.185 0 0 0 3.355 4.102a4.2 4.2 0 0 1-1.89.072A4.185 4.185 0 0 0 8.02 16.65a8.4 8.4 0 0 1-6.192 1.732a11.83 11.83 0 0 0 6.41 1.88c7.694 0 11.9-6.373 11.9-11.9q0-.271-.012-.541a8.5 8.5 0 0 0 2.086-2.164"/></svg>
            </Link>
            <Link href="#" className="hover:text-green-500 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-2 -2 24 24"><g fill="currentColor"><path d="M8.695 6.937v1.377H7.687v1.683h1.008V15h2.072V9.997h1.39s.131-.807.194-1.69h-1.576v-1.15c0-.173.226-.404.45-.404h1.128V5h-1.535C8.644 5 8.695 6.685 8.695 6.937"/><path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4"/></g></svg>   
            </Link>
            <Link href="#" className="hover:text-green-500 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></svg>
            </Link>
            <Link href="#" className="hover:text-green-500 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
            </Link>
            </div>
        </div>
    </footer>
);
}
