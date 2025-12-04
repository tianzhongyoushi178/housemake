'use client';

import { useStore } from '@/store/useStore';
import AIGeneratorModal from './AIGeneratorModal';

export default function Toolbar() {
    const {
        addUnit,
        removeUnit,
        clearScene,
        selectedId,
        selectedWallId,
        cameraMode,
        setCameraMode,
        rotateUnit,
        removeWallFromUnit,
        addOpeningToUnitWall,
        toggleWallOnUnit,
        resizeUnit,
        undo,
        redo,
        past,
        future,
        setAIModalOpen // Add this
    } = useStore();

    const handleDelete = () => {
        if (selectedId) {
            removeUnit(selectedId);
        }
    };

    return (
        <>
            <AIGeneratorModal />

            {/* Context Toolbar ... */}
            {selectedId && (
                <div className="absolute top-4 right-4 md:right-4 md:top-4 bg-gray-800/90 backdrop-blur p-3 rounded-xl border border-gray-600 shadow-xl flex flex-col gap-3 w-[90vw] max-w-[300px] md:w-auto z-50">

                    {/* Row 1: Basic Actions */}
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-blue-300">編集メニュー</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => rotateUnit(selectedId)}
                                className="bg-yellow-600 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs md:text-sm transition-colors"
                            >
                                回転
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs md:text-sm transition-colors"
                            >
                                削除
                            </button>
                        </div>
                    </div>

                    <div className="h-px bg-gray-600" />

                    {/* Row 2: Resize */}
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-gray-400">サイズ</span>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1">
                                <span className="text-[10px] text-gray-300">幅</span>
                                <button onClick={() => resizeUnit(selectedId, 0.91, 0)} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs">+</button>
                                <button onClick={() => resizeUnit(selectedId, -0.91, 0)} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs">-</button>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-[10px] text-gray-300">奥</span>
                                <button onClick={() => resizeUnit(selectedId, 0, 0.91)} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs">+</button>
                                <button onClick={() => resizeUnit(selectedId, 0, -0.91)} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs">-</button>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-600" />

                    {/* Row 3: Toggle Walls */}
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-gray-400">壁切替</span>
                        <div className="flex gap-1">
                            {['top', 'bottom', 'left', 'right'].map((dir) => {
                                const unit = useStore.getState().units.find(u => u.id === selectedId);
                                let hasWall = false;
                                if (unit) {
                                    const halfW = unit.width / 2;
                                    const halfD = unit.depth / 2;
                                    hasWall = unit.walls.some(w => {
                                        if (dir === 'top') return Math.abs(w.start[1] - halfD) < 0.01;
                                        if (dir === 'bottom') return Math.abs(w.start[1] + halfD) < 0.01;
                                        if (dir === 'right') return Math.abs(w.start[0] - halfW) < 0.01;
                                        if (dir === 'left') return Math.abs(w.start[0] + halfW) < 0.01;
                                        return false;
                                    });
                                }

                                const labelMap: { [key: string]: string } = { top: '上', bottom: '下', left: '左', right: '右' };

                                return (
                                    <button
                                        key={dir}
                                        onClick={() => toggleWallOnUnit(selectedId, dir as any)}
                                        className={`px-2 py-1 rounded text-xs transition-colors ${hasWall
                                            ? 'bg-green-600 hover:bg-green-500 text-white'
                                            : 'bg-gray-700 hover:bg-gray-600 text-gray-400'
                                            }`}
                                    >
                                        {labelMap[dir]}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Row 4: Wall Specific Actions (Only if wall selected) */}
                    {selectedWallId && (
                        <>
                            <div className="h-px bg-gray-600" />
                            <div className="flex flex-col gap-2 bg-gray-700/50 p-2 rounded">
                                <span className="text-xs text-red-300">壁編集</span>
                                <div className="flex gap-2 justify-end">
                                    <button onClick={() => removeWallFromUnit(selectedId, selectedWallId)} className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded text-xs">削除</button>
                                    <button onClick={() => addOpeningToUnitWall(selectedId, selectedWallId, 'door')} className="bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded text-xs">+ドア</button>
                                    <button onClick={() => addOpeningToUnitWall(selectedId, selectedWallId, 'window')} className="bg-blue-500 hover:bg-blue-400 text-white px-2 py-1 rounded text-xs">+窓</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Main Toolbar (Bottom) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[95vw] max-w-4xl bg-gray-900/90 backdrop-blur rounded-2xl border border-gray-700 shadow-2xl flex flex-col md:flex-row items-center p-2 md:p-3 gap-2 md:gap-4 z-40">

                {/* Top Row on Mobile: Undo/Redo & Camera */}
                <div className="flex w-full md:w-auto justify-between md:justify-start items-center gap-2 md:border-r md:border-gray-700 md:pr-4">
                    <div className="flex gap-2">
                        <button
                            onClick={undo}
                            disabled={past.length === 0}
                            className={`p-2 rounded-lg transition-colors ${past.length > 0 ? 'text-white hover:bg-gray-700' : 'text-gray-600 cursor-not-allowed'}`}
                            title="元に戻す"
                        >
                            ↩
                        </button>
                        <button
                            onClick={redo}
                            disabled={future.length === 0}
                            className={`p-2 rounded-lg transition-colors ${future.length > 0 ? 'text-white hover:bg-gray-700' : 'text-gray-600 cursor-not-allowed'}`}
                            title="やり直す"
                        >
                            ↪
                        </button>
                        <button
                            onClick={clearScene}
                            className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded ml-2 transition-colors whitespace-nowrap"
                        >
                            全消去
                        </button>
                        <button
                            onClick={() => setAIModalOpen(true)}
                            className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-3 py-1 rounded ml-2 transition-all shadow-lg hover:shadow-blue-500/50 whitespace-nowrap flex items-center gap-1"
                        >
                            <span>✨</span> AI生成
                        </button>
                    </div>

                    {/* Camera Controls (Moved here for mobile layout efficiency) */}
                    <div className="flex gap-1 md:ml-4 md:border-l md:border-gray-700 md:pl-4">
                        <button
                            onClick={() => setCameraMode('rotate')}
                            className={`p-2 rounded-lg transition-colors ${cameraMode === 'rotate' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                            title="回転モード"
                        >
                            🔄
                        </button>
                        <button
                            onClick={() => setCameraMode('pan')}
                            className={`p-2 rounded-lg transition-colors ${cameraMode === 'pan' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                            title="移動モード"
                        >
                            ✋
                        </button>
                    </div>
                </div>

                {/* Bottom Row on Mobile: Unit Buttons */}
                <div className="w-full overflow-x-auto pb-1 scrollbar-hide">
                    <div className="flex gap-2 min-w-max px-1">
                        <UnitButton label="リビング" color="blue" onClick={() => addUnit('living')} />
                        <UnitButton label="キッチン" color="green" onClick={() => addUnit('kitchen')} />
                        <UnitButton label="風呂" color="cyan" onClick={() => addUnit('bath')} />
                        <UnitButton label="トイレ" color="yellow" onClick={() => addUnit('toilet')} />
                        <UnitButton label="洗面" color="teal" onClick={() => addUnit('washroom')} />
                        <UnitButton label="玄関" color="orange" onClick={() => addUnit('entrance')} />
                        <UnitButton label="階段" color="purple" onClick={() => addUnit('stairs')} />
                        <UnitButton label="洋室" color="gray" onClick={() => addUnit('room')} />
                    </div>
                </div>
            </div>
        </>
    );
}

// Helper component for unit buttons
const UnitButton = ({ label, color, onClick }: { label: string, color: string, onClick: () => void }) => {
    const colorClasses: { [key: string]: string } = {
        blue: 'bg-blue-600 hover:bg-blue-500',
        green: 'bg-green-600 hover:bg-green-500',
        cyan: 'bg-cyan-600 hover:bg-cyan-500',
        yellow: 'bg-yellow-600 hover:bg-yellow-500',
        teal: 'bg-teal-600 hover:bg-teal-500',
        orange: 'bg-orange-600 hover:bg-orange-500',
        purple: 'bg-purple-600 hover:bg-purple-500',
        gray: 'bg-gray-600 hover:bg-gray-500',
    };

    return (
        <button
            onClick={onClick}
            className={`${colorClasses[color]} text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shadow-sm`}
        >
            + {label}
        </button>
    );
};
