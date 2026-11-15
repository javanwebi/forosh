import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard, Package, ShoppingBag, Users, BarChart3, Settings, Search,
  Bell, Plus, ArrowUpRight, TrendingUp, Wallet, Receipt, MoreHorizontal,
  ChevronDown, Menu, X, Shirt, ShoppingBasket, Coffee, Scissors, Smartphone,
  Wrench, SlidersHorizontal, CalendarDays, Sparkles, Check, Filter, Download,
  Eye, Clock3, AlertTriangle, CircleDollarSign, Boxes, ArrowDownLeft, ArrowUpLeft,
  Store, CreditCard, UserRound, FileText, Trash2, Pencil, CheckCircle2,
  PackagePlus, ScanBarcode, ClipboardList, CalendarCheck, Tag, Palette,
  LayoutGrid, ChevronLeft, ChevronRight, LifeBuoy, ShieldCheck, ShoppingCart,
  Truck, ChartNoAxesCombined
} from "lucide-react";

const TYPES = [
  { id: "fashion", label: "پوشاک و بوتیک", hint: "سایز، رنگ و برند", icon: Shirt, itemLabel: "محصول", unit: "عدد" },
  { id: "grocery", label: "سوپرمارکت", hint: "بارکد و تاریخ انقضا", icon: ShoppingBasket, itemLabel: "کالا", unit: "عدد" },
  { id: "cafe", label: "کافه و رستوران", hint: "منو و سفارش‌ها", icon: Coffee, itemLabel: "آیتم منو", unit: "عدد" },
  { id: "beauty", label: "سالن زیبایی", hint: "خدمات و نوبت‌دهی", icon: Scissors, itemLabel: "خدمت", unit: "نوبت" },
  { id: "mobile", label: "موبایل و دیجیتال", hint: "مدل، گارانتی و سریال", icon: Smartphone, itemLabel: "کالا", unit: "عدد" },
  { id: "tools", label: "ابزار و یراق", hint: "مشخصات فنی و موجودی", icon: Wrench, itemLabel: "قطعه", unit: "عدد" },
];

const DEMO_PRODUCTS = {
  fashion: [
    { id: 1, name: "کت فوتر زنانه مدل آوا", code: "BT-2048", category: "پالتو و کت", price: 2480000, stock: 12, status: "موجود", image: "https://images.unsplash.com/photo-1548624149-f2a6b6d6c7d7?w=500&q=85", detail: "مشکی · سایز ۳۸ تا ۴۴" },
    { id: 2, name: "مانتو لینن تابستانی", code: "MN-1021", category: "مانتو", price: 1890000, stock: 7, status: "موجود", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=85", detail: "کرم · سایز ۳۶ تا ۴۲" },
    { id: 3, name: "شومیز ساتن یقه‌دار", code: "SH-3086", category: "شومیز", price: 1260000, stock: 3, status: "رو به اتمام", image: "https://images.unsplash.com/photo-1564257577-7a6f2f4b5f7b?w=500&q=85", detail: "سفید · سایز فری" },
    { id: 4, name: "شلوار پارچه‌ای راسته", code: "TR-4020", category: "شلوار", price: 1580000, stock: 0, status: "ناموجود", image: "https://images.unsplash.com/photo-1506629905607-d9a2d7b0f4b4?w=500&q=85", detail: "ذغالی · سایز ۳۸ تا ۴۴" },
  ],
  grocery: [
    { id: 1, name: "روغن آفتابگردان ۱.۵ لیتری", code: "GR-1008", category: "روغن", price: 148000, stock: 28, status: "موجود", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=85", detail: "تاریخ انقضا: ۱۴۰۵/۰۹" },
    { id: 2, name: "قهوه آسیاب‌شده ۲۵۰ گرم", code: "GR-2081", category: "نوشیدنی", price: 315000, stock: 5, status: "رو به اتمام", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&q=85", detail: "تاریخ انقضا: ۱۴۰۶/۰۲" },
    { id: 3, name: "عسل طبیعی ۵۰۰ گرم", code: "GR-3012", category: "صبحانه", price: 285000, stock: 16, status: "موجود", image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=500&q=85", detail: "تاریخ انقضا: ۱۴۰۶/۰۶" },
  ],
  cafe: [
    { id: 1, name: "لاته کاراملی", code: "CF-001", category: "قهوه گرم", price: 145000, stock: 99, status: "فعال", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=85", detail: "شیر، اسپرسو، سیروپ کارامل" },
    { id: 2, name: "آیس آمریکانو", code: "CF-014", category: "قهوه سرد", price: 118000, stock: 99, status: "فعال", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&q=85", detail: "دبل اسپرسو، یخ، آب" },
    { id: 3, name: "کیک شکلاتی", code: "DS-021", category: "دسر", price: 165000, stock: 4, status: "رو به اتمام", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=85", detail: "برش ۱۲۰ گرمی" },
  ],
  beauty: [
    { id: 1, name: "کوتاهی و براشینگ", code: "SV-001", category: "مو", price: 420000, stock: 99, status: "فعال", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&q=85", detail: "مدت زمان: ۶۰ دقیقه" },
    { id: 2, name: "رنگ و مش", code: "SV-014", category: "مو", price: 1850000, stock: 99, status: "فعال", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=85", detail: "مدت زمان: ۱۸۰ دقیقه" },
    { id: 3, name: "مانیکور", code: "SV-021", category: "ناخن", price: 380000, stock: 99, status: "فعال", image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500&q=85", detail: "مدت زمان: ۴۵ دقیقه" },
  ],
  mobile: [
    { id: 1, name: "هدفون بی‌سیم Air Pro", code: "MB-1001", category: "صوتی", price: 2850000, stock: 8, status: "موجود", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=85", detail: "گارانتی ۱۸ ماهه" },
    { id: 2, name: "ساعت هوشمند مدل S8", code: "MB-2032", category: "گجت", price: 1980000, stock: 2, status: "رو به اتمام", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=85", detail: "گارانتی ۱۲ ماهه" },
    { id: 3, name: "اسپیکر بلوتوثی", code: "MB-3040", category: "صوتی", price: 1650000, stock: 11, status: "موجود", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=85", detail: "سریال ثبت‌شده" },
  ],
  tools: [
    { id: 1, name: "دریل شارژی ۲۰ ولت", code: "TL-1001", category: "ابزار برقی", price: 4850000, stock: 6, status: "موجود", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=85", detail: "گشتاور ۴۵ نیوتن‌متر" },
    { id: 2, name: "مجموعه آچار یکسر تخت", code: "TL-2032", category: "ابزار دستی", price: 890000, stock: 3, status: "رو به اتمام", image: "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&q=85", detail: "۱۲ عددی" },
    { id: 3, name: "متر ۵ متری", code: "TL-3040", category: "اندازه‌گیری", price: 185000, stock: 19, status: "موجود", image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&q=85", detail: "بدنه ضدضربه" },
  ],
};

const INITIAL_ORDERS = [
  { id: "INV-2048", customer: "نگار محمدی", date: "امروز، ۱۰:۴۲", amount: 4280000, status: "پرداخت‌شده", method: "کارت‌خوان" },
  { id: "INV-2047", customer: "سارا کریمی", date: "امروز، ۱۰:۱۸", amount: 1890000, status: "پرداخت‌شده", method: "آنلاین" },
  { id: "INV-2046", customer: "مریم رضایی", date: "امروز، ۰۹:۵۳", amount: 1260000, status: "در انتظار", method: "نقدی" },
  { id: "INV-2045", customer: "الهام احمدی", date: "دیروز، ۱۹:۲۱", amount: 3150000, status: "پرداخت‌شده", method: "کارت‌خوان" },
];

const CUSTOMERS = [
  { name: "نگار محمدی", phone: "۰۹۱۲ ۳۴۵ ۶۷۸۹", purchases: 12, spent: 18450000, tag: "وفادار" },
  { name: "سارا کریمی", phone: "۰۹۳۵ ۱۲۳ ۴۵۶۷", purchases: 8, spent: 12700000, tag: "فعال" },
  { name: "مریم رضایی", phone: "۰۹۱۰ ۷۶۵ ۴۳۲۱", purchases: 5, spent: 6890000, tag: "جدید" },
  { name: "الهام احمدی", phone: "۰۹۹۰ ۲۲۲ ۱۱۰۰", purchases: 17, spent: 25400000, tag: "ویژه" },
];

const THEME_OPTIONS = [
  { id: "indigo", label: "بنفش", color: "#6268e8" },
  { id: "green", label: "سبز", color: "#159b78" },
  { id: "orange", label: "نارنجی", color: "#e57a36" },
  { id: "rose", label: "رز", color: "#d85d83" },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "نمای کلی", icon: LayoutDashboard },
  { id: "products", label: "کالاها و خدمات", icon: Package },
  { id: "sales", label: "فروش و فاکتورها", icon: ShoppingBag },
  { id: "customers", label: "مشتریان", icon: Users },
  { id: "reports", label: "گزارش‌ها", icon: BarChart3 },
  { id: "settings", label: "تنظیمات", icon: Settings },
];

const MONEY = (amount) => new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
const NUMBER = (amount) => new Intl.NumberFormat("fa-IR").format(amount);

function RevenueChart({ compact = false }) {
  return (
    <div className={"chart-wrap" + (compact ? " chart-compact" : "")}>
      <div className="chart-y-labels"><span>۸۰ م</span><span>۶۰ م</span><span>۴۰ م</span><span>۲۰ م</span><span>۰</span></div>
      <svg className="revenue-chart" viewBox="0 0 620 220" preserveAspectRatio="none" role="img" aria-label="نمودار فروش هفتگی">
        <defs>
          <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity=".22" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[25, 65, 105, 145, 185].map((y) => <line key={y} x1="0" y1={y} x2="620" y2={y} className="chart-gridline" />)}
        <path d="M0 166 C35 158 45 145 78 152 S126 166 158 132 S210 112 238 125 S285 92 316 106 S362 126 395 80 S445 94 475 68 S525 91 550 54 S590 64 620 38 L620 205 L0 205 Z" fill="url(#chartFill)" />
        <path d="M0 166 C35 158 45 145 78 152 S126 166 158 132 S210 112 238 125 S285 92 316 106 S362 126 395 80 S445 94 475 68 S525 91 550 54 S590 64 620 38" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="395" cy="80" r="6" fill="var(--accent)" stroke="white" strokeWidth="4" />
      </svg>
      <div className="chart-x-labels"><span>شنبه</span><span>یکشنبه</span><span>دوشنبه</span><span>سه‌شنبه</span><span>چهارشنبه</span><span>پنجشنبه</span><span>جمعه</span></div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, tone = "purple", foot }) {
  return (
    <div className="stat-card">
      <div className={"stat-icon " + tone}><Icon size={19} /></div>
      <div className="stat-copy">
        <span className="muted small">{label}</span>
        <strong>{value}</strong>
        <span className="stat-foot"><span className="positive"><ArrowUpRight size={13} /> {change}</span><span className="muted">{foot || "نسبت به هفته قبل"}</span></span>
      </div>
    </div>
  );
}

function StatusPill({ children, tone = "green" }) {
  return <span className={"status-pill " + tone}><i />{children}</span>;
}

function App() {
  const [businessType, setBusinessType] = useState(() => localStorage.getItem("forosh.business") || "fashion");
  const [shopName, setShopName] = useState(() => localStorage.getItem("forosh.shopName") || "بوتیک شاپ");
  const [theme, setTheme] = useState(() => localStorage.getItem("forosh.theme") || "indigo");
  const [activePage, setActivePage] = useState("dashboard");
  const [modal, setModal] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [products, setProducts] = useState(() => {
    try { return JSON.parse(localStorage.getItem("forosh.products")) || DEMO_PRODUCTS[localStorage.getItem("forosh.business") || "fashion"]; }
    catch { return DEMO_PRODUCTS.fashion; }
  });
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [modules, setModules] = useState(() => {
    try { return JSON.parse(localStorage.getItem("forosh.modules")) || { products: true, sales: true, customers: true, reports: true }; }
    catch { return { products: true, sales: true, customers: true, reports: true }; }
  });

  const currentType = TYPES.find((item) => item.id === businessType) || TYPES[0];
  const accent = THEME_OPTIONS.find((item) => item.id === theme)?.color || THEME_OPTIONS[0].color;
  const visibleNav = NAV_ITEMS.filter((item) => item.id === "dashboard" || item.id === "settings" || modules[item.id] !== false);

  useEffect(() => { localStorage.setItem("forosh.business", businessType); }, [businessType]);
  useEffect(() => { localStorage.setItem("forosh.shopName", shopName); }, [shopName]);
  useEffect(() => { localStorage.setItem("forosh.theme", theme); }, [theme]);
  useEffect(() => { localStorage.setItem("forosh.products", JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem("forosh.modules", JSON.stringify(modules)); }, [modules]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const notify = (message) => setToast(message);
  const chooseBusiness = (id) => {
    setBusinessType(id);
    setProducts(DEMO_PRODUCTS[id] || DEMO_PRODUCTS.fashion);
    setActivePage("dashboard");
    setModal("");
    notify("فضای کاری شما به‌روزرسانی شد");
  };

  const addProduct = (product) => {
    setProducts((items) => [{ ...product, id: Date.now(), status: product.stock > 0 ? "موجود" : "ناموجود" }, ...items]);
    setModal("");
    notify("مورد جدید با موفقیت اضافه شد");
  };

  const addSale = () => {
    const id = "INV-" + (2050 + orders.length);
    setOrders((items) => [{ id, customer: "مشتری حضوری", date: "همین الان", amount: 980000, status: "پرداخت‌شده", method: "کارت‌خوان" }, ...items]);
    notify("فاکتور آزمایشی ثبت شد");
  };

  const pageTitle = activePage === "dashboard" ? "نمای کلی" :
    activePage === "products" ? (currentType.id === "beauty" ? "خدمات و تعرفه‌ها" : "کالاها و موجودی") :
    activePage === "sales" ? (currentType.id === "beauty" ? "نوبت‌ها و پرداخت‌ها" : "فروش و فاکتورها") :
    activePage === "customers" ? "مشتریان" : activePage === "reports" ? "گزارش‌های کسب‌وکار" : "شخصی‌سازی فضای کاری";

  return (
    <div className="app-shell" style={{ "--accent": accent }}>
      <aside className={"sidebar" + (mobileMenu ? " sidebar-open" : "")}>
        <div className="brand-row">
          <div className="brand-mark"><Store size={22} strokeWidth={2.4} /></div>
          <div><strong>فروش‌یار</strong><span>مدیریت هوشمند کسب‌وکار</span></div>
          <button className="icon-button close-sidebar" onClick={() => setMobileMenu(false)} aria-label="بستن منو"><X size={18} /></button>
        </div>

        <button className="shop-switcher" onClick={() => setModal("business")}>
          <div className="shop-avatar"><currentType.icon size={19} /></div>
          <div className="shop-switcher-copy"><strong>{shopName}</strong><span>{currentType.label}</span></div>
          <ChevronDown size={16} />
        </button>

        <div className="nav-caption">فضای کاری</div>
        <nav className="main-nav">
          {visibleNav.map((item) => {
            const Icon = item.icon;
            const label = item.id === "products" ? (currentType.id === "beauty" ? "خدمات و تعرفه‌ها" : "کالاها و موجودی") :
              item.id === "sales" ? (currentType.id === "beauty" ? "نوبت‌ها" : "فروش و فاکتورها") : item.label;
            return (
              <button key={item.id} className={"nav-link" + (activePage === item.id ? " active" : "")} onClick={() => { setActivePage(item.id); setMobileMenu(false); }}>
                <Icon size={19} /><span>{label}</span>{item.id === "sales" && <b className="nav-count">۴</b>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-promo">
          <div className="promo-spark"><Sparkles size={17} /></div>
          <strong>فروش بیشتر، مدیریت ساده‌تر</strong>
          <p>فضای کاری‌ات را مطابق روش خودت بچین.</p>
          <button onClick={() => setModal("customize")}>شخصی‌سازی برنامه <ArrowLeftIcon /></button>
        </div>

        <div className="sidebar-bottom">
          <button className="help-link" onClick={() => notify("مرکز راهنما به‌زودی فعال می‌شود")}><LifeBuoy size={17} /> راهنما و پشتیبانی</button>
          <div className="profile-row">
            <div className="profile-avatar">م</div>
            <div><strong>مدیر فروشگاه</strong><span>حساب آزمایشی</span></div>
            <MoreHorizontal size={19} />
          </div>
        </div>
      </aside>

      {mobileMenu && <button className="sidebar-scrim" onClick={() => setMobileMenu(false)} aria-label="بستن منو" />}

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-right">
            <button className="icon-button mobile-menu-button" onClick={() => setMobileMenu(true)} aria-label="باز کردن منو"><Menu size={20} /></button>
            <div className="breadcrumb"><span>فضای کاری</span><ChevronLeft size={14} /><strong>{pageTitle}</strong></div>
          </div>
          <div className="topbar-left">
            <label className="top-search"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جستجو در برنامه..." /><kbd>⌘ K</kbd></label>
            <button className="icon-button notification-button" onClick={() => notify("فعلاً اعلان جدیدی ندارید")} aria-label="اعلان‌ها"><Bell size={19} /><i /></button>
            <button className="top-profile" onClick={() => setModal("customize")}><span className="profile-avatar">م</span><span>مدیر</span><ChevronDown size={14} /></button>
          </div>
        </header>

        <div className="page-content">
          {activePage === "dashboard" && <Dashboard shopName={shopName} currentType={currentType} products={products} orders={orders} onAddSale={addSale} onNavigate={setActivePage} onCustomize={() => setModal("customize")} />}
          {activePage === "products" && <ProductsPage products={products} query={query} currentType={currentType} onAdd={() => setModal("product")} onDelete={(id) => { setProducts((items) => items.filter((item) => item.id !== id)); notify("مورد از فهرست حذف شد"); }} />}
          {activePage === "sales" && <SalesPage orders={orders} onAdd={addSale} />}
          {activePage === "customers" && <CustomersPage />}
          {activePage === "reports" && <ReportsPage />}
          {activePage === "settings" && <SettingsPage shopName={shopName} setShopName={setShopName} theme={theme} setTheme={setTheme} modules={modules} setModules={setModules} currentType={currentType} onChooseBusiness={() => setModal("business")} />}
        </div>

        <nav className="mobile-bottom-nav">
          {visibleNav.filter((item) => ["dashboard", "products", "sales", "customers", "settings"].includes(item.id)).map((item) => {
            const Icon = item.icon;
            return <button key={item.id} className={activePage === item.id ? "active" : ""} onClick={() => setActivePage(item.id)}><Icon size={20} /><span>{item.id === "dashboard" ? "خانه" : item.id === "products" ? "کالاها" : item.id === "sales" ? "فروش" : item.id === "customers" ? "مشتریان" : "تنظیمات"}</span></button>;
          })}
        </nav>
      </main>

      {modal === "business" && <BusinessModal selected={businessType} onClose={() => setModal("")} onChoose={chooseBusiness} />}
      {modal === "customize" && <CustomizeModal shopName={shopName} setShopName={setShopName} theme={theme} setTheme={setTheme} modules={modules} setModules={setModules} onClose={() => setModal("")} onBusiness={() => setModal("business")} notify={notify} />}
      {modal === "product" && <AddProductModal currentType={currentType} onClose={() => setModal("")} onSave={addProduct} />}
      {toast && <div className="toast"><CheckCircle2 size={18} />{toast}</div>}
    </div>
  );
}

function ArrowLeftIcon() {
  return <ArrowUpRight size={15} />;
}

function Dashboard({ shopName, currentType, products, orders, onAddSale, onNavigate, onCustomize }) {
  const lowStock = products.filter((item) => item.stock > 0 && item.stock <= 5).length;
  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div><div className="eyebrow"><span className="live-dot" /> فضای کاری فعال</div><h1>سلام، روزت بخیر 👋</h1><p>اینجا همه چیز برای مدیریت <strong>{shopName}</strong> آماده است.</p></div>
        <div className="heading-actions"><button className="button button-outline" onClick={onCustomize}><SlidersHorizontal size={17} /> شخصی‌سازی</button><button className="button button-primary" onClick={onAddSale}><Plus size={18} /> ثبت فروش جدید</button></div>
      </div>

      <div className="business-context">
        <div className="context-icon"><currentType.icon size={20} /></div>
        <div><strong>داشبورد ویژه {currentType.label}</strong><span>چیدمان و امکانات بر اساس نوع کسب‌وکار شما تنظیم شده است.</span></div>
        <button onClick={onCustomize}>ویرایش فضای کاری <ChevronLeft size={15} /></button>
      </div>

      <section className="stats-grid">
        <StatCard icon={Wallet} label="فروش امروز" value="۱۲,۸۴۰,۰۰۰" change="۱۲.۸٪" tone="purple" foot="تومان" />
        <StatCard icon={Receipt} label="فاکتورهای امروز" value="۲۴ فاکتور" change="۸.۲٪" tone="green" />
        <StatCard icon={Users} label="مشتریان جدید" value="۱۸ نفر" change="۴.۶٪" tone="blue" />
        <StatCard icon={Boxes} label="موجودی رو به اتمام" value={NUMBER(lowStock || 3) + " مورد"} change="نیاز به بررسی" tone="orange" foot="در انبار" />
      </section>

      <section className="dashboard-main-grid">
        <div className="panel revenue-panel">
          <div className="panel-heading">
            <div><h2>روند فروش</h2><p>مقایسه عملکرد فروش در هفته جاری</p></div>
            <button className="select-lite">۷ روز گذشته <ChevronDown size={14} /></button>
          </div>
          <div className="revenue-total"><strong>۸۶,۴۵۰,۰۰۰ <small>تومان</small></strong><span className="positive"><TrendingUp size={15} /> ۱۸.۶٪ <em>رشد نسبت به هفته قبل</em></span></div>
          <RevenueChart />
        </div>
        <div className="panel target-panel">
          <div className="panel-heading"><div><h2>هدف فروش ماهانه</h2><p>عملکرد شما تا امروز</p></div><MoreHorizontal size={20} /></div>
          <div className="target-visual">
            <div className="target-ring"><div><strong>۷۲٪</strong><span>از هدف</span></div></div>
          </div>
          <div className="target-numbers"><div><span>فروش فعلی</span><strong>۲۱۶ میلیون</strong></div><div><span>هدف ماهانه</span><strong>۳۰۰ میلیون</strong></div></div>
          <div className="target-note"><Sparkles size={15} /> با همین روند، به هدف ماهانه نزدیک می‌شوید.</div>
        </div>
      </section>

      <section className="dashboard-lower-grid">
        <div className="panel orders-panel">
          <div className="panel-heading"><div><h2>آخرین فروش‌ها</h2><p>آخرین تراکنش‌های ثبت‌شده در فروشگاه</p></div><button className="text-button" onClick={() => onNavigate("sales")}>مشاهده همه <ChevronLeft size={15} /></button></div>
          <div className="table-scroll">
            <table className="data-table">
              <thead><tr><th>شماره فاکتور</th><th>مشتری</th><th>زمان</th><th>مبلغ</th><th>وضعیت</th><th /></tr></thead>
              <tbody>{orders.slice(0, 4).map((order) => <tr key={order.id}><td><strong className="invoice-code">{order.id}</strong></td><td>{order.customer}</td><td className="muted">{order.date}</td><td><strong>{MONEY(order.amount)}</strong></td><td><StatusPill tone={order.status === "پرداخت‌شده" ? "green" : "orange"}>{order.status}</StatusPill></td><td><button className="row-more" aria-label="بیشتر"><MoreHorizontal size={18} /></button></td></tr>)}</tbody>
            </table>
          </div>
        </div>
        <div className="panel quick-panel">
          <div className="panel-heading"><div><h2>دسترسی سریع</h2><p>کارهای پرتکرار روزانه</p></div></div>
          <div className="quick-actions">
            <button onClick={onAddSale}><span className="quick-icon violet"><Receipt size={18} /></span><span><strong>ثبت فاکتور</strong><small>فروش جدید را ثبت کن</small></span><ChevronLeft size={16} /></button>
            <button onClick={() => onNavigate("products")}><span className="quick-icon green"><PackagePlus size={18} /></span><span><strong>افزودن کالا</strong><small>مدیریت موجودی</small></span><ChevronLeft size={16} /></button>
            <button onClick={() => onNavigate("customers")}><span className="quick-icon blue"><UserRound size={18} /></span><span><strong>ثبت مشتری</strong><small>ساخت پرونده مشتری</small></span><ChevronLeft size={16} /></button>
            <button onClick={() => onNavigate("reports")}><span className="quick-icon amber"><BarChart3 size={18} /></span><span><strong>گزارش فروش</strong><small>بررسی عملکرد</small></span><ChevronLeft size={16} /></button>
          </div>
        </div>
      </section>

      <section className="panel bestsellers-panel">
        <div className="panel-heading"><div><h2>{currentType.id === "beauty" ? "خدمات پربازدید" : "محصولات پرفروش"}</h2><p>مواردی که بیشترین فروش را داشته‌اند</p></div><button className="text-button" onClick={() => onNavigate("products")}>مدیریت فهرست <ChevronLeft size={15} /></button></div>
        <div className="bestseller-list">{products.slice(0, 3).map((product, index) => <div className="bestseller-item" key={product.id}><div className="bestseller-image">{product.image ? <img src={product.image} alt={product.name} /> : <Package size={22} />}</div><div className="bestseller-copy"><strong>{product.name}</strong><span>{product.category} · کد {product.code}</span></div><div className="bestseller-rank"><span>#{NUMBER(index + 1)}</span><small>پرفروش</small></div><strong className="bestseller-price">{MONEY(product.price)}</strong></div>)}</div>
      </section>

      <div className="footer-note"><ShieldCheck size={15} /> این نسخه با داده‌های نمایشی کار می‌کند؛ اطلاعات واقعی پس از اتصال پایگاه داده ذخیره خواهد شد.</div>
    </div>
  );
}

function ProductsPage({ products, query, currentType, onAdd, onDelete }) {
  const filtered = useMemo(() => products.filter((item) => (item.name + item.code + item.category).toLowerCase().includes(query.toLowerCase())), [products, query]);
  return (
    <div className="subpage">
      <div className="page-heading"><div><div className="eyebrow">مدیریت موجودی</div><h1>{currentType.id === "beauty" ? "خدمات و تعرفه‌ها" : "کالاها و موجودی"}</h1><p>فهرست خودت را مدیریت کن و وضعیت موجودی را همیشه زیر نظر داشته باش.</p></div><button className="button button-primary" onClick={onAdd}><Plus size={18} /> افزودن {currentType.itemLabel}</button></div>
      <div className="stats-grid compact-stats"><StatCard icon={Package} label="تعداد کل موارد" value={NUMBER(products.length + 124)} change="۶.۴٪" tone="purple" /><StatCard icon={CheckCircle2} label="موارد فعال" value={NUMBER(products.filter((p) => p.stock > 0).length + 112)} change="۳.۱٪" tone="green" /><StatCard icon={AlertTriangle} label="نیازمند بررسی" value={NUMBER(products.filter((p) => p.stock <= 5).length)} change="بررسی موجودی" tone="orange" /></div>
      <div className="panel product-list-panel">
        <div className="panel-heading"><div><h2>فهرست {currentType.itemLabel}ها</h2><p>{NUMBER(filtered.length)} مورد در این فهرست</p></div><div className="list-actions"><label className="inline-search"><Search size={16} /><input value={query} readOnly placeholder="جستجو..." /></label><button className="button button-outline small-button"><Filter size={16} /> فیلتر</button><button className="button button-outline small-button"><Download size={16} /> خروجی</button></div></div>
        <div className="table-scroll"><table className="data-table product-table"><thead><tr><th>نام مورد</th><th>کد / شناسه</th><th>دسته‌بندی</th><th>قیمت</th><th>موجودی</th><th>وضعیت</th><th>عملیات</th></tr></thead><tbody>{filtered.map((product) => <tr key={product.id}><td><div className="product-cell"><img src={product.image} alt="" /><div><strong>{product.name}</strong><span>{product.detail}</span></div></div></td><td className="muted">{product.code}</td><td>{product.category}</td><td><strong>{MONEY(product.price)}</strong></td><td>{NUMBER(product.stock)} {currentType.unit}</td><td><StatusPill tone={product.stock === 0 ? "red" : product.stock <= 5 ? "orange" : "green"}>{product.stock === 0 ? "ناموجود" : product.stock <= 5 ? "رو به اتمام" : product.status}</StatusPill></td><td><div className="table-actions"><button aria-label="ویرایش"><Pencil size={15} /></button><button aria-label="حذف" onClick={() => onDelete(product.id)}><Trash2 size={15} /></button></div></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty-state"><Package size={28} /><strong>موردی پیدا نشد</strong><span>عبارت جستجو را تغییر بده یا یک مورد جدید اضافه کن.</span></div>}</div>
      </div>
      <div className="footer-note"><ScanBarcode size={15} /> در نسخه‌های بعدی، بارگذاری گروهی اکسل و اسکن بارکد نیز اضافه می‌شود.</div>
    </div>
  );
}

function SalesPage({ orders, onAdd }) {
  return (
    <div className="subpage">
      <div className="page-heading"><div><div className="eyebrow">تراکنش‌ها و فاکتورها</div><h1>فروش و فاکتورها</h1><p>فروش‌های ثبت‌شده را ببین، پیگیری کن و فاکتور جدید بساز.</p></div><button className="button button-primary" onClick={onAdd}><Plus size={18} /> ثبت فروش جدید</button></div>
      <div className="stats-grid compact-stats"><StatCard icon={CircleDollarSign} label="مجموع فروش امروز" value="۱۲.۸ میلیون" change="۱۲.۸٪" tone="purple" /><StatCard icon={Receipt} label="تعداد فاکتور" value={NUMBER(orders.length + 20)} change="۸.۲٪" tone="green" /><StatCard icon={Clock3} label="در انتظار پرداخت" value="۱ فاکتور" change="نیاز به پیگیری" tone="orange" /></div>
      <div className="panel"><div className="panel-heading"><div><h2>فهرست فاکتورها</h2><p>سوابق فروش اخیر</p></div><button className="button button-outline small-button"><Filter size={16} /> فیلتر تاریخ</button></div><div className="table-scroll"><table className="data-table"><thead><tr><th>شماره فاکتور</th><th>مشتری</th><th>تاریخ ثبت</th><th>روش پرداخت</th><th>مبلغ کل</th><th>وضعیت</th><th /></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td><strong className="invoice-code">{order.id}</strong></td><td>{order.customer}</td><td className="muted">{order.date}</td><td>{order.method}</td><td><strong>{MONEY(order.amount)}</strong></td><td><StatusPill tone={order.status === "پرداخت‌شده" ? "green" : "orange"}>{order.status}</StatusPill></td><td><button className="row-more"><Eye size={17} /></button></td></tr>)}</tbody></table></div></div>
    </div>
  );
}

function CustomersPage() {
  return (
    <div className="subpage">
      <div className="page-heading"><div><div className="eyebrow">ارتباط با خریداران</div><h1>مشتریان شما</h1><p>اطلاعات مشتریان و سابقه خریدشان را در یک نگاه مدیریت کن.</p></div><button className="button button-primary"><Plus size={18} /> افزودن مشتری</button></div>
      <div className="stats-grid compact-stats"><StatCard icon={Users} label="کل مشتریان" value="۱,۲۴۸ نفر" change="۹.۲٪" tone="purple" /><StatCard icon={UserRound} label="مشتری جدید این ماه" value="۸۶ نفر" change="۱۱.۴٪" tone="green" /><StatCard icon={Wallet} label="میانگین خرید" value="۱,۸۴۰,۰۰۰" change="۵.۳٪" tone="blue" foot="تومان" /></div>
      <div className="panel"><div className="panel-heading"><div><h2>فهرست مشتریان</h2><p>مشتریان فعال و وفادار</p></div><label className="inline-search"><Search size={16} /><input placeholder="نام یا شماره موبایل..." /></label></div><div className="table-scroll"><table className="data-table"><thead><tr><th>نام مشتری</th><th>شماره تماس</th><th>تعداد خرید</th><th>مجموع خرید</th><th>گروه مشتری</th><th /></tr></thead><tbody>{CUSTOMERS.map((customer) => <tr key={customer.name}><td><div className="customer-cell"><span>{customer.name.slice(0, 1)}</span><strong>{customer.name}</strong></div></td><td className="muted">{customer.phone}</td><td>{NUMBER(customer.purchases)} خرید</td><td><strong>{MONEY(customer.spent)}</strong></td><td><StatusPill tone={customer.tag === "ویژه" || customer.tag === "وفادار" ? "purple" : "green"}>{customer.tag}</StatusPill></td><td><button className="row-more"><MoreHorizontal size={18} /></button></td></tr>)}</tbody></table></div></div>
    </div>
  );
}

function ReportsPage() {
  return (
    <div className="subpage">
      <div className="page-heading"><div><div className="eyebrow">تحلیل عملکرد</div><h1>گزارش‌های کسب‌وکار</h1><p>تصویر روشن‌تری از فروش، مشتریان و روند رشد داشته باش.</p></div><button className="button button-outline"><Download size={17} /> دریافت گزارش</button></div>
      <div className="stats-grid compact-stats"><StatCard icon={Wallet} label="فروش این ماه" value="۲۱۶,۴۵۰,۰۰۰" change="۱۸.۶٪" tone="purple" foot="تومان" /><StatCard icon={ShoppingBag} label="تعداد سفارش‌ها" value="۳۸۴ سفارش" change="۱۲.۲٪" tone="green" /><StatCard icon={TrendingUp} label="میانگین رشد" value="۱۴.۸٪" change="۳.۵٪" tone="blue" /></div>
      <div className="panel revenue-panel report-chart-panel"><div className="panel-heading"><div><h2>روند درآمد</h2><p>نمای کلی فروش در هفت روز اخیر</p></div><button className="select-lite">این هفته <ChevronDown size={14} /></button></div><div className="revenue-total"><strong>۸۶,۴۵۰,۰۰۰ <small>تومان</small></strong><span className="positive"><TrendingUp size={15} /> ۱۸.۶٪ <em>رشد نسبت به هفته قبل</em></span></div><RevenueChart /></div>
      <div className="insight-grid"><div className="panel insight-card"><span className="insight-icon green"><TrendingUp size={19} /></span><strong>روزهای پرفروش</strong><p>بر اساس داده‌های نمونه، پنجشنبه‌ها بیشترین میزان فروش را داشته‌اند.</p></div><div className="panel insight-card"><span className="insight-icon purple"><Users size={19} /></span><strong>مشتریان وفادار</strong><p>مشتریانی که بیش از ۳ بار خرید کرده‌اند، سهم بیشتری از درآمد دارند.</p></div><div className="panel insight-card"><span className="insight-icon orange"><Package size={19} /></span><strong>مدیریت موجودی</strong><p>موجودی کالاهای کم‌تعداد را پیش از اتمام بررسی و تأمین کن.</p></div></div>
    </div>
  );
}

function SettingsPage({ shopName, setShopName, theme, setTheme, modules, setModules, currentType, onChooseBusiness }) {
  return (
    <div className="subpage">
      <div className="page-heading"><div><div className="eyebrow">فضای کاری شما</div><h1>شخصی‌سازی برنامه</h1><p>فروش‌یار را مطابق هویت و روش کار کسب‌وکارت تنظیم کن.</p></div><span className="saved-label"><CheckCircle2 size={16} /> ذخیره خودکار</span></div>
      <div className="settings-layout">
        <div className="panel settings-card"><div className="settings-title"><span className="settings-icon"><Store size={19} /></span><div><h2>اطلاعات فروشگاه</h2><p>نام و نوع فعالیت کسب‌وکارت را مشخص کن.</p></div></div><label className="field-label">نام فروشگاه<input value={shopName} onChange={(e) => setShopName(e.target.value)} /></label><div className="business-selected"><div className="business-selected-icon"><currentType.icon size={20} /></div><div><strong>{currentType.label}</strong><span>{currentType.hint}</span></div><button className="button button-outline small-button" onClick={onChooseBusiness}>تغییر نوع کسب‌وکار</button></div></div>
        <div className="panel settings-card"><div className="settings-title"><span className="settings-icon"><Palette size={19} /></span><div><h2>رنگ و ظاهر برنامه</h2><p>رنگ اصلی فضای کاری خودت را انتخاب کن.</p></div></div><div className="theme-options">{THEME_OPTIONS.map((option) => <button key={option.id} className={"theme-option" + (theme === option.id ? " selected" : "")} onClick={() => setTheme(option.id)}><span style={{ background: option.color }} />{option.label}{theme === option.id && <Check size={15} />}</button>)}</div></div>
        <div className="panel settings-card settings-wide"><div className="settings-title"><span className="settings-icon"><LayoutGrid size={19} /></span><div><h2>مدیریت بخش‌های برنامه</h2><p>بخش‌هایی را که نیاز نداری از منوی اصلی پنهان کن. هر زمان خواستی می‌توانی دوباره فعالشان کنی.</p></div></div><div className="module-list">{[{ id: "products", label: "کالاها و موجودی", desc: "ثبت کالا، خدمات و کنترل موجودی", icon: Package }, { id: "sales", label: "فروش و فاکتورها", desc: "ثبت فروش و پیگیری پرداخت‌ها", icon: Receipt }, { id: "customers", label: "مشتریان", desc: "پرونده و سوابق خرید مشتریان", icon: Users }, { id: "reports", label: "گزارش‌ها", desc: "نمودارها و تحلیل عملکرد", icon: BarChart3 }].map((item) => { const Icon = item.icon; return <div className="module-row" key={item.id}><span className="module-icon"><Icon size={18} /></span><div><strong>{item.label}</strong><small>{item.desc}</small></div><button className={"toggle" + (modules[item.id] ? " on" : "")} onClick={() => setModules((prev) => ({ ...prev, [item.id]: !prev[item.id] }))} aria-label={"تغییر " + item.label}><i /></button></div>; })}</div></div>
      </div>
      <div className="footer-note"><ShieldCheck size={15} /> تنظیمات این نسخه روی همین مرورگر ذخیره می‌شوند. همگام‌سازی بین دستگاه‌ها در فاز اتصال حساب کاربری اضافه می‌شود.</div>
    </div>
  );
}

function BusinessModal({ selected, onClose, onChoose }) {
  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal business-modal">
        <div className="modal-heading"><div><span className="eyebrow">فضای کاری اختصاصی</span><h2>کسب‌وکارت چه نوع فعالیتی دارد؟</h2><p>با انتخاب شغل، منو و امکانات متناسب با کار تو تنظیم می‌شود.</p></div><button className="icon-button" onClick={onClose}><X size={19} /></button></div>
        <div className="business-choice-grid">{TYPES.map((type) => { const Icon = type.icon; return <button key={type.id} className={"business-choice" + (selected === type.id ? " selected" : "")} onClick={() => onChoose(type.id)}><span className="business-choice-icon"><Icon size={22} /></span><strong>{type.label}</strong><small>{type.hint}</small>{selected === type.id && <span className="choice-check"><Check size={13} /></span>}</button>; })}</div>
        <div className="modal-footnote"><Sparkles size={16} /> بعداً می‌توانی نوع کسب‌وکار و جزئیات امکانات را تغییر بدهی.</div>
      </div>
    </div>
  );
}

function CustomizeModal({ shopName, setShopName, theme, setTheme, modules, setModules, onClose, onBusiness, notify }) {
  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal customize-modal">
        <div className="modal-heading"><div><span className="eyebrow">تنظیمات سریع</span><h2>فضای کاری خودت را بساز</h2><p>ظاهر و امکانات برنامه را با سلیقه خودت هماهنگ کن.</p></div><button className="icon-button" onClick={onClose}><X size={19} /></button></div>
        <label className="field-label">نام فروشگاه<input value={shopName} onChange={(e) => setShopName(e.target.value)} /></label>
        <div className="field-label">رنگ اصلی برنامه<div className="theme-options">{THEME_OPTIONS.map((option) => <button key={option.id} className={"theme-option" + (theme === option.id ? " selected" : "")} onClick={() => setTheme(option.id)}><span style={{ background: option.color }} />{option.label}{theme === option.id && <Check size={15} />}</button>)}</div></div>
        <div className="field-label">بخش‌های فعال<div className="modal-module-grid">{[{ id: "products", label: "کالاها" }, { id: "sales", label: "فروش" }, { id: "customers", label: "مشتریان" }, { id: "reports", label: "گزارش‌ها" }].map((item) => <button key={item.id} className={"module-chip" + (modules[item.id] ? " selected" : "")} onClick={() => setModules((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}><span>{modules[item.id] ? <Check size={14} /> : <Plus size={14} />}</span>{item.label}</button>)}</div></div>
        <button className="business-change-link" onClick={onBusiness}><Store size={17} /> تغییر نوع کسب‌وکار <ChevronLeft size={16} /></button>
        <div className="modal-actions"><button className="button button-primary full-button" onClick={() => { onClose(); notify("شخصی‌سازی با موفقیت ذخیره شد"); }}>ذخیره تغییرات</button></div>
      </div>
    </div>
  );
}

function AddProductModal({ currentType, onClose, onSave }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("1");
  const save = () => {
    if (!name.trim() || !price.trim()) return;
    onSave({ name: name.trim(), code: code.trim() || "NEW-" + Date.now().toString().slice(-4), category: category.trim() || "عمومی", price: Number(price.replaceAll(",", "")), stock: Number(stock) || 0, image: "", detail: currentType.hint });
  };
  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal add-modal">
        <div className="modal-heading"><div><span className="eyebrow">ثبت مورد جدید</span><h2>افزودن {currentType.itemLabel}</h2><p>اطلاعات اولیه را وارد کن؛ بعداً می‌توانی جزئیات بیشتری اضافه کنی.</p></div><button className="icon-button" onClick={onClose}><X size={19} /></button></div>
        <div className="form-grid"><label className="field-label wide-field">نام {currentType.itemLabel}<input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="مثلاً محصول جدید..." /></label><label className="field-label">کد / شناسه<input value={code} onChange={(e) => setCode(e.target.value)} placeholder="اختیاری" /></label><label className="field-label">دسته‌بندی<input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="مثلاً پوشاک" /></label><label className="field-label">قیمت (تومان)<input inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="مثلاً ۱۲۵۰۰۰۰" /></label><label className="field-label">موجودی / ظرفیت<input inputMode="numeric" value={stock} onChange={(e) => setStock(e.target.value)} /></label></div>
        <div className="modal-actions"><button className="button button-outline" onClick={onClose}>انصراف</button><button className="button button-primary" onClick={save} disabled={!name.trim() || !price.trim()}><Plus size={17} /> ثبت {currentType.itemLabel}</button></div>
      </div>
    </div>
  );
}

export default App;
