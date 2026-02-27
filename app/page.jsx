import  HeroSlider  from '@/components/hero-slider'
import { CategoriesSection } from '@/components/categories-section'
import { FeaturedProducts } from '@/components/featured-products'
import { GalleryPreview } from '@/components/gallery-preview'
import { WhyChooseUs } from '@/components/why-choose-us'
import { BrandingBanner } from '../components/branding-banner'
// import { InstagramFeed } from '@/components/instagram-feed'

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategoriesSection />
      <FeaturedProducts />
      <GalleryPreview />
      {/* <InstagramFeed /> */}
      <WhyChooseUs />
      <BrandingBanner/>
    </>
  )
}
