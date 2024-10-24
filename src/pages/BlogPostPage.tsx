import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBlogStore } from '../lib/store';

export default function BlogPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const posts = useBlogStore((state) => state.posts);
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <button
              onClick={() => navigate('/blog')}
              className="text-indigo-600 hover:text-indigo-500 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/blog')}
          className="text-indigo-600 hover:text-indigo-500 flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Blog
        </button>

        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />

        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-8">
            <span>{post.author}</span>
            <span className="mx-2">·</span>
            <time>{new Date(post.date).toLocaleDateString()}</time>
          </div>

          <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    </div>
  );
}