import { useSession } from 'next-auth/react';

export default function HomeHeader() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between text-blue-900">
      <div className="hidden sm:block">
        <div className="flex gap-1 overflow-hidden rounded-lg bg-gray-300 text-black">
          <img src={session?.user?.image} alt="" className="h-6 w-6" />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </div>
  );
}
