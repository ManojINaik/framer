import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useBlogStore, type BlogPost } from '../../lib/store';

export default function AdminBlog() {
  const { posts, addPost, updatePost, deletePost } = useBlogStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postData = {
      title: formData.get('title') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      image: formData.get('image') as string,
      date: new Date().toISOString(),
      author: formData.get('author') as string
    };

    if (editingPost?.id) {
      updatePost(editingPost.id, postData);
    } else {
      addPost(postData);
    }

    setIsModalOpen(false);
    setEditingPost(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Blog Posts</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Post
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Post
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded object-cover"
                        src={post.image}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {post.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {post.excerpt.substring(0, 50)}...
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{post.author}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingPost(post);
                      setIsModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingPost ? 'Edit Post' : 'Add New Post'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingPost?.title}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  defaultValue={editingPost?.author}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  defaultValue={editingPost?.excerpt}
                  required
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Content (HTML)
                </label>
                <textarea
                  name="content"
                  defaultValue={editingPost?.content}
                  required
                  rows={10}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  defaultValue={editingPost?.image}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingPost(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  {editingPost ? 'Update' : 'Add'} Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}