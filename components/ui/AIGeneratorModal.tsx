'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';

export default function AIGeneratorModal() {
    const { isAIModalOpen, setAIModalOpen, loadLayout } = useStore();
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isAIModalOpen) return null;

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/generate-layout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate layout');
            }

            if (data.units) {
                loadLayout(data.units);
                setAIModalOpen(false);
                setPrompt('');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 shrink-0">
                    <span className="text-2xl">✨</span> AIレイアウト生成
                </h2>

                <div className="flex-1 overflow-y-auto min-h-0">
                    <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                        どのような間取りにしたいか、言葉で説明してください。<br />
                        <span className="text-xs opacity-70">例: 「南向きの広いリビングがある2LDK」「玄関の近くにトイレと洗面所」</span>
                    </p>

                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="ここに要望を入力..."
                        className="w-full h-40 bg-gray-900 border border-gray-700 rounded-xl p-4 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 resize-none"
                        disabled={isLoading}
                    />

                    {error && (
                        <div className="bg-red-900/50 border border-red-800 text-red-200 text-sm p-4 rounded-xl mb-6">
                            {error}
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 shrink-0 pt-2">
                    <button
                        onClick={() => setAIModalOpen(false)}
                        className="px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-xl transition-colors font-medium active:scale-95"
                        disabled={isLoading}
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !prompt.trim()}
                        className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold transition-all shadow-lg
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-blue-500/30 hover:scale-105 active:scale-95'}
                        `}
                    >
                        {isLoading ? '生成中...' : '生成する'}
                    </button>
                </div>
            </div>
        </div>
    );
}
