/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react';
import { 
  Building2, 
  Heart, 
  User, 
  Share2, 
  Printer, 
  Play, 
  Calendar, 
  Mail, 
  Send, 
  Globe, 
  MapPin,
  Phone,
  MessageCircle,
  MoreHorizontal,
  Copy,
  Rotate3d,
  X,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CONTACT_EMAIL = "Magdalena@suhogarsevilla.com";
const CONTACT_PHONE = "+34635475213";
const WHATSAPP_URL = `https://wa.me/34635475213`;

const GALLERY_IMAGES = [
  "https://fotos15.apinmo.com/3503/27826236/17-21s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-4s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-24s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-10s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-11s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-12s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-13s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-14s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-15s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-16s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-17s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-18s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-20s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-22s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-23s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-25s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-26s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-27s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-28s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-29s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-2s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-30s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-31s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-32s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-34s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-35s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-36s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-37s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-39s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-38s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-40s.jpg",
  "https://fotos15.apinmo.com/3503/27826236/17-41s.jpg",
];

const getHighResUrl = (url: string) => url.replace(/s\.jpg$/, '.jpg');

export default function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    mensaje: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a server.
    // For now, we'll just open the email client with the message.
    const subject = `Consulta sobre Villa en La Zagaleta - ${formData.nombre} ${formData.apellidos}`;
    const body = `Nombre: ${formData.nombre} ${formData.apellidos}\nTeléfono: ${formData.telefono}\nEmail: ${formData.email}\n\nMensaje:\n${formData.mensaje}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => setIsGalleryOpen(false);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isGalleryOpen) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isGalleryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isGalleryOpen]);

  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isFooterShareMenuOpen, setIsFooterShareMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const footerShareMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setIsShareMenuOpen(false);
      }
      if (footerShareMenuRef.current && !footerShareMenuRef.current.contains(event.target as Node)) {
        setIsFooterShareMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsShareMenuOpen(false);
        setIsFooterShareMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    if (isShareMenuOpen || isFooterShareMenuOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isShareMenuOpen, isFooterShareMenuOpen, isMobileMenuOpen]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopyMessage(true);
    setTimeout(() => setShowCopyMessage(false), 2000);
  };

  const shareTitle = "Piso en venta en Jesús del Gran Poder";
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareTitle + ': ' + shareUrl)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent('Te paso el enlace: ' + shareUrl)}`;
  const visitWhatsappUrl = `https://wa.me/34635475213?text=${encodeURIComponent(`Hola Magdalena, quiero visitar el piso en Jesús del Gran Poder. ¿Qué disponibilidad hay para verlo? Enlace: ${shareUrl}`)}`;

  return (
    <div className="min-h-screen bg-[#f6f7f8] text-slate-900 font-sans selection:bg-red-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 lg:px-20 py-4 flex items-center justify-between shadow-sm print:hidden">
        <a href="https://www.comprarcasasevilla.com/" className="flex items-center">
          <img 
            src="https://procomprarcasasa.blob.core.windows.net/public-front/public/logo/suhogar.png" 
            alt="SUHOGAR" 
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </a>
        
        <nav className="hidden md:flex items-center gap-10">
          <a href="https://www.comprarcasasevilla.com/venta/" className="text-sm font-semibold hover:text-[#EF3340] transition-colors">PROPIEDADES</a>
          <a href="https://suhogar.comprarcasa.com/landing/calculadora-hipoteca" className="text-sm font-semibold hover:text-[#EF3340] transition-colors">CALCULADORA HIPOTECA</a>
          <a href="https://suhogar.comprarcasa.com/landing/valorador" className="text-sm font-semibold hover:text-[#EF3340] transition-colors">VALORA TU VIVIENDA</a>
          <a href="https://suhogar.comprarcasa.com/contacto" className="text-sm font-semibold hover:text-[#EF3340] transition-colors">CONTACTO</a>
        </nav>

        <div className="flex items-center gap-1 md:gap-4">
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <Heart className="w-5 h-5 text-slate-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <User className="w-5 h-5 text-slate-600" />
          </button>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative" ref={mobileMenuRef}>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir menú"
              aria-expanded={isMobileMenuOpen}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-100 py-4 z-50"
                >
                  <div className="flex flex-col">
                    <a 
                      href="https://www.comprarcasasevilla.com/venta/" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-6 py-3 text-sm font-semibold hover:bg-slate-50 hover:text-[#EF3340] transition-colors"
                    >
                      PROPIEDADES
                    </a>
                    <a 
                      href="https://suhogar.comprarcasa.com/landing/calculadora-hipoteca" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-6 py-3 text-sm font-semibold hover:bg-slate-50 hover:text-[#EF3340] transition-colors"
                    >
                      CALCULADORA HIPOTECA
                    </a>
                    <a 
                      href="https://suhogar.comprarcasa.com/landing/valorador" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-6 py-3 text-sm font-semibold hover:bg-slate-50 hover:text-[#EF3340] transition-colors"
                    >
                      VALORA TU VIVIENDA
                    </a>
                    <a 
                      href="https://suhogar.comprarcasa.com/contacto" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-6 py-3 text-sm font-semibold hover:bg-slate-50 hover:text-[#EF3340] transition-colors"
                    >
                      CONTACTO
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full h-[70vh] relative overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full bg-cover bg-center cursor-pointer"
          style={{ backgroundImage: "url('https://fotos15.apinmo.com/3503/27826236/17-1.jpg')" }}
          role="button"
          aria-label="Ver galería de fotos"
          onClick={() => openGallery(0)}
        />
      </section>

      {/* Property Title Area */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 uppercase leading-none tracking-tight">
              Piso en venta en Jesús del Gran Poder
            </h1>
            <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
              <a href="#" className="hover:text-[#EF3340]">Inicio</a>
              <span>/</span>
              <a href="#" className="hover:text-[#EF3340]">Sevilla</a>
              <span>/</span>
              <span className="text-slate-900 font-medium">La Alameda</span>
            </div>
          </div>
          <div className="flex gap-3 relative" ref={shareMenuRef}>
            <button 
              onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
              aria-haspopup="true"
              aria-expanded={isShareMenuOpen}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors print:hidden"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            {isShareMenuOpen && (
              <div className="absolute top-12 right-0 w-56 bg-white border border-slate-200 rounded-lg shadow-xl z-50 py-2">
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  Compartir por WhatsApp
                </a>
                <a 
                  href={gmailUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#EF3340]" />
                  Compartir por Gmail
                </a>
                <button 
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Copy className="w-4 h-4 text-slate-500" />
                  {showCopyMessage ? '¡Enlace copiado!' : 'Copiar enlace'}
                </button>
              </div>
            )}

            <button 
              onClick={() => { setIsShareMenuOpen(false); window.print(); }}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors print:hidden"
            >
              <Printer className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-10 gap-12">
        
        {/* Left Column (7/10) */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Video Section */}
          <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden relative print:hidden shadow-lg">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/tA8Lt1SprWQ" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>

          {/* Description */}
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-slate-600">
              En pleno corazón de Sevilla, donde la historia se respira en cada rincón y la vida late con fuerza, se alza esta vivienda única en la emblemática Calle Jesús del Gran Poder. Un lugar donde cada paso te conecta con la esencia más auténtica de la ciudad.
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              Esta propiedad, que ocupa la planta baja y la primera de un edificio con carácter, guarda la magia de lo versátil: puede ser el hogar cálido de una gran familia, el punto de partida de un negocio con alma, sin necesidad de desplazarse lejos de casa, o tal vez el proyecto de dos viviendas independientes, perfectas para quien busca invertir sin renunciar al encanto del centro.
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              Son casi 170 m2 llenos de posibilidades, actualmente con cinco dormitorios, espacio para todos y estancias que invitan a imaginar. Además, cuenta con garaje privado, un auténtico tesoro en esta histórica zona donde cada metro cuenta.
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              Vivir aquí es disfrutar de las mañanas tranquilas paseando por calles llenas de luz, de cafés con aroma a vida sevillana y de la comodidad de tenerlo todo a tu alcance.
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              Una oportunidad única para vivir Sevilla desde dentro, respirarla, sentirla y hacerla tuya día a día.
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-3 gap-4">
            {GALLERY_IMAGES.slice(0, 3).map((src, idx) => (
              <div 
                key={idx} 
                className="aspect-[4/3] rounded-lg overflow-hidden relative cursor-pointer group"
                onClick={() => openGallery(idx)}
              >
                <img 
                  src={src} 
                  alt={`Gallery ${idx}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading={idx < 3 ? "eager" : "lazy"}
                />
                {idx === 2 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/50">
                    <span className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter">+30 Fotos</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="bg-[#EF3340]/5 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#EF3340]/10 print:hidden">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#EF3340] rounded-full flex items-center justify-center">
                <Calendar className="text-white w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-900 font-bold text-lg">¿Desea conocer la propiedad?</p>
                <p className="text-slate-500 text-sm">Organizamos visitas privadas los 7 días de la semana.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <a 
                href={visitWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#EF3340] hover:bg-[#D12B35] text-white font-bold px-8 py-3 rounded-lg transition-all w-full sm:w-auto uppercase tracking-wide text-center"
              >
                Quiero visitarla
              </a>
              <a 
                href={`tel:${CONTACT_PHONE}`} 
                className="text-[#EF3340] font-bold text-xl hover:underline flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {CONTACT_PHONE}
              </a>
            </div>
          </div>

          {/* Technical Data */}
          <div>
            <h3 className="text-2xl font-black uppercase mb-8 pb-2 border-b-2 border-[#EF3340] w-fit">Datos técnicos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
              {[
                { label: 'Superficie', value: '170 m² aprox.' },
                { label: 'Dormitorios', value: '5' },
                { label: 'Garaje', value: 'Privado' },
                { label: 'Baños', value: '3' },
                { label: 'Estado', value: 'Segunda mano para reformar' },
                { label: 'Divisible', value: 'Posible 2 viviendas' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{item.label}</span>
                  <span className="text-slate-900 font-bold text-lg">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Map */}
          <div>
            <h3 className="text-2xl font-black uppercase mb-8 pb-2 border-b-2 border-[#EF3340] w-fit">Ubicación</h3>
            <div className="h-96 w-full bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative shadow-inner">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.134017646398!2d-5.997233823439064!3d37.39373753335559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126c0f71960107%3A0x9609054790089868!2sC.%20Jes%C3%BAs%20del%20Gran%20Poder%2C%2017%2C%20Casco%20Antiguo%2C%2041002%20Sevilla!5e0!3m2!1sen!2ses!4v1709486740000!5m2!1sen!2ses"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación en Google Maps"
              ></iframe>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <p className="text-[10px] text-slate-400 leading-tight">
            * Los datos expuestos son ofrecidos por terceros, meramente informativos y se suponen correctos. Nuestra empresa no garantiza su veracidad. La oferta se sujeta a errores, cambios de precio, omisión y/o retirada del mercado sin aviso previo. Los gastos de transmisión patrimonial, IVA, notario y registro corren a cargo del comprador. Según la normativa española, los gastos de comisión corren a cargo del vendedor.
          </p>
        </div>

        {/* Right Column - Sidebar (3/10) */}
        <aside className="lg:col-span-3 space-y-8 print:hidden">
          <div className="sticky top-24 space-y-8">
            
            {/* Price & Agent Info */}
            <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-100">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">PRECIO VENTA</p>
                <p className="text-3xl font-black text-[#EF3340]">485.000 €</p>
              </div>
              
              <div className="p-8 space-y-8">
                {/* Agent Block */}
                <div className="flex items-center gap-4">
                  <img 
                    src="https://i.ibb.co/3yvvt76w/imagen.jpg" 
                    alt="Magdalena" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="font-bold text-slate-900 text-lg leading-tight">Magdalena</p>
                    <p className="text-slate-500 text-sm">Agente inmobiliario</p>
                  </div>
                </div>

                {/* Contact Options */}
                <div className="space-y-3">
                  <a 
                    href={`tel:${CONTACT_PHONE}`} 
                    className="flex items-center justify-center gap-3 w-full bg-[#EF3340] hover:bg-[#D12B35] text-white font-bold py-4 rounded transition-colors uppercase text-sm tracking-wide shadow-md"
                  >
                    <Phone className="w-4 h-4" /> Llamar ahora
                  </a>
                  <a 
                    href={visitWhatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center gap-3 w-full border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-4 rounded transition-colors uppercase text-sm tracking-wide"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                  <a 
                    href={`mailto:${CONTACT_EMAIL}`} 
                    className="flex items-center justify-center gap-3 w-full border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold py-4 rounded transition-colors uppercase text-sm tracking-wide"
                  >
                    <Mail className="w-4 h-4" /> Enviar Email
                  </a>
                </div>
              </div>
            </div>

            {/* Virtual Tour 360 */}
            <div className="bg-slate-900 text-white p-6 rounded-xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Rotate3d className="w-5 h-5 text-[#EF3340]" />
                  <h4 className="font-black text-lg uppercase leading-tight">VISITA VIRTUAL 360</h4>
                </div>
                <p className="text-xs text-slate-400 mb-6">Recorre la vivienda como si estuvieras dentro.</p>
                <a 
                  href="https://my.matterport.com/show/?m=KHhBMsDXS3w" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-[#EF3340] hover:bg-[#D12B35] text-white font-bold py-3 rounded transition-colors uppercase text-xs tracking-widest text-center shadow-lg shadow-red-900/20"
                >
                  ABRIR TOUR
                </a>
              </div>
              <Rotate3d className="absolute -bottom-4 -right-4 text-white/5 w-32 h-32 group-hover:scale-110 transition-transform duration-700" />
            </div>

            {/* Other Properties */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest border-l-4 border-[#EF3340] pl-3">Otras viviendas</h3>
              {[
                {
                  price: '550.500 €',
                  title: 'Vivienda en Plaza de San Marcos, Sevilla',
                  specs: '5 HAB · 2 BAÑOS',
                  img: 'https://fotos15.apinmo.com/3503/27489158/37-18.jpg',
                  href: 'https://comprar-casa-plaza-san-marcos.vercel.app/'
                },
                {
                  price: '395.000 €',
                  title: 'Casa en venta en ESPARTINAS, Sevilla',
                  specs: '4 HAB · 4 BAÑOS',
                  img: 'https://fotos15.apinmo.com/3503/27731492/37-1.jpg',
                  href: 'https://proyecto-montaraz-espartinas.vercel.app/'
                }
              ].map((prop, i) => (
                <a key={i} href={prop.href} target="_blank" rel="noopener noreferrer" className="flex gap-4 group">
                  <div className="w-24 h-24 rounded overflow-hidden shrink-0">
                    <img 
                      src={prop.img} 
                      alt={prop.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-xs font-bold text-[#EF3340] uppercase">{prop.price}</p>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#EF3340] transition-colors line-clamp-2">{prop.title}</h4>
                    <p className="text-[10px] text-slate-500 uppercase">{prop.specs}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <a href="https://suhogar.comprarcasa.com/inicio" className="flex items-center gap-2">
            <img 
              src="https://procomprarcasasa.blob.core.windows.net/public-front/public/logo/suhogar.png" 
              alt="Comprarcasa SUHOGAR" 
              className="h-10 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </a>
          <p className="text-slate-400 text-sm">© 2026 Comprarcasa. Todos los derechos reservados.</p>
          <div className="flex gap-6 items-center">
            <a 
              href="https://suhogar.comprarcasa.com/inicio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#EF3340] transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
            
            <div className="relative" ref={footerShareMenuRef}>
              <button 
                onClick={() => setIsFooterShareMenuOpen(!isFooterShareMenuOpen)}
                className="text-slate-400 hover:text-[#EF3340] transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              <AnimatePresence>
                {isFooterShareMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full right-0 mb-4 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50"
                  >
                    <a 
                      href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-green-600" />
                      WhatsApp
                    </a>
                    <a 
                      href={`mailto:Magdalena@suhogarsevilla.com?subject=${encodeURIComponent("Piso en venta en Jesús del Gran Poder")}&body=${encodeURIComponent(window.location.href)}`}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
                    >
                      <Mail className="w-4 h-4 text-[#EF3340]" />
                      Gmail
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a 
              href={`mailto:Magdalena@suhogarsevilla.com?subject=${encodeURIComponent("Información - Piso Jesús del Gran Poder")}&body=${encodeURIComponent(window.location.href)}`}
              className="text-slate-400 hover:text-[#EF3340] transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
      {/* Lightbox Gallery */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
          >
            <button 
              onClick={closeGallery}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
            >
              <X className="w-8 h-8" />
            </button>

            <button 
              onClick={prevImage}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110]"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>

            <button 
              onClick={nextImage}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110]"
            >
              <ChevronRight className="w-12 h-12" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <motion.img 
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={getHighResUrl(GALLERY_IMAGES[currentImageIndex])}
                alt={`Gallery image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm font-bold">
                {currentImageIndex + 1} / {GALLERY_IMAGES.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
