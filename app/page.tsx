import Scene3D from '@/components/viewport/Scene3D';
import Link from 'next/link';
import Toolbar from '@/components/ui/Toolbar';

export default function Home() {
  return (
    <main className="h-[100dvh] w-full bg-gray-900 relative overflow-hidden">
      <Scene3D />
      <Toolbar />
      <div className="absolute top-4 right-4">
        <Link
          href="/help"
          className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-4 py-2 rounded-full transition-colors border border-white/20"
        >
          ? 操作説明
        </Link>
      </div>
    </main>
  );
}
