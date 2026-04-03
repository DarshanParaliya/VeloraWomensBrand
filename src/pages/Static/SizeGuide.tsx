import React from "react";
import { Container } from "@/components/layout/Container";
import { Ruler, Ruler as MeasuringTape, Info } from "lucide-react";
import { motion } from "framer-motion";

const SizeGuide: React.FC = () => {
  const apparelSizes = [
    { size: "XS", bust: "31-32", waist: "24-25", hips: "34-35" },
    { size: "S", bust: "33-34", waist: "26-27", hips: "36-37" },
    { size: "M", bust: "35-36", waist: "28-29", hips: "38-39" },
    { size: "L", bust: "37-38", waist: "30-31", hips: "40-41" },
    { size: "XL", bust: "39-40", waist: "32-33", hips: "42-43" },
  ];

  const footwearSizes = [
    { eu: "36", us: "6", uk: "3.5", cm: "23.0" },
    { eu: "37", us: "7", uk: "4.5", cm: "23.5" },
    { eu: "38", us: "8", uk: "5.5", cm: "24.5" },
    { eu: "39", us: "9", uk: "6.5", cm: "25.5" },
    { eu: "40", us: "10", uk: "7.5", cm: "26.5" },
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-40">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">Size Guide</h1>
            <p className="text-neutral-500 font-light leading-relaxed max-w-xl">
              Finding your perfect fit is essential for conscious consumption. 
              Our sizes are tailored for a timeless, elegant silhouette.
            </p>
          </motion.div>

          <section className="space-y-24">
            {/* Apparel Chart */}
            <div className="space-y-10">
              <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 font-bold border-b border-neutral-100 pb-4">Apparel (Inches)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-light">
                   <thead className="text-neutral-900 border-b border-neutral-100">
                      <tr>
                        <th className="py-4 font-bold uppercase tracking-widest text-[10px]">Size</th>
                        <th className="py-4 font-bold uppercase tracking-widest text-[10px]">Bust</th>
                        <th className="py-4 font-bold uppercase tracking-widest text-[10px]">Waist</th>
                        <th className="py-4 font-bold uppercase tracking-widest text-[10px]">Hips</th>
                      </tr>
                   </thead>
                   <tbody className="text-neutral-500">
                      {apparelSizes.map((row) => (
                        <tr key={row.size} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                          <td className="py-5 font-medium text-neutral-900">{row.size}</td>
                          <td className="py-5">{row.bust}</td>
                          <td className="py-5">{row.waist}</td>
                          <td className="py-5">{row.hips}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
              </div>
            </div>

            {/* Footwear Chart */}
            <div className="space-y-10">
              <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 font-bold border-b border-neutral-100 pb-4">Footwear Conversion</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-light">
                   <thead className="text-neutral-900 border-b border-neutral-100">
                      <tr>
                        <th className="py-4 font-bold uppercase tracking-widest text-[10px]">EU</th>
                        <th className="py-4 font-bold uppercase tracking-widest text-[10px]">US</th>
                        <th className="py-4 font-bold uppercase tracking-widest text-[10px]">UK</th>
                        <th className="py-4 font-bold uppercase tracking-widest text-[10px]">CM</th>
                      </tr>
                   </thead>
                   <tbody className="text-neutral-500">
                      {footwearSizes.map((row) => (
                        <tr key={row.eu} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                          <td className="py-5 font-medium text-neutral-900">{row.eu}</td>
                          <td className="py-5">{row.us}</td>
                          <td className="py-5">{row.uk}</td>
                          <td className="py-5">{row.cm}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
              </div>
            </div>

            {/* Measuring Guide */}
            <section className="bg-neutral-50 p-12 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <MeasuringTape className="w-8 h-8 text-neutral-300 mb-8" />
                <h3 className="text-2xl font-light text-neutral-900 mb-6 italic serif">How to Measure</h3>
                <div className="space-y-6 text-sm text-neutral-500 font-light">
                   <p><strong className="text-neutral-900 uppercase tracking-widest text-[10px] block mb-1">Bust</strong> Measure around the fullest part of your chest, keeping the tape level.</p>
                   <p><strong className="text-neutral-900 uppercase tracking-widest text-[10px] block mb-1">Waist</strong> Measure around your natural waistline, typically the narrowest part of your torso.</p>
                   <p><strong className="text-neutral-900 uppercase tracking-widest text-[10px] block mb-1">Hips</strong> Stand with your feet together and measure around the fullest part of your hips.</p>
                </div>
              </div>
              <div className="bg-white p-8 border border-neutral-100 space-y-4">
                 <div className="flex items-center gap-3 mb-2">
                    <Info className="w-4 h-4 text-neutral-900" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900">Expert Tip</span>
                 </div>
                 <p className="text-sm text-neutral-500 font-light leading-relaxed">
                   If you are between sizes, we recommend sizing up for a more relaxed, 
                   contemporary fit, or sizing down for a closer, more tailored look.
                 </p>
                 <button className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-neutral-900 pb-1 pt-4">Contact Personal Stylist</button>
              </div>
            </section>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default SizeGuide;
