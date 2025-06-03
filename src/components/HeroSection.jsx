import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

const HeroSection = () => {
  const handleGetStarted = () => {
    // In a real app, this would navigate to sign-up page
    // For now, we'll scroll to the main features section
    const mainContent = document.querySelector('.main-features-section')
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" fill="none"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23387ED1;stop-opacity:0.1" /><stop offset="100%" style="stop-color:%2300D09C;stop-opacity:0.1" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23grad1)"/><g opacity="0.1"><path d="M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z" fill="%23387ED1"/></g><g opacity="0.05"><circle cx="200" cy="150" r="100" fill="%2300D09C"/><circle cx="1000" cy="600" r="80" fill="%23387ED1"/><circle cx="800" cy="200" r="60" fill="%23FFC107"/></g><g stroke="%23387ED1" stroke-width="2" fill="none" opacity="0.1"><path d="M100,300 L200,250 L300,280 L400,200 L500,240 L600,180 L700,220 L800,160 L900,200 L1000,140 L1100,180"/><path d="M100,500 L200,450 L300,480 L400,400 L500,440 L600,380 L700,420 L800,360 L900,400 L1000,340 L1100,380"/></g></svg>')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface-50/40 to-secondary/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 text-primary font-medium text-sm mb-6"
          >
            <ApperIcon name="Zap" className="w-4 h-4 mr-2" />
            India's Most Trusted Trading Platform
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 mb-6 leading-tight"
          >
            Smart Trading
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Made Simple
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-surface-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Experience seamless trading with real-time market data, advanced analytics, 
            and intuitive tools designed for both beginners and professionals.
          </motion.p>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto"
          >
            {[
              {
                icon: "Smartphone",
                title: "Easy to Use",
                description: "Intuitive interface designed for traders of all levels"
              },
              {
                icon: "Activity",
                title: "Real-Time Data",
                description: "Live market feeds and instant order execution"
              },
              {
                icon: "BarChart3",
                title: "Advanced Tools",
                description: "Professional charts, indicators, and analysis tools"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <ApperIcon name={benefit.icon} className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">{benefit.title}</h3>
                <p className="text-surface-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={handleGetStarted}
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">Get Started Free</span>
              <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-secondary-dark rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="inline-flex items-center px-6 py-4 bg-white/80 backdrop-blur-sm text-surface-900 font-medium rounded-xl border border-surface-200 hover:bg-white transition-all duration-300">
              <ApperIcon name="Play" className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-surface-500"
          >
            <div className="flex items-center space-x-2">
              <ApperIcon name="Shield" className="w-5 h-5" />
              <span className="text-sm font-medium">Bank-Grade Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="Users" className="w-5 h-5" />
              <span className="text-sm font-medium">1M+ Active Traders</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="Award" className="w-5 h-5" />
              <span className="text-sm font-medium">SEBI Registered</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 hidden lg:block">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <ApperIcon name="TrendingUp" className="w-8 h-8 text-secondary" />
        </motion.div>
      </div>

      <div className="absolute bottom-20 right-10 hidden lg:block">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <ApperIcon name="BarChart3" className="w-6 h-6 text-primary" />
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection