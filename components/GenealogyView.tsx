import React, { useEffect, useState } from 'react';
import { teamService } from '../services/teamService';
import { GenealogyNode } from '../types';

// Avatar Component to handle the different robot states
const RobotAvatar = ({ status }: { status: GenealogyNode['status'] }) => {
  // Base image
  const imgSrc = "https://cdn3d.iconscout.com/3d/premium/thumb/robot-9642959-7896434.png?f=webp";

  // CSS Filters for coloring
  let filterStyle = {};
  switch (status) {
    case 'active':
      // Greenish
      filterStyle = { filter: 'hue-rotate(90deg) brightness(1.1) saturate(1.2)' };
      break;
    case 'inactive':
      // Redish
      filterStyle = { filter: 'hue-rotate(-50deg) saturate(2)' };
      break;
    case 'open':
      // Pink/Silver
      filterStyle = { filter: 'hue-rotate(280deg) saturate(1.5)' };
      break;
    case 'close':
      // Grayscale
      filterStyle = { filter: 'grayscale(1) brightness(0.8)' };
      break;
  }

  return (
    <div className="w-16 h-16 md:w-20 md:h-20 transition-transform hover:scale-110 duration-300">
      <img
        src={imgSrc}
        alt="Robot"
        className="w-full h-full object-contain drop-shadow-lg"
        style={filterStyle}
      />
    </div>
  );
};

// Recursive Tree Component
const TreeNode: React.FC<{ node: GenealogyNode }> = ({ node }) => {
  const statusColor =
    node.status === 'active' ? 'text-green-400' :
      node.status === 'inactive' ? 'text-red-400' :
        node.status === 'open' ? 'text-fuchsia-400' : 'text-gray-400';

  return (
    <li className="float-left text-center list-none relative p-5 pt-5 px-2 md:px-4">
      {/* Node Content */}
      <div className="flex flex-col items-center relative z-20 group">
        <RobotAvatar status={node.status} />
        <div className="mt-2 space-y-0.5 min-w-[100px]">
          <div className={`text-[10px] md:text-xs font-bold ${statusColor} bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm border border-white/5`}>
            {node.id}
          </div>
          <div className="text-[10px] md:text-xs font-medium text-white/90 truncate max-w-[120px]">
            {node.name}
          </div>
        </div>

        {/* Tooltip for details */}
        <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-nexus-card border border-white/20 p-2 rounded text-xs text-white z-50 pointer-events-none whitespace-nowrap shadow-xl">
          Status: <span className="uppercase">{node.status}</span>
        </div>
      </div>

      {/* Children */}
      {node.children && node.children.length > 0 && (
        <ul className="flex justify-center pt-5 relative">
          {/* Connector Logic handled by CSS styles below */}
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export const GenealogyView: React.FC = () => {
  const [treeData, setTreeData] = useState<GenealogyNode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    teamService.getGenealogy()
      .then(res => setTreeData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Genealogy</h2>
      </div>

      <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl overflow-hidden shadow-2xl relative min-h-[800px] flex flex-col">
        {/* Background */}
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/hud-futuristic-interface-screen-design_1017-26694.jpg')] bg-cover opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/90 to-[#2d1b4e]/90 pointer-events-none"></div>

        {/* Header Controls */}
        <div className="relative z-20 p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/10">
          <div className="flex w-full md:w-auto gap-0">
            <input
              type="text"
              placeholder="Enter Member ID to be Searched"
              className="bg-white text-gray-900 rounded-l-lg px-4 py-3 text-sm font-medium w-full md:w-80 focus:outline-none"
            />
            <button className="bg-[#b02dad] hover:bg-[#c03eae] text-white font-bold py-3 px-6 rounded-r-lg shadow-lg transition-colors text-sm whitespace-nowrap">
              Search
            </button>
          </div>
          <button className="bg-[#b02dad] hover:bg-[#c03eae] text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors text-sm w-full md:w-auto">
            Back to Top
          </button>
        </div>

        {/* Tree Area */}
        <div className="flex-grow overflow-x-auto overflow-y-auto p-8 relative z-10 custom-tree-scroll">
          {/* CSS for Tree Connectors */}
          <style>{`
             .genealogy-tree ul {
               padding-top: 20px; 
               position: relative;
               transition: all 0.5s;
               display: flex;
               justify-content: center;
             }
             .genealogy-tree li {
               float: left; text-align: center;
               list-style-type: none;
               position: relative;
               padding: 20px 5px 0 5px;
               transition: all 0.5s;
             }
             /* We will use ::before and ::after to draw the connectors */
             .genealogy-tree li::before, .genealogy-tree li::after{
               content: '';
               position: absolute; top: 0; right: 50%;
               border-top: 1px solid #ccc;
               width: 50%; height: 20px;
             }
             .genealogy-tree li::after{
               right: auto; left: 50%;
               border-left: 1px solid #ccc;
             }
             /* Remove left-connector from first child and right-connector from last child */
             .genealogy-tree li:first-child::before{
               border: 0 none;
               border-radius: 5px 0 0 0;
             }
             .genealogy-tree li:last-child::after{
               border: 0 none;
               border-radius: 0 5px 0 0;
             }
             /* Adding the vertical line to the parents */
             .genealogy-tree ul ul::before{
               content: '';
               position: absolute; top: 0; left: 50%;
               border-left: 1px solid #ccc;
               width: 0; height: 20px;
             }
           `}</style>

          <div className="genealogy-tree min-w-[1000px] flex justify-center">
            {loading ? (
              <div className="text-white text-lg">Loading tree...</div>
            ) : treeData ? (
              <ul>
                <TreeNode node={treeData} />
              </ul>
            ) : (
              <div className="text-white">No data available</div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="relative z-20 bg-[#150826] border-t border-white/10 p-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8"><RobotAvatar status="active" /></div>
              <span className="text-white text-sm font-medium">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8"><RobotAvatar status="inactive" /></div>
              <span className="text-white text-sm font-medium">In-Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8"><RobotAvatar status="open" /></div>
              <span className="text-white text-sm font-medium">Open Position</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8"><RobotAvatar status="close" /></div>
              <span className="text-white text-sm font-medium">Close Position</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};