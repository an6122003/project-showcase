import React, { useRef, useState } from 'react';
import {
  FileText,
  Facebook,
  Instagram,
  Mail,
  Sparkles,
  Store,
  TrendingUp,
  Users,
  Video,
  Youtube,
} from 'lucide-react';
import { TikTokIcon } from './PixelIcons';

const kolProfile = {
  name: 'An À Ha',
  tagline: 'Content creator về công nghệ, AI và hành trình build sản phẩm',
  bio: 'Mình kể chuyện công nghệ theo cách dễ hiểu hơn: tool này dùng để làm gì, nó giúp cuộc sống hoặc công việc ra sao, và người trẻ có thể học gì từ AI, productivity, creator tools.',
  avatar: '/avatar.png',
  tags: ['Tech Creator', 'AI Builder', 'Product'],
  email: 'an6122003@gmail.com',
  socials: [
    { label: 'TikTok', handle: '@anndaynee', href: 'https://www.tiktok.com/@anndaynee', icon: TikTokIcon },
    { label: 'Instagram', handle: '@anndaynee', href: 'https://www.instagram.com/anndaynee/', icon: Instagram },
    { label: 'YouTube', handle: '@anndaynee', href: 'https://www.youtube.com/@anndaynee', icon: Youtube },
    { label: 'Facebook Page', handle: 'An À Ha', href: 'https://www.facebook.com/people/An-%C3%80-Ha/61590387304904/', icon: Facebook },
  ],
};

const creatorProof = [
  {
    label: 'Góc nội dung',
    value: 'Tech dễ hiểu, có tính ứng dụng',
    detail: 'Tập trung vào AI tools, productivity, trải nghiệm sản phẩm và cách người trẻ dùng công nghệ trong đời sống.',
    icon: Video,
  },
  {
    label: 'Phong cách kể chuyện',
    value: 'Gần gũi, nhanh, có insight',
    detail: 'Không chỉ giới thiệu tính năng, mà giải thích vì sao người xem nên quan tâm và dùng thử.',
    icon: Sparkles,
  },
  {
    label: 'Phù hợp hợp tác',
    value: 'Tech, AI, app, lifestyle số',
    detail: 'Phù hợp với brand cần video ngắn, demo sản phẩm, creator review, hoặc câu chuyện launch dễ tiếp cận.',
    icon: TrendingUp,
  },
];

const channelStats = [
  {
    platform: 'TikTok',
    account: '@anndaynee',
    followers: '3.073',
    highlight: '42.700 lượt thích',
    icon: TikTokIcon,
    tone: 'text-pink-600 bg-pink-100 border-pink-200',
  },
  {
    platform: 'Instagram',
    account: '@anndaynee',
    followers: '300',
    highlight: '47 bài đăng',
    icon: Instagram,
    tone: 'text-fuchsia-600 bg-fuchsia-100 border-fuchsia-200',
  },
  {
    platform: 'Facebook',
    account: 'anmamxanhbaby',
    followers: '1.100',
    highlight: 'Personal brand',
    icon: Facebook,
    tone: 'text-blue-600 bg-blue-100 border-blue-200',
  },
  {
    platform: 'YouTube',
    account: '@anndaynee',
    followers: '2.040',
    highlight: '63 video',
    icon: Youtube,
    tone: 'text-red-600 bg-red-100 border-red-200',
  },
];

const collaborationPackages = [
  {
    name: 'Video ngắn kể chuyện sản phẩm',
    description: 'TikTok, Reels hoặc YouTube Shorts xoay quanh pain point, use case hoặc điểm thú vị của sản phẩm.',
    price: 'Open for collaboration',
  },
  {
    name: 'Creator review / trải nghiệm thật',
    description: 'Nội dung review theo hướng người dùng: thử, cảm nhận, giải thích điểm hay và điểm phù hợp.',
    price: 'Quote theo brief',
  },
  {
    name: 'Chuỗi nội dung launch',
    description: 'Series ngắn để tạo nhận biết trước, trong và sau launch cho sản phẩm hoặc chiến dịch.',
    price: 'Theo chiến dịch',
  },
];

const resourceLinks: Array<{
  title: string;
  description: string;
  href: string;
  external: boolean;
  image?: string;
  icon?: React.ComponentType<{ className?: string }>;
}> = [
  {
    title: 'Antibot',
    description: 'Agentic Discord community manager, pre-launch',
    href: 'https://antibot.techieslab.app/',
    image: '/kol/featured-links/antibot/cover.svg',
    external: true,
  },
  {
    title: 'Techies Lab',
    description: 'Khám phá các sản phẩm và thử nghiệm công nghệ từ Techies Lab.',
    href: 'https://techieslab.app/',
    image: '/kol/featured-links/techies-lab/cover.png',
    external: true,
  },
  {
    title: 'Tham gia cộng đồng công nghệ Hey Techiee',
    description: 'Kết nối, chia sẻ và trò chuyện cùng cộng đồng yêu công nghệ trên Discord.',
    href: 'https://discord.gg/EbZRxkYu5U',
    image: '/kol/featured-links/hey-techiee/cover.webp',
    external: true,
  },
];

const seriesDocuments = [
  {
    title: 'Series App/Repo Hữu Ích',
    episodes: [
      {
        title: 'Ep1: Remotion',
        description: 'Tạo video bằng React, phù hợp để demo automation và creative coding.',
        href: '/kol/series/remotion',
        cover: '',
        external: false,
      },
      {
        title: 'Ep2: Fotocaja',
        description: 'App chỉnh sửa ảnh 2D miễn phí, không cần đăng nhập, không thu thập dữ liệu cá nhân.',
        href: '/kol/series/fotocaja',
        cover: '/kol/series/fotocaja/cover.png',
        external: false,
      },
      {
        title: 'Ep3: Một GPU 32GB có đủ chạy AI cho cả team?',
        description: 'Benchmark Gemma 4 trên Radeon AI PRO R9700 với tối đa 10 phiên sử dụng đồng thời.',
        href: 'https://techieslab.app/blog/mot-gpu-32gb-co-du-chay-ai-cho-ca-team',
        cover: '/kol/series/gpu-team/cover.png',
        external: true,
      },
    ],
  },
];

function resolveAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

function KolHeader({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const isCompact = variant === 'compact';

  return (
    <header className="relative flex flex-col items-center px-4 pb-1 pt-3 text-center">
      <div className="relative mb-[-1.5rem] flex h-32 w-full items-center justify-center overflow-hidden rounded-[1.7rem] border border-white/70 bg-gradient-to-br from-blue-600 via-sky-400 to-cyan-200 px-8 text-center text-white shadow-lg shadow-blue-900/10">
        <div className="absolute -left-16 -top-8 h-40 w-40 rounded-full bg-white/25 blur-2xl" />
        <div className="absolute -right-14 -bottom-8 h-48 w-48 rounded-full bg-blue-950/20 blur-2xl" />
        <div className="relative z-10">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/75">KOL Creator Page</p>
          <p className="mt-2 text-lg font-semibold leading-tight">Tech content that feels human.</p>
        </div>
      </div>

      <div className="relative z-10 rounded-full border border-white/50 bg-gradient-to-b from-white/70 to-white/20 p-1.5 shadow-[0_8px_32px_rgba(255,255,255,0.45)] backdrop-blur-md">
        <div className="h-[4.5rem] w-[4.5rem] overflow-hidden rounded-full">
          <img src={resolveAsset(kolProfile.avatar)} alt="An Nguyen" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="mt-3 flex flex-col items-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-800">{kolProfile.name}</h1>
        <p className="mt-1 max-w-xs text-sm font-semibold leading-snug text-blue-700">{kolProfile.tagline}</p>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {kolProfile.tags.map(tag => (
            <span key={tag} className="rounded-full border border-white/50 bg-white/55 px-2.5 py-1 text-[11px] font-semibold text-blue-900 shadow-sm backdrop-blur-sm">
              #{tag}
            </span>
          ))}
        </div>

        {!isCompact && (
          <>
            <p className="mt-4 max-w-sm px-5 text-xs font-medium leading-relaxed text-slate-600">{kolProfile.bio}</p>

            <div className="mt-5 grid w-full grid-cols-2 gap-2 px-2">
              {kolProfile.socials.map(social => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/55 px-3 py-2 text-left shadow-[0_8px_24px_rgba(50,100,150,0.05)] backdrop-blur-xl transition hover:border-blue-300 hover:bg-white/75"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-blue-600" />
                    <span className="min-w-0">
                      <span className="block text-[11px] font-bold text-slate-800">{social.label}</span>
                      <span className="block truncate text-[10px] font-medium text-slate-500">{social.handle}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

function StorefrontTab() {
  return (
    <div className="space-y-9 px-2 pb-8 pt-4">
      <section>
        <div className="mb-4 flex items-center justify-between px-1">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Link nổi bật</h2>
        </div>
        <div className="space-y-3">
          {resourceLinks.map(link => (
              <a
                key={link.title}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 rounded-[1.5rem] border border-white/65 bg-white/45 p-4 shadow-[0_8px_24px_rgba(50,100,150,0.04)] backdrop-blur-xl transition hover:border-blue-300"
              >
                {link.image ? (
                  <span className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/70 bg-blue-100">
                    <img src={resolveAsset(link.image)} alt={link.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </span>
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-200 bg-indigo-100 text-indigo-700 transition group-hover:bg-indigo-600 group-hover:text-white">
                    {link.icon && <link.icon className="h-6 w-6" />}
                  </span>
                )}
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-sm font-semibold text-slate-800">{link.title}</span>
                  <span className="mt-1 block text-xs font-medium leading-relaxed text-slate-500">{link.description}</span>
                </span>
              </a>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between px-1">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Tài liệu / Series</h2>
        </div>
        <div className="space-y-3">
          {seriesDocuments.map(series => (
            <div key={series.title} className="rounded-[1.5rem] border border-white/65 bg-white/45 p-5 shadow-[0_8px_24px_rgba(50,100,150,0.04)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-blue-200 bg-blue-100 text-blue-700">
                  <FileText className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-bold text-slate-800">{series.title}</h3>
              </div>
              <div className="mt-4 space-y-2">
                {series.episodes.map(episode => (
                  <a
                    key={episode.title}
                    href={episode.href}
                    target={episode.external ? '_blank' : undefined}
                    rel={episode.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 rounded-2xl bg-white/65 p-3 text-left transition hover:bg-white"
                  >
                    {episode.cover ? (
                      <span className="h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-white/70 bg-blue-50">
                        <img src={resolveAsset(episode.cover)} alt={`${episode.title} cover`} className="h-full w-full object-cover" />
                      </span>
                    ) : (
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                        <FileText className="h-5 w-5" />
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-blue-700">{episode.title}</span>
                      <span className="mt-1 block text-xs font-medium leading-relaxed text-slate-500">{episode.description}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

function MediaKitTab() {
  const totalFollowers = '6.513';

  return (
    <div className="space-y-6 px-2 pb-8 pt-6">
      <section>
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Tổng quan kênh</h2>
        </div>
        <div className="rounded-[1.5rem] border border-white/65 bg-white/45 p-5 shadow-[0_8px_24px_rgba(50,100,150,0.05)] backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[1.2rem] bg-white/70 p-4 text-center shadow-sm">
              <Users className="mx-auto mb-2 h-5 w-5 text-blue-600" />
              <p className="text-2xl font-bold tracking-tight text-slate-800">{totalFollowers}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Tổng follower</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/70 p-4 text-center shadow-sm">
              <Video className="mx-auto mb-2 h-5 w-5 text-cyan-600" />
              <p className="text-2xl font-bold tracking-tight text-slate-800">4</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Kênh duy trì</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Chỉ số từng kênh</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {channelStats.map(channel => {
            const Icon = channel.icon;
            return (
              <div key={channel.platform} className="rounded-[1.5rem] border border-white/65 bg-white/45 p-4 shadow-[0_8px_24px_rgba(50,100,150,0.05)] backdrop-blur-xl">
                <div className={`mb-3 flex h-8 w-8 items-center justify-center rounded-full border ${channel.tone}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{channel.platform}</p>
                <p className="mt-1 text-xl font-bold tracking-tight text-slate-800">{channel.followers}</p>
                <p className="mt-1 text-[10px] font-medium text-slate-500">{channel.account}</p>
                <p className="mt-2 text-[10px] font-medium text-slate-500">{channel.highlight}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Định vị creator</h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {creatorProof.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-[1.5rem] border border-white/65 bg-white/45 p-5 shadow-[0_8px_24px_rgba(50,100,150,0.05)] backdrop-blur-xl">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-blue-200 bg-blue-100 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-blue-600">{item.label}</span>
                    <span className="mt-1 block text-base font-bold tracking-tight text-slate-800">{item.value}</span>
                    <span className="mt-1 block text-xs font-medium leading-relaxed text-slate-500">{item.detail}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Gói hợp tác</h2>
        </div>
        <div className="space-y-3">
          {collaborationPackages.map(service => (
            <div key={service.name} className="rounded-[1.5rem] border border-white/65 bg-white/45 p-5 shadow-[0_8px_24px_rgba(50,100,150,0.04)] backdrop-blur-xl transition hover:border-blue-300">
              <h3 className="text-sm font-semibold text-slate-800">{service.name}</h3>
              <p className="mt-2 text-xs font-medium leading-relaxed text-slate-500">{service.description}</p>
              <div className="mt-3 inline-flex rounded-full border border-blue-200 bg-blue-100/80 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
                {service.price}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <a
          href={`mailto:${kolProfile.email}`}
          className="flex w-full items-center justify-center gap-2 rounded-[1.5rem] bg-gradient-to-r from-blue-600 to-cyan-500 py-4 font-semibold text-white shadow-[0_8px_24px_rgba(59,130,246,0.3)] transition hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <Mail className="h-4 w-4" />
          Liên hệ hợp tác
        </a>
      </section>
    </div>
  );
}

export function KolLandingPage() {
  const [activeTab, setActiveTab] = useState<'storefront' | 'mediaKit'>('storefront');
  const [showFloatingNav, setShowFloatingNav] = useState(true);
  const lastScrollTop = useRef(0);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const nextTop = event.currentTarget.scrollTop;
    const isScrollingUp = nextTop < lastScrollTop.current;
    const isNearTop = nextTop < 24;
    setShowFloatingNav(isNearTop || isScrollingUp);
    lastScrollTop.current = Math.max(nextTop, 0);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 8) setShowFloatingNav(false);
    if (event.deltaY < -8) setShowFloatingNav(true);
  };

  return (
    <div className="min-h-screen bg-[#E6F0FA] bg-gradient-to-br from-[#DAE8F7] via-[#E8F4F8] to-[#EEF4FC] font-sans selection:bg-blue-300 selection:text-blue-900 sm:py-10">
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col overflow-hidden bg-white/20 shadow-[0_32px_64px_rgba(50,100,150,0.15)] backdrop-blur-3xl sm:min-h-[850px] sm:rounded-[3rem] sm:border-[8px] sm:border-white/60">
        <div className="absolute right-0 top-0 -z-10 h-[28rem] w-[28rem] translate-x-1/4 -translate-y-1/4 rounded-full bg-white/60 blur-3xl mix-blend-overlay" />
        <div className="absolute bottom-1/4 left-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 -z-10 h-64 w-64 rounded-full bg-blue-300/30 blur-3xl" />

        <div className="relative z-0 w-full flex-1 overflow-y-auto pb-28" onScroll={handleScroll} onWheel={handleWheel}>
          <KolHeader variant={activeTab === 'mediaKit' ? 'compact' : 'full'} />
          <main className="w-full">
            <div className="animate-in fade-in duration-500">
              {activeTab === 'storefront' ? <StorefrontTab /> : <MediaKitTab />}
            </div>
          </main>
        </div>

        <nav
          className={`pointer-events-none absolute inset-x-0 bottom-8 z-50 px-8 transition-all duration-300 ${
            showFloatingNav ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-70'
          }`}
          aria-label="KOL page tabs"
        >
          <div className="pointer-events-auto flex w-full items-center rounded-[2rem] border border-white bg-white/85 p-1.5 shadow-[0_16px_40px_-10px_rgba(50,100,150,0.25)] backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setActiveTab('storefront')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-[1.5rem] py-3.5 text-xs font-semibold transition-all duration-300 ${
                activeTab === 'storefront'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/10'
                  : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-700'
              }`}
            >
              <Store className="h-4 w-4" />
              Link
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mediaKit')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-[1.5rem] py-3.5 text-xs font-semibold transition-all duration-300 ${
                activeTab === 'mediaKit'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/10'
                  : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-700'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              Media kit
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
