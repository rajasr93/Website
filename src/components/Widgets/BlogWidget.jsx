import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Ideally, this would be imported from the JSON file directly.
// In a real app, you might `import blogData from '../../data/blog_posts.json'` 
// or fetch it if hosted statically.
import blogData from '../../data/blog_posts.json';

const BlogWidget = () => {
    // Reverse order to show newest first
    const posts = [...blogData].reverse();

    return (
        <div className="space-y-8">
            {posts.map((post, index) => (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    className="border-b border-slate-100 pb-8 last:border-0"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-slate-700">{post.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded font-mono uppercase ${post.type === 'CVE' ? 'bg-red-50 text-red-500' :
                                post.type === 'News' ? 'bg-blue-50 text-blue-500' :
                                    'bg-slate-100 text-slate-500'
                            }`}>
                            {post.type}
                        </span>
                    </div>

                    <div className="text-slate-600 leading-relaxed font-mono text-sm whitespace-pre-wrap">
                        {post.content}
                    </div>

                    <div className="mt-3 text-xs text-slate-400 font-mono">
                        Detected: {post.date}
                    </div>
                </motion.div>
            ))}

            {posts.length === 0 && (
                <div className="text-center text-slate-400 py-12 italic">
                    No intelligence reports available.
                </div>
            )}
        </div>
    );
};

export default BlogWidget;
