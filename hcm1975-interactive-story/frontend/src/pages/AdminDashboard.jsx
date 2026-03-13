import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStory, getChapters, getChoices } from '../api';
import api from '../api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [story, setStory] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  // New scene form
  const [newScene, setNewScene] = useState({
    chapterId: '', title: '', content: '', imageUrl: '', philosophyNote: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    Promise.all([getStory(), getChapters()])
      .then(([storyRes, chaptersRes]) => {
        setStory(storyRes.data);
        setChapters(chaptersRes.data);
      })
      .catch(() => setMessage('⚠️ Backend không phản hồi. Hãy chạy Spring Boot.'))
      .finally(() => setLoading(false));
  }, []);

  const tabs = [
    { id: 'overview', label: '📊 Tổng quan', icon: '📊' },
    { id: 'scenes', label: '🎭 Scenes', icon: '🎭' },
    { id: 'api', label: '🔗 API Test', icon: '🔗' },
  ];

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Quản lý nội dung câu chuyện</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-white transition-colors text-sm border border-dark-500 
                     px-4 py-2 rounded-lg hover:border-primary-700"
        >
          ← Trở về Game
        </button>
      </div>

      {message && (
        <div className="mb-6 p-4 rounded-xl bg-yellow-900/30 border border-yellow-700/50 text-yellow-300 text-sm">
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-dark-600">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
              tab === t.id
                ? 'border-primary-500 text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === 'overview' && (
        <div className="animate-fade-in">
          {loading ? (
            <div className="text-center py-16 text-gray-500">Loading...</div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Story', value: story?.title || '—', icon: '📖' },
                  { label: 'Chapters', value: chapters.length, icon: '📋' },
                  { label: 'Status', value: 'Active', icon: '✅' },
                ].map(stat => (
                  <div key={stat.label} className="glass-card p-5">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-gray-400 text-xs uppercase tracking-wider">{stat.label}</div>
                    <div className="text-white font-semibold mt-1 truncate">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="glass-card p-6">
                <h3 className="text-white font-semibold mb-4">📋 Danh sách Chapters</h3>
                {chapters.length === 0 ? (
                  <p className="text-gray-500 text-sm">Không có dữ liệu. Backend chưa chạy?</p>
                ) : (
                  <div className="space-y-2">
                    {chapters.map(ch => (
                      <div key={ch.id} className="flex items-center justify-between py-3 border-b border-dark-500/50">
                        <div>
                          <span className="text-primary-400 text-sm font-medium">Ch.{ch.orderIndex}</span>
                          <span className="text-white ml-3">{ch.title}</span>
                        </div>
                        <span className="text-gray-500 text-xs">ID: {ch.id}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Scenes Tab — Preview scenes 1-8 */}
      {tab === 'scenes' && (
        <div className="animate-fade-in">
          <div className="glass-card p-6 mb-6">
            <h3 className="text-white font-semibold mb-2">🎭 Preview Scenes</h3>
            <p className="text-gray-500 text-sm mb-4">Click vào scene để preview trong game.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[1,2,3,4,5,6,7,8].map(num => (
                <button
                  key={num}
                  onClick={() => navigate(`/scene/${num}`, {
                    state: { playerName: 'Admin', score: 0, history: [] }
                  })}
                  className="btn-choice text-center py-3 text-sm"
                >
                  🎭 Scene {num}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-white font-semibold mb-4">ℹ️ Hướng dẫn chỉnh sửa nội dung</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <p>• Chỉnh sửa <code className="text-primary-400 bg-dark-900 px-1 rounded">src/main/resources/data.sql</code> để thêm/sửa nội dung scenes và choices.</p>
              <p>• Reload Spring Boot sau khi sửa data.sql.</p>
              <p>• Dùng <a href="http://localhost:8080/h2-console" target="_blank" rel="noreferrer" className="text-primary-400 underline">H2 Console</a> để xem/sửa DB trực tiếp.</p>
              <p>• Base URL API: <code className="text-primary-400 bg-dark-900 px-1 rounded">http://localhost:8080/api</code></p>
            </div>
          </div>
        </div>
      )}

      {/* API Test Tab */}
      {tab === 'api' && (
        <div className="animate-fade-in space-y-4">
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold mb-4">🔗 API Endpoints</h3>
            <div className="space-y-3 font-mono text-sm">
              {[
                { method: 'GET', path: '/api/story', desc: 'Lấy thông tin story' },
                { method: 'GET', path: '/api/chapters', desc: 'Danh sách chapters' },
                { method: 'GET', path: '/api/scene/{id}', desc: 'Lấy scene theo ID' },
                { method: 'GET', path: '/api/scene/{id}/choices', desc: 'Choices cho scene' },
                { method: 'POST', path: '/api/scene/choice', desc: 'Chọn lựa chọn' },
                { method: 'POST', path: '/api/scene/start?playerName=...', desc: 'Bắt đầu game mới' },
                { method: 'POST', path: '/api/scene/resume?playerName=...', desc: 'Tiếp tục game' },
                { method: 'POST', path: '/api/progress/save', desc: 'Lưu tiến trình' },
                { method: 'GET', path: '/api/progress/{player}', desc: 'Tải tiến trình' },
              ].map(e => (
                <div key={e.path} className="flex items-start gap-3 py-2 border-b border-dark-600/50">
                  <span className={`text-xs px-2 py-1 rounded font-bold shrink-0 ${
                    e.method === 'GET' ? 'bg-green-900/40 text-green-400' : 'bg-blue-900/40 text-blue-400'
                  }`}>
                    {e.method}
                  </span>
                  <span className="text-primary-400 flex-1">{e.path}</span>
                  <span className="text-gray-500 text-xs">{e.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-4 text-center">
            <a
              href="http://localhost:8080/h2-console"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              🗄️ Mở H2 Database Console
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
