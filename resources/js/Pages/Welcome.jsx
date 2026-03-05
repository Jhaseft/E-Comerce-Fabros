import Layout from '@/Layouts/MainLayout';
import Banner from '@/Components/welcome/WelcomeSe/Banner';
import WelcomeSection from '@/Components/welcome/WelcomeSe/WelcomeSection';
import CTAContact from '@/Components/welcome/WelcomeSe/CTAContact';

export default function Welcome({ categories, search, page, hasMore }) {
  
  return (
    <Layout title="FABROS | Bolivia">
      
      <Banner images={[
        "https://res.cloudinary.com/dnbklbswg/image/upload/v1772685040/WhatsApp_Image_2026-03-04_at_09.07.25_1_oomewb.jpg",
        "https://res.cloudinary.com/dnbklbswg/image/upload/v1772685041/WhatsApp_Image_2026-03-04_at_09.07.26_1_zu1qvw.jpg",
        "https://res.cloudinary.com/dnbklbswg/image/upload/v1772685040/WhatsApp_Image_2026-03-04_at_09.07.26_km2xof.jpg",
        "https://res.cloudinary.com/dnbklbswg/image/upload/v1772685040/WhatsApp_Image_2026-03-04_at_09.07.25_hjjixf.jpg",
      ]} />
      
      
      <WelcomeSection />
            
      
      <CTAContact />
    </Layout>
  );
}
