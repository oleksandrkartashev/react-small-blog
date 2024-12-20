// src/pages/PostPage.tsx
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost } from '../services/api';
import { Post } from '../types';
import usePosts from '../hooks/usePosts';
import EditPostPopup from '../components/popup/EditPostPopup';

const PostPage = () => {
  const { posts, deletePost, editPost } = usePosts();
  const [post, setPost] = useState<Post | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      try {
        const existingPost = posts.find((post) => post.id === Number(id));
        if (existingPost) {
          setPost(existingPost);
        } else {
          const postData = await fetchPost(Number());
          setPost(postData);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(error);
      }
    };

    loadPost();
  });

  const handleDeletePost = () => {
    const deletePostId = post ? Number(post.id) : Number(id);
    deletePost(deletePostId);
    navigate('/');
  };

  const openEditPopup = useCallback(() => setIsPopupOpen(true), []);
  const closeEditPopup = useCallback(() => setIsPopupOpen(false), []);

  const handleEditPost = (editedPost: Post) => {
    editPost(editedPost);
    closeEditPopup();
  };

  if (!post) {
    return <div className="text-center">Post not found.</div>;
  }

  return (
    <>
      <main className="page page-post flex-1 py-8">
        <div className="container">
          <button
            onClick={() => navigate(-1)}
            className="bg-black dark:bg-white text-white dark:text-black cursor-pointer leading-none mb-4 min-w-[100px] px-3 py-2"
          >
            Back
          </button>
          <div className="post post-single flex-col">
            <div className="post-content border-2 px-5 py-3 md:px-10 md:py-7 mb-5 md:mb-10 bg-white text-black">
              <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
              <p>{post.body}</p>
            </div>
            <div className="post-actions flex items-center border-b-2 justify-center px-4 py-4 md:px-7 md:py-7">
              <button
                onClick={openEditPopup}
                className="bg-black dark:bg-white text-white dark:text-black leading-none min-w-[100px] px-3 py-2 mx-2"
              >
                Edit post
              </button>
              <button
                onClick={handleDeletePost}
                className="bg-black dark:bg-white text-white dark:text-black leading-none min-w-[100px] px-3 py-2 mx-2"
              >
                Delete post
              </button>
            </div>
          </div>
        </div>
        {isPopupOpen && (
          <EditPostPopup
            isOpen={isPopupOpen}
            post={post}
            onClose={closeEditPopup}
            onSave={handleEditPost}
          />
        )}
      </main>
    </>
  );
};

export default PostPage;
