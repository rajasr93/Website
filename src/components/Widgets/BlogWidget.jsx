import React, { useState } from 'react';
import { useWindow } from '../../context/WindowContext';
import PopupAd from './PopupAd';
import blogData from '../../data/blog_posts.json';

const SidebarGroup = ({ title, children }) => (
    <div className="mb-4 bg-[#D3E5FA] border border-[#9DBBE3] rounded-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#225AD8] to-[#1C50B3] px-2 py-1 flex justify-between items-center">
            <span className="text-white font-bold text-[11px]">{title}</span>
            <div className="w-3 h-3 bg-white/20 rounded-sm"></div>
        </div>
        <div className="p-2 text-[11px] text-[#1D4078] space-y-1">
            {children}
        </div>
    </div>
);

const ArticleDetail = ({ post, onClose }) => (
    <div className="h-full flex flex-col bg-white overflow-hidden">
        {/* Detail Header */}
        <div className="flex justify-between items-start mb-2 border-b border-gray-200 pb-2">
            <div className="pr-2">
                <h2 className="text-lg font-bold text-[#1D4078] leading-tight mb-1">{post.title}</h2>
                <div className="flex gap-2 text-[10px] text-gray-500 items-center">
                    <span>{post.date}</span>
                    <span className="bg-[#225AD8] text-white px-1 rounded-sm">{post.type}</span>
                    <span className="border-l border-gray-300 pl-2 ml-1 text-[#1D4078] font-bold">By Rajas Ronghe</span>
                </div>
            </div>
            <button
                onClick={onClose}
                className="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 rounded border border-gray-300 font-bold text-xs transition-colors shrink-0"
                title="Close Article"
            >
                ✕
            </button>
        </div>

        {/* Detail Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
            <div className="text-sm text-black leading-relaxed whitespace-pre-wrap font-sans">
                {post.content}
            </div>
        </div>

        {/* Detail Footer */}
        <div className="mt-2 pt-2 border-t border-gray-200 text-right shrink-0">
            <a
                href={post.source || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-xs flex items-center justify-end gap-1"
            >
                <span>Read original source</span>
                <span className="text-[10px]">↗</span>
            </a>
        </div>
    </div>
);

const ArticleItem = ({ post, onSelect }) => (
    <div
        className="bg-white border border-[#9DBBE3] rounded-sm mb-3 shadow-sm overflow-hidden cursor-pointer group hover:bg-[#fffee3] hover:border-[#225AD8] transition-colors"
        onClick={() => onSelect(post)}
        onDoubleClick={() => onSelect(post)}
    >
        {/* Article Header */}
        <div className="bg-[#EBF3FD] px-2 py-1 border-b border-[#D3E5FA] flex justify-between items-center group-hover:bg-[#E1EDFA]">
            <span className="font-bold text-[#1D4078] text-xs truncate mr-2 select-none">
                {post.title}
            </span>
            <span className="bg-[#225AD8] text-white text-[9px] px-1 rounded-sm flex-shrink-0">
                {post.type}
            </span>
        </div>
        {/* Article Body */}
        <div className="p-2 text-xs text-black">
            <div className="flex justify-between items-start mb-1 text-[10px] text-gray-500">
                <span>{post.date}</span>
            </div>
            <p className="overflow-hidden leading-snug opacity-90 line-clamp-3 select-none">
                {post.content}
            </p>
            <div className="text-right mt-1">
                <span className="text-[#225AD8] text-[10px] group-hover:underline cursor-pointer">Read full article ↗</span>
            </div>
        </div>
    </div>
);

const BlogWidget = () => {
    const { openWindow } = useWindow();
    const [selectedArticle, setSelectedArticle] = useState(null);
    const posts = [...blogData].reverse();

    const handleRefresh = () => {
        const uniqueId = `popup-refresh-${Date.now()}`;
        openWindow(
            uniqueId,
            'Notification',
            PopupAd,
            null,
            {
                type: 'dialog',
                message: "News already refreshed for the day."
            }
        );
    };

    return (
        <div className="flex h-full bg-[#ECE9D8] font-sans">
            {/* Sidebar */}
            <div className="w-[180px] bg-[#F0F0F0] p-2 flex flex-col border-r border-[#8DA6C9] overflow-y-auto shrink-0 transition-all">
                <SidebarGroup title="Categories">
                    <div className="flex items-center gap-2 bg-[#CCE5FF] border border-[#99CCFF] p-1 rounded-sm cursor-pointer">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        <span className="font-bold">All Stories</span>
                    </div>
                </SidebarGroup>

                <SidebarGroup title="System Tasks">
                    <div
                        className="px-1 cursor-pointer hover:underline flex gap-1"
                        onClick={() => setSelectedArticle(null)}
                    >
                        <span>🏠</span> Home / Feed
                    </div>
                    <div
                        className="px-1 cursor-pointer hover:underline flex gap-1"
                        onClick={handleRefresh}
                    >
                        <span>🔄</span> Refresh news feeds
                    </div>
                </SidebarGroup>

                <SidebarGroup title="Details">
                    <div className="font-bold">Articlers Reader</div>
                    <div className="text-gray-500">v1.0.2</div>
                </SidebarGroup>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white p-4 overflow-y-auto">
                {selectedArticle ? (
                    <ArticleDetail post={selectedArticle} onClose={() => setSelectedArticle(null)} />
                ) : (
                    <>
                        <h2 className="text-[#1D4078] font-bold text-sm mb-4 border-b border-[#D3D3D3] pb-1">Latest News Stories</h2>
                        <div className="space-y-4">
                            {posts.map((post, i) => (
                                <ArticleItem key={i} post={post} onSelect={setSelectedArticle} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogWidget;
