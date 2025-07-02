'use client';

import { useEffect, useRef } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  name: string;
}

interface Edge {
  from: number;
  to: number;
  weight: number;
}

interface GraphVisualizationProps {
  nodes: Node[];
  edges: Edge[];
  exploredEdges: Set<string>;
  shortestPath: number[];
  selectedStart: number | null;
  selectedEnd: number | null;
  distances: { [key: number]: number };
  explorationColor: string;
  pathColor: string;
}

export default function GraphVisualization({
  nodes,
  edges,
  exploredEdges,
  shortestPath,
  selectedStart,
  selectedEnd,
  distances,
  explorationColor,
  pathColor,
}: GraphVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);
      
      if (!fromNode || !toNode) return;

      const edgeKey = `${Math.min(edge.from, edge.to)}-${Math.max(edge.from, edge.to)}`;
      const isExplored = exploredEdges.has(edgeKey);
      const isInShortestPath = shortestPath.includes(edge.from) && shortestPath.includes(edge.to) &&
        Math.abs(shortestPath.indexOf(edge.from) - shortestPath.indexOf(edge.to)) === 1;

      // Set edge style
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      
      if (isInShortestPath) {
        ctx.strokeStyle = pathColor;
        ctx.lineWidth = 6;
        ctx.shadowColor = pathColor;
        ctx.shadowBlur = 10;
      } else if (isExplored) {
        ctx.strokeStyle = explorationColor;
        ctx.lineWidth = 4;
        ctx.shadowColor = explorationColor;
        ctx.shadowBlur = 8;
      } else {
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 0;
      }
      
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw weight label
      const midX = (fromNode.x + toNode.x) / 2;
      const midY = (fromNode.y + toNode.y) / 2;
      
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(midX, midY, 12, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = isInShortestPath ? pathColor : isExplored ? explorationColor : '#d1d5db';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(edge.weight.toString(), midX, midY);
    });

    // Draw nodes
    nodes.forEach(node => {
      const isStart = node.id === selectedStart;
      const isEnd = node.id === selectedEnd;
      const isInPath = shortestPath.includes(node.id);
      const distance = distances[node.id];

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
      
      if (isStart) {
        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 15;
      } else if (isEnd) {
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 15;
      } else if (isInPath) {
        ctx.fillStyle = pathColor;
        ctx.shadowColor = pathColor;
        ctx.shadowBlur = 10;
      } else {
        ctx.fillStyle = '#6366f1';
        ctx.shadowColor = '#6366f1';
        ctx.shadowBlur = 5;
      }
      
      ctx.fill();
      ctx.shadowBlur = 0;

      // Node border
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Node label
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.id.toString(), node.x, node.y);

      // Node name
      ctx.fillStyle = '#374151';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(node.name, node.x, node.y + 45);

      // Distance label
      if (distance !== undefined && distance !== Infinity) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(node.x + 20, node.y - 20, 15, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = '#6366f1';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(distance.toString(), node.x + 20, node.y - 20);
      }
    });

  }, [nodes, edges, exploredEdges, shortestPath, selectedStart, selectedEnd, distances, explorationColor, pathColor]);

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        className="border-2 border-gray-200 rounded-lg shadow-inner bg-gradient-to-br from-gray-50 to-white"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}