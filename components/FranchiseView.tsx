import React from 'react';
import { ChevronRight } from 'lucide-react';

interface FranchiseFeature {
  text: string;
  highlight?: string;
}

interface FranchisePackageProps {
  name: string;
  price: string;
  features: FranchiseFeature[];
  image: string;
  theme: 'prime' | 'prestige' | 'elite';
}

const FranchiseCard: React.FC<FranchisePackageProps> = ({ name, price, features, image, theme }) => {
  // Theme-specific styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'prime':
        return {
          bgGradient: 'bg-gradient-to-r from-blue-900/80 to-cyan-900/80',
          titleColor: 'text-cyan-400',
          buttonGradient: 'bg-gradient-to-r from-cyan-500 to-blue-600',
          borderColor: 'border-cyan-500/30',
          glowColor: 'bg-cyan-500'
        };
      case 'prestige':
        return {
          bgGradient: 'bg-gradient-to-r from-orange-900/80 to-amber-900/80',
          titleColor: 'text-orange-400',
          buttonGradient: 'bg-gradient-to-r from-orange-500 to-amber-600',
          borderColor: 'border-orange-500/30',
          glowColor: 'bg-orange-500'
        };
      case 'elite':
        return {
          bgGradient: 'bg-gradient-to-r from-fuchsia-900/80 to-purple-900/80',
          titleColor: 'text-fuchsia-400',
          buttonGradient: 'bg-gradient-to-r from-fuchsia-500 to-pink-600',
          borderColor: 'border-fuchsia-500/30',
          glowColor: 'bg-fuchsia-500'
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className={`relative overflow-hidden rounded-3xl border ${styles.borderColor} shadow-2xl mb-8 group`}>
      {/* Background Image/Texture */}
      <div className="absolute inset-0 z-0">
         <div className={`absolute inset-0 ${styles.bgGradient} mix-blend-multiply opacity-90`}></div>
         {/* Abstract geometric background */}
         <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/hud-futuristic-interface-screen-design_1017-26694.jpg')] bg-cover opacity-20 bg-center mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12 items-center">
        {/* Content Side */}
        <div className="space-y-6 order-2 lg:order-1">
          <div className="space-y-2">
            <h3 className={`text-4xl lg:text-5xl font-extrabold ${styles.titleColor} tracking-tight`}>
              {name.split(' ')[0]} <span className="text-white">{name.split(' ')[1]}</span>
            </h3>
          </div>

          <div className={`inline-block px-8 py-3 rounded-r-full -ml-8 lg:-ml-12 ${styles.bgGradient} border-y border-r ${styles.borderColor} backdrop-blur-md shadow-lg`}>
            <span className="text-2xl lg:text-3xl font-bold text-white">Package: {price}</span>
          </div>

          <ul className="space-y-3 mt-4">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm lg:text-base text-gray-200">
                <ChevronRight className={`mt-1 shrink-0 ${styles.titleColor}`} size={16} />
                <span>
                  {feature.highlight ? <span className="font-bold text-white">{feature.highlight}</span> : null} 
                  {' '}{feature.text}
                </span>
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <button className={`${styles.buttonGradient} hover:brightness-110 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all transform hover:scale-105 active:scale-95`}>
              Auto-Compounding
            </button>
          </div>
        </div>

        {/* Image Side */}
        <div className="flex items-center justify-center relative min-h-[300px] lg:min-h-[400px] order-1 lg:order-2">
           {/* Glow effect behind robot */}
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] opacity-60 ${styles.glowColor}`}></div>
           
           <img 
             src={image} 
             alt={name} 
             className="relative z-10 w-full max-w-sm object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
           />
        </div>
      </div>
    </div>
  );
};

export const FranchiseView: React.FC = () => {
  const packages = [
    {
      name: "Prime Trayder",
      price: "$10,000",
      theme: 'prime' as const,
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/cyborg-soldier-5565578-4651376.png?f=webp",
      features: [
        { highlight: "Compounding Interest: 0.3%", text: "" },
        { highlight: "Withdrawal Fee: 6%", text: "" },
        { highlight: "Monthly Salary: $50", text: "" },
        { highlight: "Binary Capping: $4000", text: "" },
        { highlight: "10 Direct active members: 1%", text: "on total investment amount" },
        { highlight: "Bring 5 Franchise of $10000: $1000 Cash Reward", text: "" },
        { highlight: "Once a year visit the office", text: "" },
        { highlight: "Exclusive Member Privileges", text: "- Get access to elite events, programs, and trainings." },
        { highlight: "Upline Benefits: 0.3% Daily Income", text: "in Compounding of the referral's franchise ROI." }
      ]
    },
    {
      name: "Prestige Trayder",
      price: "$30,000",
      theme: 'prestige' as const,
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/robot-suit-10250646-8294219.png?f=webp",
      features: [
        { highlight: "Compounding Interest: 0.4%", text: "" },
        { highlight: "Withdrawal Fee: 5%", text: "" },
        { highlight: "Monthly Salary: $100", text: "" },
        { highlight: "Binary Capping: $7000", text: "" },
        { highlight: "15 Direct active members: 2%", text: "on total investment amount" },
        { highlight: "Earn additional 1% income", text: "on every 10th referral's investment amount" },
        { highlight: "Bring 4 Franchise of $30000: $2400 Cash Reward", text: "" },
        { highlight: "Once a year visit the office", text: "" },
        { highlight: "Exclusive Member Privileges", text: "- Get access to elite events, programs, and trainings." },
        { highlight: "Upline Benefits: 0.3% Daily Income", text: "in Compounding of the referral's franchise ROI." }
      ]
    },
    {
      name: "Elite Trayder",
      price: "$90,000",
      theme: 'elite' as const,
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/cyborg-11270258-9076046.png?f=webp",
      features: [
        { highlight: "Compounding Interest: 0.5%", text: "" },
        { highlight: "Withdrawal Fee: 5%", text: "" },
        { highlight: "Monthly Salary: $250", text: "" },
        { highlight: "Binary Capping: $10,000", text: "" },
        { highlight: "20 Direct active members: 3%", text: "on total investment amount" },
        { highlight: "Earn 2% additional income", text: "on every 15th referral's investment" },
        { highlight: "Bring 3 Franchise of $90000: $5400 Cash Reward", text: "" },
        { highlight: "Twice a year visit the office", text: "" },
        { highlight: "Exclusive Member Privileges", text: "- Get access to elite events, programs, and trainings." },
        { highlight: "Upline Benefits: 0.3% Daily Income", text: "in Compounding of the referral's franchise ROI." }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Franchise</h2>
      </div>

      <div className="space-y-12 pb-12">
        {packages.map((pkg, idx) => (
          <FranchiseCard key={idx} {...pkg} />
        ))}
      </div>
    </div>
  );
};