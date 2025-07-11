import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {/* Ready to Start */}
        <div className="col-span-2 text-center lg:text-left">
          <h3 className="text-2xl font-semibold mb-4">Ready to get started?</h3>
          <Link
            href="/signup"
            className="inline-block bg-green-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-600 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Top Services */}
        <div>
          <h3 className="text-green-500 text-xl font-semibold mb-4">Top Services</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Handyman</li>
            <li>Plumbers</li>
            <li>Electricians</li>
            <li>House Cleaning</li>
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-green-500 text-xl font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/login">Log in</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h3 className="text-green-500 text-xl font-semibold mb-4">Help</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link href="/faq">FAQs</Link></li>
          </ul>
        </div>

        {/* Install App */}
        <div>
          <h3 className="text-green-500 text-xl font-semibold mb-4">Install App</h3>
          <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start">
            <Link href="#">
              <Image src="/images/app_store.png" alt="App Store" width={150} height={45} />
            </Link>
            <Link href="#">
              <Image src="/images/googel_play.png" alt="Google Play" width={150} height={45} />
            </Link>
          </div>
        </div>
      </div>

      {/* Terms & Privacy */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-4 mt-10 text-gray-400 text-sm">
        <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
        <span className="hidden sm:inline-block">|</span>
        <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm gap-4">
        <p className="text-center">&copy; 2025 SmartFinishing. All rights reserved.</p>

        {/* Social Icons */}
        <div className="flex gap-4">
          {/* Add your icons here as before (Twitter, Facebook, etc.) */}
          {/* For brevity, I’ve skipped repeating them here. Let me know if you want them again. */}
        </div>
      </div>
    </footer>
  );
}
