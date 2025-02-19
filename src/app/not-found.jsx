import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl mt-4 text-gray-800">Oops! Page not found.</h2>
      <p className="text-gray-600 mt-2">
        The page you are looking for does not exist.
      </p>
      <Link href="/">
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Go Back Home
        </button>
      </Link>
    </div>
  );
}
