import { memo, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type GalleryCategory =
  | "Bhagwat Katha"
  | "Temple Activities"
  | "Seva"
  | "Festivals"
  | "Guru Parampara"
  | "Youth & Family"
  | "Trust Events";

type ActiveCategory = "All" | GalleryCategory;

/**
 * CMS/Backend-ready model reference
 * GalleryPhoto {
 *   title: String,
 *   slug: String,
 *   category: String,
 *   location: String,
 *   eventDate: Date,
 *   imageUrl: String,
 *   thumbnailUrl: String,
 *   description: String,
 *   isFeatured: Boolean,
 *   status: "draft" | "published",
 *   createdAt: Date,
 *   updatedAt: Date
 * }
 *
 * Future admin functions:
 * - Add photo
 * - Edit photo
 * - Delete photo
 * - Upload image to Cloudinary
 * - Select category
 * - Mark as featured
 * - Publish/unpublish
 * - Search and filter in admin panel
 */
type GalleryPhoto = {
  id: string;
  title: string;
  slug: string;
  category: GalleryCategory;
  location: string;
  dateLabel: string;
  eventDateISO: string;
  image: string;
  thumbnailUrl?: string;
  description?: string;
  isFeatured?: boolean;
  status?: "draft" | "published";
};

const CATEGORY_OPTIONS: ActiveCategory[] = [
  "All",
  "Bhagwat Katha",
  "Temple Activities",
  "Seva",
  "Festivals",
  "Guru Parampara",
  "Youth & Family",
  "Trust Events",
];

const INITIAL_VISIBLE = 6;
const LIGHTBOX_SWIPE_THRESHOLD = 60;
const IMAGE_FALLBACK = "/assets/images/media-gallery/photo-gallery-hero.jpg";

const PHOTO_DATA: GalleryPhoto[] = [
  {
    id: "1",
    slug: "bhagwat-katha-mahotsav-day",
    title: "Bhagwat Katha Mahotsav Day",
    category: "Bhagwat Katha",
    location: "Bhagwat Dham, Chandrapur",
    dateLabel: "15 Jan 2026",
    eventDateISO: "2026-01-15",
    image: "/assets/images/gallery/bhagwat-katha-mahotsav.jpg",
    description: "A divine gathering of devotees during Bhagwat Katha Mahotsav.",
    status: "published",
  },
  {
    id: "2",
    slug: "temple-morning-aarti",
    title: "Temple Morning Aarti",
    category: "Temple Activities",
    location: "Main Mandir Hall",
    dateLabel: "20 Jan 2026",
    eventDateISO: "2026-01-20",
    image: "/assets/images/gallery/temple-morning-aarti.jpg",
    description: "Sacred morning aarti and devotional atmosphere at the temple.",
    status: "published",
  },
  {
    id: "3",
    slug: "food-distribution-seva",
    title: "Food Distribution Seva",
    category: "Seva",
    location: "Community Center",
    dateLabel: "02 Feb 2026",
    eventDateISO: "2026-02-02",
    image: "/assets/images/gallery/food-distribution-seva.jpg",
    description: "Volunteers serving food with devotion and compassion.",
    status: "published",
  },
  {
    id: "4",
    slug: "kashtabhanjan-hanuman-darshan",
    title: "Kashtabhanjan Hanuman Darshan",
    category: "Temple Activities",
    location: "Trust Office",
    dateLabel: "08 Feb 2026",
    eventDateISO: "2026-02-08",
    image: "/assets/images/gallery/kashtabhanjan-hanuman.jpg",
    description: "Sacred darshan of Shri Kashtabhanjan Hanumanji.",
    status: "published",
  },
  {
    id: "5",
    slug: "inspiration-of-maharaj-ji",
    title: "Inspiration of Maharaj Ji",
    category: "Guru Parampara",
    location: "Temple Campus",
    dateLabel: "14 Feb 2026",
    eventDateISO: "2026-02-14",
    image: "/assets/images/gallery/inspiration-of-maharajji.jpg",
    description: "Divine guidance and inspiration from Sant Shri Manish Bhaiji Maharaj.",
    status: "published",
  },
  {
    id: "6",
    slug: "bhagwat-geeta-study",
    title: "Bhagwat Geeta Study",
    category: "Bhagwat Katha",
    location: "Katha Mandap",
    dateLabel: "18 Feb 2026",
    eventDateISO: "2026-02-18",
    image: "/assets/images/gallery/bhagwat-geeta-study.jpg",
    description: "Scriptural study and spiritual learning session.",
    status: "published",
  },
  {
    id: "7",
    slug: "evening-deep-daan",
    title: "Evening Deep Daan",
    category: "Temple Activities",
    location: "Mandir Prangan",
    dateLabel: "20 Feb 2026",
    eventDateISO: "2026-02-20",
    image: "/assets/images/gallery/evening-deep-daan.jpg",
    description: "Devotees offering lamps in a peaceful devotional setting.",
    status: "published",
  },
  {
    id: "8",
    slug: "medical-camp-seva",
    title: "Medical Camp Seva",
    category: "Seva",
    location: "Service Wing",
    dateLabel: "23 Feb 2026",
    eventDateISO: "2026-02-23",
    image: "/assets/images/gallery/medical-camp-seva.jpg",
    description: "Health support and medical seva for the community.",
    status: "published",
  },
  {
    id: "9",
    slug: "festival-celebration",
    title: "Festival Celebration Sabha",
    category: "Festivals",
    location: "Mandir Courtyard",
    dateLabel: "01 Mar 2026",
    eventDateISO: "2026-03-01",
    image: "/assets/images/gallery/festival-celebration.jpg",
    description: "Traditional utsav celebration with devotees, bhajans, and prasad seva.",
    status: "published",
  },
  {
    id: "10",
    slug: "youth-family-session",
    title: "Youth & Family Spiritual Session",
    category: "Youth & Family",
    location: "Satsang Hall",
    dateLabel: "06 Mar 2026",
    eventDateISO: "2026-03-06",
    image: "/assets/images/gallery/youth-family-session.jpg",
    description: "Intergenerational satsang and sanskar learning session for families.",
    status: "published",
  },
  {
    id: "11",
    slug: "guru-purnima-event",
    title: "Guru Purnima Event",
    category: "Guru Parampara",
    location: "Bhagwat Heritage Mandap",
    dateLabel: "12 Mar 2026",
    eventDateISO: "2026-03-12",
    image: "/assets/images/gallery/guru-purnima-event.jpg",
    description: "Guru vandana and devotional offerings in honor of Guru Parampara.",
    status: "published",
  },
  {
    id: "12",
    slug: "trust-event-group",
    title: "Trust Event Group Gathering",
    category: "Trust Events",
    location: "Trust Event Hall",
    dateLabel: "17 Mar 2026",
    eventDateISO: "2026-03-17",
    image: "/assets/images/gallery/trust-event-group.jpg",
    description: "Team and volunteer gathering for trust-led community planning and seva expansion.",
    status: "published",
  },
];

type IntroHighlight = { title: string; icon: string; text: string };

const INTRO_HIGHLIGHTS: IntroHighlight[] = [
  {
    title: "Spiritual Events",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777215185/ChatGPT_Image_Apr_26_2026_08_21_05_PM_kfuotm.png",
    text: "Bhagwat Katha, satsang, and mandir-centered spiritual moments.",
  },
  {
    title: "Seva Activities",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777215185/ChatGPT_Image_Apr_26_2026_08_21_16_PM_y3jdht.png",
    text: "Compassion-led support programs, service camps, and outreach efforts.",
  },
  {
    title: "Cultural Celebrations",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777215185/ChatGPT_Image_Apr_26_2026_08_21_26_PM_rnldhz.png",
    text: "Festivals, traditional celebrations, and heritage gatherings.",
  },
];

type MoreMediaCard = { title: string; text: string; icon: string; to: string; cta: string };

const MORE_MEDIA_CARDS: MoreMediaCard[] = [
  {
    title: "Video Gallery",
    text: "Watch highlights from satsang, katha, seva drives, and trust events.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193611/ChatGPT_Image_Apr_26_2026_01_44_24_PM_ybqb4j.png",
    to: ROUTES.media.videos,
    cta: "View Videos",
  },
  {
    title: "Event Highlights",
    text: "Browse curated event snapshots and moment-based coverage updates.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777191420/ChatGPT_Image_Apr_26_2026_01_44_18_PM_cu3nce.png",
    to: ROUTES.media.highlights,
    cta: "Explore Highlights",
  },
  {
    title: "Publications",
    text: "Discover trust publications, reports, devotional notes, and updates.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777191419/ChatGPT_Image_Apr_26_2026_01_44_31_PM_tmftmk.png",
    to: ROUTES.media.publications,
    cta: "Open Publications",
  },
  {
    title: "Social Feed",
    text: "Stay connected with ongoing media updates from official social channels.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777097560/ChatGPT_Image_Apr_25_2026_11_41_57_AM_wsv00f.png",
    to: ROUTES.media.socialFeed,
    cta: "Visit Social Feed",
  },
];

function ImageWithFallback({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={(event) => {
        const target = event.currentTarget;
        if (target.src.endsWith(IMAGE_FALLBACK)) return;
        target.src = IMAGE_FALLBACK;
      }}
    />
  );
}

export default memo(function MandirGalleryPage() {
  usePageMeta(
    "Photo Gallery",
    "Explore photos from Bhagwat Katha, temple activities, seva programs, festivals, and spiritual events by Bhagwat Heritage Service Foundation Trust.",
  );

  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PHOTO_DATA.filter((item) => {
      const categoryMatch = activeCategory === "All" || item.category === activeCategory;
      const queryMatch =
        q.length === 0 ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q);
      return categoryMatch && queryMatch;
    });
  }, [activeCategory, query]);

  const visiblePhotos = useMemo(() => filteredPhotos.slice(0, visibleCount), [filteredPhotos, visibleCount]);
  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [activeCategory, query]);

  useEffect(() => {
    if (lightboxIndex !== null && filteredPhotos.length === 0) {
      setLightboxIndex(null);
    }
  }, [filteredPhotos.length, lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") {
        setLightboxIndex((prev) => {
          if (prev === null) return 0;
          return (prev + 1) % filteredPhotos.length;
        });
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((prev) => {
          if (prev === null) return 0;
          return (prev - 1 + filteredPhotos.length) % filteredPhotos.length;
        });
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, filteredPhotos.length]);

  const openLightbox = (photoId: string) => {
    const index = filteredPhotos.findIndex((photo) => photo.id === photoId);
    if (index >= 0) setLightboxIndex(index);
  };

  const goToPrev = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + filteredPhotos.length) % filteredPhotos.length;
    });
  };

  const goToNext = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % filteredPhotos.length;
    });
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const deltaX = endX - touchStartX;

    if (deltaX > LIGHTBOX_SWIPE_THRESHOLD) goToPrev();
    if (deltaX < -LIGHTBOX_SWIPE_THRESHOLD) goToNext();

    setTouchStartX(null);
  };

  return (
    <div className="pb-16 text-[#4F3A2A]">
      <section className="relative overflow-hidden rounded-[32px] border border-[#E8D7BA] bg-[linear-gradient(145deg,#FFF9EC_0%,#FFF4DA_48%,#F8E8C6_100%)] p-6 shadow-[0_22px_50px_rgba(104,75,38,0.10)] md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(216,155,43,0.22)_0,transparent_35%),radial-gradient(circle_at_80%_80%,rgba(15,107,107,0.12)_0,transparent_40%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(200,146,46,0.4)_1px,transparent_1px),linear-gradient(rgba(200,146,46,0.35)_1px,transparent_1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-[#E1BC7F] bg-white/75 px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#B87415]">
              Media Gallery
            </p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-[#184D52] md:text-5xl">Photo Gallery</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5E4A37] md:text-lg">
              Explore divine moments from Bhagwat Katha, temple activities, seva programs, festivals, and cultural events of Bhagwat Heritage
              Service Foundation Trust.
            </p>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-[#E2C98D] shadow-[0_14px_34px_rgba(95,63,26,0.15)]">
            <ImageWithFallback
              src="https://res.cloudinary.com/der8zinu8/image/upload/v1777263470/ChatGPT_Image_Apr_27_2026_09_43_37_AM_tkywop.png"
              alt="Photo gallery hero featuring Bhagwat Heritage devotional moments"
              className="h-full min-h-[220px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[28px] border border-[#E8D7BA] bg-[#FFFCF4] p-6 shadow-[0_18px_40px_rgba(104,75,38,0.08)] md:p-8">
        <h2 className="text-2xl font-black text-[#184D52] md:text-3xl">Moments of Faith, Culture &amp; Seva</h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-[#5E4A37]">
          Every photograph preserves a sacred memory from Bhagwat Katha and mandir darshan to seva, sanskar, festivals, and community gatherings.
          This gallery reflects the living spirit of Bhagwat Heritage.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {INTRO_HIGHLIGHTS.map((item) => (
            <article key={item.title} className="rounded-[20px] border border-[#EAD9BC] bg-white p-5 text-center shadow-[0_10px_24px_rgba(104,75,38,0.08)]">
              <div className="mx-auto inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-[#E3C085] bg-[#FFF3DE] shadow-[0_8px_16px_rgba(104,75,38,0.12)]">
                <ImageWithFallback src={item.icon} alt={`${item.title} icon`} className="h-16 w-16 rounded-full object-cover" />
              </div>
              <h3 className="mt-4 text-xl font-black text-[#2B2219]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5E4A37]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sticky top-3 z-20 mt-8 rounded-[24px] border border-[#E6D2AE] bg-[#FFF8EA]/95 p-4 shadow-[0_14px_28px_rgba(104,75,38,0.12)] backdrop-blur md:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <label htmlFor="gallery-search" className="sr-only">
              Search photos
            </label>
            <input
              id="gallery-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search photos by title, event, place..."
              className="w-full rounded-full border border-[#DFC293] bg-white px-5 py-3 text-sm text-[#4F3A2A] outline-none transition focus:border-[#C8922E] focus:ring-2 focus:ring-[#F0D79D]"
            />
          </div>
          <p className="text-sm font-bold text-[#6F512D] lg:text-right">Showing {filteredPhotos.length} photos</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? "border-[#C8922E] bg-[#D89B2B] text-white shadow-[0_8px_16px_rgba(216,155,43,0.28)]"
                    : "border-[#E2CDA8] bg-white text-[#5E4A37] hover:border-[#C8922E] hover:bg-[#FFF0D2]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        {filteredPhotos.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-[#D9BE8A] bg-[#FFF8EA] px-6 py-14 text-center">
            <h2 className="text-2xl font-black text-[#184D52]">No photos found. Please try another search or category.</h2>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visiblePhotos.map((photo) => (
                <article
                  key={photo.id}
                  className="group overflow-hidden rounded-[20px] border border-[#E8D7BA] bg-[#FFFDF8] shadow-[0_14px_32px_rgba(104,75,38,0.10)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_rgba(104,75,38,0.16)]"
                >
                  <button
                    type="button"
                    onClick={() => openLightbox(photo.id)}
                    className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D89B2B]"
                    aria-label={`View photo: ${photo.title}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <ImageWithFallback
                        src={photo.image}
                        alt={`${photo.title} at ${photo.location}`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-[#D89B2B] px-3 py-1 text-xs font-black text-white shadow">
                        {photo.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-[23px] font-black leading-tight text-[#2B2219]">{photo.title}</h3>
                      <p className="mt-3 text-sm font-semibold text-[#0F6B6B]">{photo.location}</p>
                      <p className="mt-1 text-sm text-[#6E5A45]">{photo.dateLabel}</p>
                      {photo.description ? <p className="mt-3 text-sm leading-6 text-[#5E4A37]">{photo.description}</p> : null}
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#B87415]">
                        View Photo
                        <span aria-hidden="true">?</span>
                      </span>
                    </div>
                  </button>
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              {visibleCount < filteredPhotos.length ? (
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => Math.min(prev + INITIAL_VISIBLE, filteredPhotos.length))}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#D89B2B] px-8 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#BD7D18]"
                >
                  Load More Photos
                </button>
              ) : (
                <p className="text-sm font-bold text-[#6F512D]">All photos loaded</p>
              )}
            </div>
          </>
        )}
      </section>

      <section className="mt-12 rounded-[28px] border border-[#E8D7BA] bg-[#FFFCF4] p-6 shadow-[0_18px_40px_rgba(104,75,38,0.08)] md:p-8">
        <h2 className="text-2xl font-black text-[#184D52] md:text-3xl">Explore More Media</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {MORE_MEDIA_CARDS.map((card) => (
            <article key={card.title} className="rounded-[20px] border border-[#E9D8B7] bg-white p-5 text-center shadow-[0_10px_24px_rgba(104,75,38,0.08)]">
              <div className="mx-auto inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-[#E3C085] bg-[#FFF3DE] shadow-[0_8px_16px_rgba(104,75,38,0.12)]">
                <ImageWithFallback src={card.icon} alt={`${card.title} icon`} className="h-16 w-16 rounded-full object-cover" />
              </div>
              <h3 className="mt-4 text-xl font-black text-[#2B2219]">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5E4A37]">{card.text}</p>
              <Link
                to={card.to}
                className="mt-4 inline-flex min-h-[42px] items-center justify-center rounded-full border border-[#D8B070] bg-[#FFF7E8] px-4 text-sm font-black text-[#8D5A18] transition hover:bg-[#FFE8BD]"
              >
                {card.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 overflow-hidden rounded-[28px] border border-[#E0C897] bg-[linear-gradient(120deg,#FFE6A7_0%,#FFD466_48%,#FFEEB6_100%)] shadow-[0_20px_40px_rgba(104,75,38,0.14)]">
        <div className="p-6 md:p-10">
          <h2 className="text-2xl font-black text-[#184D52] md:text-4xl">Have Photos from Bhagwat Heritage Events?</h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-[#5E4A37] md:text-lg">
            If you attended any Bhagwat Katha, seva activity, festival, or trust event, you may share selected photos with the media team for
            review and publication.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={`${ROUTES.contact}?subject=share-photos`}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#D89B2B] px-7 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#C27F16]"
            >
              Share Photos
            </Link>
            <Link
              to={`${ROUTES.contact}?subject=media-team`}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#B87415] bg-white/70 px-7 text-sm font-black text-[#7C4D12] transition hover:bg-white hover:text-[#5F3A0C]"
            >
              Contact Media Team
            </Link>
          </div>
        </div>
      </section>

      {activePhoto ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-3 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo preview for ${activePhoto.title}`}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            aria-label="Close lightbox"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-2xl text-white transition hover:bg-white hover:text-[#3A2A1B]"
          >
            ×
          </button>

          <button
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation();
              goToPrev();
            }}
            className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white transition hover:bg-white hover:text-[#3A2A1B] md:left-5"
          >
            ‹
          </button>

          <div
            className="w-full max-w-5xl overflow-hidden rounded-[22px] border border-white/20 bg-[#16120E] shadow-[0_20px_42px_rgba(0,0,0,0.55)]"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="max-h-[70vh] overflow-hidden bg-[#0F0D0B]">
              <ImageWithFallback src={activePhoto.image} alt={`${activePhoto.title} large view`} className="h-full max-h-[70vh] w-full object-contain" />
            </div>
            <div className="space-y-2 p-4 text-white md:p-6">
              <p className="inline-flex rounded-full bg-[#D89B2B] px-3 py-1 text-xs font-black uppercase tracking-[0.1em] text-white">{activePhoto.category}</p>
              <h3 className="text-xl font-black md:text-2xl">{activePhoto.title}</h3>
              <p className="text-sm text-white/85">
                {activePhoto.dateLabel} • {activePhoto.location}
              </p>
              {activePhoto.description ? <p className="text-sm leading-6 text-white/90 md:text-base">{activePhoto.description}</p> : null}
            </div>
          </div>

          <button
            type="button"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation();
              goToNext();
            }}
            className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white transition hover:bg-white hover:text-[#3A2A1B] md:right-5"
          >
            ›
          </button>
        </div>
      ) : null}
    </div>
  );
});


