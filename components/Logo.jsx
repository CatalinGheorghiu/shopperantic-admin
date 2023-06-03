import Icon from '@/components/Icon';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href={'/'} className="flex gap-1">
      <Icon iconName={'store'} color={'none'} />
      <span className="text-black">Shopperantics</span>
    </Link>
  );
}
