import { Link } from 'react-router';


const Error404 = () => {
  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mt-2">
          Oops! It looks like you're lost in the digital wilderness.
        </p>
        <p className="text-gray-500 mt-1">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
        >
         <button> Return to Home</button>
        </Link>
      </div>
    </div>
  )
}

export default Error404