import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const inactiveLink = 'flex py-2 transition-all hover:bg-gray-200';
  const activeLink = inactiveLink + ' bg-gray-200 text-black rounded-sm';
  const inactiveIcon = 'w-6 h-6';
  const activeIcon = `${inactiveIcon} text-lime-700`;
  const router = useRouter();
  const { pathname } = router;
  const { data: session } = useSession();
  const menuRef = useRef();

  async function logout() {
    await router.push('/');
    await signOut();
  }

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShowNav(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <header className={'relative'}>
      <div className="flex items-center p-4 md:min-h-[65px] md:border-b md:border-gray-200">
        {/* Drawer button */}
        <button onClick={() => setShowNav(true)} className={'md:hidden'}>
          <Icon iconName={'menu'} />
        </button>

        {/* Logo */}
        <div className="mx-6 flex grow justify-center text-center md:mx-0 md:justify-start">
          <Logo />
        </div>

        {/* Avatar */}
        <Image
          src={session?.user?.image}
          alt={session.user.name}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full md:hidden"
        />
      </div>

      <nav
        className={`${
          showNav ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0  h-screen w-full flex-col bg-black/70 transition-all duration-500 ease-in-out md:static md:flex md:h-[calc(100%_-_65px)] md:w-72 md:translate-x-0 md:border-r md:border-gray-200 md:bg-inherit`}
      >
        <ul
          className={
            'z-50 h-full w-11/12 max-w-xs bg-gray-100 p-4 md:w-full md:pb-0'
          }
          ref={menuRef}
        >
          <li className={'py-2'}>
            <Link
              href={'/'}
              className={`${
                pathname === '/' ? activeLink : inactiveLink
              } md:px-2`}
            >
              <Icon
                iconName={'home'}
                strokeWidth={1.5}
                color={'none'}
                className={`${
                  pathname === '/' ? activeIcon : inactiveIcon
                } mr-2`}
              />
              Dashboard
            </Link>
          </li>
          <li className={'py-2'}>
            <Link
              href={'/products'}
              className={`${
                pathname.includes('/products') ? activeLink : inactiveLink
              } md:px-2`}
            >
              <Icon
                iconName={'product'}
                strokeWidth={1.5}
                color={'none'}
                className={`${
                  pathname.includes('/products') ? activeIcon : inactiveIcon
                } mr-2`}
              />
              Products
            </Link>
          </li>
          <li className={'py-2'}>
            <Link
              href={'/categories'}
              className={`${
                pathname.includes('/categories') ? activeLink : inactiveLink
              } md:px-2`}
            >
              <Icon
                iconName={'category'}
                strokeWidth={1.5}
                className={`${
                  pathname.includes('/categories') ? activeIcon : inactiveIcon
                } mr-2`}
              />
              Categories
            </Link>
          </li>
          <li className={'py-2'}>
            <Link
              href={'/orders'}
              className={`${
                pathname.includes('/orders') ? activeLink : inactiveLink
              } md:px-2`}
            >
              <Icon
                iconName={'order'}
                strokeWidth={1.5}
                color={'none'}
                className={`${
                  pathname.includes('/orders') ? activeIcon : inactiveIcon
                } mr-2`}
              />
              Orders
            </Link>
          </li>
          <li className={'py-2'}>
            <Link
              href={'/admins'}
              className={`${
                pathname.includes('/admins') ? activeLink : inactiveLink
              } md:px-2`}
            >
              <Icon
                iconName={'admins'}
                strokeWidth={1.5}
                color={'none'}
                className={`${
                  pathname.includes('/admins') ? activeIcon : inactiveIcon
                } mr-2`}
              />
              Admins
            </Link>
          </li>
          <li className={'py-2'}>
            <Link
              href={'/settings'}
              className={`${
                pathname.includes('/settings') ? activeLink : inactiveLink
              } md:px-2`}
            >
              <Icon
                iconName={'settings'}
                strokeWidth={1.5}
                color={'none'}
                className={`${
                  pathname.includes('/settings') ? activeIcon : inactiveIcon
                } mr-2`}
              />
              Settings
            </Link>
          </li>
          <li className={'py-2'}>
            <button
              onClick={logout}
              className={`${inactiveLink}  w-full md:px-2`}
            >
              <Icon
                iconName={'logout'}
                strokeWidth={1.5}
                color={'none'}
                className={'mr-2'}
              />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
