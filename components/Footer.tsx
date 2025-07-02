'use client';

import { Code, Users, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600">
              <Code className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Quantum Code
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Innovating the future through algorithmic excellence and cutting-edge software solutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Team Members */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-6 h-6 text-indigo-400" />
              <h3 className="text-xl font-bold text-white">Our Team</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                  AR
                </div>
                <h4 className="font-bold text-white text-center mb-2">Ashish Raj</h4>
                <p className="text-indigo-400 text-center text-sm mb-2">Lead Developer</p>
                <p className="text-gray-400 text-center text-xs">ID: 12314533</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                  HR
                </div>
                <h4 className="font-bold text-white text-center mb-2">Himanshu Raj</h4>
                <p className="text-purple-400 text-center text-sm mb-2">Lead Developer</p>
                <p className="text-gray-400 text-center text-xs">ID: 12314450</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-emerald-500 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                  AK
                </div>
                <h4 className="font-bold text-white text-center mb-2">Ashish Kumar</h4>
                <p className="text-emerald-400 text-center text-sm mb-2">Lead Developer</p>
                <p className="text-gray-400 text-center text-xs">ID: 12315759</p>
              </div>
            </div>
          </div>

          {/* Contact & Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Connect With Us</h3>
            <div className="space-y-4">
              <a
                href="https://github.com/himanshuraj108/Food-Delivery-Optimizer.git"
                className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
                <span>GitHub Repository</span>
              </a>
              <a
                href="https://github.com/himanshuraj108/Food-Delivery-Optimizer.git"
                className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
                <span>ashishrajstm2003@gmail.com</span>
              </a>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-lg border border-indigo-700/50">
              <h4 className="font-bold text-indigo-300 mb-2">Project Focus</h4>
              <p className="text-gray-300 text-sm">
                Implementing advanced algorithms with beautiful, interactive visualizations for educational and practical applications.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Quantum Code Team.
          </p>
          <div className="flex justify-center items-center gap-2 mt-2">
            <span className="text-gray-500">Powered by</span>
            <span className="text-indigo-400 font-semibold">Dijkstra's Algorithm</span>
            <span className="text-gray-500">&</span>
            <span className="text-purple-400 font-semibold">Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}