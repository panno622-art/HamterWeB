import React, { useState, useEffect } from 'react';
import { 
  School, GraduationCap, Award, MapPin, Phone, Mail, Clock, Calendar, 
  FileText, CheckCircle2, User, ChevronRight, Upload, Search, Send, 
  Sparkles, ExternalLink, Menu, X, ArrowRight, ShieldCheck, Heart, 
  BookOpen, Laptop, Globe, Cpu, Palette, Users, AlertCircle, Share2
} from 'lucide-react';

// Data: M.4 Curriculum (9 Rooms)
const CURRICULUMS = [
  {
    id: 1,
    room: "ห้อง 1",
    name: "ห้องเพชร (ห้องเรียนพิเศษ / ความเป็นเลิศทางวิชาการ)",
    category: "special",
    tag: "ห้องเรียนพิเศษ (Gifted & Excellence)",
    description: "มุ่งเน้นความเป็นเลิศทางวิชาการ เข้มข้น วิทย์-คณิต-อังกฤษ พร้อมทุนสนับสนุนและการแข่งขันระดับชาติ",
    highlights: ["หลักสูตรวิทย์-คณิตแบบเข้มข้น", "ห้องเรียนปรับอากาศพร้อมสมาร์ทบอร์ด", "โควตาสอบตรงมหาวิทยาลัยชั้นนำ"],
    featured: true
  },
  {
    id: 2,
    room: "ห้อง 2 - 4",
    name: "ห้องวิทย์ - คณิต (วิทยาศาสตร์ - คณิตศาสตร์)",
    category: "scimath",
    tag: "วิทย์-คณิต (Sci-Math)",
    description: "เน้นทักษะกระบวนการทางวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยี ปูพื้นฐานสู่คณะแพทยศาสตร์ วิศวะ และวิทยาศาสตร์",
    highlights: ["ห้องปฏิบัติการทดลองวิทยาศาสตร์มาตรฐาน", "ค่ายพัฒนาทักษะวิทยานวัตกรรม", "เสริมทักษะการคำนวณขั้นสูง"],
    featured: false
  },
  {
    id: 5,
    room: "ห้อง 5",
    name: "ห้องศิลป์คำนวณ (ภาษาอังกฤษ - คณิตศาสตร์)",
    category: "arts",
    tag: "ศิลป์คำนวณ (Eng-Math)",
    description: "เน้นความรู้ด้านภาษาอังกฤษร่วมกับคณิตศาสตร์ประยุกต์ เหมาะสำหรับสายบริหารธุรกิจ บัญชี เศรษฐศาสตร์ และนิเทศศาสตร์",
    highlights: ["ภาษาอังกฤษเพื่อการสื่อสารธุรกิจ", "สถิติและคณิตศาสตร์การเงิน", "การเตรียมพร้อมสอบ IELTS / TOEIC"],
    featured: false
  },
  {
    id: 6,
    room: "ห้อง 6",
    name: "ห้องศิลป์ภาษา (อังกฤษ & ฝรั่งเศส)",
    category: "language",
    tag: "ภาษาต่างประเทศ (Languages)",
    description: "เน้นทักษะภาษาต่างประเทศเพื่อการสื่อสารข้ามวัฒนธรรม แบ่งเป็น 2 สาขา: 1. ภาษาอังกฤษ 2. ภาษาฝรั่งเศส",
    highlights: ["เรียนกับเจ้าของภาษา (Native Speakers)", "วัฒนธรรมและการท่องเที่ยวระหว่างประเทศ", "ภาษาฝรั่งเศสพื้นฐานสู่การต่อยอด"],
    featured: false
  },
  {
    id: 7,
    room: "ห้อง 7",
    name: "ห้องจีน - ญี่ปุ่น (Chinese & Japanese)",
    category: "language",
    tag: "ภาษาเอเชีย (Asian Languages)",
    description: "มุ่งเน้นภาษาจีนและภาษาญี่ปุ่น ภาษาเศรษฐกิจแห่งอนาคต พร้อมการติวสอบวัดระดับ HSK และ JLPT",
    highlights: ["การติวเข้มข้อสอบ HSK / JLPT", "วัฒนธรรมจีน-ญี่ปุ่นเชิงลึก", "โครงการแลกเปลี่ยนนักเรียนต่างประเทศ"],
    featured: false
  },
  {
    id: 8,
    room: "ห้อง 8",
    name: "คอมพิวเตอร์ - ธุรกิจ (Computer & Business)",
    category: "tech",
    tag: "ไอที & ดิจิทัล (Digital Tech)",
    description: "พัฒนาทักษะการเขียนโค้ด กราฟิกการออกแบบ การทำธุรกิจออนไลน์ และการบริหารจัดการเทคโนโลยีสารสนเทศ",
    highlights: ["การพัฒนาเว็บและแอปพลิเคชัน", "Digital Marketing & E-Commerce", "การออกแบบ UI/UX และมัลติมีเดีย"],
    featured: false
  },
  {
    id: 9,
    room: "ห้อง 9",
    name: "ห้องการงานอาชีพ (Vocational & Career)",
    category: "tech",
    tag: "วิชาชีพ & การปฏิบัติ (Career Skills)",
    description: "มุ่งเน้นทักษะการปฏิบัติงานจริง งานคหกรรม งานสร้างสรรค์ และทักษะผู้ประกอบการรุ่นใหม่",
    highlights: ["ฝึกปฏิบัติงานจริงร่วมกับสถานประกอบการ", "ทักษะการเป็นผู้ประกอบการ (Entrepreneurship)", "งานสร้างสรรค์และโภชนาการ"],
    featured: false
  }
];

// Data: Subject Group News
const SUBJECT_NEWS = [
  {
    id: 101,
    group: "กลุ่มสาระฯ วิทยาศาสตร์และเทคโนโลยี",
    title: "นักเรียน พ.ว. คว้ารางวัลชนะเลิศ การแข่งขันหุ่นยนต์กู้ภัยระดับจังหวัด",
    date: "8 ต.ค. 2026",
    summary: "ขอแสดงความยินดีกับทีมนักเรียนห้องเพชร ม.4 ที่ได้รับรางวัลชนะเลิศอันดับ 1 ในการแข่งขันนวัตกรรมหุ่นยนต์กู้ภัย",
    badgeColor: "bg-emerald-100 text-emerald-800"
  },
  {
    id: 102,
    group: "กลุ่มสาระฯ ภาษาต่างประเทศ",
    title: "โครงการแลกเปลี่ยนภาษาและวัฒนธรรมไทย-ญี่ปุ่น ประจำปีการศึกษา 2026",
    date: "5 ต.ค. 2026",
    summary: "เปิดรับสมัครนักเรียนห้อง 6 และ 7 เข้าร่วมค่ายภาษาฤดูร้อน ณ ประเทศญี่ปุ่น พร้อมทุนการศึกษาบางส่วน",
    badgeColor: "bg-blue-100 text-blue-800"
  },
  {
    id: 103,
    group: "กลุ่มสาระฯ คณิตศาสตร์",
    title: "กิจกรรมติวเข้มคณิตศาสตร์โอลิมปิก (POSN) สำหรับนักเรียน ม.ต้น และ ม.ปลาย",
    date: "1 ต.ค. 2026",
    summary: "ขอเชิญชวนนักเรียนที่สนใจพัฒนาทักษะคณิตศาสตร์ขั้นสูง เข้าร่วมโครงการอบรมเชิงปฏิบัติการโดยวิทยากรพิเศษ",
    badgeColor: "bg-amber-100 text-amber-800"
  },
  {
    id: 104,
    group: "กลุ่มสาระฯ ศิลปะ ดนตรี และการงานอาชีพ",
    title: "นิทรรศการแสดงผลงานศิลปะและตลาดนัดผู้ประกอบการรุ่นใหม่ พ.ว.",
    date: "28 ก.ย. 2026",
    summary: "เชิญชมผลงานการออกแบบกราฟิก ผลิตภัณฑ์ไอเดียสร้างสรรค์ และสินค้าจากนักเรียนห้องคอมพิวเตอร์-ธุรกิจ",
    badgeColor: "bg-purple-100 text-purple-800"
  }
];

// Initial Mock Applications Database for Status Tracking
const INITIAL_APPLICATIONS = [
  {
    id: "PWS-2026-0101",
    citizenId: "1100200300401",
    name: "นายสมชาย ใจดี",
    program: "ห้อง 1 : ห้องเพชร (ห้องเรียนพิเศษ)",
    submittedDate: "2026-10-01",
    status: "ผ่านการคัดเลือก",
    statusColor: "bg-green-100 text-green-800 border-green-300",
    note: "ผ่านการคัดเลือกเรียบร้อยแล้ว โปรดรายงานตัวในวันที่ 15 ต.ค. 2026"
  },
  {
    id: "PWS-2026-0102",
    citizenId: "1100200300402",
    name: "นางสาวศิริพร เรียนดี",
    program: "ห้อง 2 - 4 : ห้องวิทย์ - คณิต",
    submittedDate: "2026-10-05",
    status: "เอกสารครบถ้วน / รอสอบสัมภาษณ์",
    statusColor: "bg-blue-100 text-blue-800 border-blue-300",
    note: "ตรวจสอบเอกสารเรียบร้อยแล้ว กำหนดการสอบสัมภาษณ์จะแจ้งให้ทราบทาง SMS"
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [newsFilter, setNewsFilter] = useState('all');
  
  // Application Form State (Multi-step)
  const [isApplying, setIsApplying] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    programId: 1,
    programName: "ห้อง 1 : ห้องเพชร (ห้องเรียนพิเศษ / ความเป็นเลิศทางวิชาการ)",
    title: "นาย",
    firstName: "",
    lastName: "",
    citizenId: "",
    gpax: "",
    oldSchool: "",
    phone: "",
    email: "",
    parentName: "",
    parentPhone: "",
    docTranscript: null,
    docPhoto: null,
    docHousehold: null
  });

  // Success Modal State
  const [successModal, setSuccessModal] = useState(null);

  // Status Tracking State
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('pws_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Contact Form State
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem('pws_applications', JSON.stringify(applications));
  }, [applications]);

  const handleProgramSelect = (curriculum) => {
    setFormData(prev => ({
      ...prev,
      programId: curriculum.id,
      programName: `${curriculum.room} : ${curriculum.name}`
    }));
    setIsApplying(true);
    setCurrentStep(1);
    const element = document.getElementById('application-section');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !formData.programId) {
      alert("กรุณาเลือกแผนการเรียนที่ต้องการสมัคร");
      return;
    }
    if (currentStep === 2) {
      if (!formData.firstName || !formData.lastName || !formData.citizenId || !formData.phone) {
        alert("กรุณากรอกข้อมูลส่วนตัวที่จำเป็นให้ครบถ้วน (ชื่อ, นามสกุล, เลขบัตรประชาชน, เบอร์โทรศัพท์)");
        return;
      }
      if (formData.citizenId.length < 13) {
        alert("กรุณากรอกเลขประจำตัวประชาชนให้ครบ 13 หลัก");
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    const randomIdNum = Math.floor(1000 + Math.random() * 9000);
    const newAppId = `PWS-2026-${randomIdNum}`;
    
    const newApplication = {
      id: newAppId,
      citizenId: formData.citizenId,
      name: `${formData.title}${formData.firstName} ${formData.lastName}`,
      program: formData.programName,
      submittedDate: new Date().toISOString().split('T')[0],
      status: "เอกสารครบถ้วน / รอดำเนินการ",
      statusColor: "bg-blue-100 text-blue-800 border-blue-300",
      note: "ระบบได้รับข้อมูลการสมัครของท่านเรียบร้อยแล้ว เจ้าหน้าที่จะทำการตรวจสอบเอกสารภายใน 1-2 วันทำการ"
    };

    setApplications(prev => [newApplication, ...prev]);
    setSuccessModal(newApplication);
    setIsApplying(false);
    setCurrentStep(1);
  };

  const handleSearchStatus = (e) => {
    e.preventDefault();
    setHasSearched(true);
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setSearchResult(null);
      return;
    }
    const found = applications.find(app => 
      app.id.toLowerCase() === query || app.citizenId.replace(/-/g, '') === query.replace(/-/g, '')
    );
    setSearchResult(found || null);
  };

  const filteredCurriculums = CURRICULUMS.filter(c => {
    if (activeTab === 'all') return true;
    return c.category === activeTab;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9]">
      
      {/* 1. Header & Navigation Bar */}
      <header className="glass-header">
        <div className="container flex items-center justify-between h-20">
          
          {/* Logo & School Name */}
          <a href="#" className="flex items-center gap-3 text-decoration-none group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0d5c3a] to-[#15803d] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              พ.ว.
            </div>
            <div>
              <div className="font-bold text-lg leading-tight text-[#093824]">โรงเรียนพูลเจริญวิทยาคม</div>
              <div className="text-xs text-[#64748b] font-medium">Poolcharoenwittayakom School</div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-[#334155]">
            <a href="#home" className="hover:text-[#0d5c3a] transition-colors">หน้าแรก</a>
            <a href="#about" className="hover:text-[#0d5c3a] transition-colors">ประวัติ & อัตลักษณ์</a>
            <a href="#curriculum" className="hover:text-[#0d5c3a] transition-colors">หลักสูตร ม.4</a>
            <a href="#news" className="hover:text-[#0d5c3a] transition-colors">ข่าวสารกลุ่มสาระ</a>
            <a href="#tracking" className="hover:text-[#0d5c3a] transition-colors">ตรวจสอบสถานะ</a>
            <a href="#contact" className="hover:text-[#0d5c3a] transition-colors">ติดต่อสอบถาม</a>
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a 
              href="#application-section"
              onClick={() => { setIsApplying(true); }}
              className="btn-primary hidden sm:inline-flex text-sm"
            >
              <GraduationCap className="w-4 h-4" />
              <span>สมัครเรียนออนไลน์</span>
            </a>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#093824] hover:bg-[#edfcf2]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#e2e8f0] px-6 py-4 space-y-3 animate-fade-in">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-[#1e293b]">หน้าแรก</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-[#1e293b]">ประวัติ & อัตลักษณ์</a>
            <a href="#curriculum" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-[#1e293b]">หลักสูตร ม.4 ทั้ง 9 ห้อง</a>
            <a href="#news" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-[#1e293b]">ข่าวสารกลุ่มสาระ</a>
            <a href="#tracking" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-[#1e293b]">ตรวจสอบสถานะการสมัคร</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-[#1e293b]">ติดต่อสอบถาม</a>
            <button 
              onClick={() => { setIsApplying(true); setMobileMenuOpen(false); }}
              className="btn-primary w-full justify-center mt-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>สมัครเรียน ม.4 ออนไลน์</span>
            </button>
          </div>
        )}
      </header>

      {/* Floating CTA Button */}
      <button 
        onClick={() => {
          setIsApplying(true);
          const elem = document.getElementById('application-section');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
        className="floating-cta"
        title="คลิกเพื่อสมัครเรียนออนไลน์ทันที"
      >
        <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
        <span>สมัครเรียน ม.4</span>
      </button>

      {/* Main Content Sections */}
      <main className="flex-1">

        {/* 2. Hero Section */}
        <section id="home" className="hero-section">
          <div className="container grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="badge-green">
                <ShieldCheck className="w-4 h-4 text-[#15803d]" />
                <span>คติพจน์: “วิชา วิเสโส โปตสฺส” (วิชาเป็นคุณประโยชน์อย่างยิ่ง)</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#093824] leading-tight">
                ก้าวสู่อนาคตที่มั่นคง <br />
                <span className="text-gradient">ณ โรงเรียนพูลเจริญวิทยาคม</span>
              </h1>
              
              <p className="text-lg text-[#475569] max-w-2xl leading-relaxed">
                สถาบันการศึกษาชั้นนำประจำอำเภอบางพลี จังหวัดสมุทรปราการ โทนสีประจำโรงเรียน 
                <strong className="text-[#0d5c3a]"> "เขียว - ขาว" </strong> 
                พร้อมเปิดรับสมัครนักเรียนระดับชั้น ม.4 ครอบคลุมทั้ง 9 แผนการเรียน ด้วยระบบดิจิทัลที่ทันสมัย
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href="#application-section"
                  onClick={() => setIsApplying(true)}
                  className="btn-primary text-base py-3.5 px-7"
                >
                  <span>กรอกใบสมัครเรียนออนไลน์</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                
                <a href="#curriculum" className="btn-secondary text-base py-3.5 px-7">
                  <BookOpen className="w-5 h-5" />
                  <span>ดูรายละเอียดหลักสูตร</span>
                </a>
              </div>

              {/* Quick Info Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#e2e8f0]">
                <div>
                  <div className="text-2xl font-bold text-[#0d5c3a]">9 ห้องเรียน</div>
                  <div className="text-xs text-[#64748b]">แผนการเรียน ม.4 ครบครัน</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#0d5c3a]">กม. 16</div>
                  <div className="text-xs text-[#64748b]">ถนนเทพรัตน บางนา-ตราด</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#d97706]">ห้องเพชร</div>
                  <div className="text-xs text-[#64748b]">ห้องเรียนพิเศษความเป็นเลิศ</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#0d5c3a]">100%</div>
                  <div className="text-xs text-[#64748b]">ระบบสมัครเรียนออนไลน์</div>
                </div>
              </div>
            </div>

            {/* Hero Image & Feature Highlight Box */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 bg-white rounded-3xl p-6 shadow-2xl border border-[#bbf7d0] space-y-6">
                
                <div className="flex items-center gap-4 p-4 bg-[#edfcf2] rounded-2xl">
                  <div className="w-14 h-14 rounded-full bg-[#0d5c3a] text-white flex items-center justify-center font-bold text-2xl shadow">
                    พ.ว.
                  </div>
                  <div>
                    <h3 className="font-bold text-[#093824]">เปิดรับสมัครนักเรียน ม.4</h3>
                    <p className="text-xs text-[#15803d]">ประจำปีการศึกษา 2026 (ปีการศึกษาปัจจุบัน)</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#f8faf9] transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-[#22c55e] mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <strong className="text-[#093824] block">ความหลากหลายของหลักสูตร</strong>
                      รองรับทุกความฝัน ทั้งวิทย์-คณิต ศิลป์ภาษา ไอที และวิชาชีพ
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#f8faf9] transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-[#22c55e] mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <strong className="text-[#093824] block">การเดินทางสะดวกสบาย</strong>
                      ตั้งอยู่ติดถนนใหญ่ บางนา-ตราด กม.16 การคมนาคมสะดวก
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#f8faf9] transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-[#22c55e] mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <strong className="text-[#093824] block">ออกเลขที่สมัครทันที (Application ID)</strong>
                      ติดตามสถานะการสมัครเรียนผ่านระบบออนไลน์ได้ตลอด 24 ชม.
                    </div>
                  </div>
                </div>

                <a 
                  href="#tracking" 
                  className="block text-center text-sm font-bold text-[#0d5c3a] bg-[#edfcf2] hover:bg-[#dcfce7] py-3 rounded-xl transition-colors"
                >
                  🔍 ตรวจสอบสถานะการสมัครที่มีอยู่แล้ว
                </a>

              </div>
              
              {/* Decorative Background Blur Circles */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-40 -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-200 rounded-full blur-3xl opacity-40 -z-10"></div>
            </div>

          </div>
        </section>

        {/* 3. School Profile & History (ประวัติความเป็นมาและคุณยายจาด พูลเจริญ) */}
        <section id="about" className="py-20 bg-white">
          <div className="container space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="badge-green">
                <Heart className="w-4 h-4 text-[#15803d]" />
                <span>ประวัติความเป็นมา & ผู้บริจาคที่ดิน</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#093824]">
                รากฐานแห่งปัญญา โดย คุณยายจาด พูลเจริญ
              </h2>
              <p className="text-[#64748b]">
                จุดเริ่มต้นแห่งการเรียนรู้ของชาวพูลเจริญวิทยาคม (พ.ว.) ที่สั่งสมเกียรติยศและความภาคภูมิใจมาอย่างยาวนาน
              </p>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-center">
              
              {/* Land Donor Spotlight Card */}
              <div className="md:col-span-5 bg-gradient-to-br from-[#093824] to-[#15803d] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-3xl font-bold">
                  👵
                </div>
                
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold block mb-1">ผู้บริจาคที่ดินจัดตั้งโรงเรียน</span>
                  <h3 className="text-2xl font-bold text-white">คุณยายจาด พูลเจริญ</h3>
                  <p className="text-sm text-emerald-100 mt-2 leading-relaxed">
                    ผู้มอบที่ดินให้แก่กรมสามัญศึกษา เมื่อวันที่ <strong className="text-amber-300">7 เมษายน พ.ศ. 2514</strong> 
                    เพื่อก่อตั้งเป็นสถานศึกษาให้แก่ลูกหลานชาวบางพลี ซึ่งเป็นที่มาของนามโรงเรียนอันทรงเกียรติ 
                    "โรงเรียนพูลเจริญวิทยาคม"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/15 text-xs text-emerald-200 flex justify-between">
                  <span>📅 วันสถาปนา: 7 เมษายน 2514</span>
                  <span>🌳 ต้นไม้ประจำโรงเรียน: ต้นราชพฤกษ์</span>
                </div>
              </div>

              {/* 4 School Strengths Grid */}
              <div className="md:col-span-7 grid sm:grid-cols-2 gap-6">
                
                <div className="card-hover space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#edfcf2] text-[#0d5c3a] flex items-center justify-center font-bold">
                    1
                  </div>
                  <h4 className="text-lg font-bold text-[#093824]">แผนการเรียน ม.4 หลากหลาย</h4>
                  <p className="text-xs text-[#64748b]">
                    ตอบโจทย์ทั้งสายวิทย์-คณิต, ห้องเพชรพิเศษ, ศิลป์ภาษา, คำนวณ, ไอที และการงานอาชีพ ครบ 9 ห้องเรียน
                  </p>
                </div>

                <div className="card-hover space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#edfcf2] text-[#0d5c3a] flex items-center justify-center font-bold">
                    2
                  </div>
                  <h4 className="text-lg font-bold text-[#093824]">ทำเลดี เดินทางสะดวก</h4>
                  <p className="text-xs text-[#64748b]">
                    ตั้งอยู่บนถนนเทพรัตน (บางนา-ตราด กม.16) อำเภอบางพลี ติดชุมชน เชื่อมต่อการเดินทางได้อย่างรวดเร็ว
                  </p>
                </div>

                <div className="card-hover space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#edfcf2] text-[#0d5c3a] flex items-center justify-center font-bold">
                    3
                  </div>
                  <h4 className="text-lg font-bold text-[#093824]">บรรยากาศอบอุ่น ปลอดภัย</h4>
                  <p className="text-xs text-[#64748b]">
                    มุ่งเน้นการพัฒนาศักยภาพรอบด้าน ทั้งวิชาการ ดนตรี กีฬา และกิจกรรมเสริมหลักสูตรอย่างมีคุณภาพ
                  </p>
                </div>

                <div className="card-hover space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#edfcf2] text-[#0d5c3a] flex items-center justify-center font-bold">
                    4
                  </div>
                  <h4 className="text-lg font-bold text-[#093824]">ระบบสมัครเรียนดิจิทัล</h4>
                  <p className="text-xs text-[#64748b]">
                    อำนวยความสะดวกให้นักเรียนและผู้ปกครอง สมัครเรียน อัปโหลดเอกสาร และเช็กสถานะได้ทันที
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 4. Curriculum Showcase Section (หลักสูตร ม.4 ทั้ง 9 ห้อง) */}
        <section id="curriculum" className="py-20 bg-[#f8faf9]">
          <div className="container space-y-10">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="badge-green">
                <BookOpen className="w-4 h-4 text-[#15803d]" />
                <span>หลักสูตรระดับชั้น มัธยมศึกษาปีที่ 4</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#093824]">
                เจาะลึก 9 แผนการเรียน ม.4 โรงเรียนพูลเจริญวิทยาคม
              </h2>
              <p className="text-[#64748b]">
                เลือกสายการเรียนที่ตรงกับความชอบและความฝันของคุณ เพื่อต่อยอดสู่การศึกษาระดับอุดมศึกษา
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'all' ? 'bg-[#0d5c3a] text-white shadow-md' : 'bg-white text-[#475569] hover:bg-[#edfcf2]'}`}
              >
                ทุกแผนการเรียน (9 ห้อง)
              </button>
              <button 
                onClick={() => setActiveTab('special')}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'special' ? 'bg-[#d97706] text-white shadow-md' : 'bg-white text-[#475569] hover:bg-amber-50'}`}
              >
                💎 ห้องเพชร (พิเศษ)
              </button>
              <button 
                onClick={() => setActiveTab('scimath')}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'scimath' ? 'bg-[#0d5c3a] text-white shadow-md' : 'bg-white text-[#475569] hover:bg-[#edfcf2]'}`}
              >
                🧪 วิทย์ - คณิต (ห้อง 2-4)
              </button>
              <button 
                onClick={() => setActiveTab('language')}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'language' ? 'bg-[#0d5c3a] text-white shadow-md' : 'bg-white text-[#475569] hover:bg-[#edfcf2]'}`}
              >
                🌐 ภาษาต่างประเทศ (ห้อง 6-7)
              </button>
              <button 
                onClick={() => setActiveTab('tech')}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'tech' ? 'bg-[#0d5c3a] text-white shadow-md' : 'bg-white text-[#475569] hover:bg-[#edfcf2]'}`}
              >
                💻 ไอที & การงาน (ห้อง 8-9)
              </button>
            </div>

            {/* Curriculum Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCurriculums.map(item => (
                <div 
                  key={item.id}
                  className={`relative bg-white rounded-2xl p-7 border transition-all hover:shadow-xl flex flex-col justify-between ${item.featured ? 'border-amber-400 ring-2 ring-amber-200' : 'border-[#e2e8f0]'}`}
                >
                  {item.featured && (
                    <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      ⭐ ห้องเรียนพิเศษ
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold px-3 py-1 rounded-lg bg-[#edfcf2] text-[#0d5c3a]">
                        {item.room}
                      </span>
                      <span className="text-xs font-medium text-[#64748b]">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#093824] leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-sm text-[#475569] leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-[#f1f5f9]">
                      <span className="text-xs font-bold text-[#093824] uppercase block">จุดเด่นของแผนนี้:</span>
                      {item.highlights.map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#334155]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#f1f5f9]">
                    <button 
                      onClick={() => handleProgramSelect(item)}
                      className={`w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${item.featured ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md' : 'bg-[#edfcf2] hover:bg-[#0d5c3a] text-[#0d5c3a] hover:text-white'}`}
                    >
                      <span>เลือกสมัครแผนนี้</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 5. Subject Group News Section (ข่าวสารตามกลุ่มสาระการเรียนรู้) */}
        <section id="news" className="py-20 bg-white">
          <div className="container space-y-10">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="badge-green">
                  <Globe className="w-4 h-4 text-[#15803d]" />
                  <span>ข่าวสาร & ผลงานนักเรียน</span>
                </div>
                <h2 className="text-3xl font-extrabold text-[#093824]">
                  อัปเดตข่าวสารตามกลุ่มสาระการเรียนรู้
                </h2>
                <p className="text-[#64748b]">
                  ติดตามกิจกรรม การแข่งขัน และข่าวประกาศสำคัญจากกลุ่มสาระวิชาต่างๆ ในโรงเรียนพูลเจริญวิทยาคม
                </p>
              </div>

              <a href="#contact" className="text-sm font-bold text-[#0d5c3a] hover:underline flex items-center gap-1">
                <span>สอบถามรายละเอียดเพิ่มเติม</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* News Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {SUBJECT_NEWS.map(news => (
                <div key={news.id} className="card-hover flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${news.badgeColor}`}>
                        {news.group}
                      </span>
                      <span className="text-xs text-[#94a3b8] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {news.date}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#093824] hover:text-[#15803d] cursor-pointer">
                      {news.title}
                    </h3>

                    <p className="text-sm text-[#64748b]">
                      {news.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                    <span className="text-[#0d5c3a] font-semibold cursor-pointer hover:underline">อ่านรายละเอียดข่าวสั้น →</span>
                    <span className="text-[#94a3b8]">โรงเรียนพูลเจริญวิทยาคม</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 6. Online Application Form Section (Multi-Step Form) */}
        <section id="application-section" className="py-20 bg-[#edfcf2]/60 border-y border-[#bbf7d0]">
          <div className="container max-w-4xl space-y-10">
            
            <div className="text-center space-y-3">
              <div className="badge-green">
                <GraduationCap className="w-4 h-4 text-[#15803d]" />
                <span>ระบบรับสมัครนักเรียน ม.4 ออนไลน์ (PWS Online Application)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#093824]">
                แบบฟอร์มสมัครเรียนออนไลน์ ปีการศึกษา 2026
              </h2>
              <p className="text-[#475569]">
                กรอกข้อมูลทีละขั้นตอน ตรวจสอบเอกสาร และรับเลขที่สมัคร (Application ID) ได้ทันที
              </p>
            </div>

            {/* Multi-Step Indicator Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e2e8f0]">
              <div className="grid grid-cols-4 gap-2 text-center">
                
                <div className="flex flex-col items-center gap-2">
                  <div className={`wizard-circle ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : 'pending'}`}>
                    1
                  </div>
                  <span className="text-xs font-semibold text-[#093824]">1. แผนการเรียน</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className={`wizard-circle ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : 'pending'}`}>
                    2
                  </div>
                  <span className="text-xs font-semibold text-[#093824]">2. ข้อมูลผู้สมัคร</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className={`wizard-circle ${currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : 'pending'}`}>
                    3
                  </div>
                  <span className="text-xs font-semibold text-[#093824]">3. อัปโหลดเอกสาร</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className={`wizard-circle ${currentStep === 4 ? 'active' : 'pending'}`}>
                    4
                  </div>
                  <span className="text-xs font-semibold text-[#093824]">4. ยืนยันข้อมูล</span>
                </div>

              </div>
            </div>

            {/* Multi-Step Form Body */}
            <form onSubmit={handleSubmitApplication} className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#bbf7d0] space-y-8">
              
              {/* STEP 1: Select Program */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="text-xl font-bold text-[#093824] mb-1">ขั้นตอนที่ 1: เลือกห้อง / แผนการเรียน ม.4</h3>
                    <p className="text-xs text-[#64748b]">โปรดเลือกสายการเรียนที่คุณต้องการเข้าศึกษาในโรงเรียนพูลเจริญวิทยาคม</p>
                  </div>

                  <div className="space-y-3">
                    {CURRICULUMS.map(c => (
                      <label 
                        key={c.id} 
                        className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${formData.programId === c.id ? 'border-[#0d5c3a] bg-[#edfcf2] shadow-sm' : 'border-[#e2e8f0] hover:bg-[#f8faf9]'}`}
                      >
                        <input 
                          type="radio" 
                          name="programSelect" 
                          checked={formData.programId === c.id} 
                          onChange={() => setFormData(prev => ({
                            ...prev,
                            programId: c.id,
                            programName: `${c.room} : ${c.name}`
                          }))}
                          className="mt-1 accent-[#0d5c3a]"
                        />
                        <div className="flex-1 text-sm">
                          <div className="font-bold text-[#093824] flex items-center gap-2">
                            <span>{c.room} - {c.name}</span>
                            {c.featured && <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full">พิเศษ</span>}
                          </div>
                          <div className="text-xs text-[#64748b] mt-0.5">{c.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Personal Details */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="text-xl font-bold text-[#093824] mb-1">ขั้นตอนที่ 2: ข้อมูลส่วนตัวผู้สมัครและผู้ปกครอง</h3>
                    <p className="text-xs text-[#64748b]">กรอกข้อมูลสำหรับการลงทะเบียนเข้าศึกษา</p>
                  </div>

                  <div className="grid sm:grid-cols-12 gap-4">
                    
                    <div className="sm:col-span-3">
                      <label className="form-label">คำนำหน้า *</label>
                      <select 
                        value={formData.title} 
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="form-input"
                      >
                        <option value="นาย">นาย</option>
                        <option value="นางสาว">นางสาว</option>
                        <option value="เด็กชาย">เด็กชาย</option>
                        <option value="เด็กหญิง">เด็กหญิง</option>
                      </select>
                    </div>

                    <div className="sm:col-span-4">
                      <label className="form-label">ชื่อจริง *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="กรอกชื่อ"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="form-input"
                      />
                    </div>

                    <div className="sm:col-span-5">
                      <label className="form-label">นามสกุล *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="กรอกนามสกุล"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="form-input"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label className="form-label">เลขประจำตัวประชาชน (13 หลัก) *</label>
                      <input 
                        type="text" 
                        maxLength={13}
                        required
                        placeholder="เช่น 1100200300405"
                        value={formData.citizenId}
                        onChange={(e) => setFormData({...formData, citizenId: e.target.value.replace(/\D/g, '')})}
                        className="form-input font-mono"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label className="form-label">เกรดเฉลี่ยสะสม (GPAX ม.ต้น) *</label>
                      <input 
                        type="number" 
                        step="0.01"
                        min="0"
                        max="4.00"
                        placeholder="เช่น 3.50"
                        value={formData.gpax}
                        onChange={(e) => setFormData({...formData, gpax: e.target.value})}
                        className="form-input"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label className="form-label">โรงเรียนเดิมที่จบการศึกษา *</label>
                      <input 
                        type="text" 
                        placeholder="เช่น โรงเรียนพูลเจริญวิทยาคม"
                        value={formData.oldSchool}
                        onChange={(e) => setFormData({...formData, oldSchool: e.target.value})}
                        className="form-input"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label className="form-label">เบอร์โทรศัพท์ผู้สมัคร *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="เช่น 0812345678"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="form-input"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label className="form-label">อีเมลผู้สมัคร (สำหรับรับแจ้งเตือน)</label>
                      <input 
                        type="email" 
                        placeholder="student@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="form-input"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label className="form-label">ชื่อ-นามสกุล ผู้ปกครอง *</label>
                      <input 
                        type="text" 
                        placeholder="ชื่อ-นามสกุล ผู้ปกครอง"
                        value={formData.parentName}
                        onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                        className="form-input"
                      />
                    </div>

                  </div>
                </div>
              )}

              {/* STEP 3: Document Upload Simulation */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="text-xl font-bold text-[#093824] mb-1">ขั้นตอนที่ 3: อัปโหลดเอกสารหลักฐานการสมัคร</h3>
                    <p className="text-xs text-[#64748b]">อัปโหลดไฟล์ภาพหรือ PDF (ใบ ปพ.1, รูปถ่าย, สำเนาทะเบียนบ้าน)</p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    
                    <div className="border-2 border-dashed border-[#bbf7d0] bg-[#f8faf9] rounded-2xl p-5 text-center space-y-3 hover:border-[#0d5c3a] transition-colors">
                      <div className="w-12 h-12 rounded-full bg-[#edfcf2] text-[#0d5c3a] mx-auto flex items-center justify-center">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-bold text-[#093824]">1. ใบ ปพ.1 (ระเบียนผลการเรียน)</div>
                      <p className="text-xs text-[#64748b]">รองรับ JPG, PNG, PDF</p>
                      <input 
                        type="file" 
                        accept="image/*,.pdf"
                        onChange={(e) => setFormData({...formData, docTranscript: e.target.files[0]?.name || "uploaded_transcript.pdf"})}
                        className="hidden" 
                        id="file-transcript"
                      />
                      <label htmlFor="file-transcript" className="btn-secondary text-xs py-2 px-3 w-full justify-center">
                        {formData.docTranscript ? `✓ ${formData.docTranscript}` : 'แนบไฟล์ใบ ปพ.1'}
                      </label>
                    </div>

                    <div className="border-2 border-dashed border-[#bbf7d0] bg-[#f8faf9] rounded-2xl p-5 text-center space-y-3 hover:border-[#0d5c3a] transition-colors">
                      <div className="w-12 h-12 rounded-full bg-[#edfcf2] text-[#0d5c3a] mx-auto flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-bold text-[#093824]">2. รูปถ่ายหน้าตรงชุดนักเรียน</div>
                      <p className="text-xs text-[#64748b]">ขนาด 1.5 นิ้ว ถ่ายไม่เกิน 6 เดือน</p>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setFormData({...formData, docPhoto: e.target.files[0]?.name || "student_photo.jpg"})}
                        className="hidden" 
                        id="file-photo"
                      />
                      <label htmlFor="file-photo" className="btn-secondary text-xs py-2 px-3 w-full justify-center">
                        {formData.docPhoto ? `✓ ${formData.docPhoto}` : 'แนบรูปถ่ายนักเรียน'}
                      </label>
                    </div>

                    <div className="border-2 border-dashed border-[#bbf7d0] bg-[#f8faf9] rounded-2xl p-5 text-center space-y-3 hover:border-[#0d5c3a] transition-colors">
                      <div className="w-12 h-12 rounded-full bg-[#edfcf2] text-[#0d5c3a] mx-auto flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-bold text-[#093824]">3. สำเนาทะเบียนบ้าน</div>
                      <p className="text-xs text-[#64748b]">หน้าที่มีชื่อนักเรียนและผู้ปกครอง</p>
                      <input 
                        type="file" 
                        accept="image/*,.pdf"
                        onChange={(e) => setFormData({...formData, docHousehold: e.target.files[0]?.name || "household_reg.pdf"})}
                        className="hidden" 
                        id="file-house"
                      />
                      <label htmlFor="file-house" className="btn-secondary text-xs py-2 px-3 w-full justify-center">
                        {formData.docHousehold ? `✓ ${formData.docHousehold}` : 'แนบสำเนาทะเบียนบ้าน'}
                      </label>
                    </div>

                  </div>
                </div>
              )}

              {/* STEP 4: Review & Confirm */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="text-xl font-bold text-[#093824] mb-1">ขั้นตอนที่ 4: สรุปและตรวจสอบข้อมูลก่อนยืนยันการสมัคร</h3>
                    <p className="text-xs text-[#64748b]">โปรดตรวจสอบความถูกต้องของข้อมูลทั้งหมดก่อนกดยืนยัน</p>
                  </div>

                  <div className="bg-[#f8faf9] rounded-2xl p-6 border border-[#e2e8f0] space-y-4 text-sm">
                    <div className="flex justify-between items-center pb-3 border-b border-[#e2e8f0]">
                      <span className="font-bold text-[#093824]">แผนการเรียนที่สมัคร:</span>
                      <span className="font-semibold text-[#0d5c3a]">{formData.programName}</span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div><strong className="text-[#64748b]">ชื่อ-นามสกุล:</strong> {formData.title}{formData.firstName} {formData.lastName}</div>
                      <div><strong className="text-[#64748b]">เลขประจำตัวประชาชน:</strong> {formData.citizenId}</div>
                      <div><strong className="text-[#64748b]">เกรดเฉลี่ย (GPAX):</strong> {formData.gpax || '-'}</div>
                      <div><strong className="text-[#64748b]">โรงเรียนเดิม:</strong> {formData.oldSchool || '-'}</div>
                      <div><strong className="text-[#64748b]">เบอร์โทรศัพท์:</strong> {formData.phone}</div>
                      <div><strong className="text-[#64748b]">อีเมล:</strong> {formData.email || '-'}</div>
                      <div><strong className="text-[#64748b]">ผู้ปกครอง:</strong> {formData.parentName || '-'}</div>
                    </div>

                    <div className="pt-3 border-t border-[#e2e8f0] text-xs space-y-1">
                      <div className="font-bold text-[#093824]">เอกสารแนบประกอบการสมัคร:</div>
                      <div className="text-[#475569]">📄 ใบ ปพ.1: {formData.docTranscript || 'แนบเอกสารจำลองเรียบร้อย'}</div>
                      <div className="text-[#475569]">📷 รูปถ่าย: {formData.docPhoto || 'แนบเอกสารจำลองเรียบร้อย'}</div>
                      <div className="text-[#475569]">🏠 ทะเบียนบ้าน: {formData.docHousehold || 'แนบเอกสารจำลองเรียบร้อย'}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl text-xs text-amber-800 border border-amber-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>เมื่อกดยืนยันแล้ว ระบบจะทำการออกเลขที่สมัคร (Application ID) ให้ท่านเพื่อนำไปใช้เช็กสถานะการสมัคร</span>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-[#e2e8f0]">
                {currentStep > 1 ? (
                  <button 
                    type="button" 
                    onClick={handlePrevStep}
                    className="btn-secondary text-sm"
                  >
                    ← ย้อนกลับ
                  </button>
                ) : (
                  <div></div>
                )}

                {currentStep < 4 ? (
                  <button 
                    type="button" 
                    onClick={handleNextStep}
                    className="btn-primary text-sm"
                  >
                    <span>ขั้นตอนถัดไป</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    type="submit"
                    className="btn-primary text-sm bg-gradient-to-r from-emerald-600 to-green-600 shadow-lg"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>กดยืนยันส่งใบสมัครเรียน</span>
                  </button>
                )}
              </div>

            </form>

          </div>
        </section>

        {/* 7. Application Status Tracking Section (ระบบตรวจสอบสถานะการสมัคร) */}
        <section id="tracking" className="py-20 bg-white">
          <div className="container max-w-4xl space-y-8">
            
            <div className="text-center space-y-3">
              <div className="badge-green">
                <Search className="w-4 h-4 text-[#15803d]" />
                <span>Status Tracking System</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#093824]">
                ระบบตรวจสอบสถานะการสมัครเรียน
              </h2>
              <p className="text-[#64748b]">
                กรอกเลขบัตรประชาชน (13 หลัก) หรือเลขที่สมัคร (Application ID) เพื่อเช็กผลการสมัครเรียน
              </p>
            </div>

            {/* Search Input Box */}
            <form onSubmit={handleSearchStatus} className="bg-[#f8faf9] p-6 rounded-3xl border border-[#e2e8f0] shadow-sm flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-[#94a3b8] absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="เช่น PWS-2026-0101 หรือ 1100200300401"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input pl-12 py-3.5"
                />
              </div>
              <button type="submit" className="btn-primary py-3.5 px-8">
                <span>ค้นหาผลการสมัคร</span>
              </button>
            </form>

            {/* Search Result Box */}
            {hasSearched && (
              <div className="animate-fade-in">
                {searchResult ? (
                  <div className="bg-white rounded-3xl p-6 border-2 border-[#bbf7d0] shadow-lg space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#f1f5f9]">
                      <div>
                        <span className="text-xs font-bold text-[#64748b] block">เลขที่สมัคร (Application ID)</span>
                        <span className="text-xl font-bold text-[#0d5c3a] font-mono">{searchResult.id}</span>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${searchResult.statusColor}`}>
                        {searchResult.status}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div><strong className="text-[#64748b]">ชื่อ-นามสกุล:</strong> {searchResult.name}</div>
                      <div><strong className="text-[#64748b]">เลขบัตรประชาชน:</strong> {searchResult.citizenId}</div>
                      <div className="sm:col-span-2"><strong className="text-[#64748b]">แผนการเรียนที่เลือก:</strong> {searchResult.program}</div>
                      <div><strong className="text-[#64748b]">วันที่ยื่นสมัคร:</strong> {searchResult.submittedDate}</div>
                    </div>

                    <div className="p-4 bg-[#edfcf2] rounded-2xl text-xs text-[#093824] space-y-1">
                      <strong className="block font-bold">📌 หมายเหตุจากโรงเรียน:</strong>
                      <p>{searchResult.note}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8 bg-amber-50 rounded-3xl border border-amber-200 space-y-2">
                    <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
                    <h4 className="font-bold text-amber-900">ไม่พบข้อมูลการสมัครเรียน</h4>
                    <p className="text-xs text-amber-700">
                      กรุณาตรวจสอบเลขที่สมัครหรือเลขบัตรประชาชนให้ถูกต้อง หรือหากยังไม่ได้กรอกใบสมัคร ท่านสามารถกดสมัครเรียนใหม่ได้ทันที
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* List of Recent Applications Demo */}
            <div className="pt-6">
              <h4 className="text-sm font-bold text-[#093824] mb-3">📋 รายการผู้สมัครล่าสุดในระบบ (Demo Database):</h4>
              <div className="space-y-2">
                {applications.slice(0, 3).map(app => (
                  <div 
                    key={app.id} 
                    onClick={() => { setSearchQuery(app.id); setSearchResult(app); setHasSearched(true); }}
                    className="p-3 bg-white rounded-xl border border-[#e2e8f0] hover:border-[#0d5c3a] cursor-pointer flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-[#0d5c3a]">{app.id}</span>
                      <span>{app.name}</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${app.statusColor}`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 8. Contact & Social Media Section */}
        <section id="contact" className="py-20 bg-[#f8faf9]">
          <div className="container space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="badge-green">
                <Phone className="w-4 h-4 text-[#15803d]" />
                <span>ติดต่อโรงเรียนพูลเจริญวิทยาคม</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#093824]">
                ช่องทางการติดต่อและสอบถามข้อมูล
              </h2>
              <p className="text-[#64748b]">
                สอบถามรายละเอียดการสมัครเรียน เส้นทาง หรือข้อมูลหลักสูตรได้ผ่านช่องทางออนไลน์
              </p>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
              
              {/* Left Contact Info Cards */}
              <div className="md:col-span-5 space-y-6">
                
                <div className="card-hover space-y-4">
                  <h3 className="font-bold text-lg text-[#093824]">ที่ตั้งโรงเรียน</h3>
                  <div className="flex items-start gap-3 text-sm text-[#475569]">
                    <MapPin className="w-5 h-5 text-[#0d5c3a] shrink-0 mt-1" />
                    <span>
                      เลขที่ 16 หมู่ที่ 1 ถนนเทพรัตน (บางนา-ตราด กม.16) <br />
                      ตำบลบางโฉลง อำเภอบางพลี จังหวัดสมุทรปราการ 10540
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[#475569]">
                    <Phone className="w-5 h-5 text-[#0d5c3a] shrink-0" />
                    <span>02-312-6124 (สำนักงานฝ่ายบริหารงานวิชาการ)</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[#475569]">
                    <Mail className="w-5 h-5 text-[#0d5c3a] shrink-0" />
                    <span>info@poolcharoen.ac.th</span>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="card-hover space-y-4 bg-gradient-to-br from-[#093824] to-[#15803d] text-white">
                  <h3 className="font-bold text-lg text-white">ช่องทาง Social Media</h3>
                  <div className="space-y-3 text-xs">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
                      <span className="font-semibold">Facebook Fanpage: โรงเรียนพูลเจริญวิทยาคม</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a href="https://line.me" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
                      <span className="font-semibold">LINE Official Account: @PWS_School</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Right Contact Form */}
              <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-[#e2e8f0] shadow-sm space-y-6">
                <h3 className="font-bold text-xl text-[#093824]">แบบฟอร์มส่งข้อความสอบถาม</h3>

                {contactSubmitted ? (
                  <div className="p-6 bg-[#edfcf2] rounded-2xl border border-[#bbf7d0] text-center space-y-2 animate-fade-in">
                    <CheckCircle2 className="w-10 h-10 text-[#22c55e] mx-auto" />
                    <h4 className="font-bold text-[#093824]">ส่งข้อความสำเร็จแล้ว</h4>
                    <p className="text-xs text-[#64748b]">เจ้าหน้าที่จะทำการติดต่อกลับทางอีเมลหรือเบอร์โทรศัพท์ที่ท่านระบุไว้โดยเร็วที่สุด</p>
                    <button onClick={() => setContactSubmitted(false)} className="btn-secondary text-xs mt-2">
                      ส่งข้อความอื่นเพิ่มเติม
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">ชื่อ-นามสกุล *</label>
                        <input type="text" required placeholder="กรอกชื่อผู้ติดต่อ" className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">เบอร์โทรศัพท์ *</label>
                        <input type="tel" required placeholder="กรอกเบอร์โทร" className="form-input" />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">หัวข้อเรื่องที่ติดต่อ *</label>
                      <input type="text" required placeholder="เช่น สอบถามเรื่องแผนการเรียนห้องเพชร" className="form-input" />
                    </div>

                    <div>
                      <label className="form-label">รายละเอียดข้อความ *</label>
                      <textarea rows={4} required placeholder="พิมพ์ข้อความคำถามที่นี่..." className="form-input"></textarea>
                    </div>

                    <button type="submit" className="btn-primary w-full justify-center">
                      <Send className="w-4 h-4" />
                      <span>ส่งข้อความถึงเจ้าหน้าที่โรงเรียน</span>
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* 9. Instant Confirmation Modal (Simulated Email / LINE Notification) */}
      {successModal && (
        <div className="modal-overlay">
          <div className="modal-content p-8 space-y-6 text-center">
            
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="badge-green mb-2">🎉 ยื่นใบสมัครสำเร็จเรียบร้อย</span>
              <h3 className="text-2xl font-extrabold text-[#093824] mt-1">
                การสมัครเรียนออนไลน์เสร็จสมบูรณ์
              </h3>
              <p className="text-xs text-[#64748b]">
                ระบบได้ส่งการแจ้งเตือนและยืนยันข้อมูลไปยังอีเมล / LINE ของท่านเรียบร้อยแล้ว
              </p>
            </div>

            {/* Generated Application Card */}
            <div className="bg-[#f8faf9] p-6 rounded-2xl border border-[#bbf7d0] space-y-3 text-left text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-[#e2e8f0]">
                <span className="text-xs font-bold text-[#64748b]">เลขที่สมัคร (Application ID):</span>
                <span className="text-lg font-bold text-[#0d5c3a] font-mono">{successModal.id}</span>
              </div>
              <div><strong className="text-[#64748b]">ผู้สมัคร:</strong> {successModal.name}</div>
              <div><strong className="text-[#64748b]">แผนการเรียน:</strong> {successModal.program}</div>
              <div><strong className="text-[#64748b]">สถานะปัจจุบัน:</strong> <span className="text-blue-700 font-bold">{successModal.status}</span></div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setSuccessModal(null);
                  const elem = document.getElementById('tracking');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary w-full justify-center"
              >
                🔍 ไปยังหน้าตรวจสอบสถานะ
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 10. Footer */}
      <footer className="bg-[#093824] text-white py-12 border-t border-emerald-900">
        <div className="container grid md:grid-cols-12 gap-8 text-sm">
          
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#093824] font-bold flex items-center justify-center text-lg">
                พ.ว.
              </div>
              <span className="font-bold text-lg text-white">โรงเรียนพูลเจริญวิทยาคม</span>
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-md">
              ผู้มอบที่ดินจัดตั้งโรงเรียน: คุณยายจาด พูลเจริญ (7 เมษายน 2514) <br />
              คติพจน์: “วิชา วิเสโส โปตสฺส” (วิชาเป็นคุณประโยชน์อย่างยิ่ง) <br />
              สีประจำโรงเรียน: เขียว - ขาว | ต้นไม้ประจำโรงเรียน: ต้นราชพฤกษ์ (ต้นคูน)
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs text-emerald-200">
            <div className="font-bold text-white text-sm mb-2">ลิงก์รวดเร็ว</div>
            <div><a href="#home" className="hover:text-white">หน้าแรก</a></div>
            <div><a href="#about" className="hover:text-white">ประวัติความเป็นมา</a></div>
            <div><a href="#curriculum" className="hover:text-white">หลักสูตร ม.4 ทั้ง 9 ห้อง</a></div>
            <div><a href="#news" className="hover:text-white">ข่าวสารกลุ่มสาระ</a></div>
            <div><a href="#tracking" className="hover:text-white">ตรวจสอบสถานะการสมัคร</a></div>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs text-emerald-200">
            <div className="font-bold text-white text-sm mb-2">ติดต่อสำนักงาน</div>
            <div>โทร: 02-312-6124</div>
            <div>อีเมล: info@poolcharoen.ac.th</div>
            <div>เทพรัตน กม.16 อ.บางพลี จ.สมุทรปราการ 10540</div>
          </div>

        </div>

        <div className="container border-t border-emerald-900/60 mt-8 pt-6 text-center text-xs text-emerald-300/60">
          © 2026 Poolcharoenwittayakom School (พ.ว.) - All Rights Reserved. Systems Developed for 3-Day MVP Plan.
        </div>
      </footer>

    </div>
  );
}
