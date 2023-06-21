import Icon from '@/components/Icon';
import Navbar from '@/components/Navbar';
import Spinner from '@/components/Spinner';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SweetAlert2 from 'react-sweetalert2';
import Swal from 'sweetalert2';

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  async function handleLogin() {
    delete router.query.status;
    await router.push(router);

    await signIn('google');
  }

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner fullWidth={true} />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex h-screen w-screen items-center bg-gray-100">
        {router.query.status === 'unauthorized' && (
          <SweetAlert2
            show
            titleText={'Access Denied'}
            text={'Admin Access Required'}
            icon={'error'}
            toast
            showConfirmButton={false}
            timer={3000}
            timerProgressBar
            didOpen={(toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }}
          />
        )}

        <div className="w-full text-center">
          <button
            onClick={handleLogin}
            className="rounded-lg bg-white p-2 px-4 shadow-md"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      <Navbar />
      <div className="flex-grow bg-gray-100">
        {/* Desktop header */}
        <div
          className={
            'hidden md:flex md:justify-end md:border-b md:border-gray-200 md:bg-white md:p-4'
          }
        >
          {/* Avatar */}
          <Image
            src={session?.user?.image}
            alt={session.user.name}
            width={32}
            height={32}
            className="hidden md:block md:h-8 md:w-8 md:rounded-full"
          />

          <div className={'flex flex-col text-xs'}>
            <span className="px-2 font-bold">{session?.user?.name}</span>
            <span className="px-2 text-gray-500">{session?.user?.email}</span>
          </div>
        </div>

        <div className={'py-8 sm:px-4 md:mx-auto md:max-w-3xl'}>{children}</div>
      </div>
    </main>
  );
}
