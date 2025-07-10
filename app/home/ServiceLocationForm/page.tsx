'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ServiceLocationForm() {
const [service, setService] = useState('');
const [governorate, setGovernorate] = useState('');
const [city, setCity] = useState('');

const handleSearch = () => {
console.log({ service, governorate, city });
};

return (<>
    <div className="flex flex-col items-center bg-gradient-to-r from-gray-200 to-green-400 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Choose your Services and location</h2>
        <p className="text-gray-600 text-sm mb-6">Explore our most in-demand services, trusted by customers for their exceptional quality and reliability.</p>
        
        <div className="flex w-full max-w-4xl items-center justify-between">
            <div className="w-full max-w-md space-y-4">
                <div>
                <label className="block text-gray-700 mb-1">Select the service</label>
                <select className="w-full p-3 px-4 border rounded-lg bg-white" value={service} onChange={(e) => setService(e.target.value)}>
                    <option value="">Menu Label</option>
                    <option value="service1">Service 1</option>
                    <option value="service2">Service 2</option>
                </select>
                </div>

                <div>
                <label className="block text-gray-700 mb-1">Select the governorate</label>
                <select className="w-full p-3 px-4 border rounded-lg bg-white" value={governorate} onChange={(e) => setGovernorate(e.target.value)}>
                    <option value="">Menu Label</option>
                    <option value="gov1">Governorate 1</option>
                    <option value="gov2">Governorate 2</option>
                </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Select the city</label>
                    <select className="w-full p-3 px-4 border rounded-lg bg-white" value={city} onChange={(e) => setCity(e.target.value)}>
                        <option value="">Menu Label</option>
                        <option value="city1">City 1</option>
                        <option value="city2">City 2</option>
                    </select>
                </div>

                <Link href="/gosearch" className='block mt-4'>
                    <button className="w-40 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition" onClick={handleSearch}>
                        Go Search
                    </button>
                </Link>
            </div>
        
            <div className="ml-8">
                <Image src="/images/location.png" alt="Illustration" width={400} height={300} />
            </div>
        </div>
    </div>
</>);
}

