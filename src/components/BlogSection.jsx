import React, { useState } from 'react';
import { portfolioConfig } from '../data/config';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  const { blogs } = portfolioConfig;
  const [showAll, setShowAll] = useState(false);

  // Determine how many blogs to show
  const displayedBlogs = showAll ? blogs : (blogs ? blogs.slice(0, 3) : []);

  return (
    <section id="blog">
      <div className="container">
        <div className="s-lbl fi">07 / Blog</div>
        <div className="s-header-row">
          <h2 className="s-title fi d1" style={{marginBottom:0}}>Latest<br/><em>Writing</em></h2>
          {blogs && blogs.length > 3 && (
            <button 
              onClick={() => setShowAll(!showAll)} 
              className="doodle-btn doodle-btn-blog fi d2"
              title="Toggle all blog posts"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{width:'15px', height:'15px', marginRight:'7px', transform: 'rotate(2deg)'}}>
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
              {showAll ? 'Show Less' : 'All Posts'}
            </button>
          )}
        </div>
        <div className="blog-g" id="blog-grid">
          {displayedBlogs.map((blog, idx) => (
            <Link to={`/blog/${blog.id}`} key={idx} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="blog-c" style={{ cursor: 'pointer', transition: 'transform 0.2s', height: '100%' }}>
                <h3 className="blog-t">{blog.title}</h3>
                <p className="blog-d">{blog.excerpt}</p>
                <div className="blog-meta">{blog.date}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
