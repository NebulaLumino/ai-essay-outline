'use client';
import { useState } from 'react';

export default function EssayOutlinePage() {
  const [topic, setTopic] = useState('');
  const [essayType, setEssayType] = useState('argumentative');
  const [wordCount, setWordCount] = useState('1000');
  const [discipline, setDiscipline] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true); setError(''); setResult('');
    const prompt = `You are an expert academic writing instructor. Build a thesis statement and detailed essay outline.

Essay Topic: ${topic}
Essay Type: ${essayType}
Target Word Count: ${wordCount} words
Discipline: ${discipline || 'General Academic'}

Provide:
1. **Thesis Statement** — a clear, specific, arguable claim
2. **Essay Type Analysis** — why this type suits the topic
3. **Recommended Structure** — with word count allocation per section
4. **Full Essay Outline** — with section headings, subsections, key points, and evidence suggestions
5. **Introduction Hook** — an engaging opening strategy
6. **Supporting Arguments** — 3-4 main points with evidence types
7. **Counterargument** — how to address opposing views
8. **Conclusion Strategy** — how to synthesize and leave an impact`;

    try {
      const res = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-2xl">✍️</div>
            <h1 className="text-3xl font-bold text-white">AI Essay Thesis & Outline Builder</h1>
          </div>
          <p className="text-gray-400 text-sm ml-13">Build a compelling thesis and structured essay outline</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Essay Topic / Prompt</label>
              <textarea value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter your essay topic or prompt..." rows={5} className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/30 transition-all resize-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Essay Type</label>
                <select value={essayType} onChange={e => setEssayType(e.target.value)} className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/30 transition-all">
                  <option value="argumentative">Argumentative</option>
                  <option value="analytical">Analytical</option>
                  <option value="expository">Expository</option>
                  <option value="narrative">Narrative</option>
                  <option value="persuasive">Persuasive</option>
                  <option value="compare-contrast">Compare & Contrast</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Word Count</label>
                <select value={wordCount} onChange={e => setWordCount(e.target.value)} className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/30 transition-all">
                  <option value="500">~500 words</option>
                  <option value="1000">~1,000 words</option>
                  <option value="1500">~1,500 words</option>
                  <option value="2000">~2,000 words</option>
                  <option value="3000">~3,000 words</option>
                  <option value="5000">~5,000 words</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Discipline</label>
                <input value={discipline} onChange={e => setDiscipline(e.target.value)} placeholder="e.g. Political Science" className="w-full bg-gray-800/70 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/30 transition-all" />
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading || !topic.trim()} className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2">
            {loading ? <><span className="animate-spin">⟳</span> Building Outline...</> : <><>✦ Generate Thesis & Essay Outline</></>}
          </button>
          {error && <div className="bg-red-900/20 border border-red-800/50 rounded-xl px-4 py-3 text-red-300 text-sm">{error}</div>}
        </form>
        {result && (
          <div className="mt-6 bg-gray-900/60 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-wider">Generated Outline</h3>
              <button onClick={() => navigator.clipboard.writeText(result)} className="text-xs text-gray-400 hover:text-white bg-gray-800/70 px-3 py-1.5 rounded-lg border border-gray-700/50">Copy</button>
            </div>
            <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed bg-gray-950/60 rounded-xl p-4 border border-gray-800/50 overflow-auto max-h-[500px]">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
