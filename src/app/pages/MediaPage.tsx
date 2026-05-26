import { Instagram, Facebook, ExternalLink, Play } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../contexts/LanguageContext';

export function MediaPage() {
  const { t, isRTL } = useLanguage();

  const instagramPosts = [
    {
      id: 1,
      coverImage: '/assets/images/thumbnails/WhatsApp Image 2026-05-21 at 4.01.25 PM.jpeg',
      link:'https://www.instagram.com/p/DVplpjBifX0/'
    },
    {
      id: 2,
      coverImage: '/assets/images/thumbnails/WhatsApp Image 2026-05-21 at 4.01.25 PM (1).jpeg',
      link: 'https://www.instagram.com/p/DXnvxv_ibd_/'
    },
    {
      id: 3,
      coverImage: '/assets/images/thumbnails/WhatsApp Image 2026-05-21 at 4.01.26 PM.jpeg',
      link: 'https://www.instagram.com/p/DXs-l-kE55U/'
    },
    {
      id: 4,
      coverImage: '/assets/images/thumbnails/WhatsApp Image 2026-05-21 at 4.01.26 PM (1).jpeg',
      link: 'https://www.instagram.com/p/DUZzp90iTbu/'
    },
    {
      id: 5,
      coverImage: '/assets/images/thumbnails/WhatsApp Image 2026-05-21 at 4.01.26 PM (2).jpeg',
      link: 'https://www.instagram.com/p/DTegPYsiQqf/'
    },
  ];

  const tiktokVideos = [
    { id: 1, coverImage: '/assets/images/tiktokthumbnails/WhatsApp Image 2026-05-21 at 5.40.07 PM.jpeg', link: 'https://www.tiktok.com/@wwlc_official/video/7578746158898597138?_r=1&_t=ZS-93arfYFsky1' },
    { id: 2, coverImage: '/assets/images/tiktokthumbnails/WhatsApp Image 2026-05-21 at 5.40.08 PM (1).jpeg', link: 'https://www.tiktok.com/@wwlc_official/video/7618440724576505109?_r=1&_t=ZS-93arfYFsky1' },
    { id: 3, coverImage: '/assets/images/tiktokthumbnails/WhatsApp Image 2026-05-21 at 5.40.08 PM (2).jpeg', link: 'https://www.tiktok.com/@wwlc_official/video/7534577970267032850?_r=1&_t=ZS-93arfYFsky1' },
    { id: 4, coverImage: '/assets/images/tiktokthumbnails/WhatsApp Image 2026-05-21 at 5.40.08 PM.jpeg', link: 'https://www.tiktok.com/@wwlc_official/video/7601005313306774805?_r=1&_t=ZS-93arfYFsky1' },
    { id: 5, coverImage: '/assets/images/tiktokthumbnails/WhatsApp Image 2026-05-21 at 5.40.09 PM.jpeg', link: 'https://www.tiktok.com/@wwlc_official/video/7636257812045237524?_r=1&_t=ZS-93arfYFsky1' },
  ];

  const facebookPosts = [
    { id: 1, coverImage: '/assets/images/social/instagram-reel-1.png', link: 'https://www.facebook.com/wordsworth.edu' },
    { id: 2, coverImage: '/assets/images/social/instagram-reel-2.png', link: 'https://www.facebook.com/wordsworth.edu' },
    { id: 3, coverImage: '/assets/images/social/instagram-reel-1.png', link: 'https://www.facebook.com/wordsworth.edu' },
    { id: 4, coverImage: '/assets/images/social/instagram-reel-2.png', link: 'https://www.facebook.com/wordsworth.edu' },
    { id: 5, coverImage: '/assets/images/social/instagram-reel-1.png', link: 'https://www.facebook.com/wordsworth.edu' },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="relative overflow-hidden bg-white text-white py-3 sm:py-4 min-h-[196px] sm:min-h-[210px] flex items-center">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f5a21f_0%,#f5a21f_24%,#ffffff_24%,#ffffff_58%,#06115a_58%,#06115a_100%)]" />
        <div className="absolute inset-0 opacity-90 bg-[radial-gradient(circle_at_18%_28%,rgba(255,255,255,0.45)_0_14%,transparent_15%),linear-gradient(120deg,transparent_0_42%,rgba(245,162,31,0.9)_42%_50%,transparent_50%_100%)]" />
        <div className="absolute -left-20 top-0 h-full w-64 -skew-x-12 bg-brand-blue" />
        <div className="absolute right-0 bottom-0 h-28 w-72 -skew-x-12 bg-brand-orange/90" />
        <div className="absolute inset-0 bg-brand-blue/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl rounded-xl bg-brand-blue/45 px-4 py-2.5 sm:px-6 sm:py-3 backdrop-blur-[1px]">
            <h1 className="mb-3 text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">{t('media.title')}</h1>
            <p className="text-xl text-white max-w-2xl mx-auto [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">
              {t('media.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="mb-2">{t('media.instagramFeed')}</h2>
              <p className="text-gray-600">{t('media.instagramDesc')}</p>
            </div>
            <a href="https://www.instagram.com/wordsworth.language.centre/" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                <Instagram className="w-5 h-5" />
                {t('media.visitInstagram')}
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {instagramPosts.map((post) => (
              <a key={post.id} href={post.link} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <img
                    src={post.coverImage}
                    alt="Instagram Reel Cover"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/60 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Instagram className="w-5 h-5" />
                      <span className="font-medium text-sm">{t('media.viewReel')}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="mb-2">{t('media.tiktokVideos')}</h2>
              <p className="text-gray-600">{t('media.tiktokDesc')}</p>
            </div>
            <a href="https://www.tiktok.com/@wordsworth.edu" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="bg-black hover:bg-gray-900">
                <Play className="w-5 h-5" />
                {t('media.visitTikTok')}
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {tiktokVideos.map((video) => (
              <a key={video.id} href={video.link} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <img
                    src={video.coverImage}
                    alt="TikTok Video Cover"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/60 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      <span className="font-medium text-sm">{t('media.visitTikTok')}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="mb-2">{t('media.facebookUpdates')}</h2>
              <p className="text-gray-600">{t('media.facebookDesc')}</p>
            </div>
            <a href="https://www.facebook.com/wordsworth.edu" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="bg-blue-600 hover:bg-blue-700">
                <Facebook className="w-5 h-5" />
                {t('media.visitFacebook')}
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {facebookPosts.map((post) => (
              <a key={post.id} href={post.link} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <img
                    src={post.coverImage}
                    alt="Facebook Post Cover"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/60 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Facebook className="w-5 h-5" />
                      <span className="font-medium text-sm">{t('media.visitFacebook')}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <div className="mt-16 bg-gradient-to-br from-brand-blue to-brand-blue-dark rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="mb-4 text-white">{t('media.followForUpdates')}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('media.dailyTips')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.instagram.com/wordsworth.language.centre/" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-0 text-white">
                <Instagram className="w-5 h-5" />
                {t('media.followOnInstagram')}
              </Button>
            </a>
            <a href="https://www.tiktok.com/@wordsworth.edu" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-black hover:bg-gray-900 border-0 text-white">
                <Play className="w-5 h-5" />
                {t('media.followOnTikTok')}
              </Button>
            </a>
            <a href="https://www.facebook.com/wordsworth.edu" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 border-0 text-white">
                <Facebook className="w-5 h-5" />
                {t('media.likeOnFacebook')}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
