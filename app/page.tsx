'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Square, RotateCcw, MapPin, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import GraphVisualization from '@/components/GraphVisualization';
import ColorScroller from '@/components/ColorScroller';
import Footer from '@/components/Footer';

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

const nodes: Node[] = [
  { id: 0, x: 100, y: 200, name: 'Restaurant A' },
  { id: 1, x: 300, y: 150, name: 'Hub Central' },
  { id: 2, x: 500, y: 100, name: 'Customer 1' },
  { id: 3, x: 200, y: 350, name: 'Restaurant B' },
  { id: 4, x: 400, y: 300, name: 'Hub North' },
  { id: 5, x: 600, y: 250, name: 'Customer 2' },
  { id: 6, x: 150, y: 500, name: 'Restaurant C' },
  { id: 7, x: 350, y: 450, name: 'Hub South' },
  { id: 8, x: 550, y: 400, name: 'Customer 3' },
  { id: 9, x: 700, y: 350, name: 'Customer 4' },
];

const edges: Edge[] = [
  { from: 0, to: 1, weight: 5 },
  { from: 0, to: 3, weight: 3 },
  { from: 1, to: 2, weight: 4 },
  { from: 1, to: 4, weight: 6 },
  { from: 2, to: 5, weight: 3 },
  { from: 3, to: 4, weight: 4 },
  { from: 3, to: 6, weight: 5 },
  { from: 4, to: 5, weight: 2 },
  { from: 4, to: 7, weight: 3 },
  { from: 4, to: 8, weight: 5 },
  { from: 5, to: 9, weight: 4 },
  { from: 6, to: 7, weight: 4 },
  { from: 7, to: 8, weight: 3 },
  { from: 8, to: 9, weight: 2 },
];

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [exploredEdges, setExploredEdges] = useState<Set<string>>(new Set());
  const [shortestPath, setShortestPath] = useState<number[]>([]);
  const [selectedStart, setSelectedStart] = useState<number | null>(0);
  const [selectedEnd, setSelectedEnd] = useState<number | null>(9);
  const [distances, setDistances] = useState<{ [key: number]: number }>({});
  const [explorationColor, setExplorationColor] = useState('#fbbf24'); // yellow
  const [pathColor, setPathColor] = useState('#10b981'); // green

  const dijkstra = useCallback(async (start: number, end: number) => {
    const dist: { [key: number]: number } = {};
    const prev: { [key: number]: number | null } = {};
    const visited = new Set<number>();
    const pq: { node: number; distance: number }[] = [];

    // Initialize distances
    nodes.forEach(node => {
      dist[node.id] = node.id === start ? 0 : Infinity;
      prev[node.id] = null;
    });

    pq.push({ node: start, distance: 0 });

    while (pq.length > 0) {
      pq.sort((a, b) => a.distance - b.distance);
      const { node: current } = pq.shift()!;

      if (visited.has(current)) continue;
      visited.add(current);

      setDistances({ ...dist });

      // Find neighbors
      const neighbors = edges.filter(edge => 
        edge.from === current || edge.to === current
      );

      for (const edge of neighbors) {
        const neighbor = edge.from === current ? edge.to : edge.from;
        if (visited.has(neighbor)) continue;

        const alt = dist[current] + edge.weight;
        
        // Animate exploration
        const edgeKey = `${Math.min(current, neighbor)}-${Math.max(current, neighbor)}`;
        setExploredEdges(prev => new Set([...prev, edgeKey]));
        
        await new Promise(resolve => setTimeout(resolve, 500));

        if (alt < dist[neighbor]) {
          dist[neighbor] = alt;
          prev[neighbor] = current;
          pq.push({ node: neighbor, distance: alt });
        }
      }

      if (current === end) break;
    }

    // Reconstruct path
    const path: number[] = [];
    let current = end;
    while (current !== null) {
      path.unshift(current);
      current = prev[current];
    }

    return path;
  }, []);

  const runDijkstra = async () => {
    if (selectedStart === null || selectedEnd === null) return;
    
    setIsRunning(true);
    setExploredEdges(new Set());
    setShortestPath([]);
    setDistances({});

    const path = await dijkstra(selectedStart, selectedEnd);
    setShortestPath(path);
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setExploredEdges(new Set());
    setShortestPath([]);
    setDistances({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <Truck className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Food Delivery Optimizer
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Visualize Dijkstra's algorithm in action to find the shortest delivery routes. 
            Watch as the algorithm explores paths in yellow and highlights the optimal route in green.
          </p>
        </div>

        {/* Controls */}
        <Card className="p-6 mb-8 backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <label className="font-medium text-gray-700">Start:</label>
              <select 
                value={selectedStart ?? ''} 
                onChange={(e) => setSelectedStart(Number(e.target.value))}
                className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={isRunning}
              >
                {nodes.map(node => (
                  <option key={node.id} value={node.id}>{node.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              <label className="font-medium text-gray-700">End:</label>
              <select 
                value={selectedEnd ?? ''} 
                onChange={(e) => setSelectedEnd(Number(e.target.value))}
                className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={isRunning}
              >
                {nodes.map(node => (
                  <option key={node.id} value={node.id}>{node.name}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={runDijkstra} 
                disabled={isRunning || selectedStart === null || selectedEnd === null}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {isRunning ? (
                  <>
                    <Square className="w-4 h-4 mr-2" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Find Route
                  </>
                )}
              </Button>

              <Button 
                onClick={reset}
                variant="outline"
                className="border-2 border-gray-200 hover:border-indigo-300 px-6 py-2 rounded-lg transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Graph Visualization */}
        <Card className="p-8 mb-8 backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <GraphVisualization
            nodes={nodes}
            edges={edges}
            exploredEdges={exploredEdges}
            shortestPath={shortestPath}
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
            distances={distances}
            explorationColor={explorationColor}
            pathColor={pathColor}
          />
        </Card>

        {/* Color Scroller */}
        <Card className="p-6 mb-8 backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <ColorScroller
            explorationColor={explorationColor}
            pathColor={pathColor}
            onExplorationColorChange={setExplorationColor}
            onPathColorChange={setPathColor}
          />
        </Card>

        {/* Statistics */}
        {shortestPath.length > 0 && (
          <Card className="p-6 mb-8 backdrop-blur-sm bg-white/80 border-0 shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Route Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="text-2xl font-bold text-indigo-600">
                  {shortestPath.length - 1}
                </div>
                <div className="text-sm text-gray-600">Stops</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="text-2xl font-bold text-emerald-600">
                  {selectedEnd !== null ? distances[selectedEnd] || '∞' : '∞'}
                </div>
                <div className="text-sm text-gray-600">Total Distance</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="text-2xl font-bold text-purple-600">
                  {exploredEdges.size}
                </div>
                <div className="text-sm text-gray-600">Edges Explored</div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}