import Layout from '@/Layouts/MainLayout';
import Banner from '@/Components/welcome/WelcomeSe/Banner';
import WelcomeSection from '@/Components/welcome/WelcomeSe/WelcomeSection';
import CTAContact from '@/Components/welcome/WelcomeSe/CTAContact';

export default function Welcome({ categories, search, page, hasMore }) {
  
  return (
    <Layout title="Pragati Motors | Bolivia">
      
      <Banner img="https://res.cloudinary.com/dnbklbswg/image/upload/v1772251280/fabros1_yztzgo.jpg" />
      
      
      <WelcomeSection />
            
      
      <CTAContact />
    </Layout>
  );
}
