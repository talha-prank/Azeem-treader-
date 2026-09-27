import { ShieldCheck, Tag, Layers, Headset } from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
      title: 'Quality Products',
      description:
        'Every earbud, charger, cable, and power bank is individually tested for performance, voltage safety, and durability before being put on sale.'
    },
    {
      icon: <Tag className="w-6 h-6 text-sky-400" />,
      title: 'Competitive Prices',
      description:
        'Direct sourcing ensures we offer the most competitive retail and wholesale prices in Peshawar without compromising on build quality.'
    },
    {
      icon: <Layers className="w-6 h-6 text-indigo-400" />,
      title: 'Wide Range of Accessories',
      description:
        'From high-wattage 100W PD cables and GaN chargers to 9D glass protectors and Bluetooth speakers, find everything your phone needs under one roof.'
    },
    {
      icon: <Headset className="w-6 h-6 text-cyan-400" />,
      title: 'Customer Support',
      description:
        'Direct phone and WhatsApp support by owner Azeem Ali. Quick answers on accessory compatibility, advice, and swift order processing.'
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">
            The Azeem Trader Difference
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Why Choose Azeem Trader
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Building lasting customer relationships through honest specifications, reliable stock, and direct personalized service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="p-3 w-fit rounded-xl bg-slate-950 border border-slate-800 mb-5">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-blue-400/90 font-medium">
                Verified Standard
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
