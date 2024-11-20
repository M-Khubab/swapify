"use client"
const OrderConfirmation = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <div className="bg-white p-10 sm:p-12 lg:p-16 rounded-2xl shadow-2xl transform transition-all hover:scale-105 text-center max-w-lg">
          <h1 className="text-4xl font-bold text-blue-700 mb-6">Thank you for your order!</h1>
          <p className="text-gray-700 mb-6 text-lg">
              We have successfully received your order, and it is currently being processed.
          </p>
          <p className="text-gray-500 text-sm mb-8">
              A confirmation email has been sent to your provided email address. Please check your inbox for details.
          </p>
          <button
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition duration-300"
              onClick={() => window.location.href = "/"} // Redirect to homepage
          >
              Back to Home
          </button>
      </div>
  </div>
);

export default OrderConfirmation;
