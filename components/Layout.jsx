import Nav from '@/components/Nav';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SweetAlert2 from 'react-sweetalert2';
import Swal from 'sweetalert2';

export default function Layout({ children }) {
  const { data: session } = useSession();
  const { query } = useRouter();

  if (!session) {
    return (
      <div className="bg-bgGray flex h-screen w-screen items-center">
        {query.status === 'unauthorized' && (
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
            onClick={() => signIn('google')}
            className="rounded-lg bg-white p-2 px-4 shadow-md"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="flex">
        <Nav />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}
