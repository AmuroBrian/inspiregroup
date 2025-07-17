import Head from 'next/head';

export const metadata = {
  title: 'Access Restricted | Inspire Asset',
  description: 'This content is geo-restricted',
};

export default function NotLegal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500 mx-auto animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">Access Restricted</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          This website is currently only available in Japan, North Korea, South Korea, and China.
        </p>

        <div className="mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            {['JP', 'KR', 'KP', 'CN'].map((code) => (
              <span
                key={code}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {code}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-500 mb-4">
            If you believe this is an error, please contact our support team.
          </p>

          <a
            href="mailto:support@inspire-asset.com"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Contact Support
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Inspire Asset. All rights reserved.</p>
      </div>
    </div>
  );
}