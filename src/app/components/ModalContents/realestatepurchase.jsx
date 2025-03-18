import Image from 'next/image';

export default function realestatepurchase() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <Image 
            src="/mascot.png" 
            alt="Evan, Editor-in-Chief" 
            width={60} 
            height={60} 
            className="rounded-full"
          />
          <div>
            <h2 className="text-lg font-bold">Evan, Editor-in-Chief</h2>
            <p className="text-gray-600 text-sm">
              Evan's editor-in-chief is now our mascot! We act as a liaison with major companies in the Philippines
              and handle financial services and real estate operations. We can also help you expand your business.
            </p>
            <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md">+ Follow</button>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-6">
          <Image 
            src="/inspire-banner.png" 
            alt="Inspire Holdings Incorporated" 
            width={800} 
            height={400} 
            className="rounded-lg"
          />
        </div>

        {/* Content Section */}
        <h2 className="mt-6 text-2xl font-bold">Inspire Wallet Partner Banks</h2>
      </div>
    </div>
  );
}
