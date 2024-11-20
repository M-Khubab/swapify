// import React from 'react';

// const Card = ({ image, price, description, location, daysLive }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
//       <img src={image} alt="Product" className="w-full h-48 object-cover" />
//       <div className="p-4 flex-grow">
//         <h3 className="text-xl font-bold">{price}</h3>
//         <p className="text-gray-700">{description}</p>
//         <p className="text-gray-500">{location}</p>
//         <p className="text-gray-400 text-sm">{daysLive} days live</p>
//       </div>
//       <button className="bg-blue-500 text-white py-2 rounded-b-lg hover:bg-blue-600">
//         Add to Cart
//       </button>
//     </div>
//   );
// };

// const Mobile = () => {
//   const products = [
//     {
//       image: '/mobiles.png',
//       price: '$299',
//       description: 'Latest Mobile Model',
//       location: 'New York',
//       daysLive: 10,
//     },
//     {
//         image: '/mobiles.png',
//         price: '$299',
//         description: 'Latest Mobile Model',
//         location: 'New York',
//         daysLive: 10,
//       },
//       {
//         image: '/mobiles.png',
//         price: '$299',
//         description: 'Latest Mobile Model',
//         location: 'New York',
//         daysLive: 10,
//       },
//       {
//         image: '/mobiles.png',
//         price: '$299',
//         description: 'Latest Mobile Model',
//         location: 'New York',
//         daysLive: 10,
//       },
//   ];

//   return (
//     <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//       {products.map((product, index) => (
//         <Card key={index} {...product} />
//       ))}
//     </div>
//   );
// };

// export default Mobile;
