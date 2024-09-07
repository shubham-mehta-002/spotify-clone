export function ErrorPage() {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="text-center bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-6xl font-bold text-red-600">404</h1>
          <p className="text-xl mt-4 mb-6 text-gray-600">
            Oops! The page you are looking for does not exist.
          </p>
          <p className="text-sm text-gray-500">
            You might have mistyped the address or the page may have been moved.
          </p>
          <a
            href="/"
            className="inline-block mt-6 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }
  