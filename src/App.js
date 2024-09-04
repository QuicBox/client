import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Suggestions from './components/Suggestions';
import NewsFeed from './components/NewsFeed';
import RichTextEditor from './components/RichTextEditor';

function App() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newsFeedData, setNewsFeedData] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch initial posts data
    fetch('http://localhost:8080/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        return response.json();
      })
      .then((data) => {
        // Fetch organization names based on organization_id
        const fetchOrganizations = data.map((post) =>
          fetch(`http://localhost:8080/organization/${post.organization_id}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch organization');
              }
              return response.json();
            })
            .then((org) => ({
              ...post,
              company: org.name, // Map organization name
              comment: post.text,
              likes: post.like_count,
            }))
        );

        // Wait for all fetches to complete
        return Promise.all(fetchOrganizations);
      })
      .then((posts) => {
        setNewsFeedData(posts);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching posts or organizations:', error);
        setLoading(false); // Stop loading if there's an error
      });
  }, []);

  const handlePost = (comment) => {
    // Add new post locally for optimistic update
    const newPost = {
      id: newsFeedData.length + 1, // Generate a new ID
      company: selectedCompany,
      organization_id: selectedOrgId, // Make sure to pass the org id
      comment: `<p>${comment}</p>`,
      likes: 0, // Initial likes
    };

    // Update state with the new post
    setNewsFeedData([newPost, ...newsFeedData]);
    setSelectedCompany(null); // Reset after posting
  };

  const handleCancel = () => {
    setSelectedCompany(null); // Go back to NewsFeed without posting
    setSelectedOrgId(null); // Reset the organization ID as well
  };

  const handleSelectCompany = (company, orgId) => {
    setSelectedCompany(company);
    setSelectedOrgId(orgId); // Set organization ID
  };

  return (
    <div className="container-fluid app-container">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-4 col-12 left-section">
          <SearchBar onSearch={setSearchTerm} />
          <Suggestions searchTerm={searchTerm} onSelect={handleSelectCompany} />
        </div>
        {/* Right Section */}
        <div className="col-md-8 col-12 right-section">
          {selectedCompany ? (
            <RichTextEditor
              company={selectedCompany}
              organizationId={selectedOrgId} // Pass the organization ID to the editor
              onPost={handlePost}
              onCancel={handleCancel}
            />
          ) : loading ? (
            <p className="text-muted">Loading ...</p> // Show loading state
          ) : (
            <NewsFeed newsFeedData={newsFeedData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
