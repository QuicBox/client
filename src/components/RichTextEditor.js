import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles for the editor
import './RichTextEditor.css'; // Optional: for any additional styling

function RichTextEditor({ company, organizationId, onPost, onCancel }) {
  const [comment, setComment] = useState('');

  const handlePost = async () => {
    if (comment.trim() !== '') {
      // Prepare the POST request body
      const postData = {
        organization_id: organizationId,
        text: `${comment}`, // Wrap comment with <p> tags
        like_count: 0,
      };

      try {
        // Make a POST request to the API
        const response = await fetch('http://localhost:8080/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          const result = await response.json(); // Parse the response
          console.log('Post successful:', result);
          // Clear the comment and trigger onPost callback
          onPost(comment);
          setComment('');
        } else {
          console.error('Failed to post the comment:', response.statusText);
        }
      } catch (error) {
        console.error('Error posting the comment:', error);
      }
    }
  };

  return (
    <div className="rich-text-editor">
      <h5 className="text-secondary">Write for {company}</h5>
      <ReactQuill
        theme="snow"
        value={comment}
        onChange={setComment}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }], // Dropdown with defaults from theme
            [{ align: [] }],
            ['link', 'image'],
            ['clean'], // Remove formatting button
          ],
        }}
        placeholder="Write your thoughts here..."
      />
      <div className="mt-3">
        <button className="btn btn-primary" onClick={handlePost}>
          <i className="fas fa-paper-plane"></i> Post
        </button>
        <button className="btn btn-secondary ml-2" onClick={onCancel}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>
    </div>
  );
}

export default RichTextEditor;
