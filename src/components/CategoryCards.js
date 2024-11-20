import Link from 'next/link';

export default function CategoryCards() {
  const categories = [
    { name: 'Mobile', image: '/mobile.png', slug: 'mobile' },
    { name: 'Car', image: '/car.png', slug: 'car' },
    { name: 'Bike', image: '/bike.png', slug: 'bike' },
    { name: 'House', image: '/house.png', slug: 'house' },
    { name: 'Jobs', image: '/jobs.png', slug: 'jobs' },
    { name: 'Services', image: '/service.png', slug: 'jobs' },
    { name: 'Fashion', image: '/fashion.png', slug: 'jobs' },
    { name: 'Furniture', image: '/home.png', slug: 'jobs' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-5">
      {/* <h2>Categories</h2> */}
      {categories.map((category, index) => (
        <Link href={`/category/${category.slug}`} key={index} passHref>
          <div
            className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold text-blue-700">{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
