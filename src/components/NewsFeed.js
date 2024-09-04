import React, { useState } from 'react';
import { Slider, Tooltip } from '@mui/material';
import './NewsFeed.css'; // Ensure this CSS file is properly updated

// Define an array of specific values for the sliders
const sliderValues = [10, 25, 40, 55, 70, 85, 100];

const NewsFeed = ({ newsFeedData }) => {
  const [tooltipVisibility, setTooltipVisibility] = useState({}); // State to manage tooltip visibility for each post

  // Function to handle mouse enter and leave for tooltips
  const handleTooltipToggle = (postId, isVisible) => {
    setTooltipVisibility((prevVisibility) => ({
      ...prevVisibility,
      [postId]: isVisible,
    }));
  };

  return (
    <div className="news-feed">
      {newsFeedData.length > 0 ? (
        newsFeedData.map((post, index) => {
          const sliderValue = sliderValues[index % sliderValues.length]; // Use modulus to cycle through sliderValues array
          return (
            <div key={post.id} className="post-card card mb-3">
              <div className="card-body">
                <h6 className="card-title">{post.company}</h6>
                <div
                  className="card-text"
                  dangerouslySetInnerHTML={{ __html: post.comment }}
                />

                <div className="post-actions">
                  <button className="btn btn-light">
                    <i className="far fa-thumbs-up"></i> {post.likes}
                  </button>
                  <button className="btn btn-light">
                    <i className="far fa-comment"></i>
                  </button>
                  <button className="btn btn-light">
                    <i className="fas fa-share"></i>
                  </button>
                  <div
                    className="slider-container"
                    onMouseEnter={() => handleTooltipToggle(post.id, true)} // Show tooltip on hover
                    onMouseLeave={() => handleTooltipToggle(post.id, false)} // Hide tooltip when not hovering
                  >
                    <Tooltip
                      open={tooltipVisibility[post.id] || false} // Toggle visibility based on state
                      enterTouchDelay={0}
                      placement="top"
                      title={`${sliderValue}%`}
                    >
                      <Slider
                        value={sliderValue}
                        aria-labelledby="continuous-slider"
                        readOnly
                        sx={{
                          '& .MuiSlider-thumb': {
                            width: 20, // Thumb size
                            height: 20, // Thumb size
                            backgroundColor: '#ffffff', // Thumb color (white)
                          },
                          '& .MuiSlider-track': {
                            display: 'none', // Remove the track
                          },
                          '& .MuiSlider-rail': {
                            height: 8, // Rail height
                            background: 'linear-gradient(to right, red, orange, yellow, green)', // Gradient from red to green
                          },
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-muted">Loading ...</p>
      )}
    </div>
  );
};

export default NewsFeed;
