import HomeHeader from '@/components/HomeHeader';
import Layout from '@/components/Layout';
import HomeStats from '@/components/HomeStats';

export default function Home() {
  return (
    <Layout>
      <HomeHeader />
      <HomeStats />
    </Layout>
  );
}
