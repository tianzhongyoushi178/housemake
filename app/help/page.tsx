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
                            <span className="mr-2">🏠</span> 部屋の配置と編集
                        </h2>
                        <div className="space-y-4 text-gray-300">
                            <div>
                                <h3 className="font-bold text-white mb-2">1. ユニットの追加</h3>
                                <p>画面下のツールバーから「+ リビング」などのボタンを押すと、部屋（ユニット）が追加されます。</p>
                                <p className="text-sm text-gray-400 mt-1">※初期状態では「床のみ」で壁はありません。</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-2">2. 選択と移動・回転</h3>
                                <p>ユニットをクリックすると<span className="text-blue-400 font-bold">青い枠線</span>が表示され、選択状態になります。</p>
                                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                    <li>矢印をドラッグして移動できます（910mm単位）。</li>
                                    <li>ツールバーの「<span className="font-bold text-yellow-500">回転 (90°)</span>」ボタンで回転できます。</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-2">3. サイズ変更</h3>
                                <p>ユニットを選択中、ツールバーの「サイズ変更」で広さを調整できます。</p>
                                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                    <li><span className="font-bold">幅</span>: 横幅を調整します。</li>
                                    <li><span className="font-bold">奥</span>: 奥行きを調整します。</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Wall Editing */}
                    <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-red-400 flex items-center">
                            <span className="mr-2">🔨</span> 壁の編集
                        </h2>
                        <div className="space-y-4 text-gray-300">
                            <div>
                                <h3 className="font-bold text-white mb-2">壁の追加</h3>
                                <p>ユニットを選択すると、ツールバーに「壁追加」ボタン（上・下・左・右）が表示されます。必要な場所に壁を追加してください。</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-2">壁の削除・加工</h3>
                                <p>追加した壁をクリックして選択（赤くハイライト）すると、以下の操作が可能です：</p>
                                <ul className="space-y-2 ml-4 mt-2">
                                    <li className="flex items-center">
                                        <span className="bg-red-600 text-white text-xs px-2 py-1 rounded mr-3">壁削除</span>
                                        <span>選択した壁を削除します。</span>
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
                        </div>
                    </section>

                    {/* Camera Controls */}
                    <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-purple-400 flex items-center">
                            <span className="mr-2">📷</span> カメラ操作 (スマホ対応)
                        </h2>
                        <div className="space-y-4 text-gray-300">
                            <p>画面右下のボタンでモードを切り替えられます。</p>
                            <ul className="space-y-2 ml-4">
                                <li className="flex items-center">
                                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded mr-3">🔄 回転モード</span>
                                    <span>指一本で画面をなぞるとカメラが回転します。</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded mr-3">✋ 移動モード</span>
                                    <span>指一本で画面をなぞるとカメラが平行移動します。</span>
                                </li>
                            </ul>
                            <p className="text-sm text-gray-400">※PCでは右クリックドラッグで常に移動、ホイールでズームが可能です。</p>
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
