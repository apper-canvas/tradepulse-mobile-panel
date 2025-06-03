import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-white to-secondary/5">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Trading Dashboard" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-surface-900 leading-tight">
              Trade Smarter with{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TradePulse
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-surface-600 max-w-3xl mx-auto leading-relaxed px-4">
              Experience seamless trading with real-time market data, advanced analytics, 
              and lightning-fast execution. Your gateway to smarter investments.
            </p>
          </div>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                icon: 'Zap',
                title: 'Lightning Fast',
                description: 'Execute trades in milliseconds with our optimized platform'
              },
              {
                icon: 'BarChart3',
                title: 'Real-time Data',
                description: 'Access live market data and advanced charting tools'
              },
              {
                icon: 'Shield',
                title: 'Secure & Reliable',
                description: 'Bank-grade security with 99.9% uptime guarantee'
              }
].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-soft border border-white/20 hover:shadow-card transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <ApperIcon name={benefit.icon} className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-surface-900 mb-2">{benefit.title}</h3>
                <p className="text-surface-600 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-6 sm:pt-8"
>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-primary to-primary-dark rounded-xl shadow-glow hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <span className="relative z-10 flex items-center">
                  Get Started Today
                  <ApperIcon name="ArrowRight" className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-secondary rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="inline-flex items-center px-6 py-4 bg-white/80 backdrop-blur-sm text-surface-900 font-medium rounded-xl border border-surface-200 hover:bg-white transition-all duration-300">
                <ApperIcon name="Play" className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-surface-500">
              No credit card required • Start trading in minutes
            </p>
          </motion.div>
        </motion.div>
      </div>
</section>
  )
}

export default HeroSection