import React, { useState } from 'react';
import iconList from '../../assets/icons/List File.ico';
import iconCmd from '../../assets/icons/cmd.png';
import iconControlPanel from '../../assets/icons/Control Panel.png';
import iconNews from '../../assets/icons/news.png';

const getCategoryIcon = (category) => {
  if (category.includes("Security")) return iconCmd;
  if (category.includes("Cloud")) return iconControlPanel;
  if (category.includes("Programming")) return iconList;
  if (category.includes("Frameworks")) return iconNews;
  return iconList;
};

const TreeToggleIcon = ({ isOpen }) => (
  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges" className="-mr-1 z-10 bg-white">
    {!isOpen ? (
      // Right Arrow (Collapsed)
      <path d="M2 1V8L8 4.5L2 1Z" fill="black" stroke="black" strokeWidth="0.5" />
    ) : (
      // Down Arrow (Expanded) - slightly adjusted to center
      <path d="M1 2H8L4.5 8L1 2Z" fill="black" stroke="black" strokeWidth="0.5" />
    )}
  </svg>
);

const TreeItem = ({ label, children, isRoot = false }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col select-none">
      <div
        className="flex items-center gap-1 hover:bg-[#E0E0E0] cursor-pointer py-[1px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Tree Line / Toggle */}
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          {children && <TreeToggleIcon isOpen={isOpen} />}
        </div>

        {/* Icon */}
        <img src={iconList} alt="" className="w-4 h-4 shrink-0" style={{ filter: isRoot ? 'none' : 'grayscale(1)' }} />

        {/* Label */}
        <span className={`text-xs text-black ${isRoot ? 'font-bold' : ''}`}>{label}</span>
      </div>

      {/* Children */}
      {isOpen && children && (
        <div className="pl-5 relative border-l border-dotted border-gray-400 ml-2.5">
          {children}
        </div>
      )}
    </div>
  );
};

const SkillNode = ({ label, icon }) => (
  <div className="flex items-center gap-1 py-[1px] pl-6 hover:bg-[#E0E0E0] cursor-default relative">
    <div className="absolute left-0 top-1/2 w-6 border-t border-dotted border-gray-400"></div>
    <img src={icon} alt="" className="w-3.5 h-3.5 shrink-0 object-contain" />
    <span className="text-xs text-black">{label}</span>
  </div>
);

const SkillsWidget = ({ data }) => {
  return (
    <div className="bg-white p-4 h-full overflow-y-auto font-sans border-t border-l border-gray-400 shadow-inner">
      {/* Tree Root */}
      <TreeItem label="My Skills" isRoot={true}>
        {data.map((group, i) => (
          <TreeItem key={i} label={group.category}>
            <div className="mb-2"> {/* "One line space for new title" effect */}
              {group.items.map((skill, j) => (
                <SkillNode key={j} label={skill} icon={getCategoryIcon(group.category)} />
              ))}
            </div>
          </TreeItem>
        ))}
      </TreeItem>
    </div>
  );
};


export default SkillsWidget;
