import React from 'react';
import { Post } from '../api/post';

interface Prop {
  post: Post;
  closeModal: () => void;
}

function ReadPostModal({ post, closeModal }: Prop) {
  return (
    <div className='read-modal-container'>
      <div className='read-modal-content'>
        <div className='read-modal-post-content'>
          <p>
            {post.content}<br /><br />
            from. {post.nickname}
          </p>
        </div>
        <button className='button' onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
}

export default ReadPostModal;