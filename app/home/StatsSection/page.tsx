import Image from "next/image";

export default function StatsSection() {
  return (
    <section className="bg-white py-12 px-4">
      {/* Top Title */}
      <div className="p-10 ">
        <span className="text-green-600 font-semibold text-sm">Launch faster</span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2 mb-2">Build something great</h2>
        <p className="text-gray-600 max-w-2xl">
          We’ve done all the heavy lifting so you don’t have to — get all the data you need to launch and grow your business faster.
        </p>
      </div>
      {/* Stats + Image */}
      <div className=" rounded-lg p-10 flex flex-col md:flex-row gap-8 items-center">
        {/* Stats */}
        <div className="flex-1 grid grid-cols-2 gap-8">
          <div>
            <div className="text-green-600 text-4xl font-bold mb-1">200+</div>
            <div className="font-bold text-gray-800 mb-1">Services</div>
            <div className="text-gray-500 text-sm">Choose from over 200 diverse services</div>
          </div>
          <div>
            <div className="text-green-600 text-4xl font-bold mb-1">1,500+</div>
            <div className="font-bold text-gray-800 mb-1">1,500+ Service Providers</div>
            <div className="text-gray-500 text-sm">Join our community of 1,500+ highly skilled and vetted service providers.</div>
          </div>
          <div>
            <div className="text-green-600 text-4xl font-bold mb-1">10k</div>
            <div className="font-bold text-gray-800 mb-1">Happy Customers</div>
            <div className="text-gray-500 text-sm">Trusted by over 10,000+ happy customers who rely on our platform for reliable</div>
          </div>
          <div>
            <div className="text-green-600 text-4xl font-bold mb-1">200+</div>
            <div className="font-bold text-gray-800 mb-1">5-star reviews</div>
            <div className="text-gray-500 text-sm">We’re proud of our 5-star rating with over 200 reviews.</div>
          </div>
        </div>
        {/* Image */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative w-full max-w-xs">
            <Image
              src="/images/room.png"
              alt="Room"
              width={350}
              height={260}
              className="rounded-lg object-cover"
            />
            {/* Overlay Card */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow px-4 py-2 flex items-center gap-2">
              <span></span>
              <div>
                <div className="text-xs text-gray-500">Total Clients</div>
                <div className="font-bold text-gray-800">7,000 M</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}