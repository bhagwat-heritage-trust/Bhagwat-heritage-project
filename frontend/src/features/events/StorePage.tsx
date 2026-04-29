import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../app/providers/CartProvider";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type StoreCategory = "Books" | "Puja Items" | "Temple Supply" | "Wellness" | "Idols" | "Accessories" | "Prasad" | "Digital Seva";
type SortType = "featured" | "price-low" | "price-high" | "newest";
type Availability = "all" | "in" | "low";

interface Product {
  id: string;
  name: string;
  category: StoreCategory;
  price: number;
  stock: number;
  image: string;
  description: string;
  featured?: boolean;
  featureCategory?: string;
  order: number;
}

const PRODUCTS: Product[] = [
  { id: "1", name: "Rudraksha", category: "Temple Supply", price: 299, stock: 16, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777471882/ChatGPT_Image_Apr_29_2026_07_38_11_PM_oxcp0x.png", description: "Sacred mala for japa, meditation, and daily mantra practice.", featured: true, featureCategory: "Guidance", order: 1 },
  { id: "2", name: "Yantra", category: "Temple Supply", price: 499, stock: 11, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777471882/ChatGPT_Image_Apr_29_2026_07_38_19_PM_gucmgc.png", description: "Devotional yantra item for puja, focus, and blessings.", featured: true, featureCategory: "Temple Supply", order: 2 },
  { id: "3", name: "Puja Samagri", category: "Puja Items", price: 199, stock: 22, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777471882/ChatGPT_Image_Apr_29_2026_07_38_28_PM_lc9tr5.png", description: "Essential puja pack for daily worship and home rituals.", featured: true, featureCategory: "Daily Use", order: 3 },
  { id: "4", name: "Bhagwat Gita Deluxe", category: "Books", price: 499, stock: 14, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777471882/ChatGPT_Image_Apr_29_2026_07_38_35_PM_nqwsdl.png", description: "Hardcover edition for daily reading and study.", order: 4 },
  { id: "5", name: "Mahabharata Set", category: "Books", price: 999, stock: 9, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777471883/ChatGPT_Image_Apr_29_2026_07_38_43_PM_nooxl2.png", description: "Multi-volume set for scripture enthusiasts.", order: 5 },
  { id: "6", name: "Krishna Idol", category: "Idols", price: 1599, stock: 4, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777471881/ChatGPT_Image_Apr_29_2026_07_38_58_PM_jmstfm.png", description: "Decorative Krishna murti for home altar.", order: 6 },
  { id: "7", name: "Ramayan Classic", category: "Books", price: 459, stock: 13, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777471881/ChatGPT_Image_Apr_29_2026_07_39_06_PM_hx0jez.png", description: "Readable spiritual edition with clear typography.", order: 7 },
  { id: "8", name: "Temple Bell Brass", category: "Puja Items", price: 799, stock: 8, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777471880/ChatGPT_Image_Apr_29_2026_07_39_17_PM_nzu1in.png", description: "Traditional brass bell with balanced tone.", order: 8 },
  { id: "9", name: "Shivling Marble", category: "Puja Items", price: 1299, stock: 5, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777471880/ChatGPT_Image_Apr_29_2026_07_39_31_PM_aeqn7e.png", description: "Hand-finished marble Shivling for mandir setup.", order: 9 },
  { id: "10", name: "Tulsi Mala", category: "Accessories", price: 249, stock: 20, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777471879/ChatGPT_Image_Apr_29_2026_07_39_38_PM_jjvmlz.png", description: "Pure Tulsi japa mala for mantra practice.", order: 10 },
  { id: "11", name: "Hanuman Idol", category: "Idols", price: 1499, stock: 7, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777471880/ChatGPT_Image_Apr_29_2026_07_39_45_PM_lsplqf.png", description: "Strong resin finish with devotional detailing.", order: 11 },
  { id: "12", name: "Vedic Chant Audio Pack", category: "Digital Seva", price: 299, stock: 15, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777471879/ChatGPT_Image_Apr_29_2026_07_39_57_PM_wimqzr.png", description: "Download audio collection for morning routine.", order: 12 },
  { id: "13", name: "Yoga Mat Premium", category: "Wellness", price: 899, stock: 10, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777471879/ChatGPT_Image_Apr_29_2026_07_40_12_PM_ewclml.png", description: "Comfort mat for yoga, pranayama, and meditation.", order: 13 },
  { id: "14", name: "Sanskrit Dictionary", category: "Books", price: 699, stock: 12, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777471878/ChatGPT_Image_Apr_29_2026_07_40_20_PM_f5jtg4.png", description: "Useful reference for Sanskrit study and chanting.", order: 14 },
  { id: "15", name: "Prasad Pack", category: "Prasad", price: 349, stock: 18, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777471878/ChatGPT_Image_Apr_29_2026_07_40_29_PM_l2s4i8.png", description: "Temple-style prasad assortment for families.", order: 15 },
];

const CATEGORIES: Array<"All" | StoreCategory> = ["All", "Books", "Puja Items", "Temple Supply", "Wellness", "Idols", "Accessories", "Prasad", "Digital Seva"];
const getStoreCloudinaryIconUrl = (localIconPath: string) => {
  if (localIconPath.startsWith("http://") || localIconPath.startsWith("https://")) {
    return localIconPath;
  }
  const iconFile = localIconPath.split("/").pop() ?? "";
  return `https://res.cloudinary.com/der8zinu8/image/upload/e-store-icons/${iconFile}`;
};

export default memo(function StorePage() {
  usePageMeta("E-Store", "Digital seva, devotional essentials, and sacred resources delivered with devotion.");

  const { items, addItem, removeItem, updateQty, count, total } = useCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"All" | StoreCategory>("All");
  const [sortBy, setSortBy] = useState<SortType>("featured");
  const [availability, setAvailability] = useState<Availability>("all");
  const [priceLimit, setPriceLimit] = useState(2000);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutNote, setCheckoutNote] = useState<string | null>(null);

  const minPrice = 100;
  const maxPrice = 2000;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = PRODUCTS.filter((product) => {
      const queryMatch = !q || product.name.toLowerCase().includes(q) || product.description.toLowerCase().includes(q) || product.category.toLowerCase().includes(q);
      const categoryMatch = category === "All" || product.category === category;
      const priceMatch = product.price <= priceLimit;
      const availabilityMatch = availability === "all" || (availability === "in" ? product.stock > 5 : product.stock <= 5);
      return queryMatch && categoryMatch && priceMatch && availabilityMatch;
    });

    return [...base].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "newest") return b.order - a.order;
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [availability, category, priceLimit, search, sortBy]);

  const featured = PRODUCTS.filter((item) => item.featured).slice(0, 3);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("featured");
    setAvailability("all");
    setPriceLimit(maxPrice);
  };

  const openCheckoutNotice = () => {
    setCheckoutNote("Checkout integration coming soon. Please contact the trust office for order assistance.");
  };

  return (
    <div className="bg-[#fdf9f1] pb-14 font-['Poppins'] text-[#2e4356]">
      <section className="mx-auto w-full max-w-[1120px] px-4 pt-0">
        <div className="relative overflow-hidden rounded-3xl border border-[#ecd8b2] shadow-[0_20px_50px_rgba(39,25,8,0.16)]">
          <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1777471883/ChatGPT_Image_Apr_29_2026_07_38_01_PM_l3hx8b.png" alt="Devotional e-store setup with puja items and sacred books" className="h-[430px] w-full object-cover md:h-[560px]" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff2dc]/18 via-[#ffd89d]/14 to-[#d8f1ff]/18" />
          <div className="absolute inset-0 flex h-full flex-col items-center justify-end gap-5 p-6 pb-8 text-center text-white md:gap-6 md:p-10 md:pb-10">
            <div className="w-full">
              <h1 className="text-4xl font-black leading-tight md:text-5xl">E-Store</h1>
              <p className="mx-auto mt-3 max-w-3xl text-base font-semibold text-[#fff3de] md:text-lg">Digital seva, devotional essentials, and sacred resources delivered with devotion.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#store-catalog" className="rounded-full bg-[#d68526] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#b86d17]">Browse Products</a>
              <button type="button" onClick={() => setCartOpen(true)} className="rounded-full border border-white/70 bg-white/10 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/20">Open Cart</button>
              <Link to={ROUTES.digital.index} className="rounded-full border border-[#f8dcae] bg-[#f8dcae] px-5 py-2.5 text-sm font-bold text-[#4c2f13] hover:bg-[#f5cf92]">Digital Services</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 pt-11 md:pt-[72px]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Store Access", "Books, puja items, digital seva, and devotional essentials in one place.", "/assets/icons/e-store/icon-store-access.svg"],
            ["Smart Shopping Flow", "Search, filter, sort, add to cart, and continue toward checkout smoothly.", "/assets/icons/e-store/icon-shopping-flow.svg"],
            ["Featured Picks", "Highlighted daily essentials, scripture resources, and trusted selections.", "/assets/icons/e-store/icon-featured-picks.svg"],
            ["User Experience", "Clean, fast, mobile-friendly browsing aligned with the website’s devotional design.", "/assets/icons/e-store/icon-user-experience.svg"],
          ].map(([title, text, icon]) => (
            <article key={title} className="rounded-[20px] border border-[#ebd9b5] bg-white p-5 shadow-[0_10px_24px_rgba(23,40,66,0.08)]">
              <img src={getStoreCloudinaryIconUrl(icon)} onError={(event) => { event.currentTarget.src = icon; }} alt={`${title} icon`} className="mx-auto h-[70px] w-[70px] rounded-full object-cover" loading="lazy" />
              <h2 className="mt-3 text-2xl font-black text-[#1f3550]">{title}</h2>
              <p className="mt-2 text-base leading-7 text-[#5e5247] md:text-lg">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 pt-11 md:pt-[72px]">
        <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#c07017]">Store Features</p>
        <h2 className="mt-2 text-3xl font-black text-[#1f3550] md:text-4xl">Simple tools for clean browsing and checkout support.</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Fast add-to-cart flow",
            "Live stock visibility per product",
            "Category and price-based filtering",
            "Cart quantity management",
            "Featured product highlights",
            "Discount-ready pricing model",
          ].map((feature) => (
            <div key={feature} className="rounded-2xl border border-[#efdfc3] bg-[#fffaf2] p-4 text-sm font-semibold text-[#6b4a22]">{feature}</div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 pt-11 md:pt-[72px]">
        <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#c07017]">Featured Products</p>
        <h2 className="mt-2 text-3xl font-black text-[#1f3550] md:text-4xl">Popular devotional items and trusted store selections.</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {featured.map((product) => (
            <article key={product.id} className="flex h-full flex-col overflow-hidden rounded-[22px] border border-[#ead8b5] bg-white shadow-[0_10px_24px_rgba(23,40,66,0.08)]">
              <img src={product.image} alt={product.name} className="h-44 w-full object-cover" loading="lazy" />
              <div className="flex flex-1 flex-col p-5">
                <span className="w-fit rounded-full bg-[#fbe9cc] px-3 py-1 text-xs font-semibold text-[#a86216]">{product.featureCategory}</span>
                <h3 className="mt-3 text-xl font-black text-[#1f3550]">{product.name}</h3>
                <p className="mt-2 text-base leading-7 text-[#5e5247] md:text-lg">{product.description}</p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-lg font-black text-[#bf6b12]">Rs {product.price}</span>
                  <button type="button" onClick={() => addItem({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image })} className="rounded-full bg-[#cb7413] px-4 py-2 text-sm font-bold text-white hover:bg-[#a95f0f]">Add</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="store-catalog" className="mx-auto w-full max-w-[1120px] px-4 pt-11 md:pt-[72px]">
        <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#c07017]">Store Catalog</p>
        <h2 className="mt-2 text-3xl font-black text-[#1f3550] md:text-4xl">Browse products by category, price, availability, and search.</h2>

        <div className="mt-5 rounded-3xl border border-[#ead8b5] bg-white p-5 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-5">
            <input aria-label="Search products" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-xl border border-[#e7d7b7] px-3 py-2.5 text-sm outline-none focus:border-[#c67718] lg:col-span-2" />
            <select aria-label="Category filter" value={category} onChange={(e) => setCategory(e.target.value as "All" | StoreCategory)} className="rounded-xl border border-[#e7d7b7] px-3 py-2.5 text-sm outline-none focus:border-[#c67718]">{CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select>
            <select aria-label="Sort products" value={sortBy} onChange={(e) => setSortBy(e.target.value as SortType)} className="rounded-xl border border-[#e7d7b7] px-3 py-2.5 text-sm outline-none focus:border-[#c67718]"><option value="featured">Featured first</option><option value="price-low">Price low to high</option><option value="price-high">Price high to low</option><option value="newest">Newest</option></select>
            <select aria-label="Availability filter" value={availability} onChange={(e) => setAvailability(e.target.value as Availability)} className="rounded-xl border border-[#e7d7b7] px-3 py-2.5 text-sm outline-none focus:border-[#c67718]"><option value="all">All</option><option value="in">In stock</option><option value="low">Low stock</option></select>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#5c6b78]"><span>Price up to Rs {priceLimit}</span><span>{filtered.length} products</span></div>
            <input aria-label="Price range" type="range" min={minPrice} max={maxPrice} step={50} value={priceLimit} onChange={(e) => setPriceLimit(Number(e.target.value))} className="mt-2 w-full accent-[#cb7413]" />
          </div>
          <button type="button" onClick={clearFilters} className="mt-4 rounded-full border border-[#d7c39b] px-4 py-2 text-xs font-semibold text-[#6a4a22] hover:bg-[#fff7ea]">Clear Filters</button>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((product) => {
            const isLow = product.stock <= 5;
            return (
              <article key={product.id} className="flex h-full flex-col overflow-hidden rounded-[22px] border border-[#ead8b5] bg-white shadow-[0_10px_24px_rgba(23,40,66,0.08)]">
                <img src={product.image} alt={product.name} className="h-44 w-full object-cover" loading="lazy" />
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#fbe9cc] px-2.5 py-1 text-[11px] font-semibold text-[#a86216]">{product.category}</span>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${isLow ? "bg-[#fff0ee] text-[#b42318]" : "bg-[#edf9f1] text-[#1d7f44]"}`}>{isLow ? "Low Stock" : "In Stock"}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-[#1f3550]">{product.name}</h3>
                  <p className="mt-2 text-base leading-7 text-[#5e5247] md:text-lg">{product.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-lg font-black text-[#bf6b12]">Rs {product.price}</span>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => addItem({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image })} className="rounded-full bg-[#cb7413] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#a95f0f]">Add to Cart</button>
                      <button type="button" className="rounded-full border border-[#d9c7a5] px-3.5 py-2 text-xs font-semibold text-[#5c4a35]">View Details</button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 pt-11 md:pt-[72px]">
        <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#c07017]">Digital Seva Services</p>
        <h2 className="mt-2 text-3xl font-black text-[#1f3550] md:text-4xl">Online devotional services and digital support for devotees.</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Online Puja Booking", "Request puja support and receive confirmation from the seva team.", "/assets/icons/e-store/icon-online-puja.svg"],
            ["Bhagwat Katha Booking Inquiry", "Submit an inquiry for spiritual events, katha, or satsang guidance.", "/assets/icons/e-store/icon-katha-booking.svg"],
            ["Digital Donation Receipt", "Receive proper confirmation and record for your seva contribution.", "/assets/icons/e-store/icon-digital-receipt.svg"],
            ["Spiritual Resource Access", "Access selected digital learning, audio, and study materials.", "/assets/icons/e-store/icon-resource-access.svg"],
          ].map(([title, text, icon]) => (
            <article key={title} className="rounded-[20px] border border-[#ead8b5] bg-white p-5 shadow-sm">
              <img src={getStoreCloudinaryIconUrl(icon)} onError={(event) => { event.currentTarget.src = icon; }} alt={`${title} icon`} className="mx-auto h-[70px] w-[70px] rounded-full object-cover" loading="lazy" />
              <h3 className="mt-3 text-2xl font-black text-[#1f3550]">{title}</h3>
              <p className="mt-2 text-base leading-7 text-[#5e5247] md:text-lg">{text}</p>
            </article>
          ))}
        </div>
        <Link to={ROUTES.digital.index} className="mt-5 inline-flex rounded-full bg-[#cb7413] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#a95f0f]">Explore Digital Services</Link>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 pt-11 md:pt-[72px]">
        <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#c07017]">Trust, Delivery & Support</p>
        <h2 className="mt-2 text-3xl font-black text-[#1f3550] md:text-4xl">Trust, Delivery & Support</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Authentic Selection", "Products are selected with devotional purpose and spiritual relevance.", "/assets/icons/e-store/icon-authentic-selection.svg"],
            ["Secure Order Flow", "Cart and checkout structure should be prepared for future secure payment integration.", "/assets/icons/e-store/icon-secure-order.svg"],
            ["Seva-Supported Purchase", "Your purchase helps support spiritual, cultural, and service initiatives.", "/assets/icons/e-store/icon-seva-purchase.svg"],
            ["Support Assistance", "For order help, devotees can contact the Bhagwat Heritage support team.", "/assets/icons/e-store/icon-support-help.svg"],
          ].map(([title, text, icon]) => (
            <article key={title} className="rounded-[20px] border border-[#ead8b5] bg-white p-5 shadow-sm">
              <img src={getStoreCloudinaryIconUrl(icon)} onError={(event) => { event.currentTarget.src = icon; }} alt={`${title} icon`} className="mx-auto h-[70px] w-[70px] rounded-full object-cover" loading="lazy" />
              <h3 className="mt-3 text-2xl font-black text-[#1f3550]">{title}</h3>
              <p className="mt-2 text-base leading-7 text-[#5e5247] md:text-lg">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 pt-11 md:pt-[72px]">
        <h2 className="text-3xl font-black text-[#1f3550]">Store FAQs</h2>
        <div className="mt-4 space-y-3">
          {[
            ["Are all products available for delivery?", "Availability may depend on stock and location. The team can confirm before dispatch."],
            ["Can I order puja items and books together?", "Yes, products can be added together in the same cart."],
            ["Is online payment active?", "If payment integration is not enabled, show contact-based order support."],
            ["Can digital seva services be booked from this page?", "Yes, digital seva inquiry cards can direct users to the appropriate service form."],
            ["Who should I contact for order support?", "Contact the Bhagwat Heritage Service Foundation Trust through the contact details provided on the website."],
          ].map(([q, a]) => (
            <details key={q} className="rounded-2xl border border-[#ead8b5] bg-white p-4">
              <summary className="cursor-pointer text-base font-black text-[#1f3550]">{q}</summary>
              <p className="mt-2 text-base leading-7 text-[#5e5247] md:text-lg">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 pt-11 md:pt-[72px]">
        <div className="relative overflow-hidden rounded-3xl border border-[#f1cd6d] bg-gradient-to-r from-[#f8cf5a] via-[#f6dc87] to-[#f1b83e] p-8 text-[#12394c] shadow-[0_24px_50px_rgba(162,109,20,0.22)] md:p-10">
          <h2 className="text-3xl font-black">Support Dharma Seva through every purchase</h2>
          <p className="mt-2 max-w-3xl text-base leading-7 text-[#4f3a16] md:text-lg">Choose devotional resources, puja essentials, and digital seva services with trust, simplicity, and spiritual purpose.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="#store-catalog" className="rounded-full bg-[#d78728] px-5 py-2.5 text-sm font-bold text-white">Browse Products</a>
            <Link to={ROUTES.involved.contactUs} className="rounded-full border border-[#12394c]/25 bg-white/60 px-5 py-2.5 text-sm font-bold text-[#12394c]">Contact Support</Link>
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-[#cb7413] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(30,30,30,0.28)] hover:bg-[#a95f0f]"
        aria-label="Open cart"
      >
        Cart ({count})
      </button>

      {cartOpen ? (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/35" onClick={() => setCartOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-[#e7d7b7] bg-[#fffaf2] p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-[#1f3550]">Your Cart ({count})</h3>
              <button type="button" onClick={() => setCartOpen(false)} className="rounded-lg border border-[#dcc7a4] px-3 py-1.5 text-sm font-semibold text-[#5c4a35]">Close</button>
            </div>

            {items.length === 0 ? (
              <p className="mt-8 text-sm leading-6 text-[#5b6874]">Your cart is empty. Browse devotional products and add items for seva-supported purchase.</p>
            ) : (
              <>
                <div className="mt-4 space-y-3">
                  {items.map((item) => (
                    <article key={item.id} className="rounded-2xl border border-[#ead8b5] bg-white p-3">
                      <div className="flex gap-3">
                        <img src={item.image || "/assets/images/e-store/product-rudraksha.jpg"} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="font-bold text-[#1f3550]">{item.name}</p>
                          <p className="text-sm text-[#5b6874]">Rs {item.price}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button type="button" onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))} className="h-7 w-7 rounded-md border border-[#dcc7a4]">-</button>
                              <span className="w-4 text-center text-sm font-semibold">{item.quantity}</span>
                              <button type="button" onClick={() => updateQty(item.id, item.quantity + 1)} className="h-7 w-7 rounded-md border border-[#dcc7a4]">+</button>
                            </div>
                            <button type="button" onClick={() => removeItem(item.id)} className="text-xs font-semibold text-[#b42318]">Remove</button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-[#ead8b5] bg-white p-4">
                  <div className="flex items-center justify-between text-sm"><span className="text-[#5b6874]">Subtotal</span><span className="font-bold text-[#1f3550]">Rs {total}</span></div>
                </div>

                {checkoutNote ? <p className="mt-3 rounded-xl border border-[#f4d7af] bg-[#fff2dd] p-3 text-xs font-semibold text-[#8a5419]">{checkoutNote}</p> : null}

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setCartOpen(false)} className="rounded-full border border-[#dcc7a4] py-2.5 text-sm font-semibold text-[#5c4a35]">Continue Shopping</button>
                  <button type="button" onClick={openCheckoutNotice} className="rounded-full bg-[#cb7413] py-2.5 text-sm font-bold text-white hover:bg-[#a95f0f]">Proceed to Checkout</button>
                </div>
              </>
            )}
          </aside>
        </div>
      ) : null}
    </div>
  );
});



















