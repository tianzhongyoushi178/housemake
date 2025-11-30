import Link from 'next/link';

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">Easy House Builder 3D 操作マニュアル</h1>

                <div className="space-y-8">
                    {/* Basic Controls */}
                    <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-blue-400 flex items-center">
                            <span className="mr-2">🖱️</span> 基本操作 (カメラ)
                        </h2>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center">
                                <span className="font-bold min-w-[120px] text-white">回転:</span>
                                <span>左クリック + ドラッグ</span>
                            </li>
                            <li className="flex items-center">
                                <span className="font-bold min-w-[120px] text-white">移動 (Pan):</span>
                                <span>右クリック + ドラッグ</span>
                            </li>
                            <li className="flex items-center">
                                <span className="font-bold min-w-[120px] text-white">ズーム:</span>
                                <span>マウスホイール (スクロール)</span>
                            </li>
                        </ul>
                    </section>

                    {/* Building */}
                    <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-green-400 flex items-center">
                            <span className="mr-2">🏠</span> 部屋の配置と移動
                        </h2>
                        <div className="space-y-4 text-gray-300">
                            <div>
                                <h3 className="font-bold text-white mb-2">1. ユニットの追加</h3>
                                <p>画面下のツールバーから「+ リビング」「+ キッチン」などのボタンを押すと、画面中央に部屋（ユニット）が追加されます。</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-2">2. 選択と移動</h3>
                                <p>配置されたユニットをクリックすると<span className="text-blue-400 font-bold">青い枠線</span>が表示され、選択状態になります。</p>
                                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                    <li>矢印をドラッグして移動できます（910mm単位でスナップ）。</li>
                                    <li>円弧をドラッグして回転できます（90度単位）。</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Wall Editing */}
                    <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-red-400 flex items-center">
                            <span className="mr-2">🔨</span> 壁の編集 (上級編)
                        </h2>
                        <div className="space-y-4 text-gray-300">
                            <p>ユニットを選択した状態で、さらに<span className="font-bold text-white">特定の壁をクリック</span>すると、その壁が<span className="text-red-400 font-bold">赤くハイライト</span>されます。</p>
                            <p>壁を選択すると、ツールバーに以下のボタンが現れます：</p>
                            <ul className="space-y-2 ml-4">
                                <li className="flex items-center">
                                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded mr-3">壁削除</span>
                                    <span>その壁を取り除き、隣の部屋とつなげます。</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded mr-3">+ ドア</span>
                                    <span>壁にドアを追加します。</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded mr-3">+ 窓</span>
                                    <span>壁に窓を追加します。</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Legend */}
                    <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-yellow-400 flex items-center">
                            <span className="mr-2">👀</span> 画面の見方
                        </h2>
                        <ul className="space-y-2 text-gray-300">
                            <li><span className="text-gray-400 font-bold">グレーの箱:</span> 壁</li>
                            <li><span className="text-red-400 font-bold">赤色の半透明:</span> 窓やドアなどの開口部</li>
                            <li><span className="text-blue-400 font-bold">青い枠線:</span> 選択中のユニット</li>
                            <li><span className="text-red-500 font-bold">赤いハイライト:</span> 選択中の壁</li>
                        </ul>
                    </section>
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105 shadow-lg"
                    >
                        ← アプリに戻って作成する
                    </Link>
                </div>
            </div>
        </div>
    );
}
