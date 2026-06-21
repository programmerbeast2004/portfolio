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
        <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'60px'}}>
          <h2 className="s-title fi d1" style={{marginBottom:0}}>Latest<br/><em>Writing</em></h2>
          {blogs && blogs.length > 3 && (
            <button 
              onClick={() => setShowAll(!showAll)} 
              className="btn-s fi d2"
              style={{ cursor: 'pointer', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)' }}
            >
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
