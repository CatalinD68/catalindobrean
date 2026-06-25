import { useState, useEffect, useRef, useMemo } from "react";
import { Search, Layers, Globe, Palette, MessageCircle, Calendar, Mail, ArrowUpRight, ArrowDown, ChevronRight, Linkedin, ExternalLink, Plus, X, FileText, Briefcase, GraduationCap, Award, MapPin, Heart, Menu, BarChart3, Monitor, TrendingUp, Compass, Sparkles, Zap, Target, Send, PenTool, Package } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return mobile;
}

const BLUE = "#FAFAFA";
const DARK = "#0B0B0B";
const DARK2 = "#1A1A1A";
const LIGHT = "#FAFAFA";
const GRAY = "rgba(255,255,255,0.55)";
const WHITE = "#FAFAFA";
const BORDER = "rgba(255,255,255,0.08)";
const BORDER_HOVER = "rgba(255,255,255,0.18)";
const PREMIUM_GRADIENT = "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)";

// ─── WhatsApp Icon ───
const WhatsAppIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// ─── Lazy Image — IntersectionObserver-based lazy loader ───
// Renders a div with background-image only when scrolled near viewport
// Use this for background-image styled containers (gives same visual result as <img loading="lazy">)
function LazyImage({ src, alt = "", aspectRatio, style = {}, eager = false, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(eager);
  const ref = useRef(null);

  useEffect(() => {
    if (eager || inView) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }  // start loading 300px before entering viewport
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, inView]);

  useEffect(() => {
    if (!inView || !src) return;
    const img = new window.Image();
    img.onload = () => setLoaded(true);
    img.src = src;
  }, [inView, src]);

  return (
    <div
      ref={ref}
      role={alt ? "img" : undefined}
      aria-label={alt}
      className={className}
      style={{
        ...style,
        aspectRatio: aspectRatio || style.aspectRatio,
        background: loaded && src
          ? `url(${src}) center/cover no-repeat, #1A1A1A`
          : "linear-gradient(135deg, #1A1A1A 0%, #0B0B0B 100%)",
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: loaded || !src ? 1 : 0.6,
      }}
    />
  );
}

// ─── Logo Component ───
const Logo = ({ color = "white" }) => (
  <svg width="136" height="37" viewBox="0 0 136 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.86 24.008C12.86 16.903 7.105 11.148 0 11.148V17.731C3.464 17.731 6.277 20.536 6.277 24.008C6.277 27.48 3.472 30.277 0 30.277V36.86C7.105 36.86 12.86 31.105 12.86 24.008Z" fill={BLUE}/>
    <path d="M32.881 36.86V30.277C29.417 30.277 26.604 27.472 26.604 24.008C26.604 20.544 29.409 17.731 32.881 17.731V11.148C25.776 11.148 20.021 16.903 20.021 24.008C20.021 31.113 25.776 36.86 32.881 36.86Z" fill={BLUE}/>
    <path d="M21.188 0.78H11.695V10.272H21.188V0.78Z" fill={BLUE}/>
    <path d="M60.104 12.667C61.575 11.429 62.339 9.436 62.339 7.161C62.339 3.022 59.928 0.008 56.182 0.008H50.709V14.026H55.941C57.709 14.026 59.06 13.535 60.096 12.675L60.104 12.667ZM53.554 11.566V2.427H55.828C58.24 2.427 59.453 4.372 59.453 7.153C59.453 9.934 58.417 11.566 55.748 11.566H53.554Z" fill={color === "white" ? WHITE : DARK2}/>
    <path d="M70.626 14.315C73.744 14.315 75.882 12 75.882 9.002C75.882 6.004 73.744 3.689 70.626 3.689C67.507 3.689 65.369 6.004 65.369 9.002C65.369 12 67.507 14.315 70.626 14.315ZM70.626 5.707C72.249 5.707 73.174 7.041 73.174 9.002C73.174 10.963 72.249 12.273 70.626 12.273C69.002 12.273 68.078 10.963 68.078 9.002C68.078 7.041 68.978 5.707 70.626 5.707Z" fill={color === "white" ? WHITE : DARK2}/>
    <path d="M81.886 12.764H81.926C82.513 13.704 83.518 14.315 84.924 14.315C87.456 14.315 89.176 12.257 89.176 9.002C89.176 5.747 87.376 3.689 84.844 3.689C83.453 3.689 82.585 4.34 82.039 5.176H81.982V0H79.314V14.017H81.886V12.764ZM84.233 5.843C85.72 5.843 86.467 7.137 86.467 9.002C86.467 10.867 85.704 12.08 84.329 12.08C82.842 12.08 81.918 10.907 81.918 9.058C81.918 7.21 82.545 5.843 84.233 5.843Z" fill={color === "white" ? WHITE : DARK2}/>
    <path d="M95.269 9.115C95.269 7.001 96.523 6.076 98.267 6.253H98.324V3.922C98.163 3.866 97.994 3.842 97.697 3.842C96.523 3.842 95.832 4.429 95.229 5.57H95.173V3.963H92.601V14.018H95.269V9.115Z" fill={color === "white" ? WHITE : DARK2}/>
    <path d="M106.111 14.315C108.699 14.315 110.29 12.804 110.66 11.019H108.032C107.734 11.783 107.131 12.257 106.095 12.257C104.584 12.257 103.723 11.293 103.523 9.749H110.813C110.813 6.165 109.085 3.689 105.853 3.689C102.912 3.689 100.894 6.004 100.894 8.986C100.894 11.968 102.775 14.315 106.111 14.315ZM105.902 5.747C107.115 5.747 107.959 6.631 108.04 7.901H103.571C103.804 6.591 104.495 5.747 105.902 5.747Z" fill={color === "white" ? WHITE : DARK2}/>
    <path d="M117.797 7.941C115.563 8.255 113.754 8.962 113.754 11.172C113.754 13.174 115.209 14.251 117.267 14.251C118.995 14.251 119.718 13.664 120.224 12.9H120.265C120.321 13.35 120.425 13.825 120.578 14.017H123.15V13.921C122.917 13.744 122.796 13.294 122.796 12.531V7.411C122.796 5.056 121.583 3.705 118.561 3.705C115.538 3.705 114.309 5.257 114.228 7.017H116.599C116.68 6.052 117.283 5.602 118.545 5.602C119.662 5.602 120.232 6.076 120.232 6.8C120.232 7.563 119.469 7.7 117.805 7.933L117.797 7.941ZM120.289 8.962V10.473C120.289 11.454 119.445 12.394 117.918 12.394C116.977 12.394 116.35 12.064 116.35 11.116C116.35 10.168 117.033 9.862 118.432 9.549C119.099 9.388 119.822 9.235 120.297 8.962H120.289Z" fill={color === "white" ? WHITE : DARK2}/>
    <path d="M129.347 8.311C129.347 6.936 130.207 5.996 131.388 5.996C132.57 5.996 133.133 6.76 133.133 7.837V14.009H135.801V7.443C135.801 5.248 134.411 3.681 132.329 3.681C130.954 3.681 130.038 4.252 129.347 5.329H129.291V3.954H126.687V14.009H129.355V8.303L129.347 8.311Z" fill={color === "white" ? WHITE : DARK2}/>
    <path d="M56.85 36.86C58.795 36.86 60.145 36.273 61.102 35.373C62.042 34.489 62.572 33.291 62.653 32.061H59.872C59.695 33.532 58.522 34.529 56.85 34.529C54.495 34.529 53.008 32.471 53.008 29.61C53.008 26.749 54.246 24.667 56.834 24.667C58.481 24.667 59.542 25.591 59.791 26.998H62.613C62.315 24.329 60.282 22.272 56.826 22.272C52.686 22.272 50.098 25.447 50.098 29.602C50.098 33.757 52.903 36.86 56.842 36.86H56.85Z" fill={color === "white" ? WHITE : DARK2}/>
    <path d="M69.644 30.486C67.41 30.8 65.602 31.507 65.602 33.717C65.602 35.718 67.056 36.796 69.114 36.796C70.842 36.796 71.565 36.209 72.072 35.445H72.112C72.168 35.895 72.273 36.37 72.425 36.562H74.997V36.466C74.764 36.289 74.644 35.839 74.644 35.075V29.956C74.644 27.601 73.43 26.25 70.408 26.25C67.386 26.25 66.156 27.802 66.076 29.562H68.447C68.527 28.597 69.13 28.147 70.392 28.147C71.509 28.147 72.08 28.621 72.08 29.345C72.08 30.108 71.316 30.245 69.653 30.478L69.644 30.486ZM72.136 31.507V33.018C72.136 33.998 71.292 34.939 69.765 34.939C68.825 34.939 68.198 34.609 68.198 33.661C68.198 32.712 68.881 32.407 70.279 32.094C70.946 31.941 71.67 31.78 72.144 31.507H72.136Z" fill={color === "white" ? WHITE : DARK2}/>
    <path d="M73.319 22.722H71.792C71.711 23.252 71.221 23.662 70.441 23.662C69.662 23.662 69.163 23.293 69.091 22.722H67.564C67.66 24.209 68.818 25.326 70.466 25.326C72.113 25.326 73.206 24.169 73.327 22.722H73.319Z" fill={color === "white" ? WHITE : DARK2}/>
    <path d="M79.138 34.175C79.138 36.08 80.569 36.587 81.863 36.587C82.924 36.587 83.526 36.547 83.526 36.547V34.585C83.526 34.585 83.076 34.601 82.739 34.601C82.152 34.601 81.742 34.344 81.742 33.605V28.268H83.47V26.5H81.742V23.365H79.138V26.5H77.747V28.268H79.138V34.167V34.175Z" fill={color === "white" ? WHITE : DARK2}/>
    <path d="M90.688 30.486C88.454 30.8 86.645 31.507 86.645 33.717C86.645 35.718 88.092 36.796 90.158 36.796C91.886 36.796 92.609 36.209 93.116 35.445H93.156C93.212 35.895 93.308 36.37 93.469 36.562H96.041V36.466C95.808 36.289 95.688 35.839 95.688 35.075V29.956C95.688 27.601 94.474 26.25 91.452 26.25C88.43 26.25 87.2 27.802 87.12 29.562H89.491C89.571 28.597 90.174 28.147 91.428 28.147C92.545 28.147 93.116 28.621 93.116 29.345C93.116 30.108 92.352 30.245 90.688 30.478V30.486ZM93.18 31.507V33.018C93.18 33.998 92.336 34.939 90.809 34.939C89.868 34.939 89.241 34.609 89.241 33.661C89.241 32.712 89.925 32.407 91.323 32.094C91.99 31.941 92.714 31.78 93.188 31.507H93.18Z" fill={color === "white" ? WHITE : DARK2}/>
    <path d="M89.314 22.722H87.786C87.883 24.209 89.04 25.326 90.688 25.326C92.336 25.326 93.429 24.169 93.549 22.722H92.022C91.942 23.252 91.452 23.662 90.672 23.662C89.892 23.662 89.394 23.293 89.322 22.722H89.314Z" fill={color === "white" ? WHITE : DARK2}/>
    <path d="M102.269 22.545H99.601V36.563H102.269V22.545Z" fill={color === "white" ? WHITE : DARK2}/>
    <path d="M108.9 22.545H106.232V24.94H108.9V22.545Z" fill={color === "white" ? WHITE : DARK2}/>
    <path d="M108.9 26.508H106.232V36.563H108.9V26.508Z" fill={color === "white" ? WHITE : DARK2}/>
    <path d="M112.822 26.507V36.562H115.49V30.856C115.49 29.481 116.35 28.541 117.532 28.541C118.714 28.541 119.276 29.304 119.276 30.382V36.554H121.945V29.988C121.945 27.793 120.554 26.226 118.472 26.226C117.098 26.226 116.182 26.797 115.49 27.874H115.434V26.499H112.83L112.822 26.507Z" fill={color === "white" ? WHITE : DARK2}/>
  </svg>
);

// ─── Data ───
const services = [
  {
    id: "brand",
    title: "Brand Identity & Strategy",
    desc: "Build a distinctive visual identity that positions your brand in the market. From strategic positioning and brand workshops to a complete identity system with guidelines and web presence.",
    tiers: [
      {
        label: "Visual Identity",
        deliverables: ["Positioning brief", "Visual direction", "1 final logo design", "Typography", "Colors", "Visual identity guidelines", "Social media templates"],
      },
      {
        label: "Full Brand",
        deliverables: ["Positioning brief", "Brand strategy workshop (4h, 2–3 sessions)", "Logo design", "Premium typography", "Colors", "Brand guidelines", "Visual identity presentation", "Social media templates", "Brand manual (Figma & PDF)", "Access to Brand Kreator portal"],
      },
      {
        label: "Brand + Landing Page",
        deliverables: ["Visual direction", "UI & UX design", "Icons & images", "Development-ready assets", "Positioning brief", "1 final logo design", "Typography", "Colors", "Visual identity guidelines", "Social media templates"],
      },
    ],
    icon: Palette,
  },
    {
    id: "audit",
    title: "UI/UX Audit",
    desc: "A deep-dive analysis of your digital product's usability, visual consistency, and conversion potential. Actionable recommendations backed by UX heuristics and competitive analysis.",
    tiers: [
      {
        label: "Website",
        deliverables: ["Heuristic evaluation of full website", "Competition analysis", "Conversion structure & flow analysis", "Recommendations", "Action map (.pdf)", "15 min explanatory video"],
      },
      {
        label: "MVP / App",
        deliverables: ["Heuristic evaluation of full product", "Competition analysis", "Conversion structure & flow analysis", "In-depth user flow analysis", "User personas", "User journey map", "Business alignment analysis", "Wireframing & design recommendations", "Action map (.pdf)", "15 min explanatory video", "1:1 strategy call"],
      },
      {
        label: "Full Product Audit",
        deliverables: ["Heuristic evaluation of full product", "Competition analysis", "Conversion structure & flow analysis", "In-depth user flow analysis", "User personas", "User journey map", "Business alignment analysis", "Wireframing & design recommendations", "Accessibility analysis", "Design system analysis", "2-week consultancy", "Action map (.pdf)", "15 min explanatory video", "1:1 strategy call"],
      },
    ],
    icon: Search,
  },
  {
    id: "product",
    title: "Product Design & Strategy",
    desc: "End-to-end product design from research to pixel-perfect handoff. Strategy, information architecture, prototyping, design systems, and ongoing refinement partnerships.",
    tiers: [
      {
        label: "MVP Design",
        deliverables: ["AI-driven competition research", "Flow analysis", "User journey map creation", "User flow creation", "Lo-Fi & Hi-Fi design for main features", "AI-code prototype (investor-ready)", "Foundational style guide"],
      },
      {
        label: "Full SaaS / App",
        deliverables: ["AI-driven competition research", "Flow analysis", "User journey map creation", "User flow creation", "Core architecture design", "Layout design", "Lo-Fi & Hi-Fi design for main features", "AI-code prototype (investor-ready)", "Design system", "Design partnership along product design & development", "3-month design assistance"],
      },
      {
        label: "Design Subscription /mo",
        deliverables: ["UI/UX audit", "UX research & strategy", "Wireframing", "Hi-Fi design", "AI-code prototype", "UI design", "Design system", "Developer handoff"],
      },
    ],
    icon: Layers,
  },
  {
    id: "web",
    title: "Web Design",
    desc: "High-converting websites that communicate your brand's value proposition with clarity and intent. From landing pages to full e-commerce experiences.",
    tiers: [
      {
        label: "Landing Page",
        deliverables: ["Visual direction", "UI & UX design", "Icons & images", "Development-ready assets"],
      },
      {
        label: "Multi-page Website",
        deliverables: ["Visual direction", "UI & UX design", "Icons & images", "Development-ready assets", "Multi-page design", "AI-code prototype"],
      },
      {
        label: "E-commerce",
        deliverables: ["Visual direction", "UI & UX design", "Icons & images", "Development-ready assets", "Multi-page design", "Shop & checkout flows", "E-commerce UX patterns", "AI-code prototype"],
      },
    ],
    icon: Globe,
  },
  {
    id: "packaging",
    title: "Packaging & Label Design",
    desc: "Bring your product to life on the shelf with thoughtful, distinctive packaging and labels. From single SKU designs to complete product line systems, optimized for both physical impact and digital presentation.",
    tiers: [
      {
        label: "Single Label / SKU",
        deliverables: ["Discovery session", "Visual direction", "1 label design (front + back)", "Typography & color application", "Print-ready files", "Dieline & mockup presentation"],
      },
      {
        label: "Product Line",
        deliverables: ["Discovery session", "Brand-aligned packaging strategy", "Up to 5 SKU designs", "Modular label system", "Typography hierarchy", "Color variations", "Material & finish recommendations", "Print-ready files", "3D mockups for marketing"],
      },
      {
        label: "Full Packaging System",
        deliverables: ["Discovery session", "Brand-aligned packaging strategy", "Unlimited SKU designs", "Complete packaging architecture", "Modular label system", "Primary, secondary & tertiary packaging", "Material & sustainability guidelines", "Print-ready files & specs", "3D mockups & lifestyle renders", "Packaging guidelines document", "Vendor coordination support"],
      },
    ],
    icon: Package,
  },
  ];

// Featured on homepage
const featuredProjects = ["wesupply", "urbanlab", "geoint"];

const portfolioProjects = {
  product: [
    {
      id: "easypost",
      title: "EasyPost",
      type: "Shipping SaaS Platform",
      role: "Product Designer Consultant",
      duration: "Jan 2025 – Jan 2026",
      location: "USA",
      tag: "SaaS",
      image: null,
      context: "EasyPost is a leading shipping API platform that simplifies multi-carrier logistics for e-commerce businesses, fulfillment providers, and online marketplaces. The platform enables rate shopping, label generation, address validation, and shipment tracking across hundreds of global carriers.",
      problem: "The existing platform interface needed a strategic UI/UX overhaul to support growing feature complexity while maintaining the simplicity that made EasyPost accessible to businesses of all sizes.",
      solution: "Led strategy and design for the EasyPost platform UI/UX, leveraging AI workflows for automation to accelerate delivery while maintaining design quality and consistency across the product.",
      approach: ["Strategy & Design UI/UX for EasyPost platform", "AI workflows for design automation", "Cross-functional collaboration with engineering"],
      images: [],
      noExpand: true,
      noCover: true,
    },
    {
      id: "wesupply",
      title: "WeSupply",
      type: "Post-Purchase SaaS Platform",
      role: "Product Designer",
      duration: "Apr 2021 – Dec 2025",
      location: "Romania – USA",
      tag: "SaaS",
      image: "/images/covers/wesupply.jpg",
      context: "WeSupply is a comprehensive post-purchase customer experience platform that helps e-commerce retailers drive sales and improve loyalty through real-time order tracking, proactive delivery notifications, self-service returns, and in-store pickup solutions.",
      problem: "The platform had grown significantly in features — tracking, returns, analytics, notifications — but the UX hadn't scaled accordingly. Retailers needed a clearer, more efficient interface to manage the entire post-purchase lifecycle.",
      solution: "Redesigned the end-to-end product experience over 4+ years, building a scalable design system, restructuring information architecture, and designing dashboard analytics that gave retailers actionable insights into their post-purchase operations.",
      approach: ["Research & UX Audit/Strategy", "Information & Flow Architecture", "Dashboard & Analytics Design", "Design System", "UI/UX for mobile & web", "AI Workflows — HTML to Design and Prototyping", "Multi-device Responsive Layouts", "Dev Team Collaboration"],
      images: ["/images/wesupply/1.jpg", "/images/wesupply/2.jpg", "/images/wesupply/3.jpg", "/images/wesupply/4.jpg", "/images/wesupply/5.jpg"],
    },
    {
      id: "dreamtter",
      title: "Dreamtter",
      type: "Mobile App — Redbee Software",
      role: "UI/UX Designer",
      duration: "Mar 2024 – May 2025",
      location: "Romania",
      tag: "Mobile",
      image: "/images/covers/dreamtter.jpg",
      context: "Dreamtter is a mobile application developed by Redbee Software. The project required a complete UI/UX design process from user flow definition to visual direction and development handoff.",
      problem: "The app needed a cohesive visual identity and intuitive user flows that could handle complex edge cases while keeping the mobile experience simple and engaging for end users.",
      solution: "Designed the complete mobile app experience — from layout and user flows to visual direction and development handoff — integrating AI-assisted UX strategy to streamline the design process.",
      approach: ["Collaboration with Product Manager", "Design layout and user flows for the mobile app", "UI Design & Visual Direction", "Design iteration — different edge cases", "UX Strategy — AI process integration", "Handoff for Development"],
      images: ["/images/dreamtter/1.jpg", "/images/dreamtter/2.jpg", "/images/dreamtter/3.jpg", "/images/dreamtter/4.jpg", "/images/dreamtter/5.jpg"],
    },
    {
      id: "urbanlab",
      title: "Urbanlab",
      type: "Heritage & Community Platform",
      role: "Product Designer",
      duration: "Jan 2024 – Oct 2025",
      location: "Romania",
      tag: "Platform",
      image: "/images/covers/urbanlab.jpg",
      context: "Urbanlab is a digital platform focused on built heritage mapping in the Jiu Valley region of Romania. The project combines community engagement with heritage preservation through interactive digital tools.",
      problem: "The Jiu Valley's architectural heritage lacked a digital presence. Communities needed a platform to document, map, and share built heritage in an accessible and engaging way.",
      solution: "Designed the complete product experience — from visual direction and interactive map UI/UX to website design and illustration systems — enabling community-driven heritage documentation.",
      approach: ["Product Visual Direction", "Map UI/UX Design", "Website Design", "UI & Website Illustrations Animation", "Product Design for Built Heritage Map — Jiu Valley", "Managing & Collaboration with Development Team", "Handoff for Development"],
      images: ["/images/urbanlab/1.jpg", "/images/urbanlab/2.jpg", "/images/urbanlab/3.jpg", "/images/urbanlab/4.jpg", "/images/urbanlab/5.jpg"],
    },
    {
      id: "geoint",
      title: "GeoInt",
      type: "Geospatial Intelligence Dashboard",
      role: "Product Designer",
      duration: "Jun 2025 – Aug 2025",
      location: "International",
      tag: "Dashboard",
      image: "/images/covers/geoint.jpg",
      context: "FourthSpace is a geospatial intelligence product that visualizes complex location-based data for decision-makers. The platform needed responsive dashboard interfaces across desktop, tablet, and mobile.",
      problem: "Complex product management documentation needed to be translated into intuitive, data-rich interfaces that could render geospatial intelligence clearly across multiple device sizes.",
      solution: "Designed a geospatial intelligence dashboard using the Shadcn Design System as a foundation, delivering fast, responsive layouts that transform dense data into actionable visual insights.",
      approach: ["Product Design for Geospatial Intelligence Dashboard", "Layout Design for different devices", "Analyze and transform PM docs into design", "UI/UX for Dashboard — Desktop/Mobile/Tablet", "Shadcn Design System Library integration", "Fast Delivery and Development Handoff"],
      images: [],
    },
    {
      id: "refracto",
      title: "Refracto",
      type: "Real Estate Investment SaaS",
      role: "Product Designer",
      duration: "Nov 2022 – Jan 2023",
      location: "Romania",
      tag: "SaaS",
      image: "/images/covers/refracto.jpg",
      context: "Refracto is a crypto-enabled real estate investment platform that democratizes property investment through tokenized ownership. The product needed a full UX strategy and dashboard design.",
      problem: "Real estate investment combined with cryptocurrency creates a complex user journey. Investors needed a clear, trustworthy dashboard that simplified portfolio management and investment flows.",
      solution: "Led MVP workshops to prioritize functionalities, designed the UX strategy and user journey mapping, and prototyped the investment dashboard for development handoff.",
      approach: ["MVP Workshops and Functionalities prioritization", "UX Design & Strategy", "User Journey Mapping", "Dashboard Prototyping"],
      images: ["/images/refracto/1.jpg", "/images/refracto/2.jpg", "/images/refracto/3.jpg", "/images/refracto/4.jpg", "/images/refracto/5.jpg"],
    },
    {
      id: "pan",
      title: "P.A.N",
      type: "Protocol for Analyzing Nature",
      role: "Product Owner",
      duration: "Oct 2020 – Jan 2026",
      location: "International",
      tag: "Start-up",
      image: "/images/covers/pan.jpg",
      context: "P.A.N (Protocol for Analyzing Nature) is a start-up platform designed for tracking and analyzing animal migration patterns. The project earned global recognition at both the NASA Space App Challenge and Microsoft Azure Hackathon.",
      problem: "Animal migration data is fragmented across research institutions. Scientists and conservationists needed a unified platform to visualize migration patterns and collaborate on wildlife protection efforts.",
      solution: "As Product Owner, led the full product lifecycle — from research and MVP definition to team management — building a platform that earned NASA Global Nominee status and Top 50 at Microsoft Azure Hackathon.",
      approach: ["Product ownership & research", "Team management & collaboration", "Project management", "MVP Workshops & prioritization", "Product design for animal migration platform"],
      images: [],
    },
  ],
  personal: [
    {
      id: "talejewelry",
      title: "Tale Jewelry",
      type: "AR Jewelry Shop Experience",
      role: "Product Designer",
      duration: "January 2025",
      tag: "Spatial",
      image: "/images/personal/talejewelry/1.jpg",
      gridImages: ["/images/personal/talejewelry/1.jpg", "/images/personal/talejewelry/2.jpg", "/images/personal/talejewelry/3.jpg", "/images/personal/talejewelry/4.jpg", "/images/personal/talejewelry/5.jpg", "/images/personal/talejewelry/6.jpg"],
      context: "Tale Jewelry is a conceptual augmented reality application that reimagines how customers browse and try on jewelry using spatial computing technology.",
      approach: ["Visual Direction", "Conceptual AR App Design", "Spatial Interface Design", "AI Workflows"],
    },
    {
      id: "visen",
      title: "Visen",
      type: "VR/AR TV Show App",
      role: "Product Designer",
      duration: "January 2024",
      tag: "Spatial",
      image: "/images/personal/visen/1.jpg",
      gridImages: ["/images/personal/visen/1.jpg", "/images/personal/visen/2.jpg", "/images/personal/visen/3.jpg", "/images/personal/visen/4.jpg", "/images/personal/visen/5.jpg", "/images/personal/visen/6.jpg"],
      context: "Visen is a conceptual VR/AR application that transforms the TV show viewing experience through spatial interfaces, 3D design, and immersive interactions.",
      approach: ["Visual Direction", "Conceptual VR/AR App Design", "Spatial Interface Design", "AI Workflows", "3D Interface Design"],
    },
  ],
  branding: [
    {
      id: "forum01115", title: "ForUM01115",
      type: "Community Center Brand Identity",
      role: "Brand Designer",
      tag: "Public",
      image: "/images/branding/forum01115/cover.png",
      context: "ForUM01115 is a €70M cultural and civic center being built on the site of a former military base in Giroc, Timiș County. Part of the EU's New European Bauhaus initiative, the space will include galleries, educational labs, and community areas.",
      problem: "A brand-new civic institution needed a visual identity that could represent the transformation from military discipline to creative freedom — balancing institutional trust with cultural openness for a diverse community audience.",
      solution: "Designed a brand identity system that bridges the project's military heritage (the unit number 01115) with the concept of a modern forum. The visual language communicates openness, dialogue, and cultural transformation.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/forum01115/1.jpg", "/images/branding/forum01115/2.jpg", "/images/branding/forum01115/3.png", "/images/branding/forum01115/4.jpg", "/images/branding/forum01115/5.jpg"],
    },
    {
      id: "redbee", title: "Redbee Software",
      type: "Tech Company Brand Identity",
      role: "Brand Designer",
      tag: "Tech",
      image: "/images/branding/redbee/cover.jpg",
      context: "Redbee Software is an ISO-certified software development company based in Cluj-Napoca, Romania, recognized as a Deloitte Fast 50 and EMEA Fast 500 winner. They specialize in web, mobile, and ERP solutions for international clients.",
      problem: "As a fast-growing tech company expanding from Romania to UK and US markets, Redbee needed a brand identity that communicated technical excellence and trustworthiness at an international level.",
      solution: "Created a professional brand system that balances technical credibility with approachability. The identity positions Redbee as a premium nearshore partner while reflecting their certified quality standards and global ambitions.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/redbee/1.png", "/images/branding/redbee/2.jpg", "/images/branding/redbee/3.png", "/images/branding/redbee/4.png", "/images/branding/redbee/5.jpg"],
    },
    {
      id: "roboticsvalley", title: "Robotics Valley",
      type: "Innovation Hub Brand Identity",
      role: "Brand Designer",
      tag: "Tech",
      image: "/images/branding/roboticsvalley/cover.png",
      context: "Robotics Valley is a technology and innovation hub focused on robotics, automation, and emerging tech education.",
      problem: "The initiative needed a brand identity that could attract both tech professionals and the general public, positioning robotics as accessible and future-oriented rather than intimidating.",
      solution: "Developed a dynamic visual identity that merges precision engineering aesthetics with human-centered warmth, making advanced technology feel approachable and inspiring.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/roboticsvalley/1.jpg", "/images/branding/roboticsvalley/2.jpg", "/images/branding/roboticsvalley/3.jpg", "/images/branding/roboticsvalley/4.jpg", "/images/branding/roboticsvalley/5.jpg"],
    },
    {
      id: "oriceinvitatie", title: "Oriceinvitatie",
      type: "Event Platform Brand Identity",
      role: "Brand Designer",
      tag: "Platform",
      image: "/images/branding/oriceinvitatie/cover.jpg",
      context: "Oriceinvitatie is a digital platform for creating and managing event invitations, serving wedding events, personal celebrations, and special occasions across Romania.",
      problem: "The platform needed a cohesive brand identity that could feel equally appropriate for elegant wedding invitations and casual birthday parties — versatile without being generic.",
      solution: "Designed a flexible identity system with a celebratory yet refined visual language, allowing the brand to adapt across event types while maintaining strong recognition.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/oriceinvitatie/1.jpg"],
    },
    {
      id: "turbo", title: "Turbo",
      type: "Coffee Shop Brand Identity",
      role: "Brand Designer",
      tag: "F&B",
      image: "/images/branding/turbo/cover.jpg",
      context: "Turbo is a specialty coffee shop built around the energy and ritual of great coffee — a fast-paced environment where quality meets convenience.",
      problem: "The coffee shop needed a visual identity that could capture its high-energy character and stand out in a crowded specialty coffee market, while feeling warm and inviting to daily regulars.",
      solution: "Created a bold, expressive brand system with dynamic typography and a rich color palette that communicates the intensity of great coffee, balanced with tactile materials and warm tones for an inviting in-store experience.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/turbo/1.jpg", "/images/branding/turbo/2.jpg", "/images/branding/turbo/3.jpg", "/images/branding/turbo/4.jpg", "/images/branding/turbo/5.jpg"],
    },
    {
      id: "zonametro", title: "Zona Metropolitană Timișoara",
      type: "Metropolitan Authority Brand Identity",
      role: "Brand Designer",
      tag: "Public",
      image: "/images/branding/zonametro/cover.jpg",
      context: "Zona Metropolitană Timișoara is the metropolitan governance body coordinating urban development, transport, and public services across the greater Timișoara area.",
      problem: "The authority needed a modern visual identity that could represent multiple municipalities under one cohesive brand, communicating unity, progress, and civic partnership.",
      solution: "Designed an institutional identity system that balances administrative authority with forward-looking urbanism. The brand unifies diverse communities under a shared visual framework.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/zonametro/1.png", "/images/branding/zonametro/2.png", "/images/branding/zonametro/3.png", "/images/branding/zonametro/4.jpg", "/images/branding/zonametro/5.png"],
    },
    {
      id: "mindtune", title: "MindTune Experts",
      type: "Consulting Brand Identity",
      role: "Brand Designer",
      tag: "Business",
      image: "/images/branding/mindtune/cover.jpg",
      context: "MindTune Experts is a consulting and coaching practice focused on mindset development, professional growth, and organizational performance.",
      problem: "The brand needed to communicate expertise and transformative impact while avoiding the overused visual clichés of the coaching industry — brain icons, lightbulbs, generic gradients.",
      solution: "Created a refined identity that positions MindTune as a premium consultancy. The visual system uses precise typography and subtle motion metaphors to suggest fine-tuning and clarity of thought.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/mindtune/1.jpg", "/images/branding/mindtune/2.jpg", "/images/branding/mindtune/3.jpg", "/images/branding/mindtune/4.jpg", "/images/branding/mindtune/5.jpg"],
    },
    {
      id: "urbanlab-brand", title: "Urbanlab",
      type: "Heritage Platform Brand Identity",
      role: "Brand Designer",
      tag: "Platform",
      image: "/images/branding/urbanlab-brand/cover.png",
      context: "Urbanlab is a platform dedicated to mapping and preserving built heritage in the Jiu Valley region of Romania, combining cultural research with interactive technology.",
      problem: "The platform needed a visual identity that could bridge the gap between historical preservation and modern digital mapping — feeling both rooted and innovative.",
      solution: "Designed a brand identity that merges cartographic precision with cultural warmth, creating a visual language that respects heritage while embracing the digital tools used to preserve it.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/urbanlab-brand/1.jpg", "/images/branding/urbanlab-brand/2.jpg", "/images/branding/urbanlab-brand/3.jpg", "/images/branding/urbanlab-brand/4.jpg", "/images/branding/urbanlab-brand/5.jpg"],
    },
    {
      id: "dopodoheal", title: "Dopodoheal",
      type: "Podology Clinic Brand Identity",
      role: "Brand Designer",
      tag: "Medical",
      image: "/images/branding/dopodoheal/cover.jpg",
      context: "Dopodoheal is a podology clinic specializing in foot health, biomechanical assessments, and therapeutic treatments for patients seeking professional podiatric care.",
      problem: "The clinic needed a brand identity that could communicate medical expertise and specialized care while feeling approachable and reassuring to patients who may be unfamiliar with podology as a discipline.",
      solution: "Designed a clean, professional identity system that balances clinical credibility with warmth, using precise forms and a calming color palette to position Dopodoheal as a trusted specialist in foot health.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/dopodoheal/1.jpg", "/images/branding/dopodoheal/2.jpg", "/images/branding/dopodoheal/3.jpg", "/images/branding/dopodoheal/4.jpg", "/images/branding/dopodoheal/5.jpg"],
    },
    {
      id: "mirgeoenergy", title: "MIR Geo Energy",
      type: "Energy Company Brand Identity",
      role: "Brand Designer",
      tag: "Energy",
      image: "/images/branding/mirgeoenergy/cover.png",
      context: "MIR Geo Energy is a geothermal and renewable energy company working on sustainable energy solutions and geological exploration projects.",
      problem: "The company needed a professional brand identity that could convey both scientific rigor and environmental responsibility, positioning them as a serious player in the energy sector.",
      solution: "Designed a corporate identity system that balances geological precision with clean energy optimism, using structured forms and an earth-to-sky color progression.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/mirgeoenergy/1.jpg", "/images/branding/mirgeoenergy/2.jpg", "/images/branding/mirgeoenergy/3.jpg", "/images/branding/mirgeoenergy/4.jpg", "/images/branding/mirgeoenergy/5.jpg"],
    },
    {
      id: "evointerior", title: "Evo Interior",
      type: "Interior Design Brand Identity",
      role: "Brand Designer",
      tag: "Design",
      image: "/images/branding/evointerior/cover.jpg",
      context: "Evo Interior is an interior design studio specializing in residential and commercial space transformations.",
      problem: "The studio needed a brand identity that would reflect their design philosophy — modern, refined, and detail-oriented — while differentiating them in a crowded interior design market.",
      solution: "Created an elegant identity system with architectural precision and sophisticated material references, positioning Evo Interior as a premium design partner.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/evointerior/1.jpg", "/images/branding/evointerior/2.jpg", "/images/branding/evointerior/3.jpg", "/images/branding/evointerior/4.jpg", "/images/branding/evointerior/5.png"],
    },
    {
      id: "selfit", title: "Selfit",
      type: "Fitness App Brand Identity",
      role: "Brand Designer",
      tag: "Health",
      image: "/images/branding/selfit/cover.jpg",
      context: "Selfit is a fitness and wellness application designed to help users build personalized workout routines and track their health progress.",
      problem: "The app needed a brand identity that could stand out in the saturated fitness app market while appealing to both beginners and dedicated fitness enthusiasts.",
      solution: "Designed a vibrant, motivational brand system with dynamic elements that scale from app icon to marketing materials, creating consistent energy across all touchpoints.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/selfit/1.jpg", "/images/branding/selfit/2.jpg", "/images/branding/selfit/3.jpg", "/images/branding/selfit/4.jpg", "/images/branding/selfit/5.png"],
    },
    {
      id: "brooklynzoo", title: "Brooklyn Zoo",
      type: "Entertainment Brand Identity",
      role: "Brand Designer",
      tag: "Entertainment",
      image: "/images/branding/brooklynzoo/cover.jpg",
      context: "Brooklyn Zoo is an entertainment and cultural venue bringing together live experiences, community events, and creative programming.",
      problem: "The venue needed a brand identity that captured urban energy and creative diversity while being instantly recognizable and adaptable across event types and marketing channels.",
      solution: "Created a bold, expressive identity with typographic flexibility and a dynamic color system that adapts to different event categories while maintaining strong brand cohesion.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/brooklynzoo/1.jpg", "/images/branding/brooklynzoo/2.jpg", "/images/branding/brooklynzoo/3.jpg", "/images/branding/brooklynzoo/4.jpg", "/images/branding/brooklynzoo/5.jpg"],
    },
    {
      id: "berarkelemen", title: "Berar & Kelemen",
      type: "Professional Services Brand Identity",
      role: "Brand Designer",
      tag: "Business",
      image: "/images/branding/berarkelemen/cover.jpg",
      context: "Berar & Kelemen is a professional services firm built on the expertise and reputation of its founding partners.",
      problem: "The firm needed a brand identity that conveyed established credibility and professional excellence while feeling contemporary and approachable rather than stuffy or outdated.",
      solution: "Designed a refined, classic-modern identity system that balances traditional professional authority with clean contemporary aesthetics, reflecting the partners' combined expertise.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/berarkelemen/1.jpg", "/images/branding/berarkelemen/2.jpg", "/images/branding/berarkelemen/3.jpg", "/images/branding/berarkelemen/4.jpg", "/images/branding/berarkelemen/5.jpg"],
    },
    {
      id: "dentasuport", title: "Denta Suport",
      type: "Dental Clinic Brand Identity",
      role: "Brand Designer",
      tag: "Medical",
      image: "/images/branding/dentasuport/cover.jpg",
      context: "Denta Suport is a dental clinic offering comprehensive oral health services with a focus on patient comfort and modern treatment methods.",
      problem: "The clinic needed a professional brand identity that could reduce dental anxiety by communicating warmth and care, while still projecting medical competence and trustworthiness.",
      solution: "Designed a warm yet clinical brand system that uses soft forms and a reassuring color palette to make dental care feel approachable, backed by precise typographic structures for professional credibility.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/dentasuport/1.jpg", "/images/branding/dentasuport/2.jpg", "/images/branding/dentasuport/3.jpg", "/images/branding/dentasuport/4.jpg", "/images/branding/dentasuport/5.jpg"],
    },
    {
      id: "clinicadezambete", title: "Clinica de Zâmbete",
      type: "Dental Practice Brand Identity",
      role: "Brand Designer",
      tag: "Medical",
      image: "/images/branding/clinicadezambete/cover.png",
      context: "Clinica de Zâmbete (The Smiles Clinic) is a dental practice focused on cosmetic dentistry and smile transformations.",
      problem: "The clinic needed a brand identity that embodied the joy of a confident smile while maintaining the professionalism expected of a medical practice.",
      solution: "Created a cheerful yet polished identity that centers on the emotional outcome — the smile — using warm tones and friendly geometry balanced with clean medical typography.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/clinicadezambete/1.jpg", "/images/branding/clinicadezambete/2.jpg", "/images/branding/clinicadezambete/3.png", "/images/branding/clinicadezambete/4.jpg", "/images/branding/clinicadezambete/5.jpg"],
    },
    {
      id: "litoralulromanesc", title: "Litoralul Românesc",
      type: "Tourism Brand Identity",
      role: "Brand Designer",
      tag: "Tourism",
      image: "/images/branding/litoralulromanesc/cover.jpg",
      context: "Litoralul Românesc is a tourism promotion initiative for the Romanian Black Sea coastline, aiming to attract domestic and international visitors.",
      problem: "The Romanian coastline needed a cohesive brand identity that could compete with established Mediterranean destinations, reframing perceptions and highlighting unique coastal experiences.",
      solution: "Designed a vibrant, sun-and-sea inspired identity system that captures the charm and diversity of Romania's coast, from historic Constanța to the wild Danube Delta shores.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/litoralulromanesc/1.jpg", "/images/branding/litoralulromanesc/2.jpg", "/images/branding/litoralulromanesc/3.jpg", "/images/branding/litoralulromanesc/4.jpg", "/images/branding/litoralulromanesc/5.jpg"],
    },
    {
      id: "idpatrimoniu", title: "Identitate și Patrimoniu",
      type: "Cultural Heritage Brand Identity",
      role: "Brand Designer",
      tag: "Cultural",
      image: "/images/branding/idpatrimoniu/cover.png",
      context: "Identitate și Patrimoniu (Identity and Heritage) is a cultural program dedicated to documenting, preserving, and promoting Romania's built and intangible heritage.",
      problem: "The program needed a brand identity that could make heritage preservation feel relevant and engaging to younger generations while respecting the gravitas of cultural conservation.",
      solution: "Created a sophisticated identity that bridges past and present — using archival visual references filtered through contemporary design principles to make heritage feel living and urgent.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/idpatrimoniu/1.jpg", "/images/branding/idpatrimoniu/2.jpg", "/images/branding/idpatrimoniu/3.jpg", "/images/branding/idpatrimoniu/4.jpg", "/images/branding/idpatrimoniu/5.jpg"],
    },
    {
      id: "ecolab", title: "Ecolab",
      type: "Environmental Brand Identity",
      role: "Brand Designer",
      tag: "Sustainability",
      image: "/images/branding/ecolab/cover.jpg",
      context: "Ecolab is an environmental initiative focused on ecological education, sustainable practices, and community-level environmental action.",
      problem: "The initiative needed a brand identity that could communicate environmental urgency without being preachy, inspiring action through positive, solutions-oriented visual messaging.",
      solution: "Designed a fresh, growth-oriented brand system using natural forms and an evolving color palette that progresses from earth to canopy, symbolizing regeneration and positive environmental impact.",
      approach: ["Client Briefing & Discovery Session", "Brand Strategy & Positioning", "Visual Direction & Concept Development", "Logo Design & Refinement", "Color Palette & Typography System", "Brand Presentation", "Print & Digital Application Testing", "Final Deliverables & Brand Guidelines"],
      images: ["/images/branding/ecolab/1.jpg", "/images/branding/ecolab/2.jpg", "/images/branding/ecolab/3.jpg", "/images/branding/ecolab/4.jpg", "/images/branding/ecolab/5.jpg"],
    },
  ],
};

const experience = [
  { company: "EasyPost", role: "Product Designer Consultant", period: "Jan 2025 – Jan 2026", type: "SaaS · USA" },
  { company: "WeSupply", role: "Product Designer", period: "Apr 2021 – Dec 2025", type: "SaaS · Romania/USA" },
  { company: "Dreamtter – Redbee", role: "UI/UX Designer", period: "Mar 2024 – May 2025", type: "Mobile App" },
  { company: "Urbanlab", role: "Product Designer", period: "Jan 2024 – Oct 2025", type: "Platform" },
  { company: "GeoInt", role: "Product Designer", period: "Jun 2025 – Aug 2025", type: "Dashboard" },
  { company: "World Bank", role: "Brand & Communication Consultant", period: "2023", type: "Consulting" },
  { company: "Zona Metropolitană Timișoara", role: "Visual Identity Designer", period: "2026", type: "Public" },
  { company: "Salt & Pepper", role: "Graphic Designer", period: "2017", type: "Agency" },
];

const stats = [
  { value: "8+", label: "Years in Design" },
  { value: "10+", label: "Products Shipped" },
  { value: "20+", label: "Brands Crafted" },
  { value: "EU/US", label: "Client Markets" },
];

// ─── Styles ───
const globalStyles = `
  :root {
    --blue: ${BLUE};
    --dark: ${DARK};
    --dark2: ${DARK2};
    --light: ${LIGHT};
    --gray: ${GRAY};
    --white: ${WHITE};
    --font-sans: 'DM Sans', sans-serif;
    --font-mono: 'Space Mono', monospace;
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Base transitions for all interactive elements */
  a, button, span[style*="cursor: pointer"] {
    transition: all 0.3s var(--ease-out-quart);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeUpSmall {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes expandIn {
    from { opacity: 0; max-height: 0; }
    to { opacity: 1; max-height: 2000px; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.9); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes borderGlow {
    0%, 100% { border-color: rgba(255,255,255,0.15); }
    50% { border-color: rgba(255,255,255,0.35); }
  }
  @keyframes floatSlow {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  @media (max-width: 768px) {
    section { padding-left: 20px !important; padding-right: 20px !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  @keyframes grain {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-5%, -10%); }
    30% { transform: translate(3%, -15%); }
    50% { transform: translate(-2%, 5%); }
    70% { transform: translate(7%, -8%); }
    90% { transform: translate(-1%, 2%); }
  }

  @keyframes marqueeUp {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
  @keyframes marqueeDown {
    0% { transform: translateY(-50%); }
    100% { transform: translateY(0); }
  }

  @keyframes marqueeLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* Showcase column — pauses its inner strip on hover */
  .showcase-col:hover .showcase-strip {
    animation-play-state: paused;
  }

  /* Card container */
  .showcase-card {
    position: relative;
    border-radius: 0;
    overflow: hidden;
    cursor: pointer;
    transform: scale(1) rotate(0deg);
    transform-origin: center center;
    transition:
      transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 0.55s cubic-bezier(0.16, 1, 0.3, 1),
      filter 0.55s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 16px rgba(255,255,255,0.06);
    will-change: transform, box-shadow;
  }
  .showcase-card:hover {
    transform: scale(1.06) rotate(-0.5deg) !important;
    box-shadow: 0 24px 64px rgba(255,255,255,0.14), 0 8px 24px rgba(255,255,255,0.08);
    z-index: 20;
  }
  /* Dim siblings when one card is hovered */
  .showcase-col:hover .showcase-card:not(:hover) {
    filter: brightness(0.85) saturate(0.8);
  }

  /* Gradient overlay on hover */
  .showcase-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0,0,0,0) 40%,
      rgba(0,0,0,0.55) 100%
    );
    opacity: 0;
    transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
    z-index: 2;
    border-radius: 0;
  }
  .showcase-card:hover::before { opacity: 1; }

  /* Subtle shine sweep on hover */
  .showcase-card::after {
    content: '';
    position: absolute;
    inset: -120%;
    background: linear-gradient(
      115deg,
      transparent 40%,
      rgba(255,255,255,0.12) 45%,
      rgba(255,255,255,0.04) 50%,
      transparent 55%
    );
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    z-index: 3;
    animation: none;
  }
  .showcase-card:hover::after {
    opacity: 1;
    animation: shinePass 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  @keyframes shinePass {
    0% { transform: translateX(-40%) rotate(0deg); }
    100% { transform: translateX(40%) rotate(0deg); }
  }

  /* Label reveal */
  .showcase-card .showcase-info {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 20px 16px;
    z-index: 5;
    transform: translateY(12px);
    opacity: 0;
    transition:
      transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .showcase-card:hover .showcase-info {
    transform: translateY(0);
    opacity: 1;
  }

  /* Horizontal marquee row */
  .hmarquee-row:hover .hmarquee-strip {
    animation-play-state: paused;
  }
  .hmarquee-card {
    position: relative;
    border-radius: 0;
    overflow: hidden;
    flex-shrink: 0;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 2px 10px rgba(255,255,255,0.05);
  }
  .hmarquee-card:hover {
    transform: scale(1.05) rotate(-0.5deg);
    box-shadow: 0 16px 48px rgba(255,255,255,0.12);
    z-index: 10;
  }
  .hmarquee-card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,0) 45%, rgba(255,255,255,0.5) 100%);
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none; z-index: 2; border-radius: 0;
  }
  .hmarquee-card:hover::before { opacity: 1; }
  .hmarquee-card .hmarquee-label {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 14px 12px; z-index: 5;
    transform: translateY(8px); opacity: 0;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .hmarquee-card:hover .hmarquee-label {
    transform: translateY(0); opacity: 1;
  }

  /* Tag pill inside label */
  .showcase-tag {
    display: inline-block;
    font-size: 9px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    color: #FAFAFA;
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 4px 10px;
    border-radius: 6px;
    font-family: var(--font-mono);
  }
  .showcase-title {
    font-size: 15px; font-weight: 700; color: #fff;
    margin-top: 8px;
    text-shadow: 0 2px 12px rgba(255,255,255,0.4);
  }
  @media (max-width: 768px) {
    .showcase-title { font-size: 12px; }
    .showcase-card .showcase-info { padding: 12px 10px; }
  }
`;

// ─── Section Observer Hook ───
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Scroll Reveal Components ───
const revealVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const slideLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const slideRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

function Reveal({ children, variants = revealVariants, delay = 0, duration = 0.7, style = {}, className = "" }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerGroup({ children, stagger = 0.1, style = {} }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ staggerChildren: stagger }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, variants = revealVariants, style = {} }) {
  return (
    <motion.div
      variants={variants}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Navigation ───
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobile = useIsMobile();
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollToSection = (sectionId) => {
    setMenuOpen(false);
    if (page !== "home") {
      setPage("home");
      // Wait for home page to render, then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) window.lenis ? window.lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) window.lenis ? window.lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goToPage = (p) => {
    setMenuOpen(false);
    setPage(p);
    window.scrollTo(0, 0);
  };

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    padding: scrolled ? (mobile ? "8px 0" : "10px 0") : (mobile ? "16px 0" : "20px 0"),
    background: scrolled || menuOpen ? "rgba(11,11,11,0.85)" : "transparent",
    backdropFilter: scrolled || menuOpen ? "blur(20px) saturate(180%)" : "none",
    WebkitBackdropFilter: scrolled || menuOpen ? "blur(20px) saturate(180%)" : "none",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
    transition: "padding 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
  };

  const logoScale = scrolled ? 0.85 : 1;

  const linkStyle = (active) => ({
    color: active ? WHITE : "rgba(255,255,255,0.75)",
    textDecoration: "none",
    fontSize: mobile ? "15px" : "13px",
    fontWeight: 500,
    letterSpacing: "0.02em",
    cursor: "pointer",
    transition: "color 0.3s",
    fontFamily: "var(--font-sans)",
  });

  const sectionLinks = [
    { id: "services", label: "Services" },
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ cursor: "pointer", transform: `scale(${logoScale})`, transformOrigin: "left center", transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }} onClick={() => goToPage("home")}>
          <Logo color="white" />
        </div>

        {mobile ? (
          <>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: WHITE, cursor: "pointer", padding: 4 }}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {menuOpen && (
              <div style={{
                position: "absolute", top: "100%", left: 0, right: 0,
                background: "rgba(11,11,11,0.96)", backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                padding: "20px 24px 28px", display: "flex", flexDirection: "column", gap: 20,
                animation: "slideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              }}>
                {sectionLinks.map(link => (
                  <span
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    style={linkStyle(false)}
                  >
                    {link.label}
                  </span>
                ))}
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
                <span onClick={() => goToPage("resume")} style={{ ...linkStyle(page === "resume"), color: page === "resume" ? WHITE : GRAY }}>
                  Resume
                </span>
                <span onClick={() => goToPage("portfolio")} style={{
                  display: "block", textAlign: "center", width: "100%",
                  background: page === "portfolio" ? BLUE : "transparent",
                  color: page === "portfolio" ? DARK : WHITE, border: `1px solid ${page === "portfolio" ? BLUE : "rgba(255,255,255,0.18)"}`,
                  padding: "12px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer",
                }}>
                  Portfolio
                </span>
              </div>
            )}
          </>
        ) : (
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {sectionLinks.map(link => (
              <span
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={linkStyle(false)}
              >
                {link.label}
              </span>
            ))}
            <span onClick={() => goToPage("resume")} style={{ ...linkStyle(page === "resume"), display: "inline-flex", alignItems: "center", gap: 4 }}>Resume</span>
            <button onClick={() => goToPage("portfolio")} style={{
              background: page === "portfolio" ? BLUE : "transparent", color: page === "portfolio" ? DARK : WHITE,
              border: `1px solid ${page === "portfolio" ? BLUE : "rgba(255,255,255,0.18)"}`,
              padding: "8px 20px", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all 0.3s",
            }}>Portfolio</button>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Hero Section ───
// ─── Kinetic Grid ───
function KineticGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const mobile = useIsMobile();
  const dotsRef = useRef([]);
  const rafRef = useRef(null);

  const SPACING = mobile ? 36 : 44;
  const DOT_SIZE = mobile ? 1.2 : 1.5;
  const REPULSION = mobile ? 60 : 80;
  const RADIUS = mobile ? 120 : 180;
  const RETURN_SPEED = 0.06;
  const LINE_COLOR = "rgba(255,255,255,0.04)";
  const DOT_COLOR = "rgba(255,255,255,0.1)";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, cols, rows;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / SPACING) + 1;
      rows = Math.ceil(h / SPACING) + 1;
      const dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ ox: c * SPACING, oy: r * SPACING, x: c * SPACING, y: r * SPACING, vx: 0, vy: 0 });
        }
      }
      dotsRef.current = dots;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const dots = dotsRef.current;
      if (!dots.length) { rafRef.current = requestAnimationFrame(draw); return; }

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = d.ox - mx;
        const dy = d.oy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS && dist > 0) {
          const force = (1 - dist / RADIUS) * REPULSION;
          const angle = Math.atan2(dy, dx);
          d.vx += Math.cos(angle) * force * 0.08;
          d.vy += Math.sin(angle) * force * 0.08;
        }
        d.vx += (d.ox - d.x) * RETURN_SPEED;
        d.vy += (d.oy - d.y) * RETURN_SPEED;
        d.vx *= 0.85;
        d.vy *= 0.85;
        d.x += d.vx;
        d.y += d.vy;
      }

      // Grid lines
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const d = dots[idx];
          if (c < cols - 1) { const nr = dots[idx + 1]; ctx.moveTo(d.x, d.y); ctx.lineTo(nr.x, nr.y); }
          if (r < rows - 1) { const nb = dots[idx + cols]; ctx.moveTo(d.x, d.y); ctx.lineTo(nb.x, nb.y); }
        }
      }
      ctx.stroke();

      // Dots
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = d.x - mx;
        const dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const prox = Math.max(0, 1 - dist / RADIUS);
        ctx.beginPath();
        ctx.arc(d.x, d.y, DOT_SIZE + prox * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = prox > 0.1 ? `rgba(255,255,255,${0.18 + prox * 0.7})` : DOT_COLOR;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, [mobile]);

  useEffect(() => {
    if (mobile) {
      const onScroll = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.parentElement.getBoundingClientRect();
        const progress = window.scrollY / (window.innerHeight || 1);
        mouseRef.current = { x: rect.width * (0.3 + Math.sin(progress * 3) * 0.4), y: rect.height * (0.2 + progress * 0.6) };
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    } else {
      const onMove = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.parentElement.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      };
      const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
      return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseleave", onLeave); };
    }
  }, [mobile]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.7 }} />;
}

// ─── Animated Text ───
function AnimatedWords({ text, delay = 0, color, style = {} }) {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline", ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: "inline-block",
            marginRight: "0.3em",
            color: color || "inherit",
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ─── 3D Hero Object ───
function Hero3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene, camera, renderer, mesh, animId;
    let mouse = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };

    import("three").then((THREE) => {
      const size = container.clientWidth;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 4;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(size, size);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Icosahedron with wireframe
      const geometry = new THREE.IcosahedronGeometry(1.4, 1);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xFAFAFA,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const fillMat = new THREE.MeshBasicMaterial({
        color: 0xFAFAFA,
        transparent: true,
        opacity: 0.04,
      });

      mesh = new THREE.Group();
      const wireMesh = new THREE.Mesh(geometry, wireMat);
      const fillMesh = new THREE.Mesh(geometry, fillMat);
      mesh.add(wireMesh);
      mesh.add(fillMesh);
      scene.add(mesh);

      // Inner mesh - smaller torus knot for depth
      const torusGeo = new THREE.TorusKnotGeometry(0.5, 0.15, 64, 8);
      const torusMat = new THREE.MeshBasicMaterial({
        color: 0xFAFAFA,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const torus = new THREE.Mesh(torusGeo, torusMat);
      mesh.add(torus);

      // Particles around it
      const particleGeo = new THREE.BufferGeometry();
      const particleCount = 80;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const r = 2 + Math.random() * 0.8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0xFAFAFA,
        size: 0.04,
        transparent: true,
        opacity: 0.5,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      const onMove = (e) => {
        const rect = container.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        mouse.x = (e.clientX - cx) / window.innerWidth;
        mouse.y = (e.clientY - cy) / window.innerHeight;
      };
      window.addEventListener("mousemove", onMove);

      const onResize = () => {
        const s = container.clientWidth;
        renderer.setSize(s, s);
      };
      window.addEventListener("resize", onResize);

      const clock = new THREE.Clock();
      function animate() {
        const t = clock.getElapsedTime();

        // Smooth mouse follow
        target.x += (mouse.x - target.x) * 0.05;
        target.y += (mouse.y - target.y) * 0.05;

        if (mesh) {
          mesh.rotation.x = target.y * 0.6 + t * 0.1;
          mesh.rotation.y = target.x * 0.8 + t * 0.15;
          // Breathing scale
          const scale = 1 + Math.sin(t * 0.8) * 0.04;
          mesh.scale.set(scale, scale, scale);
          // Inner torus opposite rotation
          torus.rotation.x = -t * 0.3;
          torus.rotation.z = t * 0.2;
        }

        if (particles) {
          particles.rotation.y = t * 0.05;
          particles.rotation.x = t * 0.03;
        }

        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      }
      animate();

      // Cleanup ref
      container._cleanup = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
        geometry.dispose();
        torusGeo.dispose();
        particleGeo.dispose();
        wireMat.dispose();
        fillMat.dispose();
        torusMat.dispose();
        particleMat.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      };
    }).catch(() => {});

    return () => {
      if (container._cleanup) container._cleanup();
    };
  }, []);

  return (
    <div ref={containerRef} style={{
      width: "100%", aspectRatio: "1/1",
      position: "relative",
    }} />
  );
}

function Hero() {
  const [ref, visible] = useInView(0.1);
  const mobile = useIsMobile();

  return (
    <section ref={ref} style={{
      minHeight: "100vh", display: "flex", alignItems: "center", position: "relative",
      overflow: "hidden", padding: mobile ? "100px 20px 60px" : "120px 32px 80px",
    }}>
      {/* Kinetic Grid */}
      <KineticGrid />

      {/* Grain overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}/>
      
      <div style={{
        maxWidth: 1200, margin: "0 auto", width: "100%",
        display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr auto", gap: mobile ? 40 : 80, alignItems: "center",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
        transition: "all 0.9s var(--ease-out-expo)",
      }}>
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `${BLUE}08`, border: `1px solid ${BLUE}15`,
            borderRadius: 100, padding: "6px 16px", marginBottom: 28,
            animation: visible ? "fadeIn 0.6s ease 0.2s both" : "none",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", animation: "pulse 2s ease infinite", boxShadow: "0 0 8px rgba(74,222,128,0.6)" }}/>
            <span style={{ fontSize: 12, fontWeight: 500, color: BLUE, fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>
              AVAILABLE FOR PROJECTS
            </span>
          </div>
          
          <h1 style={{
            fontSize: mobile ? 32 : "clamp(40px, 5.5vw, 72px)", fontWeight: 700, lineHeight: 1.05,
            letterSpacing: "-0.03em", marginBottom: 24,
          }}>
            {visible && (
              <>
                <AnimatedWords text="Brand & Product Designer." delay={0.15} />
                <br/>
                <AnimatedWords text="Design your next brand and digital product." delay={0.55} color={BLUE} />
              </>
            )}
          </h1>
          
          {visible && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: mobile ? 15 : 18, lineHeight: 1.65, color: GRAY, maxWidth: 520, marginBottom: 40,
              }}
            >
              I create visual identities that build recognition and digital products that drive results. Working with companies and agencies across Europe and the US.
            </motion.p>
          )}
          
          {visible && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex", gap: 16, flexWrap: "wrap", flexDirection: mobile ? "column" : "row",
              }}
            >
            <a href="#contact" onClick={e => { e.preventDefault(); { const el = document.getElementById("contact"); if (el) window.lenis ? window.lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView({ behavior: "smooth" }); }; }} style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: BLUE, color: DARK, padding: "14px 28px", borderRadius: 8,
              fontSize: 15, fontWeight: 600, textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: `0 0 0 0 ${BLUE}40`,
              width: mobile ? "100%" : "auto",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 30px ${BLUE}40`; }}
            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = `0 0 0 0 ${BLUE}40`; }}
            >
              Schedule a Consultation <ArrowUpRight size={16} />
            </a>
            <a href="#work" onClick={e => { e.preventDefault(); { const el = document.getElementById("work"); if (el) window.lenis ? window.lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView({ behavior: "smooth" }); }; }} style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "transparent", color: WHITE, padding: "14px 28px", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.1)", fontSize: 15, fontWeight: 500,
              textDecoration: "none", transition: "all 0.3s",
              width: mobile ? "100%" : "auto",
            }}
            onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              Explore Case Studies
            </a>
          </motion.div>
          )}
        </div>

        {/* Avatar with 3D ring */}
        <div style={{
          position: "relative",
          animation: visible ? "fadeIn 1s ease 0.3s both" : "none",
          display: "flex", justifyContent: "center", alignItems: "center",
          order: mobile ? -1 : 0,
          width: mobile ? 280 : 460, height: mobile ? 280 : 460,
          margin: "0 auto",
        }}>
          {/* 3D background */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", justifyContent: "center", alignItems: "center",
            opacity: 0.9, pointerEvents: "none",
          }}>
            <Hero3D />
          </div>

          {/* Avatar on top */}
          <div style={{
            position: "relative", zIndex: 2,
            width: mobile ? 160 : 240, height: mobile ? 160 : 240, borderRadius: "50%",
            background: `linear-gradient(135deg, ${BLUE}, ${BLUE}80)`,
            padding: 4,
            boxShadow: `0 0 40px ${BLUE}30, 0 0 80px ${BLUE}20`,
          }}>
            <div className="img-shield" style={{
              width: "100%", height: "100%", borderRadius: "50%",
              background: `url('/avatar.png') center/cover`,
              filter: "grayscale(0.3)",
            }}/>
          </div>
          <div style={{
            position: "absolute", bottom: mobile ? 20 : 40, right: mobile ? 20 : 60, zIndex: 3,
            background: DARK2, border: "1px solid rgba(255,255,255,0.18)", boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
            color: WHITE,
            animation: "floatSlow 4s ease-in-out infinite",
            borderRadius: 12, padding: "8px 14px",
            fontSize: 12, fontWeight: 600, fontFamily: "var(--font-mono)",
          }}>
            8+ YRS
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Showcase Gallery ───
const showcaseItems = [
  // Column 1 — Brand → Product → Brand
  { id: 1, image: "/images/branding/forum01115/cover.png", label: "ForUM01115", tag: "Community", col: 0 },
  { id: 2, image: "/images/covers/wesupply.jpg", label: "WeSupply", tag: "SaaS", col: 0 },
  { id: 3, image: "/images/branding/redbee/cover.jpg", label: "Redbee Software", tag: "Tech", col: 0 },
  // Column 2 — Product → Brand → Product
  { id: 4, image: "/images/covers/urbanlab.jpg", label: "Urbanlab", tag: "Platform", col: 1 },
  { id: 5, image: "/images/branding/zonametro/cover.jpg", label: "Zona Metropolitană", tag: "Public", col: 1 },
  { id: 6, image: "/images/covers/geoint.jpg", label: "GeoInt", tag: "Dashboard", col: 1 },
  // Column 3 — Brand → Personal → Brand
  { id: 7, image: "/images/branding/mindtune/cover.jpg", label: "MindTune", tag: "Consulting", col: 2 },
  { id: 8, image: "/images/showcase/7.jpg", label: "Tale Jewelry", tag: "Spatial AR", col: 2 },
  { id: 9, image: "/images/branding/roboticsvalley/cover.png", label: "Robotics Valley", tag: "Innovation", col: 2 },
  // Column 4 — Product → Brand → Product
  { id: 10, image: "/images/covers/dreamtter.jpg", label: "Dreamtter", tag: "Mobile App", col: 3 },
  { id: 11, image: "/images/branding/turbo/cover.jpg", label: "Turbo Coffee", tag: "F&B", col: 3 },
  { id: 12, image: "/images/covers/refracto.jpg", label: "Refracto", tag: "SaaS", col: 3 },
];

function ShowcaseGallery() {
  const mobile = useIsMobile();
  const colCount = mobile ? 2 : 4;
  const containerRef = useRef(null);
  const [paused, setPaused] = useState(null); // which col is paused

  // Distribute items into columns
  const columns = useMemo(() => {
    const cols = Array.from({ length: colCount }, () => []);
    showcaseItems.forEach((item) => {
      const c = mobile ? (item.id - 1) % 2 : item.col;
      cols[c].push(item);
    });
    return cols;
  }, [colCount, mobile]);

  // Column config: alternating directions, varied speeds
  const colConfig = mobile
    ? [
        { dir: "up", speed: 55 },
        { dir: "down", speed: 45 },
      ]
    : [
        { dir: "up", speed: 60 },
        { dir: "down", speed: 50 },
        { dir: "up", speed: 70 },
        { dir: "down", speed: 55 },
      ];

  return (
    <section style={{ padding: mobile ? "48px 0 0" : "72px 0 0", overflow: "hidden" }}>
      {/* Section header */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: mobile ? "0 20px" : "0 32px", marginBottom: mobile ? 28 : 40 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, color: BLUE, letterSpacing: "0.12em",
          fontFamily: "var(--font-mono)", textTransform: "uppercase",
          display: "inline-block", background: `${BLUE}08`,
          padding: "6px 14px", borderRadius: 100, border: `1px solid ${BLUE}12`,
        }}>
          Brand & Product
        </span>
        <h2 style={{
          fontSize: mobile ? 24 : "clamp(28px, 3.5vw, 40px)",
          fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.15, marginTop: 16,
        }}>
          Identity systems and digital products
        </h2>
        <p style={{ fontSize: 15, color: GRAY, marginTop: 10, maxWidth: 420 }}>
          Curated screens from product, branding, and spatial design projects.
        </p>
      </div>

      {/* Marquee columns */}
      <div ref={containerRef} style={{ position: "relative" }}>
        {/* Top + bottom fade masks */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: mobile ? 60 : 100,
          background: `linear-gradient(to bottom, ${DARK}, transparent)`,
          zIndex: 3, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: mobile ? 60 : 100,
          background: `linear-gradient(to top, ${DARK}, transparent)`,
          zIndex: 3, pointerEvents: "none",
        }} />

        <div style={{
          height: mobile ? 440 : 580,
          display: "grid",
          gridTemplateColumns: `repeat(${colCount}, 1fr)`,
          gap: mobile ? 10 : 14,
          padding: mobile ? "0 10px" : "0 40px",
          overflow: "hidden",
        }}>
          {columns.map((colItems, colIdx) => {
            const { dir, speed } = colConfig[colIdx];
            // Triple items for seamless loop
            const tripled = [...colItems, ...colItems, ...colItems];

            return (
              <div
                key={colIdx}
                className="showcase-col"
                onMouseEnter={() => setPaused(colIdx)}
                onMouseLeave={() => setPaused(null)}
                style={{ overflow: "hidden", position: "relative" }}
              >
                <div
                  className="showcase-strip"
                  style={{
                    display: "flex", flexDirection: "column",
                    gap: mobile ? 10 : 14,
                    animation: `marquee${dir === "up" ? "Up" : "Down"} ${speed}s linear infinite`,
                    animationPlayState: paused === colIdx ? "paused" : "running",
                  }}
                >
                  {tripled.map((item, idx) => (
                    <div
                      key={`${item.id}-${colIdx}-${idx}`}
                      className="showcase-card img-shield"
                    >
                      {/* Image — lazy loaded */}
                      <LazyImage
                        src={item.image}
                        alt={item.label}
                        aspectRatio="3/4"
                        style={{
                          borderRadius: 0,
                          overflow: "hidden",
                        }}
                      />
                      <div style={{ display: "none" }}>
                        {!item.image && (
                          <div style={{
                            width: "100%", height: "100%",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: mobile ? 28 : 36, fontWeight: 800,
                            color: "rgba(255,255,255,0.04)", fontFamily: "var(--font-mono)",
                            letterSpacing: "-0.02em",
                          }}>
                            {item.label.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>

                      {/* Hover label */}
                      <div className="showcase-info">
                        <span className="showcase-tag">{item.tag}</span>
                        <div className="showcase-title">{item.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Stats Bar ───
function StatsBar() {
  const mobile = useIsMobile();
  return (
    <div style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "40px 32px",
    }}>
      <StaggerGroup stagger={0.12} style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: mobile ? 20 : 32,
      }}>
        {stats.map((s, i) => (
          <StaggerItem key={i} variants={scaleVariants} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: BLUE, fontFamily: "var(--font-mono)", marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: GRAY, fontWeight: 500 }}>{s.label}</div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

// ─── Services Section ───
function Services() {
  const [ref, visible] = useInView(0.05);
  const [expanded, setExpanded] = useState(null);
  const [selectedTier, setSelectedTier] = useState({});
  const mobile = useIsMobile();

  const getTier = (serviceIdx) => selectedTier[serviceIdx] ?? 0;

  return (
    <section id="services" ref={ref} style={{ padding: "100px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal delay={0}>
        <div style={{ marginBottom: 64 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: BLUE, letterSpacing: "0.12em", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 16, display: "inline-block", background: `${BLUE}08`, padding: "6px 14px", borderRadius: 100, border: `1px solid ${BLUE}12` }}>
            Services
          </span>
          <h2 style={{ fontSize: mobile ? 28 : "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>
            What I can do for<br/>your product
          </h2>
          <p style={{ fontSize: 16, color: GRAY, maxWidth: 500, lineHeight: 1.6 }}>
            Flexible engagements tailored to your product's stage. From quick audits to full product design partnerships.
          </p>
        </div>
        </Reveal>

        <Reveal delay={0.2}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: mobile ? 16 : 20, alignItems: "start" }}>
          {services.map((s, i) => {
            const isOpen = expanded === i;
            const activeTier = getTier(i);
            const isPremium = s.id === "packaging";
            return (
            <div
              key={s.id}
              style={{
                background: isPremium
                  ? (isOpen
                      ? "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 100%)"
                      : "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 100%)")
                  : (isOpen ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)"),
                border: `1px solid ${isPremium ? "rgba(255,255,255,0.18)" : (isOpen ? `${BLUE}30` : "rgba(255,255,255,0.06)")}`,
                borderRadius: 16, padding: 32,
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)",
                transitionDelay: `${i * 0.1}s`,
                position: "relative",
                overflow: "hidden",
                boxShadow: isPremium ? "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" : "none",
              }}
              onMouseEnter={e => {
                if (!isOpen) e.currentTarget.style.borderColor = isPremium ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.1)";
                if (isPremium && !isOpen) e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                if (!isOpen) e.currentTarget.style.borderColor = isPremium ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)";
                if (isPremium && !isOpen) e.currentTarget.style.transform = "none";
              }}
            >
              {/* Premium badge */}
              {isPremium && (
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  padding: "6px 14px 7px 18px",
                  fontSize: 9, fontWeight: 700, color: DARK, fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  background: "linear-gradient(135deg, #FAFAFA 0%, #C5C5C7 100%)",
                  borderBottomLeftRadius: 12,
                  zIndex: 2,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <Sparkles size={11} strokeWidth={2.4} />
                  New · Premium
                </div>
              )}

              {/* Subtle radial overlay for depth */}
              {isPremium && (
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(255,255,255,0.04) 0%, transparent 50%)",
                  zIndex: 0,
                }} />
              )}

              <div
                onClick={() => setExpanded(isOpen ? null : i)}
                style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, gap: 16, position: "relative", zIndex: 1 }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{
                    marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center",
                    width: isPremium ? 52 : 44, height: isPremium ? 52 : 44,
                    borderRadius: 12,
                    background: isPremium
                      ? "linear-gradient(135deg, #FAFAFA 0%, #C5C5C7 100%)"
                      : `${BLUE}12`,
                    border: isPremium ? "1px solid rgba(255,255,255,0.25)" : `1px solid ${BLUE}20`,
                    boxShadow: isPremium ? "0 4px 16px rgba(255,255,255,0.15)" : "none",
                    transition: "all 0.3s var(--ease-out-quart)",
                  }}>
                    <s.icon size={isPremium ? 26 : 22} color={isPremium ? DARK : BLUE} strokeWidth={isPremium ? 2 : 1.8} />
                  </div>
                  <h3 style={{ fontSize: isPremium ? 24 : 22, fontWeight: 700, marginBottom: 8, letterSpacing: isPremium ? "-0.01em" : "normal" }}>{s.title}</h3>
                </div>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: isOpen ? BLUE : (isPremium ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)"),
                  border: isPremium && !isOpen ? "1px solid rgba(255,255,255,0.18)" : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.4s var(--ease-out-quart)",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}>
                  <Plus size={18} color={isOpen ? DARK : (isPremium ? WHITE : GRAY)} strokeWidth={2.4} />
                </div>
              </div>
              <p style={{ fontSize: 14, color: isPremium ? "rgba(255,255,255,0.78)" : GRAY, lineHeight: 1.6, marginBottom: 20, position: "relative", zIndex: 1 }}>{s.desc}</p>

              {/* Pricing tiers — clickable */}
              <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", gap: 12, marginBottom: isOpen ? 20 : 0, alignItems: mobile ? "stretch" : "stretch" }}>
                {s.tiers.map((t, j) => (
                  <div key={j} style={{ flex: mobile ? "none" : 1, display: "flex", flexDirection: "column" }}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isOpen && activeTier === j) {
                          setExpanded(null);
                        } else {
                          setSelectedTier(p => ({ ...p, [i]: j }));
                          if (!isOpen) setExpanded(i);
                        }
                      }}
                      style={{
                        borderRadius: 10, padding: "12px 14px", cursor: "pointer",
                        background: activeTier === j && isOpen ? `${BLUE}08` : "rgba(255,255,255,0.02)",
                        border: `1px solid ${activeTier === j && isOpen ? `${BLUE}25` : "rgba(255,255,255,0.04)"}`,
                        transition: "all 0.3s var(--ease-out-quart)",
                        transform: activeTier === j && isOpen ? "translateY(-2px)" : "none",
                        boxShadow: activeTier === j && isOpen ? `0 4px 12px ${BLUE}10` : "none",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        flex: mobile ? "none" : 1,
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 11, color: activeTier === j && isOpen ? BLUE : GRAY, fontWeight: 600, marginBottom: 4, fontFamily: "var(--font-mono)" }}>{t.label}</div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: WHITE }}>
                          View details
                        </div>
                      </div>
                      <ChevronRight size={18} color={activeTier === j && isOpen ? BLUE : GRAY} style={{
                        transition: "transform 0.3s var(--ease-out-quart)",
                        transform: activeTier === j && isOpen ? "rotate(90deg)" : "none",
                        flexShrink: 0,
                      }} />
                    </div>

                    {/* Mobile: deliverables expand right below the clicked tier */}
                    {mobile && isOpen && activeTier === j && (
                      <div style={{ animation: "fadeUpSmall 0.3s var(--ease-out-expo)", padding: "14px 0 4px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          {t.deliverables.map((d, k) => (
                            <div key={k} style={{
                              display: "flex", alignItems: "center", gap: 8,
                              fontSize: 12, color: "rgba(255,255,255,0.65)", fontWeight: 500,
                              padding: "6px 12px", borderRadius: 6,
                              background: "rgba(255,255,255,0.02)",
                              animation: `slideRight 0.3s var(--ease-out-expo) ${k * 0.03}s both`,
                            }}>
                              <span style={{ width: 4, height: 4, borderRadius: "50%", background: BLUE, flexShrink: 0 }} />
                              {d}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop: Expanded deliverables below all tiers */}
              {!mobile && isOpen && (
                <div style={{ animation: "fadeUpSmall 0.4s var(--ease-out-expo)", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: BLUE, fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>
                      WHAT'S INCLUDED — {s.tiers[activeTier].label.toUpperCase()}
                    </div>
                    <div style={{ fontSize: 11, color: GRAY, fontFamily: "var(--font-mono)" }}>
                      {s.tiers[activeTier].deliverables.length} deliverables
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {s.tiers[activeTier].deliverables.map((d, k) => (
                      <div key={k} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 500,
                        padding: "8px 14px", borderRadius: 8,
                        background: "rgba(255,255,255,0.02)",
                        animation: `slideRight 0.35s var(--ease-out-expo) ${k * 0.04}s both`,
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: BLUE, flexShrink: 0 }} />
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Request CTA */}
                  <div style={{
                    marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)",
                    animation: "fadeUpSmall 0.4s var(--ease-out-expo) 0.1s both",
                    display: "flex", flexDirection: mobile ? "column" : "row", gap: 12, flexWrap: "wrap", alignItems: "center",
                  }}>
                    <a
                      href={`https://wa.me/40720570232?text=${encodeURIComponent(`Hi Cătălin, I'm interested in your ${s.title} service — ${s.tiers[activeTier].label}. I'd like to discuss my project.`)}`}
                      target="_blank"
                      rel="noopener"
                      onClick={e => e.stopPropagation()}
                      style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                        background: "#25D366", color: "#fff", padding: "12px 24px", borderRadius: 10,
                        fontSize: 14, fontWeight: 600, textDecoration: "none",
                        transition: "all 0.3s", boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
                        width: mobile ? "100%" : "auto",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,211,102,0.5)"; e.currentTarget.style.background = "#1FB855"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(37,211,102,0.3)"; e.currentTarget.style.background = "#25D366"; }}
                    >
                      <WhatsAppIcon size={18} color="#fff" />
                      Request This Service
                    </a>
                    <a
                      href="https://calendly.com/catalin-dobrean/30min"
                      target="_blank"
                      rel="noopener"
                      onClick={e => e.stopPropagation()}
                      style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                        background: "transparent", color: WHITE, padding: "12px 24px", borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.12)", fontSize: 14, fontWeight: 500,
                        textDecoration: "none", transition: "all 0.3s",
                        width: mobile ? "100%" : "auto",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                    >
                      <Calendar size={15} /> Schedule a Call
                    </a>
                    <span style={{ fontSize: 12, color: GRAY, fontFamily: "var(--font-mono)", marginLeft: mobile ? 0 : 4, textAlign: mobile ? "center" : "left", width: mobile ? "100%" : "auto" }}>
                      {s.tiers[activeTier].label}
                    </span>
                  </div>
                </div>
              )}

              {/* Mobile: Request CTA below tiers */}
              {mobile && isOpen && (
                <div style={{
                  animation: "fadeUpSmall 0.4s var(--ease-out-expo) 0.1s both",
                  display: "flex", flexDirection: "column", gap: 12, paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <a
                    href={`https://wa.me/40720570232?text=${encodeURIComponent(`Hi Cătălin, I'm interested in your ${s.title} service — ${s.tiers[activeTier].label}. I'd like to discuss my project.`)}`}
                    target="_blank" rel="noopener" onClick={e => e.stopPropagation()}
                    style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                      background: "#25D366", color: "#fff", padding: "12px 24px", borderRadius: 10,
                      fontSize: 14, fontWeight: 600, textDecoration: "none", width: "100%",
                      boxShadow: "0 4px 16px rgba(37,211,102,0.3)", transition: "all 0.3s",
                    }}
                  >
                    <WhatsAppIcon size={18} color="#fff" />
                    Request This Service
                  </a>
                  <a
                    href="https://calendly.com/catalin-dobrean/30min"
                    target="_blank" rel="noopener" onClick={e => e.stopPropagation()}
                    style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                      background: "transparent", color: WHITE, padding: "12px 24px", borderRadius: 10,
                      border: "1px solid rgba(255,255,255,0.1)", fontSize: 14, fontWeight: 500,
                      textDecoration: "none", width: "100%",
                    }}
                  >
                    <Calendar size={15} /> Schedule a Call
                  </a>
                </div>
              )}
            </div>
          );})}
        </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Work / Portfolio Preview ───
function WorkPreview({ setPage, openProject }) {
  const [ref, visible] = useInView(0.05);
  const mobile = useIsMobile();

  const featuredBranding = ["forum01115", "redbee", "zonametro"];

  const renderCard = (cs, i, isBranding) => (
    <motion.div
      key={cs.id}
      initial={{ opacity: 0, y: 40, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => openProject(cs.id)}
      style={{
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16, overflow: "hidden", cursor: "pointer",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(255,255,255,0.06)" }}
    >
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <LazyImage
          src={cs.image}
          alt={cs.title}
          className="img-shield"
          style={{
            position: "absolute", inset: 0,
            transition: "transform 0.6s var(--ease-out-expo)",
          }}
        />
        {!cs.image && (
          <span style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 48, fontWeight: 800, color: "rgba(255,255,255,0.06)", fontFamily: "var(--font-mono)",
          }}>
            {cs.title.slice(0, 2).toUpperCase()}
          </span>
        )}
        <span style={{
          position: "absolute", top: 14, right: 14,
          fontSize: 10, fontWeight: 700, color: "#fff", fontFamily: "var(--font-mono)",
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
          padding: "4px 10px", borderRadius: 100, letterSpacing: "0.05em",
        }}>
          {cs.tag}
        </span>
      </div>
      <div style={{ padding: "24px 24px 28px" }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: WHITE }}>{cs.title}</h3>
        <p style={{ fontSize: 13, color: BLUE, fontWeight: 600, marginBottom: 12 }}>{cs.type}</p>
        <p style={{ fontSize: 13, color: GRAY, lineHeight: 1.6 }}>{cs.context.slice(0, 120)}...</p>
      </div>
    </motion.div>
  );

  return (
    <section id="work" ref={ref} style={{ padding: "100px 32px", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64,
        }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: BLUE, letterSpacing: "0.12em", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 16, display: "inline-block", background: `${BLUE}08`, padding: "6px 14px", borderRadius: 100, border: `1px solid ${BLUE}12` }}>
              Selected Work
            </span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Case Studies
            </h2>
          </div>
          {!mobile && (
            <button
              onClick={() => setPage("portfolio")}
              style={{
                background: "transparent", color: BLUE, border: `1px solid ${BLUE}30`,
                padding: "10px 24px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all 0.3s",
                display: "inline-flex", alignItems: "center", gap: 6,
              }}
              onMouseEnter={e => { e.target.style.background = `${BLUE}10`; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; }}
            >
              View All <ArrowUpRight size={14} />
            </button>
          )}
        </div>
        </Reveal>

        {/* Product / UI / UX */}
        <Reveal variants={slideLeftVariants} delay={0.1}>
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: GRAY, letterSpacing: "0.1em", fontFamily: "var(--font-mono)", textTransform: "uppercase", display: "inline-block", marginBottom: 20 }}>
            Product / UI / UX
          </span>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: mobile ? 16 : 20 }}>
            {portfolioProjects.product.filter(p => featuredProjects.includes(p.id)).map((cs, i) => renderCard(cs, i, false))}
          </div>
        </div>
        </Reveal>

        {/* Brand Identity */}
        <Reveal variants={slideRightVariants} delay={0.1}>
        <div style={{ marginTop: 48 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: GRAY, letterSpacing: "0.1em", fontFamily: "var(--font-mono)", textTransform: "uppercase", display: "inline-block", marginBottom: 20 }}>
            Brand Identity
          </span>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: mobile ? 16 : 20 }}>
            {portfolioProjects.branding.filter(p => featuredBranding.includes(p.id)).map((cs, i) => renderCard(cs, i + 3, true))}
          </div>
        </div>
        </Reveal>

        {/* Mobile View All — below the last card */}
        {mobile && (
          <Reveal delay={0.2}>
            <button
              onClick={() => setPage("portfolio")}
              style={{
                marginTop: 32, width: "100%",
                background: BLUE, color: DARK, border: "none",
                padding: "14px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600,
                cursor: "pointer", fontFamily: "var(--font-sans)",
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: `0 4px 16px ${BLUE}20`, transition: "all 0.3s",
              }}
            >
              View All Projects <ArrowUpRight size={16} />
            </button>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ─── Process Timeline ───
const processSteps = [
  { icon: MessageCircle, title: "Discovery", desc: "Brief, research, and strategy workshop to understand your goals, audience, and competitive landscape.", duration: "1 week" },
  { icon: Compass, title: "Strategy", desc: "Brand positioning, value proposition, and creative direction. The foundation everything else builds on.", duration: "1–2 weeks" },
  { icon: PenTool, title: "Design", desc: "Visual identity systems, UI/UX exploration, and iterative refinement based on your feedback.", duration: "3–6 weeks" },
  { icon: Layers, title: "Systems", desc: "Brand guidelines, component libraries, design tokens — everything documented for future scale.", duration: "1 week" },
  { icon: Send, title: "Delivery", desc: "Final assets, developer handoff, brand presentation. Ongoing support to ensure perfect execution.", duration: "1 week" },
];

function ProcessTimeline() {
  const mobile = useIsMobile();
  return (
    <section style={{ padding: mobile ? "80px 20px" : "120px 32px", overflow: "hidden", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
        <div style={{ marginBottom: mobile ? 48 : 80, textAlign: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: BLUE, letterSpacing: "0.12em", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 16, display: "inline-block", background: `${BLUE}08`, padding: "6px 14px", borderRadius: 100, border: `1px solid ${BLUE}12` }}>
            How I work
          </span>
          <h2 style={{ fontSize: mobile ? 28 : "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16, marginTop: 16 }}>
            A proven process<br/>built for clarity
          </h2>
          <p style={{ fontSize: 16, color: GRAY, maxWidth: 540, lineHeight: 1.6, margin: "0 auto" }}>
            Every project follows the same structured approach — refined across 100+ engagements. No surprises, just clear milestones and predictable outcomes.
          </p>
        </div>
        </Reveal>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Connecting line — desktop only */}
          {!mobile && (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute", top: 32, left: "10%", right: "10%", height: 2,
                background: `linear-gradient(to right, transparent, ${BLUE}40, ${BLUE}40, transparent)`,
                transformOrigin: "left center",
                zIndex: 0,
              }}
            />
          )}

          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(5, 1fr)",
            gap: mobile ? 32 : 24,
            position: "relative",
            zIndex: 1,
          }}>
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: "center", position: "relative" }}
              >
                {/* Number badge */}
                <div style={{
                  position: "absolute", top: -10, left: mobile ? "calc(50% - 100px)" : "calc(50% - 60px)",
                  fontSize: 11, fontWeight: 700, color: GRAY, fontFamily: "var(--font-mono)", letterSpacing: "0.1em",
                }}>
                  0{i + 1}
                </div>

                {/* Icon circle */}
                <div
                  style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "#FAFAFA",
                    border: "1px solid rgba(255,255,255,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 24px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    position: "relative",
                    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "linear-gradient(135deg, #C5C5C7 0%, #8A8A8E 100%)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#FAFAFA";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
                  }}
                >
                  <step.icon size={26} color="#0B0B0B" strokeWidth={1.8} />
                </div>

                <div style={{ fontSize: 11, fontWeight: 700, color: GRAY, fontFamily: "var(--font-mono)", letterSpacing: "0.1em", marginBottom: 8, textTransform: "uppercase" }}>
                  {step.duration}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: WHITE }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: GRAY, lineHeight: 1.6, maxWidth: 200, margin: "0 auto" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Reveal delay={0.3}>
        <div style={{ textAlign: "center", marginTop: mobile ? 48 : 80, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: 14, color: GRAY, marginBottom: 20, fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>
            Typical project timeline: <span style={{ color: BLUE, fontWeight: 700 }}>6–12 weeks</span>
          </p>
          <a href="https://calendly.com/catalin-dobrean/30min" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: BLUE, color: DARK, padding: "14px 28px", borderRadius: 100,
            fontSize: 14, fontWeight: 600, textDecoration: "none",
            boxShadow: `0 8px 30px ${BLUE}30`,
            transition: "all 0.3s",
          }}
          onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.target.style.transform = "none"}
          >
            <Calendar size={16} /> Start a conversation
          </a>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── About Section ───
function About({ setPage }) {
  const [ref, visible] = useInView(0.1);
  const mobile = useIsMobile();

  return (
    <section id="about" ref={ref} style={{ padding: "100px 32px", background: "rgba(255,255,255,0.015)", overflow: "hidden" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 40 : 80,
      }}>
        <Reveal variants={slideLeftVariants} duration={0.8}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: BLUE, letterSpacing: "0.12em", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 16, display: "inline-block", background: `${BLUE}08`, padding: "6px 14px", borderRadius: 100, border: `1px solid ${BLUE}12` }}>
            About
          </span>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 24 }}>
            Product thinking<br/>meets visual craft.
          </h2>
          <p style={{ fontSize: 15, color: GRAY, lineHeight: 1.7, marginBottom: 20 }}>
            I'm a brand and product designer working with companies and agencies since 2021 through Qubist Design Studio. My work focus on two connected disciplines — building brand identities that create recognition, and designing digital products that turn that recognition into results.
          </p>
          <p style={{ fontSize: 15, color: GRAY, lineHeight: 1.7, marginBottom: 32 }}>
            From visual identity systems and brand guidelines to SaaS platforms, mobile apps, and dashboards, I create useful, functional experiences that connect brand and product.
          </p>
          
          {/* Skills tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            {["Figma", "Adobe", "AI Tools", "Brand Strategy", "Visual Identity", "Logo Design", "Art Direction", "Design Systems", "Prototyping", "UX Strategy"].map(s => (
              <span key={s} style={{
                fontSize: 12, fontWeight: 500, color: WHITE, background: "rgba(255,255,255,0.05)",
                padding: "6px 14px", borderRadius: 100,
              }}>{s}</span>
            ))}
          </div>

          <span
            onClick={() => setPage("resume")}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              color: BLUE, fontSize: 14, fontWeight: 600, textDecoration: "none",
              borderBottom: `1px solid ${BLUE}40`, paddingBottom: 2, cursor: "pointer",
            }}
          >
            View Full Experience <ArrowUpRight size={14} />
          </span>
        </div>
        </Reveal>

        {/* Experience timeline */}
        <Reveal variants={slideRightVariants} duration={0.8} delay={0.15}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: GRAY, letterSpacing: "0.1em", fontFamily: "var(--font-mono)", marginBottom: 24 }}>
            EXPERIENCE — QUBIST DESIGN STUDIO
          </div>
          {experience.map((e, i) => (
            <div key={i} style={{
              padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "center",
              opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-20px)",
              transition: `all 0.5s ease ${0.1 + i * 0.08}s`,
            }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>{e.company}</div>
                <div style={{ fontSize: 13, color: GRAY }}>{e.role}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: GRAY, fontFamily: "var(--font-mono)" }}>{e.period}</div>
                <div style={{ fontSize: 11, color: BLUE, fontWeight: 600 }}>{e.type}</div>
              </div>
            </div>
          ))}
          
          <div style={{ marginTop: 24, padding: "16px 20px", background: `${BLUE}08`, borderRadius: 12, border: `1px solid ${BLUE}15` }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: WHITE, marginBottom: 4 }}>Education</div>
            <div style={{ fontSize: 12, color: GRAY }}>University of Art and Design, Cluj-Napoca — Bachelor's Degree (2016–2020)</div>
          </div>

          <div style={{ marginTop: 12, padding: "16px 20px", background: `${BLUE}08`, borderRadius: 12, border: `1px solid ${BLUE}15` }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: WHITE, marginBottom: 4 }}>Global Recognition</div>
            <div style={{ fontSize: 12, color: GRAY }}>NASA Space App Challenge — Global Nominee · Microsoft Azure Hackathon — Top 50</div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Contact Section ───
// ─── Design ROI Calculator ───
function DesignROICalculator() {
  const mobile = useIsMobile();
  const [ref, visible] = useInView(0.1);
  const [revenue, setRevenue] = useState(50000);
  const [convRate, setConvRate] = useState(2);
  const [investment, setInvestment] = useState(5000);

  // Forrester data
  const uiBoost = 2.0;   // 200% increase
  const uxBoost = 4.0;   // 400% increase
  const roiMultiplier = 100; // $1 → $100

  // Calculations
  const currentConversions = revenue * (convRate / 100);
  const uiRevenue = revenue * (1 + uiBoost * (convRate / 100));
  const uxRevenue = revenue * (1 + uxBoost * (convRate / 100));
  const additionalRevenueUI = uiRevenue - revenue;
  const additionalRevenueUX = uxRevenue - revenue;
  const projectedROI = investment * roiMultiplier;
  const annualGainUX = additionalRevenueUX * 12;

  // Bar heights (max height = 100%)
  const maxRev = Math.max(revenue, uiRevenue, uxRevenue);
  const barCurrent = (revenue / maxRev) * 100;
  const barUI = (uiRevenue / maxRev) * 100;
  const barUX = (uxRevenue / maxRev) * 100;

  const fmt = (n) => {
    if (n >= 1000000) return `€${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `€${(n / 1000).toFixed(0)}K`;
    return `€${n.toFixed(0)}`;
  };

  const SliderInput = ({ label, value, onChange, min, max, step, format, milestones }) => {
    const trackRef = useRef(null);
    const draggingRef = useRef(false);
    const [isDragging, setIsDragging] = useState(false);
    const pct = ((value - min) / (max - min)) * 100;

    const calcFromX = (clientX) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const steps = Math.round((ratio * (max - min)) / step);
      const newVal = Math.max(min, Math.min(max, min + steps * step));
      onChange(Number(newVal.toFixed(2)));
    };

    // Pointer events handle touch + mouse + pen uniformly and reliably
    const handlePointerDown = (e) => {
      e.preventDefault();
      draggingRef.current = true;
      setIsDragging(true);
      // Capture pointer so we keep getting move events even if finger/cursor leaves the element
      e.currentTarget.setPointerCapture(e.pointerId);
      calcFromX(e.clientX);
    };

    const handlePointerMove = (e) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      calcFromX(e.clientX);
    };

    const handlePointerUp = (e) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setIsDragging(false);
      try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}
    };

    return (
    <div style={{ marginBottom: mobile ? 24 : 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: WHITE }}>{label}</label>
        <span style={{ fontSize: 18, fontWeight: 700, color: BLUE, fontFamily: "var(--font-mono)", transition: "color 0.3s ease" }}>{format(value)}</span>
      </div>

      {/* Track with fill — DRAGGABLE via Pointer Events */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: "relative", height: mobile ? 44 : 32, marginBottom: 6,
          padding: mobile ? "18px 0" : "13px 0",
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "none", userSelect: "none", WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
        }}
      >
        {/* Background track */}
        <div style={{
          position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)",
          height: mobile ? 8 : 6, borderRadius: 100,
          background: "rgba(255,255,255,0.08)",
          pointerEvents: "none",
        }} />
        {/* Fill */}
        <div style={{
          position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
          width: `${pct}%`, height: mobile ? 8 : 6, borderRadius: 100,
          background: BLUE,
          transition: isDragging ? "none" : "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "none",
        }} />
        {/* Thumb */}
        <div style={{
          position: "absolute", top: "50%",
          left: `${pct}%`,
          transform: `translate(-50%, -50%) scale(${isDragging ? 1.15 : 1})`,
          width: mobile ? 28 : 20, height: mobile ? 28 : 20,
          borderRadius: "50%", background: BLUE,
          border: `3px solid ${DARK}`,
          boxShadow: isDragging
            ? "0 8px 24px rgba(255,255,255,0.2), 0 0 0 8px rgba(255,255,255,0.1)"
            : "0 4px 12px rgba(0,0,0,0.6)",
          transition: isDragging
            ? "transform 0.15s ease, box-shadow 0.2s ease"
            : "left 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease, box-shadow 0.2s ease",
          pointerEvents: "none",
        }} />
      </div>

      {/* Milestone markers — still clickable */}
      <div style={{ position: "relative", height: mobile ? 32 : 28, marginTop: 2 }}>
        {milestones.map((m, idx) => {
          const mPct = ((m - min) / (max - min)) * 100;
          const isActive = value >= m;
          const isSelected = Math.abs(value - m) < step / 2;
          return (
            <div
              key={idx}
              onClick={() => onChange(m)}
              style={{
                position: "absolute",
                left: `${mPct}%`,
                transform: "translateX(-50%)",
                display: "flex", flexDirection: "column", alignItems: "center",
                cursor: "pointer", gap: 4,
              }}
            >
              {/* Dot */}
              <div style={{
                width: isSelected ? 12 : 8, height: isSelected ? 12 : 8,
                borderRadius: "50%",
                background: isActive ? BLUE : "rgba(255,255,255,0.12)",
                border: isSelected ? `2px solid ${BLUE}` : "none",
                boxShadow: isSelected ? `0 0 0 3px rgba(255,255,255,0.1)` : "none",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }} />
              {/* Label */}
              <span style={{
                fontSize: mobile ? 9 : 10,
                fontWeight: isSelected ? 700 : 500,
                color: isSelected ? BLUE : GRAY,
                fontFamily: "var(--font-mono)",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease",
              }}>
                {format(m)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
    );
  };

  return (
    <section ref={ref} style={{ padding: mobile ? "60px 20px" : "80px 32px" }}>
      <Reveal>
      <div style={{
        maxWidth: 1000, margin: "0 auto",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: mobile ? 36 : 48 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: BLUE, letterSpacing: "0.12em",
            fontFamily: "var(--font-mono)", textTransform: "uppercase",
            display: "inline-block", background: `${BLUE}08`,
            padding: "6px 14px", borderRadius: 100, border: `1px solid ${BLUE}12`,
          }}>
            Why Invest in Design
          </span>
          <h2 style={{ fontSize: mobile ? 24 : "clamp(28px, 3.5vw, 40px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.15, marginTop: 16 }}>
            Calculate your design ROI
          </h2>
          <p style={{ fontSize: 15, color: GRAY, marginTop: 10, maxWidth: 520, margin: "10px auto 0" }}>
            Based on Forrester Research — see how professional product design directly impacts your revenue.
          </p>
        </div>

        {/* Calculator Card */}
        <div style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 20, overflow: "hidden",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 0 }}>
            
            {/* Left: Sliders */}
            <div style={{ padding: mobile ? 24 : 36, borderRight: mobile ? "none" : "1px solid rgba(255,255,255,0.06)", borderBottom: mobile ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: BLUE, letterSpacing: "0.1em", fontFamily: "var(--font-mono)", marginBottom: 24 }}>
                YOUR NUMBERS
              </div>

              <SliderInput
                label="Monthly Revenue" value={revenue} onChange={setRevenue}
                min={5000} max={500000} step={5000}
                format={fmt}
                milestones={[5000, 50000, 100000, 200000, 350000, 500000]}
              />
              <SliderInput
                label="Current Conversion Rate" value={convRate} onChange={setConvRate}
                min={0.5} max={10} step={0.5}
                format={v => `${v}%`}
                milestones={[0.5, 2, 4, 6, 8, 10]}
              />
              <SliderInput
                label="Design Investment" value={investment} onChange={setInvestment}
                min={2000} max={15000} step={500}
                format={fmt}
                milestones={[2000, 5000, 8000, 10000, 12000, 15000]}
              />
            </div>

            {/* Right: Results + Chart */}
            <div style={{ padding: mobile ? 24 : 36 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: BLUE, letterSpacing: "0.1em", fontFamily: "var(--font-mono)", marginBottom: 24 }}>
                PROJECTED IMPACT
              </div>

              {/* Bar Chart */}
              <div style={{ display: "flex", gap: mobile ? 12 : 20, alignItems: "flex-end", height: mobile ? 140 : 180, marginBottom: 28, padding: "0 8px" }}>
                {[
                  { label: "Current", value: revenue, pct: barCurrent, color: "rgba(255,255,255,0.1)", icon: BarChart3, iconColor: GRAY },
                  { label: "+UI Design", value: uiRevenue, pct: barUI, color: `${BLUE}60`, icon: Monitor, iconColor: `${BLUE}90` },
                  { label: "+UX Design", value: uxRevenue, pct: barUX, color: BLUE, icon: TrendingUp, iconColor: BLUE },
                ].map((bar, idx) => {
                  const Icon = bar.icon;
                  return (
                  <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                    <div style={{
                      fontSize: mobile ? 11 : 13, fontWeight: 700, color: idx === 2 ? BLUE : WHITE,
                      fontFamily: "var(--font-mono)", marginBottom: 6,
                      transition: "all 0.6s var(--ease-out-expo)",
                    }}>
                      {fmt(bar.value)}
                    </div>
                    <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                      <div style={{
                        width: "100%",
                        height: `${bar.pct}%`,
                        background: bar.color,
                        borderRadius: "8px 8px 4px 4px",
                        transition: "height 0.8s var(--ease-out-expo), background 0.3s",
                        minHeight: 4,
                      }} />
                    </div>
                    <div style={{
                      display: "flex", flexDirection: "column", alignItems: "center",
                      gap: 4, marginTop: 10,
                    }}>
                      <div style={{
                        width: mobile ? 28 : 32, height: mobile ? 28 : 32, borderRadius: 8,
                        background: idx === 0 ? "rgba(255,255,255,0.04)" : `${BLUE}08`,
                        border: `1px solid ${idx === 0 ? "rgba(255,255,255,0.06)" : `${BLUE}15`}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Icon size={mobile ? 14 : 16} color={bar.iconColor} />
                      </div>
                      <span style={{
                        fontSize: mobile ? 9 : 11, fontWeight: 600, color: GRAY,
                        fontFamily: "var(--font-mono)", textAlign: "center",
                        lineHeight: 1.3,
                      }}>
                        {bar.label}
                      </span>
                    </div>
                  </div>
                  );
                })}
              </div>

              {/* Key metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{
                  background: `${BLUE}06`, border: `1px solid ${BLUE}12`,
                  borderRadius: 12, padding: mobile ? "14px 12px" : "16px 14px",
                }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: GRAY, fontFamily: "var(--font-mono)", letterSpacing: "0.05em", marginBottom: 4 }}>
                    PROJECTED RETURN
                  </div>
                  <div style={{
                    fontSize: mobile ? 22 : 28, fontWeight: 800, color: BLUE,
                    fontFamily: "var(--font-mono)", lineHeight: 1,
                    transition: "all 0.4s var(--ease-out-expo)",
                  }}>
                    {fmt(projectedROI)}
                  </div>
                  <div style={{ fontSize: 10, color: GRAY, fontFamily: "var(--font-mono)", marginTop: 4 }}>
                    from {fmt(investment)} invested
                  </div>
                </div>
                <div style={{
                  background: `${BLUE}06`, border: `1px solid ${BLUE}12`,
                  borderRadius: 12, padding: mobile ? "14px 12px" : "16px 14px",
                }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: GRAY, fontFamily: "var(--font-mono)", letterSpacing: "0.05em", marginBottom: 4 }}>
                    PAYBACK PERIOD
                  </div>
                  <div style={{
                    fontSize: mobile ? 22 : 28, fontWeight: 800, color: BLUE,
                    fontFamily: "var(--font-mono)", lineHeight: 1,
                    transition: "all 0.4s var(--ease-out-expo)",
                  }}>
                    {additionalRevenueUX > 0 ? `${Math.max(1, Math.ceil((investment / additionalRevenueUX) * 30))}` : "–"}<span style={{ fontSize: 13, fontWeight: 600 }}> days</span>
                  </div>
                  <div style={{ fontSize: 10, color: GRAY, fontFamily: "var(--font-mono)", marginTop: 4 }}>
                    based on UX gains
                  </div>
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 12, padding: mobile ? "14px 12px" : "16px 14px",
                }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: GRAY, fontFamily: "var(--font-mono)", letterSpacing: "0.05em", marginBottom: 4 }}>
                    +UI BOOST
                  </div>
                  <div style={{
                    fontSize: mobile ? 18 : 22, fontWeight: 700, color: WHITE,
                    fontFamily: "var(--font-mono)", lineHeight: 1,
                    transition: "all 0.4s var(--ease-out-expo)",
                  }}>
                    +{fmt(additionalRevenueUI)}<span style={{ fontSize: 11, color: GRAY }}>/mo</span>
                  </div>
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 12, padding: mobile ? "14px 12px" : "16px 14px",
                }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: GRAY, fontFamily: "var(--font-mono)", letterSpacing: "0.05em", marginBottom: 4 }}>
                    +UX BOOST
                  </div>
                  <div style={{
                    fontSize: mobile ? 18 : 22, fontWeight: 700, color: WHITE,
                    fontFamily: "var(--font-mono)", lineHeight: 1,
                    transition: "all 0.4s var(--ease-out-expo)",
                  }}>
                    +{fmt(additionalRevenueUX)}<span style={{ fontSize: 11, color: GRAY }}>/mo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Forrester insights bar */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: mobile ? "16px 20px" : "16px 36px",
            display: "flex", flexDirection: mobile ? "column" : "row",
            gap: mobile ? 12 : 32, alignItems: mobile ? "flex-start" : "center",
            background: "rgba(255,255,255,0.01)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: BLUE, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: GRAY }}>
                <strong style={{ color: WHITE }}>200%</strong> conversion boost from better UI
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: BLUE, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: GRAY }}>
                <strong style={{ color: WHITE }}>400%</strong> conversion boost from UX design
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: BLUE, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: GRAY }}>
                <strong style={{ color: WHITE }}>$1→$100</strong> return on UX investment
              </span>
            </div>
          </div>

          {/* Source */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
            padding: mobile ? "12px 20px" : "12px 36px",
            fontSize: 11, color: GRAY, fontFamily: "var(--font-mono)",
          }}>
            Source: Forrester Research — "The ROI of UX" · The Six Steps For Justifying Better UX
          </div>
        </div>
      </div>
      </Reveal>
    </section>
  );
}

// ─── Contact Slideshow Data ───
const contactSlides = [
  { id: 1, image: "/images/covers/wesupply.jpg", label: "WeSupply", tag: "SaaS" },
  { id: 2, image: "/images/branding/forum01115/cover.png", label: "ForUM01115", tag: "Community" },
  { id: 3, image: "/images/covers/urbanlab.jpg", label: "Urbanlab", tag: "Platform" },
  { id: 4, image: "/images/branding/redbee/cover.jpg", label: "Redbee Software", tag: "Tech" },
  { id: 5, image: "/images/showcase/7.jpg", label: "Tale Jewelry", tag: "Spatial" },
  { id: 6, image: "/images/covers/geoint.jpg", label: "GeoInt", tag: "Dashboard" },
  { id: 7, image: "/images/branding/zonametro/cover.jpg", label: "Zona Metropolitană", tag: "Public" },
  { id: 8, image: "/images/covers/dreamtter.jpg", label: "Dreamtter", tag: "Mobile" },
  { id: 9, image: "/images/branding/mindtune/cover.jpg", label: "MindTune", tag: "Consulting" },
  { id: 10, image: "/images/showcase/8.jpg", label: "Visen", tag: "VR / AR" },
  { id: 11, image: "/images/covers/refracto.jpg", label: "Refracto", tag: "SaaS" },
  { id: 12, image: "/images/branding/turbo/cover.jpg", label: "Turbo Coffee", tag: "F&B" },
];

function Contact() {
  const [ref, visible] = useInView(0.1);
  const mobile = useIsMobile();
  const doubled = [...contactSlides, ...contactSlides];

  return (
    <section id="contact" ref={ref} style={{ padding: mobile ? "60px 0" : "80px 0", position: "relative", overflow: "hidden" }}>

      {/* Horizontal card slideshow */}
      <div className="hmarquee-row" style={{ position: "relative", marginBottom: mobile ? 48 : 64, overflow: "hidden" }}>
        {/* Left/right fade */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: 0, width: mobile ? 32 : 80,
          background: `linear-gradient(to right, ${DARK}, ${DARK}00)`,
          zIndex: 3, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 0, bottom: 0, right: 0, width: mobile ? 32 : 80,
          background: `linear-gradient(to left, ${DARK}, ${DARK}00)`,
          zIndex: 3, pointerEvents: "none",
        }} />

        <div
          className="hmarquee-strip"
          style={{
            display: "flex", gap: mobile ? 10 : 14,
            animation: `marqueeLeft ${mobile ? 45 : 60}s linear infinite`,
            width: "max-content",
          }}
        >
          {doubled.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="hmarquee-card img-shield"
              style={{ width: mobile ? 140 : 200 }}
            >
              <LazyImage
                src={item.image}
                alt={item.label}
                aspectRatio="3/4"
                style={{ borderRadius: 0 }}
              />
              <div className="hmarquee-label">
                <span style={{
                  fontSize: 8, fontWeight: 700, color: WHITE, fontFamily: "var(--font-mono)",
                  background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)",
                  padding: "3px 7px", borderRadius: 4, letterSpacing: "0.05em",
                }}>
                  {item.tag}
                </span>
                <div style={{
                  fontSize: mobile ? 11 : 13, fontWeight: 700, color: WHITE,
                  marginTop: 5, textShadow: "0 1px 6px rgba(0,0,0,0.6)",
                }}>
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA content */}
      <Reveal variants={scaleVariants} duration={0.8}>
      <div style={{
        maxWidth: 800, margin: "0 auto", textAlign: "center", padding: "0 32px",
        position: "relative",
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: BLUE, letterSpacing: "0.12em", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 16, display: "inline-block", background: `${BLUE}08`, padding: "6px 14px", borderRadius: 100, border: `1px solid ${BLUE}12` }}>
          Let's Work Together
        </span>
        <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
          Have a product<br/>challenge?
        </h2>
        <p style={{ fontSize: 16, color: GRAY, lineHeight: 1.6, marginBottom: 48, maxWidth: 500, margin: "0 auto 48px" }}>
          Whether you need a quick audit or a long-term design partner, let's discuss how I can help your product succeed.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", flexDirection: mobile ? "column" : "row" }}>
          <a
            href="https://wa.me/40720570232"
            target="_blank"
            rel="noopener"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: mobile ? 6 : 10,
              background: "#25D366", color: "#fff",
              padding: mobile ? "14px 18px" : "16px 32px", borderRadius: 10,
              fontSize: mobile ? 13 : 15, fontWeight: 600, textDecoration: "none", transition: "all 0.4s var(--ease-out-expo)",
              boxShadow: "0 4px 20px rgba(37,211,102,0.2)",
              width: mobile ? "100%" : "auto",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(37,211,102,0.3)"; }}
            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 4px 20px rgba(37,211,102,0.2)"; }}
          >
            <WhatsAppIcon size={mobile ? 16 : 20} color="#fff" />
            WhatsApp
          </a>
          <a
            href="https://calendly.com/catalin-dobrean/30min"
            target="_blank"
            rel="noopener"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: mobile ? 6 : 10,
              background: BLUE, color: DARK,
              padding: mobile ? "14px 18px" : "16px 32px", borderRadius: 10,
              fontSize: mobile ? 13 : 15, fontWeight: 600, textDecoration: "none", transition: "all 0.4s var(--ease-out-expo)",
              boxShadow: `0 4px 20px ${BLUE}30`,
              width: mobile ? "100%" : "auto",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 30px ${BLUE}50`; }}
            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = `0 4px 20px ${BLUE}30`; }}
          >
            <Calendar size={mobile ? 16 : 18} color={DARK} strokeWidth={2} />
            Schedule a Meeting
          </a>
        </div>
      </div>
      </Reveal>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer style={{
      padding: "40px 32px", borderTop: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
      }}>
        <Logo color="white" />
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="https://linkedin.com/in/catalin-dobrean" target="_blank" rel="noopener" style={{ color: GRAY, textDecoration: "none", fontSize: 13, transition: "all 0.3s var(--ease-out-quart)", borderBottom: "1px solid transparent", paddingBottom: 2 }}
            onMouseEnter={e => { e.target.style.color = WHITE; e.target.style.borderBottomColor = BLUE; }} onMouseLeave={e => { e.target.style.color = GRAY; e.target.style.borderBottomColor = "transparent"; }}>LinkedIn</a>
          <a href="https://behance.net/catalindobrean" target="_blank" rel="noopener" style={{ color: GRAY, textDecoration: "none", fontSize: 13, transition: "all 0.3s var(--ease-out-quart)", borderBottom: "1px solid transparent", paddingBottom: 2 }}
            onMouseEnter={e => { e.target.style.color = WHITE; e.target.style.borderBottomColor = BLUE; }} onMouseLeave={e => { e.target.style.color = GRAY; e.target.style.borderBottomColor = "transparent"; }}>Behance</a>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.15)" }}>© 2026</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Portfolio Page ───
function PortfolioPage({ setPage, expandProject, setExpandProject }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filterPinned, setFilterPinned] = useState(false);
  const [openProject, setOpenProject] = useState(null);
  const filterSentinelRef = useRef(null);
  const mobile = useIsMobile();
  const filters = ["all", "product", "branding", "personal"];

  useEffect(() => {
    const sentinel = filterSentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFilterPinned(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Open from URL param expandProject
  useEffect(() => {
    if (expandProject) {
      const all = [...portfolioProjects.product, ...portfolioProjects.branding, ...portfolioProjects.personal];
      const proj = all.find(p => p.id === expandProject);
      if (proj) setOpenProject(proj);
      setExpandProject(null);
    }
  }, [expandProject, setExpandProject]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (openProject) {
      document.body.style.overflow = "hidden";
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (window.lenis) window.lenis.start();
    };
  }, [openProject]);

  return (
    <div style={{ paddingTop: 100 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: mobile ? "40px 20px 0" : "60px 32px 0" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: BLUE, letterSpacing: "0.12em", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 16, display: "inline-block", background: `${BLUE}08`, padding: "6px 14px", borderRadius: 100, border: `1px solid ${BLUE}12` }}>
          Portfolio
        </span>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
          Selected Work
        </h1>
        <p style={{ fontSize: 16, color: GRAY, lineHeight: 1.6, maxWidth: 600, marginBottom: 40 }}>
          Product design, spatial interfaces, branding, and web — each project built with strategic intent from research through delivery.
        </p>

        <div ref={filterSentinelRef} style={{ height: 1 }} />
      </div>

      {/* Filters — fixed when scrolled past */}
      <div style={{
        position: filterPinned ? "fixed" : "relative",
        top: filterPinned ? 0 : "auto",
        left: filterPinned ? 0 : "auto",
        right: filterPinned ? 0 : "auto",
        zIndex: 100,
        background: filterPinned ? "rgba(11,11,11,0.85)" : "transparent",
        borderBottom: filterPinned ? "1px solid rgba(255,255,255,0.08)" : "none",
        backdropFilter: filterPinned ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: filterPinned ? "blur(20px) saturate(180%)" : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          padding: mobile ? "10px 16px" : "14px 32px",
          display: "flex", gap: mobile ? 6 : 8,
          justifyContent: mobile ? "center" : "flex-start",
          flexWrap: "nowrap",
          overflowX: mobile ? "auto" : "visible",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              background: activeFilter === f ? BLUE : "rgba(255,255,255,0.04)",
              color: activeFilter === f ? DARK : "rgba(255,255,255,0.75)",
              border: `1px solid ${activeFilter === f ? BLUE : "rgba(255,255,255,0.12)"}`,
              padding: mobile ? "6px 12px" : "8px 20px",
              borderRadius: 100,
              fontSize: mobile ? 11 : 13,
              fontWeight: 600,
              cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all 0.3s",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}>
              {mobile ? (
                f === "all" ? "All" : f === "product" ? "Product" : f === "personal" ? "Personal" : "Brand"
              ) : (
                f === "all" ? "All Projects" : f === "product" ? "Product Design" : f === "personal" ? "Personal / Spatial" : "Brand Identity"
              )}
            </button>
          ))}
        </div>
      </div>
      {filterPinned && <div style={{ height: mobile ? 56 : 60 }} />}

      {/* Masonry Galleries */}
      {(activeFilter === "all" || activeFilter === "product") && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: mobile ? "0 20px" : "0 32px" }}>
          {activeFilter === "all" && (
            <SectionLabel icon={Layers} label="Product Design & Strategy" count={portfolioProjects.product.length} />
          )}
          <MasonryGrid projects={portfolioProjects.product} onSelect={setOpenProject} mobile={mobile} />
        </div>
      )}

      {(activeFilter === "all" || activeFilter === "branding") && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: mobile ? "0 20px" : "0 32px" }}>
          {activeFilter === "all" && (
            <SectionLabel icon={Palette} label="Brand Identity" count={portfolioProjects.branding.length} />
          )}
          <MasonryGrid projects={portfolioProjects.branding} onSelect={setOpenProject} mobile={mobile} />
        </div>
      )}

      {(activeFilter === "all" || activeFilter === "personal") && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: mobile ? "0 20px 40px" : "0 32px 40px" }}>
          {activeFilter === "all" && (
            <SectionLabel icon={Layers} label="Personal Projects — Spatial Design" count={portfolioProjects.personal.length} />
          )}
          <MasonryGrid projects={portfolioProjects.personal} onSelect={setOpenProject} mobile={mobile} />
        </div>
      )}

      {/* CTA */}
      <div style={{ padding: mobile ? "60px 20px 80px" : "80px 32px 100px", textAlign: "center" }}>
        <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Interested in working together?</h3>
        <p style={{ fontSize: 15, color: GRAY, marginBottom: 32 }}>Let's discuss your brand identity or product design needs.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexDirection: mobile ? "column" : "row" }}>
          <a href="https://calendly.com/catalin-dobrean/30min" target="_blank" rel="noopener" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: BLUE, color: DARK, padding: "14px 28px", borderRadius: 8,
            fontSize: 15, fontWeight: 600, textDecoration: "none",
            width: mobile ? "100%" : "auto",
          }}>
            Schedule a Consultation <ArrowUpRight size={16} />
          </a>
          <a href="https://wa.me/40720570232" target="_blank" rel="noopener" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: "#25D366", color: "#fff", padding: "14px 28px", borderRadius: 8,
            fontSize: 15, fontWeight: 600, textDecoration: "none",
            width: mobile ? "100%" : "auto",
          }}>
            <WhatsAppIcon size={16} color="#fff" /> WhatsApp
          </a>
        </div>
      </div>

      <Footer />

      {/* Full-screen project modal */}
      <AnimatePresence>
        {openProject && (
          <ProjectModal project={openProject} onClose={() => setOpenProject(null)} mobile={mobile} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Pinterest-style Masonry Grid ───
function MasonryGrid({ projects, onSelect, mobile }) {
  const cols = mobile ? 1 : 3;
  // Distribute projects across columns
  const columns = Array.from({ length: cols }, () => []);
  projects.forEach((p, i) => {
    columns[i % cols].push(p);
  });

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: mobile ? 16 : 20,
    }}>
      {columns.map((col, ci) => (
        <div key={ci} style={{ display: "flex", flexDirection: "column", gap: mobile ? 16 : 20 }}>
          {col.map((p, i) => (
            <MasonryCard key={p.id} project={p} index={ci + i * cols} onSelect={onSelect} mobile={mobile} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Pinterest Card ───
function MasonryCard({ project, index, onSelect, mobile }) {
  const p = project;
  // Mobile: consistent 16:9 cards. Desktop: vary aspect ratios for Pinterest effect
  const desktopRatios = ["3/4", "1/1", "4/5", "3/4", "16/10", "1/1", "4/5", "3/4"];
  const ratio = mobile ? "16/9" : desktopRatios[index % desktopRatios.length];

  // Text-only card for projects without a cover image (e.g. NDA projects)
  if (!p.image || p.noCover) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => onSelect(p)}
        style={{
          position: "relative",
          aspectRatio: ratio,
          padding: mobile ? "20px" : "28px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
        whileHover={{
          y: -4,
          borderColor: "rgba(255,255,255,0.2)",
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }}
      >
        {/* Top — Tag */}
        <div>
          <span style={{
            display: "inline-block",
            fontSize: 9, fontWeight: 700, color: "#fff", fontFamily: "var(--font-mono)",
            background: "rgba(255,255,255,0.08)",
            padding: "4px 10px", borderRadius: 100, letterSpacing: "0.05em",
          }}>
            {p.tag}
          </span>
          {p.noExpand && (
            <span style={{
              display: "inline-block", marginLeft: 6,
              fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-mono)",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "4px 10px", borderRadius: 100, letterSpacing: "0.05em",
            }}>
              NDA
            </span>
          )}
        </div>

        {/* Middle — Title */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", paddingTop: 16 }}>
          <h3 style={{
            fontSize: mobile ? 24 : "clamp(28px, 3vw, 40px)",
            fontWeight: 700, color: WHITE,
            lineHeight: 1.05, letterSpacing: "-0.02em",
          }}>{p.title}</h3>
        </div>

        {/* Bottom — Type */}
        <div>
          <p style={{
            fontSize: mobile ? 11 : 12,
            color: "rgba(255,255,255,0.55)",
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}>{p.type}</p>
        </div>

        {/* Subtle arrow indicator top right */}
        <div style={{
          position: "absolute", top: mobile ? 20 : 28, right: mobile ? 20 : 28,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: 0.6,
        }}>
          <ArrowUpRight size={20} color={WHITE} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(p)}
      style={{
        position: "relative",
        borderRadius: 0,
        overflow: "hidden",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        cursor: "pointer",
      }}
      whileHover={{
        y: -4,
        borderColor: "rgba(255,255,255,0.2)",
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      }}
    >
      {/* Image area — lazy loaded */}
      <LazyImage
        src={p.image}
        alt={p.title}
        className="img-shield"
        style={{
          aspectRatio: ratio,
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        display: "flex", flexDirection: "column",
      }}>
        {/* Tag badge */}
        <span style={{
          position: "absolute", top: 12, left: 12,
          fontSize: 9, fontWeight: 700, color: "#fff", fontFamily: "var(--font-mono)",
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
          padding: "4px 10px", borderRadius: 100, letterSpacing: "0.05em", zIndex: 2,
        }}>
          {p.tag}
        </span>

        {/* Hover overlay gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, transparent 60%)",
          opacity: 1, transition: "opacity 0.4s ease",
          zIndex: 1, pointerEvents: "none",
        }}/>

        {/* Title overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: mobile ? "14px" : "20px",
          zIndex: 2,
        }}>
          <h3 style={{
            fontSize: mobile ? 14 : 17, fontWeight: 700, color: "#fff",
            marginBottom: 4, lineHeight: 1.2,
          }}>{p.title}</h3>
          <p style={{
            fontSize: mobile ? 10 : 11, color: "rgba(255,255,255,0.7)",
            fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em",
          }}>{p.type}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Full-Screen Project Modal ───
function ProjectModal({ project, onClose, mobile }) {
  const p = project;
  const isPersonal = p.gridImages !== undefined;
  const displayImages = isPersonal ? p.gridImages : (p.images || []);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    // Reset scroll position to top when opening
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, project]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(11,11,11,0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      {/* Click-outside backdrop layer (separate from scroll container) */}
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, cursor: "pointer" }}
      />

      <motion.div
        ref={scrollContainerRef}
        initial={{ scale: 0.92, opacity: 0, filter: "blur(20px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        exit={{ scale: 0.96, opacity: 0, filter: "blur(20px)" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: DARK,
          overflowY: "scroll",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          touchAction: "pan-y",
        }}
      >
        {/* Close button — sticky to viewport */}
        <button
          onClick={onClose}
          aria-label="Close project"
          style={{
            position: "fixed", top: mobile ? 16 : 24, right: mobile ? 16 : 32,
            width: 48, height: 48, borderRadius: "50%",
            background: "rgba(11,11,11,0.7)",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 100,
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.95)"; e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.querySelector("svg").setAttribute("color", DARK); }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(11,11,11,0.7)"; e.currentTarget.style.transform = "none"; e.currentTarget.querySelector("svg").setAttribute("color", WHITE); }}
        >
          <X size={20} color={WHITE} />
        </button>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: mobile ? "80px 20px 80px" : "100px 40px 100px" }}>
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: mobile ? 32 : 48 }}
          >
            <span style={{
              display: "inline-block",
              fontSize: 10, fontWeight: 700, color: BLUE, fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em", textTransform: "uppercase",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "5px 12px", borderRadius: 100, marginBottom: 20,
            }}>
              {p.tag} · {p.type}
            </span>
            <h1 style={{
              fontSize: mobile ? "clamp(32px, 8vw, 48px)" : "clamp(48px, 6vw, 80px)",
              fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em",
              marginBottom: 16,
            }}>{p.title}</h1>
            <p style={{ fontSize: mobile ? 14 : 16, color: GRAY, fontFamily: "var(--font-mono)" }}>
              {p.role}{p.location ? ` · ${p.location}` : ""}
            </p>
          </motion.div>

          {/* Cover image - eager (above fold) */}
          {p.image && (
            <motion.img
              src={p.image}
              alt={p.title}
              loading="eager"
              fetchpriority="high"
              decoding="async"
              initial={{ opacity: 0, filter: "blur(8px)", scale: 1.02 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="img-shield"
              style={{
                width: "100%", aspectRatio: "16/9", objectFit: "cover",
                marginBottom: mobile ? 32 : 56,
                background: DARK2,
                border: "1px solid rgba(255,255,255,0.06)",
                display: "block",
              }}
            />
          )}

          {p.noExpand ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                fontSize: 14, color: GRAY, fontStyle: "italic",
                textAlign: "center", padding: "40px 20px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
              }}
            >
              More details cannot be displayed due to NDA.
            </motion.p>
          ) : (
            <>
              {/* Context / Problem / Solution */}
              {p.context && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
                    gap: mobile ? 24 : 32,
                    marginBottom: mobile ? 40 : 64,
                  }}
                >
                  {[
                    { label: "Context", content: p.context },
                    { label: "Problem", content: p.problem },
                    { label: "Solution", content: p.solution },
                  ].map((sec, i) => (
                    <div key={i}>
                      <div style={{
                        fontSize: 10, fontWeight: 700, color: BLUE,
                        fontFamily: "var(--font-mono)", letterSpacing: "0.1em",
                        textTransform: "uppercase", marginBottom: 12,
                      }}>
                        {sec.label}
                      </div>
                      <p style={{ fontSize: 14, color: WHITE, lineHeight: 1.7 }}>
                        {sec.content}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Approach */}
              {p.approach && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ marginBottom: mobile ? 40 : 64 }}
                >
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: BLUE,
                    fontFamily: "var(--font-mono)", letterSpacing: "0.1em",
                    textTransform: "uppercase", marginBottom: 20,
                  }}>
                    Approach
                  </div>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
                    gap: 12,
                  }}>
                    {p.approach.map((step, i) => (
                      <div key={i} style={{
                        display: "flex", gap: 14, padding: "16px 18px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 10,
                      }}>
                        <span style={{
                          fontSize: 11, fontWeight: 700, color: BLUE,
                          fontFamily: "var(--font-mono)", minWidth: 24,
                        }}>0{i + 1}</span>
                        <span style={{ fontSize: 13, color: WHITE, lineHeight: 1.5 }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Gallery - LAZY LOADED */}
              {displayImages && displayImages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: BLUE,
                    fontFamily: "var(--font-mono)", letterSpacing: "0.1em",
                    textTransform: "uppercase", marginBottom: 20,
                  }}>
                    Gallery
                  </div>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: isPersonal ? (mobile ? "1fr 1fr" : "1fr 1fr 1fr") : "1fr",
                    gap: mobile ? 12 : 20,
                  }}>
                    {displayImages.map((img, i) => (
                      <motion.img
                        key={i}
                        src={img}
                        alt={`${p.title} — image ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
                        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="img-shield"
                        style={{
                          width: "100%",
                          aspectRatio: isPersonal ? "3/4" : "16/9",
                          objectFit: "cover",
                          background: DARK2,
                          border: "1px solid rgba(255,255,255,0.06)",
                          display: "block",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionLabel({ icon: Icon, label, count }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 48, marginBottom: 32, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${BLUE}12`, border: `1px solid ${BLUE}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={16} color={BLUE} />
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 700 }}>{label}</h2>
      <span style={{ fontSize: 12, color: BLUE, fontWeight: 600, fontFamily: "var(--font-mono)", background: `${BLUE}08`, padding: "2px 10px", borderRadius: 100 }}>{count}</span>
    </div>
  );
}

function ProductCaseStudy({ project, index, expandProject, setExpandProject }) {
  const [ref, visible] = useInView(0.05);
  const p = project;
  const [open, setOpen] = useState(false);
  const mobile = useIsMobile();

  useEffect(() => {
    if (expandProject === p.id && !p.noExpand) {
      setOpen(true);
      if (setExpandProject) setExpandProject(null);
      setTimeout(() => {
        window.lenis ? window.lenis.scrollTo(ref.current, { offset: -80 }) : ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [expandProject]);

  return (
    <div ref={ref} style={{
      marginBottom: 24,
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)",
      transition: `all 0.6s ease ${index * 0.05}s`,
    }}>
      <div style={{
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 18, overflow: "hidden", transition: "all 0.4s var(--ease-out-quart)",
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
      >
        {/* Header — always visible */}
        <div onClick={() => !p.noExpand && setOpen(!open)} style={{ cursor: p.noExpand ? "default" : "pointer" }}>
          {/* 16:9 Cover */}
          {!p.noCover && (
            <div className="img-shield" style={{
              aspectRatio: "16/9", width: "100%", overflow: "hidden", position: "relative",
              background: p.image
                ? `url(${p.image}) center/cover no-repeat`
                : `linear-gradient(135deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {!p.image && (
                <span style={{ fontSize: mobile ? 36 : 56, fontWeight: 900, color: "rgba(255,255,255,0.04)", fontFamily: "var(--font-mono)", letterSpacing: "-0.03em" }}>
                  {p.title}
                </span>
              )}
              <div style={{ position: "absolute", top: 16, left: 20, display: "flex", gap: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", fontFamily: "var(--font-mono)", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", padding: "4px 10px", borderRadius: 100, letterSpacing: "0.05em" }}>{p.tag}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: "#fff", fontFamily: "var(--font-mono)", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", padding: "4px 10px", borderRadius: 100 }}>{p.duration}</span>
              </div>
            </div>
          )}

          {/* Info row */}
          <div style={{ padding: mobile ? "20px" : "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              {p.noCover && (
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: WHITE, fontFamily: "var(--font-mono)", background: "rgba(255,255,255,0.06)", padding: "3px 10px", borderRadius: 100, letterSpacing: "0.05em" }}>{p.tag}</span>
                  <span style={{ fontSize: 11, color: GRAY, fontFamily: "var(--font-mono)" }}>{p.duration}</span>
                  {p.location && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}>· {p.location}</span>}
                </div>
              )}
              <h3 style={{ fontSize: mobile ? 18 : 22, fontWeight: 700, marginBottom: 4 }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: BLUE, fontWeight: 600, marginBottom: 2 }}>{p.type}</p>
              <p style={{ fontSize: 13, color: GRAY }}>{p.role}{!p.noCover && p.location ? ` · ${p.location}` : ""}</p>
              {p.noExpand && (
                <p style={{ fontSize: 12, color: GRAY, fontStyle: "italic", marginTop: 8, opacity: 0.7 }}>More details cannot be displayed due to NDA.</p>
              )}
            </div>
            {!p.noExpand && (
              <div style={{ color: GRAY, transition: "transform 0.4s var(--ease-spring)", transform: open ? "rotate(45deg)" : "none", flexShrink: 0, marginLeft: 16 }}>
                <Plus size={20} />
              </div>
            )}
          </div>
        </div>

        {/* Expanded content */}
        {open && (
          <div style={{ padding: mobile ? "0 20px 28px" : "0 32px 36px", animation: "fadeUpSmall 0.45s var(--ease-out-expo)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 28 : 40, paddingTop: 28 }}>
              {/* Left — Context, Problem, Solution */}
              <div>
                {p.context && (
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: BLUE, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", marginBottom: 10 }}>CONTEXT</div>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{p.context}</p>
                  </div>
                )}
                {p.problem && (
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: BLUE, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", marginBottom: 10 }}>PROBLEM</div>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{p.problem}</p>
                  </div>
                )}
                {p.solution && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: BLUE, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", marginBottom: 10 }}>SOLUTION</div>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{p.solution}</p>
                  </div>
                )}
              </div>

              {/* Right — Approach */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: BLUE, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", marginBottom: 14 }}>APPROACH & CONTRIBUTIONS</div>
                {p.approach.map((a, j) => (
                  <div key={j} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.025)",
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: BLUE, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image gallery — only shown when images exist */}
            {p.images && p.images.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginTop: 28 }}>
                {p.images.map((img, j) => (
                  <div key={j} className="img-shield" style={{ borderRadius: 10, overflow: "hidden", aspectRatio: "16/9", background: `url(${img}) center/cover` }} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PersonalProjectCard({ project, index }) {
  const [ref, visible] = useInView(0.1);
  const p = project;
  const mobile = useIsMobile();

  return (
    <div ref={ref} style={{
      marginBottom: 20,
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
      transition: `all 0.5s ease ${index * 0.08}s`,
    }}>
      <div style={{
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16, overflow: "hidden", transition: "all 0.4s var(--ease-out-quart)",
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
      >
        {/* 2×3 image grid */}
        <div className="img-shield" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 2 }}>
          {(p.gridImages || [0,1,2,3,4,5]).map((img, j) => (
            <div key={j} style={{
              aspectRatio: "3/4",
              background: typeof img === "string"
                ? `url(${img}) center/cover no-repeat`
                : `linear-gradient(${135 + j * 15}deg, rgba(255,255,255,${0.025 + j * 0.006}), rgba(255,255,255,0.008))`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {typeof img !== "string" && (
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.08)", fontFamily: "var(--font-mono)" }}>{j + 1}</span>
              )}
            </div>
          ))}
        </div>

        {/* Info */}
        <div style={{ padding: mobile ? "16px 20px 20px" : "20px 28px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <h3 style={{ fontSize: mobile ? 18 : 20, fontWeight: 700, marginBottom: 3 }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: BLUE, fontWeight: 600, marginBottom: 2 }}>{p.type}</p>
              <p style={{ fontSize: 12, color: GRAY, fontFamily: "var(--font-mono)" }}>{p.duration}</p>
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, color: BLUE, fontFamily: "var(--font-mono)", background: `${BLUE}12`, padding: "3px 8px", borderRadius: 4, letterSpacing: "0.05em", flexShrink: 0 }}>{p.tag}</span>
          </div>
          {p.context && <p style={{ fontSize: 13, color: GRAY, lineHeight: 1.6, marginBottom: 14 }}>{p.context}</p>}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {p.approach.map((a, j) => (
              <span key={j} style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.04)", padding: "4px 10px", borderRadius: 100 }}>{a}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Resume Page ───
const fullExperience = [
  {
    company: "EasyPost",
    type: "SaaS",
    role: "Product Designer Consultant",
    period: "January 2025 – January 2026",
    location: "USA (Remote)",
    tasks: [
      "Led UI/UX strategy and design for the EasyPost shipping platform",
      "Integrated AI-powered workflows into the design process, accelerating prototyping cycles",
    ],
  },
  {
    company: "Zona Metropolitană Timișoara",
    type: "Public Institution",
    role: "Visual Identity Designer",
    period: "2026",
    location: "Timișoara, Romania",
    tasks: [
      "Developed the visual identity system for the Timișoara Metropolitan Area",
      "Designed brand applications across print and digital touchpoints",
    ],
  },
  {
    company: "WeSupply",
    type: "Post-Purchase SaaS",
    role: "Product Designer",
    period: "April 2021 – December 2025",
    location: "Romania – USA",
    tasks: [
      "Conducted comprehensive UX audits and defined product strategy",
      "Designed responsive layouts for web and mobile",
      "Built and maintained a scalable design system",
      "Created dashboard and analytics interfaces",
      "Pioneered AI workflow integration (HTML-to-design prototyping)",
    ],
  },
  {
    company: "GeoInt",
    type: "Geospatial Intelligence",
    role: "Product Designer",
    period: "June 2025 – August 2025",
    location: "Remote",
    tasks: [
      "Designed geospatial intelligence dashboard for desktop, tablet, and mobile",
      "Translated complex product documentation into actionable design specifications",
      "Delivered fast-turnaround design with structured developer handoff",
    ],
  },
  {
    company: "ForUM01115",
    type: "Civic / Community",
    role: "Visual Identity Designer",
    period: "2025",
    location: "Giroc, Timiș",
    tasks: [
      "Created complete visual identity for a civic/community forum",
      "Designed logo, typography system, colour palette, and brand guidelines",
    ],
  },
  {
    company: "Oriceinvitatie.ro",
    type: "Event Platform",
    role: "Visual Identity & UI/UX Designer",
    period: "2025 – 2026",
    location: "Brașov, Romania",
    tasks: [
      "Led end-to-end brand design and digital product experience",
      "Unified visual identity with UI patterns for seamless brand-to-product experience",
    ],
  },
  {
    company: "Dreamtter – Redbee Software",
    type: "Mobile App",
    role: "UI/UX Designer",
    period: "March 2024 – May 2025",
    location: "Romania",
    tasks: [
      "Collaborated with Product Manager to translate business requirements into mobile UI",
      "Iterated on designs across multiple edge cases, improving usability",
      "Defined visual direction and integrated AI into the UX strategy",
      "Prepared detailed developer handoff documentation",
    ],
  },
  {
    company: "Robotics Valley",
    type: "Innovation Hub",
    role: "Brand Designer",
    period: "2024 – 2025",
    location: "Jiu Valley, Romania",
    tasks: [
      "Built brand identity for a regional robotics and innovation initiative",
      "Designed logo system, brand guidelines, and visual assets for events",
    ],
  },
  {
    company: "Urbanlab",
    type: "Heritage & Community Platform",
    role: "Product & Brand Designer",
    period: "January 2023 – October 2025",
    location: "Jiu Valley, Romania",
    tasks: [
      "Designed brand identity and website for a built-heritage community platform",
      "Designed interactive map UI/UX and led information architecture",
      "Created UI illustrations and animations for cultural storytelling",
      "Managed collaboration with development team from concept through handoff",
    ],
  },
  {
    company: "Redbee Software",
    type: "Software Studio",
    role: "Brand, Digital & Web Designer",
    period: "2024",
    location: "Cluj-Napoca, Romania",
    tasks: [
      "Delivered brand collateral, digital assets, and web design",
      "Aligned internal and client-facing touchpoints",
    ],
  },
  {
    company: "MindTune Experts",
    type: "Consulting",
    role: "Brand & Web Designer",
    period: "2024",
    location: "Amsterdam, Netherlands",
    tasks: [
      "Developed brand identity and website for a mental-health consulting practice",
      "Tied tone, typography, and web experience into a consistent system",
    ],
  },
  {
    company: "World Bank",
    type: "Consulting",
    role: "Brand & Communication Strategy Consultant",
    period: "2023",
    location: "Jiu Valley, Romania",
    tasks: [
      "Co-developed communication and branding strategies with civic institutions and NGOs",
      "Delivered Communication Strategy and Investment Attraction Strategy for Jiu Valley",
      "Authored NGO Creation Guidelines for grassroots organisations",
    ],
  },
  {
    company: "MIR Geo Energy",
    type: "Energy / Geoscience",
    role: "Brand Designer",
    period: "2023",
    location: "Bucharest & Moldova",
    tasks: [
      "Created brand identity for an energy/geoscience company",
      "Designed logo and corporate collateral",
    ],
  },
  {
    company: "DopodoHeal",
    type: "Podology Clinic",
    role: "Brand & Web Designer",
    period: "2023",
    location: "Bucharest, Romania",
    tasks: [
      "Designed brand identity and website for a podology clinic",
      "Translated clinical trust into an approachable visual system",
    ],
  },
  {
    company: "Refracto",
    type: "Real Estate Investment SaaS",
    role: "Product Designer",
    period: "November 2022 – January 2023",
    location: "Romania",
    tasks: [
      "Facilitated MVP workshops and prioritized functionalities",
      "Conducted UX strategy sessions and user journey mapping",
      "Dashboard prototyping and product direction",
    ],
  },
  {
    company: "Salt & Pepper",
    type: "Creative Agency",
    role: "Graphic Designer",
    period: "2017",
    location: "Cluj-Napoca, Romania",
    tasks: [
      "Produced visual identity, print, and campaign work for hospitality, retail, and cultural clients",
      "Selected projects: Litoralul Românesc, Fresh Salads, Tour-X, Cluj Never Sleeps",
    ],
  },
  {
    company: "Clinica de Zâmbete",
    type: "Dental Practice",
    role: "Visual Identity Designer",
    period: "2025",
    location: "Cluj-Napoca, Romania",
    tasks: [
      "Crafted visual identity for a dental clinic — warmth and clinical trust balanced across signage, print, and digital touchpoints",
    ],
  },
  {
    company: "RiseHub",
    type: "Innovation Hub",
    role: "Visual Identity Designer",
    period: "2025",
    location: "Europe – Romania",
    tasks: [
      "Designed visual identity for a cross-border innovation hub",
      "Scalable system adaptable across events, digital, and print",
    ],
  },
  {
    company: "Denta Suport",
    type: "Dental Clinic",
    role: "Brand & Visual Designer",
    period: "2024",
    location: "Romania",
    tasks: [
      "Brand identity and visual system for a dental clinic",
      "Print and digital application development",
    ],
  },
  {
    company: "Evo Interior",
    type: "Interior Design Studio",
    role: "Brand & Web Designer",
    period: "2023 – 2024",
    location: "Bucharest, Romania",
    tasks: [
      "Brand identity and website design for an interior design studio",
      "Cohesive visual system across print and digital touchpoints",
    ],
  },
  {
    company: "Turbo Coffee",
    type: "Specialty Coffee Shop",
    role: "Visual Identity Designer",
    period: "2021",
    location: "Cluj-Napoca, Romania",
    tasks: [
      "Visual identity system for a specialty coffee shop",
      "Brand applications across packaging and signage",
    ],
  },
  {
    company: "Valea Jiului Vibrantă",
    type: "Regional Development",
    role: "Brand & Visual Designer",
    period: "2021",
    location: "Jiu Valley, Romania",
    tasks: [
      "Brand identity for a regional revitalization initiative",
      "Visual system for cultural projects and community engagement",
    ],
  },
  {
    company: "Identitate și Patrimoniu",
    type: "Cultural Heritage Program",
    role: "Brand, Visual & Web Experience Designer",
    period: "2021 – 2022",
    location: "Romania",
    tasks: [
      "Brand identity for a cultural heritage documentation program",
      "Web experience design connecting past and present",
    ],
  },
  {
    company: "Ecolab",
    type: "Environmental Initiative",
    role: "Brand & Visual Designer",
    period: "2021",
    location: "Romania",
    tasks: [
      "Brand identity for an environmental education initiative",
      "Visual system focused on sustainability and community action",
    ],
  },
  {
    company: "Selfit",
    type: "Fitness Application",
    role: "Visual Identity & UI/UX Designer",
    period: "2020",
    location: "Romania",
    tasks: [
      "Brand identity and UI/UX design for a fitness app",
      "Dynamic visual system from app icon to marketing materials",
    ],
  },
  {
    company: "Brooklyn Zoo",
    type: "Entertainment Venue",
    role: "Visual Identity Designer",
    period: "2020",
    location: "Romania",
    tasks: [
      "Bold visual identity for an entertainment and cultural venue",
      "Flexible typography system adaptable across event types",
    ],
  },
  {
    company: "Berar & Kelemen",
    type: "Professional Services",
    role: "Visual Identity Designer",
    period: "2020",
    location: "Romania",
    tasks: [
      "Visual identity for a professional services firm",
      "Refined classic-modern brand system reflecting partner expertise",
    ],
  },
];

const additionalProjects = [
  { name: "Litoralul Românesc", role: "Salt & Pepper · 2017" },
  { name: "Fresh Salads", role: "Salt & Pepper · 2017" },
  { name: "Tour-X", role: "Salt & Pepper · 2017" },
  { name: "DDS", role: "Salt & Pepper · 2017" },
  { name: "COS", role: "Salt & Pepper · 2017" },
  { name: "Cluj Never Sleeps", role: "Salt & Pepper · 2017" },
  { name: "Vierhaus", role: "Salt & Pepper · 2017" },
];

const personalProjects = [
  {
    name: "Tale Jewelry",
    type: "AR Jewelry Shop Experience",
    role: "Product Designer",
    period: "January 2025",
    tasks: ["Visual Direction for the Product", "Conceptual AR App Design", "Spatial Interface Design", "AI Workflows"],
  },
  {
    name: "Visen",
    type: "VR/AR TV Show App",
    role: "Product Designer",
    period: "January 2024",
    tasks: ["Visual Direction for the Product", "Conceptual VR/AR App Design", "Spatial Interface Design", "AI Workflows", "3D Interface Design"],
  },
];

const globalAwards = {
  project: "P.A.N — Protocol for Analyzing Nature",
  role: "Product Owner",
  period: "October 2020 – January 2026",
  tasks: ["Product Owner", "Product Designer for animal migration platform start-up", "Team management & collaboration", "Product research", "Project management"],
  awards: [
    "Global Nominee — NASA Space App Challenge Hackathon",
    "Top 50 — Microsoft Azure Hackathon",
  ],
};

const otherProjects = ["Litoralul Românesc", "Fresh Salads", "Tour-X", "DDS", "COS", "Cluj Never Sleeps", "Vierhaus"];

const proficiency = [
  "Brand Strategy", "Visual Identity", "Logo Design", "Art Direction",
  "Brand Systems & Guidelines", "Product Design", "UI/UX Design",
  "UX Strategy", "Design Systems", "Prototyping", "Typography",
  "Editorial & Print", "Communication Design", "AI Workflows",
];

const interests = [
  "Visual culture & typography", "Built heritage & urban identity",
  "Art direction & editorial design", "AI design tools",
  "Sustainable communities", "Science & data visualization",
];

function ResumePage({ setPage }) {
  const mobile = useIsMobile();
  return (
    <div style={{ paddingTop: 100 }}>
      {/* Header */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: mobile ? "40px 20px 0" : "60px 32px 0" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          marginBottom: 48, flexWrap: "wrap", gap: 24,
        }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: BLUE, letterSpacing: "0.12em", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 12, display: "inline-block", background: `${BLUE}08`, padding: "6px 14px", borderRadius: 100, border: `1px solid ${BLUE}12` }}>
              Resume
            </span>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 8 }}>
              Cătălin Dobrean
            </h1>
            <p style={{ fontSize: 20, color: BLUE, fontWeight: 600, marginBottom: 12 }}>
              Brand & Product Designer
            </p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: GRAY }}>
                <MapPin size={14} /> Romania, Europe
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://linkedin.com/in/catalin-dobrean" target="_blank" rel="noopener" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, fontWeight: 600, color: WHITE, background: "rgba(255,255,255,0.05)",
              padding: "8px 16px", borderRadius: 8, textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s",
            }}>
              <Linkedin size={14} /> LinkedIn
            </a>
            <a href="https://behance.net/catalindobrean" target="_blank" rel="noopener" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, fontWeight: 600, color: WHITE, background: "rgba(255,255,255,0.05)",
              padding: "8px 16px", borderRadius: 8, textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s",
            }}>
              <ExternalLink size={14} /> Behance
            </a>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
          {["Brand Identity", "Art Direction", "Visual Identity", "Product Design", "UI/UX", "UX Strategy"].map(t => (
            <span key={t} style={{
              fontSize: 12, fontWeight: 600, color: BLUE, background: `${BLUE}12`,
              padding: "6px 16px", borderRadius: 100, fontFamily: "var(--font-mono)",
            }}>{t}</span>
          ))}
        </div>

        <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 56 }} />
      </div>

      {/* Main content — 2 columns */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 320px", gap: mobile ? 32 : 64 }}>
        
        {/* Left column — Experience */}
        <div>
          {/* Work Experience */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${BLUE}12`, border: `1px solid ${BLUE}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Briefcase size={16} color={BLUE} />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700 }}>Work Experience</h2>
            </div>
            <div style={{ fontSize: 14, color: BLUE, fontWeight: 600, marginBottom: 24 }}>
              Qubist Design Studio · Oct 2021 – Present
            </div>

            {fullExperience.map((job, i) => (
              <div key={i} style={{
                position: "relative", paddingLeft: 24, paddingBottom: 36,
                borderLeft: i < fullExperience.length - 1 ? `1px solid rgba(255,255,255,0.06)` : "1px solid transparent",
              }}>
                {/* Timeline dot */}
                <div style={{
                  position: "absolute", left: -5, top: 2, width: 10, height: 10,
                  borderRadius: "50%", background: BLUE, border: `2px solid ${DARK}`,
                }} />

                <div style={{ marginBottom: 10 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 2 }}>{job.company}</h3>
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: BLUE, fontWeight: 600 }}>{job.type}</span>
                    <span style={{ fontSize: 13, color: GRAY, margin: "0 8px" }}>·</span>
                    <span style={{ fontSize: 13, color: GRAY, fontWeight: 500 }}>{job.role}</span>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: GRAY, fontFamily: "var(--font-mono)" }}>{job.period}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>·</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}>{job.location}</span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {job.tasks.map((t, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Personal Projects */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${BLUE}12`, border: `1px solid ${BLUE}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Layers size={16} color={BLUE} />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700 }}>Personal Projects & Wins</h2>
            </div>

            {personalProjects.map((proj, i) => (
              <div key={i} style={{
                position: "relative", paddingLeft: 24, paddingBottom: 28,
                borderLeft: `1px solid rgba(255,255,255,0.06)`,
              }}>
                <div style={{
                  position: "absolute", left: -5, top: 2, width: 10, height: 10,
                  borderRadius: "50%", background: "#4ADE80", border: `2px solid ${DARK}`,
                }} />
                <div style={{ marginBottom: 8 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{proj.name}</h3>
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: "#4ADE80", fontWeight: 600 }}>{proj.type}</span>
                    <span style={{ fontSize: 13, color: GRAY, margin: "0 8px" }}>·</span>
                    <span style={{ fontSize: 13, color: GRAY }}>{proj.role}</span>
                  </div>
                  <div style={{ fontSize: 12, color: GRAY, fontFamily: "var(--font-mono)" }}>{proj.period}</div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {proj.tasks.map((t, j) => (
                    <span key={j} style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.04)", padding: "4px 10px", borderRadius: 100 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Global Awards */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${BLUE}12`, border: `1px solid ${BLUE}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Award size={16} color={BLUE} />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700 }}>Global Awards</h2>
            </div>

            <div style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14, padding: 24, marginBottom: 20,
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{globalAwards.project}</h3>
              <div style={{ fontSize: 13, color: BLUE, fontWeight: 600, marginBottom: 4 }}>{globalAwards.role}</div>
              <div style={{ fontSize: 12, color: GRAY, fontFamily: "var(--font-mono)", marginBottom: 14 }}>{globalAwards.period}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 16 }}>
                {globalAwards.tasks.map((t, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />
                    {t}
                  </div>
                ))}
              </div>

              {globalAwards.awards.map((a, j) => (
                <div key={j} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                  background: `${BLUE}08`, borderRadius: 10, border: `1px solid ${BLUE}15`,
                  marginBottom: j < globalAwards.awards.length - 1 ? 8 : 0,
                }}>
                  <Award size={14} color={BLUE} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: WHITE }}>{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${BLUE}12`, border: `1px solid ${BLUE}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <GraduationCap size={16} color={BLUE} />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700 }}>Education</h2>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14, padding: 24,
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>University of Art and Design, Cluj-Napoca</h3>
              <div style={{ fontSize: 13, color: BLUE, fontWeight: 600, marginBottom: 4 }}>Bachelor's Degree</div>
              <div style={{ fontSize: 12, color: GRAY, fontFamily: "var(--font-mono)", marginBottom: 12 }}>2015 – 2020</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />
                DUX — Brand identity and UI/UX for a tourism and transportation mobile app in Cluj-Napoca
              </div>
            </div>
          </div>

          {/* Other Projects */}
          <div style={{ marginBottom: 56 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: GRAY, letterSpacing: "0.1em", fontFamily: "var(--font-mono)", marginBottom: 16 }}>
              SALT & PEPPER CAMPAIGN PROJECTS
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {otherProjects.map(p => (
                <span key={p} style={{
                  fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.65)",
                  background: "rgba(255,255,255,0.04)", padding: "6px 14px", borderRadius: 100,
                  border: "1px solid rgba(255,255,255,0.04)",
                }}>{p}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — sidebar */}
        <div>
          {/* Proficiency */}
          <div style={{
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14, padding: 24, marginBottom: 20, position: mobile ? "static" : "sticky", top: 100,
          }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: BLUE, letterSpacing: "0.1em", fontFamily: "var(--font-mono)", marginBottom: 16 }}>
              PROFICIENCY
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 28 }}>
              {proficiency.map(p => (
                <div key={p} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: BLUE, flexShrink: 0 }} />
                  {p}
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: 12, fontWeight: 700, color: BLUE, letterSpacing: "0.1em", fontFamily: "var(--font-mono)", marginBottom: 16 }}>
              TECHNICAL SKILLS
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              {["Figma", "Adobe Creative Suite", "Blender", "AI Design Tools", "Shadcn UI"].map(s => (
                <span key={s} style={{
                  fontSize: 12, fontWeight: 600, color: WHITE, background: `${BLUE}12`,
                  padding: "6px 14px", borderRadius: 8, border: `1px solid ${BLUE}20`,
                }}>{s}</span>
              ))}
            </div>

            <h3 style={{ fontSize: 12, fontWeight: 700, color: BLUE, letterSpacing: "0.1em", fontFamily: "var(--font-mono)", marginBottom: 16 }}>
              INTERESTS
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {interests.map(int => (
                <div key={int} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
                  <Heart size={10} color={BLUE} />
                  {int}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA bottom */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: mobile ? "40px 20px 60px" : "40px 32px 80px" }}>
        <div style={{
          background: `linear-gradient(135deg, ${BLUE}08, ${BLUE}03)`,
          border: `1px solid ${BLUE}15`, borderRadius: 16, padding: "36px 40px",
          display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20,
        }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Interested in working together?</h3>
            <p style={{ fontSize: 14, color: GRAY }}>Let's discuss your brand identity or product design needs.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexDirection: mobile ? "column" : "row", width: mobile ? "100%" : "auto" }}>
            <a href="https://calendly.com/catalin-dobrean/30min" target="_blank" rel="noopener" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: BLUE, color: DARK, padding: "12px 24px", borderRadius: 8,
              fontSize: 14, fontWeight: 600, textDecoration: "none",
              width: mobile ? "100%" : "auto",
            }}>
              <Calendar size={16} /> Book a Call
            </a>
            <span
              onClick={() => setPage("portfolio")}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: "transparent", color: WHITE, padding: "12px 24px", borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)", fontSize: 14, fontWeight: 600,
                cursor: "pointer",
                width: mobile ? "100%" : "auto",
              }}
            >
              View Portfolio <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// ─── Main App ───
// ─── Image Protection ───
function useImageProtection() {
  useEffect(() => {
    // Block right-click on image elements and background-image containers
    const handleContext = (e) => {
      const el = e.target;
      if (
        el.tagName === "IMG" ||
        el.tagName === "CANVAS" ||
        el.classList?.contains("img-shield") ||
        el.closest?.(".img-shield") ||
        (el.style?.backgroundImage && el.style.backgroundImage !== "none")
      ) {
        e.preventDefault();
      }
    };

    // Block common save shortcuts on images
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        const active = document.activeElement;
        if (active?.tagName === "IMG" || active?.closest?.(".img-shield")) {
          e.preventDefault();
        }
      }
    };

    // Block drag start on images
    const handleDrag = (e) => {
      if (e.target.tagName === "IMG" || e.target.closest?.(".img-shield")) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContext);
    document.addEventListener("keydown", handleKey);
    document.addEventListener("dragstart", handleDrag);
    return () => {
      document.removeEventListener("contextmenu", handleContext);
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("dragstart", handleDrag);
    };
  }, []);
}

// URL-based routing
// ─── Custom Cursor ───
// ─── Back to Top ───
function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const mobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    setClicked(true);
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setTimeout(() => setClicked(false), 800);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleClick}
          aria-label="Back to top"
          style={{
            position: "fixed",
            bottom: mobile ? 20 : 32,
            right: mobile ? 20 : 32,
            width: mobile ? 48 : 56, height: mobile ? 48 : 56,
            borderRadius: "50%",
            background: "rgba(11,11,11,0.6)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: WHITE,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 90,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
          whileHover={{
            scale: 1.08,
            background: "rgba(255,255,255,0.95)",
            color: DARK,
            borderColor: "rgba(255,255,255,0.4)",
            transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
          }}
          whileTap={{ scale: 0.92 }}
        >
          {/* Animated arrow */}
          <motion.div
            animate={clicked
              ? { y: [-2, -32, 24, -2], opacity: [1, 0, 0, 1], transition: { times: [0, 0.4, 0.4, 1], duration: 0.7, ease: "easeInOut" } }
              : { y: 0, opacity: 1 }
            }
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <ArrowDown
              size={mobile ? 18 : 22}
              strokeWidth={2}
              style={{ transform: "rotate(180deg)" }}
            />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function CustomCursor() {
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100, vx: 0, vy: 0 });
  const scale = useRef({ current: 1, target: 1 });
  const opacity = useRef({ current: 0, target: 0 });
  const hovering = useRef(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let first = true;
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      opacity.current.target = 1;
      if (first) { ring.current.x = e.clientX; ring.current.y = e.clientY; first = false; }
    };
    const onOver = (e) => {
      hovering.current = !!e.target.closest("a, button, [role='button'], [style*='cursor: pointer'], .showcase-card, .hmarquee-card, input[type='range']");
      scale.current.target = hovering.current ? 1.6 : 1;
    };
    const onLeave = () => { opacity.current.target = 0; };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", () => { opacity.current.target = 1; });

    let rafId, prev = 0;
    const stiffness = 0.12;
    const damping = 0.7;

    function tick(time) {
      const dt = Math.min((time - prev) / 16, 3);
      prev = time;

      const dx = mouse.current.x - ring.current.x;
      const dy = mouse.current.y - ring.current.y;
      ring.current.vx += dx * stiffness * dt;
      ring.current.vy += dy * stiffness * dt;
      ring.current.vx *= Math.pow(damping, dt);
      ring.current.vy *= Math.pow(damping, dt);
      ring.current.x += ring.current.vx * dt;
      ring.current.y += ring.current.vy * dt;

      scale.current.current += (scale.current.target - scale.current.current) * 0.15 * dt;
      opacity.current.current += (opacity.current.target - opacity.current.current) * 0.15 * dt;

      const o = opacity.current.current;
      const s = scale.current.current;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - 16}px, ${ring.current.y - 16}px, 0) scale(${s})`;
        ringRef.current.style.opacity = o;
        ringRef.current.style.borderColor = s > 1.2 ? BLUE : "rgba(255,255,255,0.4)";
        ringRef.current.style.background = s > 1.2 ? `${BLUE}15` : "transparent";
      }

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) return null;

  return (
    <div ref={ringRef} style={{
      position: "fixed", top: 0, left: 0, width: 32, height: 32,
      borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.4)",
      pointerEvents: "none", zIndex: 99999,
      willChange: "transform, opacity",
    }} />
  );
}

function getPageFromURL() {
  const path = window.location.pathname.replace(/^\//, "").replace(/\/$/, "");
  if (path === "portfolio") return "portfolio";
  if (path === "resume") return "resume";
  return "home";
}

export default function App() {
  const [page, setPageState] = useState(getPageFromURL);
  const [expandProject, setExpandProject] = useState(null);
  useImageProtection();

  // Smooth scroll with Lenis
  useEffect(() => {
    let lenis, rafId;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
      });
      window.lenis = lenis;
      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }).catch(() => {});
    return () => { if (lenis) lenis.destroy(); if (rafId) cancelAnimationFrame(rafId); window.lenis = null; };
  }, []);

  const navigate = (p) => {
    const url = p === "home" ? "/" : `/${p}`;
    window.history.pushState({}, "", url);
    setPageState(p);
    window.scrollTo(0, 0);
  };

  // Listen for browser back/forward
  useEffect(() => {
    const onPop = () => {
      setPageState(getPageFromURL());
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const openProject = (projectId) => {
    setExpandProject(projectId);
    navigate("portfolio");
  };

  return (
    <div style={{ background: DARK, minHeight: "100vh", color: WHITE, fontFamily: "var(--font-sans)", overflowX: "hidden", maxWidth: "100vw" }}>
      <CustomCursor />
      <BackToTop />
      <style>{globalStyles}</style>
      <Nav page={page} setPage={navigate} />
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
      
      {page === "home" ? (
        <>
          <Hero />
          <StatsBar />
          <ShowcaseGallery />
          <Services />
          <WorkPreview setPage={navigate} openProject={openProject} />
          <About setPage={navigate} />
          <ProcessTimeline />
          <DesignROICalculator />
          <Contact />
          <Footer />
        </>
      ) : page === "portfolio" ? (
        <PortfolioPage setPage={navigate} expandProject={expandProject} setExpandProject={setExpandProject} />
      ) : page === "resume" ? (
        <ResumePage setPage={navigate} />
      ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
