import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { ChevronRight, MapPin, Clock, Briefcase, Globe, Award, Calendar, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const jobData: Record<string, any> = {
  "senior-product-designer": {
    title: "Senior Product Designer",
    category: "Design",
    location: "Global / Remote",
    type: "Full-Time",
    experience: "5+ Years",
    image: "/careers2.png",
    overview: "We are seeking a visionary Senior Product Designer to lead the aesthetic and functional evolution of our women's collection. You will be responsible for creating timeless pieces that balance modern trends with our commitment to sustainability.",
    responsibilities: [
      "Conceptualize and design seasonally-aligned collections from sketch to production.",
      "Collaborate with the craftsmanship team to ensure design feasibility and quality.",
      "Research emerging trends and translate them into the Velora brand language.",
      "Lead prototyping and sample review processes for footwear and accessories."
    ],
    requirements: [
      "5+ years of experience in high-end fashion or accessories design.",
      "Proficiency in 3D modeling software and Adobe Creative Suite.",
      "Strong understanding of organic fabric structures and sustainable production.",
      "Portfolio demonstrating a minimalist, premium aesthetic."
    ]
  },
  "eco-material-specialist": {
    title: "Eco-Material Specialist",
    category: "Sustainability",
    location: "Global / Remote",
    type: "Full-Time",
    experience: "3+ Years",
    image: "/sustainability2.png",
    overview: "At Velora, materials are our foundation. As an Eco-Material Specialist, you will spearhead our research into the next generation of bio-based, recycled, and low-impact fabrics.",
    responsibilities: [
      "Source and vet new suppliers for GOTS-certified organic cotton and recycled linen.",
      "Conduct lifecycle assessments for all new materials introduced to the collection.",
      "Collaborate with the design team to integrate innovative fibers into new designs.",
      "Maintain our transparency database for supply chain auditing."
    ],
    requirements: [
      "Degree in Material Science, Textile Technology, or Sustainable Fashion.",
      "Proven network of sustainable textile suppliers and manufacturers.",
      "Experience with material certifications (GOTS, FSC, GRS).",
      "Analytical mindset with a passion for environmental innovation."
    ]
  },
  "fashion-marketing-strategist": {
    title: "Fashion Marketing Strategist",
    category: "Marketing",
    location: "London, UK",
    type: "Contract",
    experience: "4+ Years",
    image: "/careers1.png",
    overview: "Help us tell the Velora story. We're looking for a strategist who can craft compelling narratives around our products and missions for a global, conscious audience.",
    responsibilities: [
      "Develop omni-channel marketing strategies for seasonal launches.",
      "Oversee premium content production, including photography and video campaigns.",
      "Manage high-level influencer and brand partnerships.",
      "Analyze market trends and consumer behavior to optimize campaign performance."
    ],
    requirements: [
      "Experience working in a premium or luxury fashion brand agency.",
      "Exceptional storytelling and creative direction skills.",
      "Strong understanding of digital growth strategies and social ecosystems.",
      "Ability to translate brand values into measurable marketing impact."
    ]
  },
  "artisan-partnership-manager": {
    title: "Artisan Partnership Manager",
    category: "Operations",
    location: "Global / Remote",
    type: "Full-Time",
    experience: "3+ Years",
    image: "/sustainability4.png",
    overview: "Our artisans are the heart of Velora. You will be the bridge between our brand and the global communities that bring our products to life, ensuring fair trade and quality.",
    responsibilities: [
      "Identify and onboard new artisan cooperatives and small-scale studios.",
      "Manage production timelines and quality control for handmade components.",
      "Facilitate cultural exchange and ensure ethical labor standards across all partners.",
      "Coordinate logistics for international material shipping and final product assembly."
    ],
    requirements: [
      "Background in International Development, Fashion Management, or Social Work.",
      "Experience working directly with craft communities or Fair Trade organizations.",
      "Excellent cross-cultural communication and negotiation skills.",
      "Fluent in English; additional languages (Spanish, Hindi, or Italian) are a plus."
    ]
  }
};

const Breadcrumbs = ({ title }: { title: string }) => (
  <nav className="flex items-center gap-2 mb-12 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">
    <Link to="/" className="hover:text-black transition-colors">Home</Link>
    <ChevronRight className="w-3 h-3" />
    <Link to="/careers" className="hover:text-black transition-colors">Careers</Link>
    <ChevronRight className="w-3 h-3" />
    <span className="text-black">{title}</span>
  </nav>
);

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const job = id ? jobData[id] : null;

  if (!job) {
    return (
      <Container className="py-40 text-center">
        <h2 className="text-2xl font-light mb-8 italic">Job Listing Not Found.</h2>
        <Link to="/careers" className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-black pb-1">
          Return to Careers
        </Link>
      </Container>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-32 pb-40">
      <Container>
        <Breadcrumbs title={job.title} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center gap-4 mb-8 text-[11px] uppercase tracking-[0.3em] font-bold text-neutral-400">
                <span className="bg-neutral-100 px-3 py-1 text-black">{job.category}</span>
                <span>{job.type}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-10 leading-tight">
                {job.title}
              </h1>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-neutral-800 italic serif">
                {job.overview}
              </p>
            </motion.div>

            <section className="space-y-10">
              <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 font-bold border-b border-neutral-100 pb-4">Responsibilities</h2>
              <ul className="grid grid-cols-1 gap-6">
                {job.responsibilities.map((item: string, idx: number) => (
                  <li key={idx} className="flex gap-4 items-start text-neutral-600 font-light leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-10">
              <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 font-bold border-b border-neutral-100 pb-4">Requirements</h2>
              <ul className="grid grid-cols-1 gap-6">
                {job.requirements.map((item: string, idx: number) => (
                  <li key={idx} className="flex gap-4 items-start text-neutral-600 font-light leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar / Apply */}
          <div className="lg:col-span-4 sticky top-40 space-y-12">
            <div className="p-10 bg-neutral-50 rounded-2xl space-y-8">
              <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-neutral-900">Apply Now</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Send your portfolio and CV to <span className="text-black font-semibold">careers@velora.com</span> with the subject line "{job.title}".
              </p>
              <button className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-colors">
                Apply for this position
              </button>
            </div>

            <div className="px-5 space-y-8">
               <div className="flex items-center gap-5 text-neutral-400">
                  <MapPin className="w-5 h-5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.1em] block font-bold text-neutral-900">Location</span>
                    <span className="text-sm font-light">{job.location}</span>
                  </div>
               </div>
               <div className="flex items-center gap-5 text-neutral-400">
                  <Clock className="w-5 h-5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.1em] block font-bold text-neutral-900">Employment Type</span>
                    <span className="text-sm font-light">{job.type}</span>
                  </div>
               </div>
               <div className="flex items-center gap-5 text-neutral-400">
                  <Award className="w-5 h-5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.1em] block font-bold text-neutral-900">Experience Level</span>
                    <span className="text-sm font-light">{job.experience}</span>
                  </div>
               </div>
            </div>

            <Link to="/careers" className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 hover:text-black transition-colors pt-12 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Openings
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default JobDetail;
