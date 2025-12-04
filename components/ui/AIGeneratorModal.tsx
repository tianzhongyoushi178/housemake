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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-2xl w-full max-w-md mx-4">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>✨</span> AIレイアウト生成
                </h2>

                <p className="text-sm text-gray-400 mb-4">
                    どのような間取りにしたいか、言葉で説明してください。<br />
                    例: 「南向きの広いリビングがある2LDK」「玄関の近くにトイレと洗面所」
                </p>

                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="ここに要望を入力..."
                    className="w-full h-32 bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
                    disabled={isLoading}
                />

                {error && (
                    <div className="bg-red-900/50 border border-red-800 text-red-200 text-sm p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setAIModalOpen(false)}
                        className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                        disabled={isLoading}
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !prompt.trim()}
                        className={`px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium transition-all
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105'}
                        `}
                    >
                        {isLoading ? '生成中...' : '生成する'}
                    </button>
                </div>
            </div>
        </div>
    );
}
