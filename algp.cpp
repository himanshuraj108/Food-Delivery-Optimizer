#include <iostream>
#include <vector>
#include <queue>
#include <utility>
#include <limits>

using namespace std;

const int INF = numeric_limits<int>::max();

void dijkstra(int source, const vector<vector<pair<int, int>>>& adjList, vector<int>& dist) {
    int n = adjList.size();
    dist.assign(n, INF);
    dist[source] = 0;

    // Min-heap priority queue: (distance, node)
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    pq.emplace(0, source);

    while (!pq.empty()) {
        int currDist = pq.top().first;
        int u = pq.top().second;
        pq.pop();

        if (currDist > dist[u]) continue;

        for (auto [v, weight] : adjList[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.emplace(dist[v], v);
            }
        }
    }
}

int main() {
    int n = 5; // Number of nodes
    vector<vector<pair<int, int>>> adjList(n);

    // Add edges: (from, to, weight)
    adjList[0].emplace_back(1, 10);
    adjList[0].emplace_back(3, 5);
    adjList[1].emplace_back(2, 1);
    adjList[1].emplace_back(3, 2);
    adjList[2].emplace_back(4, 4);
    adjList[3].emplace_back(1, 3);
    adjList[3].emplace_back(2, 9);
    adjList[3].emplace_back(4, 2);
    adjList[4].emplace_back(0, 7);
    adjList[4].emplace_back(2, 6);

    vector<int> dist;
    int source = 0;

    dijkstra(source, adjList, dist);

    // Print distances from source
    for (int i = 0; i < n; ++i)
        cout << "Distance from node " << source << " to node " << i << " is " << dist[i] << '\n';

    return 0;
}