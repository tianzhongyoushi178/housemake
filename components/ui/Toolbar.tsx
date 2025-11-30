'use client';

import { useStore } from '@/store/useStore';

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
        addWallToUnit,
        resizeUnit
    } = useStore();

    const handleDelete = () => {
        if (selectedId) {
            removeUnit(selectedId);
        }
    };

    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-wrap gap-4 bg-gray-800/80 backdrop-blur p-4 rounded-xl border border-gray-700 max-w-[90vw] justify-center">
            <button
                onClick={() => addUnit('living')}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
                + リビング
            </button>
            <button
                onClick={() => addUnit('kitchen')}
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
                + キッチン
            </button>
            <button
                onClick={() => addUnit('bath')}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
                + 風呂
            </button>
            <button
                onClick={() => addUnit('toilet')}
                className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
                + トイレ
            </button>
            <button
                onClick={() => addUnit('washroom')}
                className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
                + 洗面
            </button>
            <button
                onClick={() => addUnit('entrance')}
                className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
                + 玄関
            </button>
            <button
                onClick={() => addUnit('stairs')}
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
                + 階段
            </button>
            <button
                onClick={() => addUnit('room')}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
                + 洋室
            </button>

            <div className="w-px bg-gray-600 mx-2" />

            {/* Add Wall Buttons */}
            {selectedId && (
                <>
                    <div className="flex flex-col gap-1">
                        <div className="text-xs text-gray-400 text-center">壁追加</div>
                        <div className="flex gap-1">
                            <button onClick={() => addWallToUnit(selectedId, 'top')} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm">上</button>
                            <button onClick={() => addWallToUnit(selectedId, 'bottom')} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm">下</button>
                            <button onClick={() => addWallToUnit(selectedId, 'left')} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm">左</button>
                            <button onClick={() => addWallToUnit(selectedId, 'right')} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm">右</button>
                        </div>
                    </div>
                    <div className="w-px bg-gray-600 mx-2" />
                </>
            )}

            {/* Resize Buttons */}
            {selectedId && (
                <>
                    <div className="flex flex-col gap-1">
                        <div className="text-xs text-gray-400 text-center">サイズ変更</div>
                        <div className="flex gap-2">
                            <div className="flex gap-1 items-center">
                                <span className="text-xs text-gray-300">幅</span>
                                <button onClick={() => resizeUnit(selectedId, 0.91, 0)} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm">+</button>
                                <button onClick={() => resizeUnit(selectedId, -0.91, 0)} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm">-</button>
                            </div>
                            <div className="flex gap-1 items-center">
                                <span className="text-xs text-gray-300">奥</span>
                                <button onClick={() => resizeUnit(selectedId, 0, 0.91)} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm">+</button>
                                <button onClick={() => resizeUnit(selectedId, 0, -0.91)} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm">-</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-px bg-gray-600 mx-2" />
                </>
            )}

            {/* Wall Editing Buttons */}
            {selectedId && selectedWallId && (
                <>
                    <button
                        onClick={() => {
                            if (selectedId && selectedWallId) removeWallFromUnit(selectedId, selectedWallId);
                        }}
                        className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        壁削除
                    </button>
                    <button
                        onClick={() => {
                            if (selectedId && selectedWallId) addOpeningToUnitWall(selectedId, selectedWallId, 'door');
                        }}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        + ドア
                    </button>
                    <button
                        onClick={() => {
                            if (selectedId && selectedWallId) addOpeningToUnitWall(selectedId, selectedWallId, 'window');
                        }}
                        className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        + 窓
                    </button>
                    <div className="w-px bg-gray-600 mx-2" />
                </>
            )}

            <button
                onClick={() => {
                    if (selectedId) rotateUnit(selectedId);
                }}
                disabled={!selectedId}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedId
                    ? 'bg-yellow-600 hover:bg-yellow-500 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
            >
                回転 (90°)
            </button>

            <button
                onClick={handleDelete}
                disabled={!selectedId}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedId
                    ? 'bg-red-600 hover:bg-red-500 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
            >
                削除
            </button>

            <div className="w-px bg-gray-600 mx-2" />

            <button
                onClick={clearScene}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
                すべてクリア
            </button>

            <div className="w-px bg-gray-600 mx-2" />

            {/* Camera Mode Toggle */}
            <div className="flex bg-gray-700 rounded-lg p-1">
                <button
                    onClick={() => setCameraMode('rotate')}
                    className={`px-3 py-1 rounded-md transition-colors ${cameraMode === 'rotate' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'
                        }`}
                    title="回転モード"
                >
                    🔄
                </button>
                <button
                    onClick={() => setCameraMode('pan')}
                    className={`px-3 py-1 rounded-md transition-colors ${cameraMode === 'pan' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'
                        }`}
                    title="移動モード"
                >
                    ✋
                </button>
            </div>
        </div>
    );
}
