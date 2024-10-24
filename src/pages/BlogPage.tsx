import React from 'react';

const blogPosts = [
  {
    id: 1,
    title: 'How to Choose the Perfect Frame for Your Art',
    excerpt: 'A comprehensive guide to selecting the right frame that complements your artwork and space.',
    date: '2024-02-20',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'The Art of Gallery Walls',
    excerpt: 'Learn how to create stunning gallery walls that showcase your favorite pieces.',
    date: '2024-02-15',
    image: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Frame Maintenance Tips',
    excerpt: 'Essential tips for keeping your frames looking pristine and protecting your artwork.',
    date: '2024-02-10',
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog</h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <time className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <h2 className="text-xl font-semibold text-gray-900 mt-2 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button className="text-indigo-600 font-medium hover:text-indigo-700">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}