import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { portfolioService } from '../services'
import { motion } from 'framer-motion'
const Home = () => {
  const [portfolioData, setPortfolioData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const loadPortfolio = async () => {
      setLoading(true)
      try {
        const result = await portfolioService.getAll()
        setPortfolioData(result[0] || {})
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadPortfolio()
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-surface-600">Loading trading platform...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-surface-900' : 'bg-surface-50'}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                  <ApperIcon name="TrendingUp" className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-surface-900 dark:text-white">TradePulse</h1>
              </div>
              
              <div className="hidden md:flex items-center space-x-6 ml-8">
                <div className="text-sm">
                  <span className="text-surface-500 dark:text-surface-400">Available Balance:</span>
                  <span className="text-lg font-semibold text-secondary ml-2">
                    ₹{portfolioData?.totalValue?.toLocaleString() || '0'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:block relative">
                <input
                  type="text"
                  placeholder="Search stocks..."
                  className="w-48 lg:w-64 px-4 py-2 pl-10 text-sm border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 dark:text-white"
                />
                <ApperIcon name="Search" className="absolute left-3 top-2.5 h-4 w-4 text-surface-400" />
              </div>
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              >
                <ApperIcon 
                  name={isDarkMode ? "Sun" : "Moon"} 
                  className="h-5 w-5 text-surface-600 dark:text-surface-300" 
                />
              </button>
              
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-200 dark:border-surface-700 p-6">
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Market Overview</h3>
              <div className="space-y-3">
                {[
{ name: 'NIFTY 50', value: '19,674.25', change: '+0.87%', positive: true },
                  { name: 'SENSEX', value: '65,930.77', change: '+1.12%', positive: true },
                  { name: 'BANK NIFTY', value: '44,156.80', change: '-0.34%', positive: false }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
className="flex justify-between items-center p-3 rounded-lg bg-surface-50 dark:bg-surface-700 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors"
                  >
<div>
                      <p className="font-medium text-surface-900 dark:text-white">{item.name}</p>
                      <p className="text-sm text-surface-600 dark:text-surface-300">{item.value}</p>
                    </div>
                    <span className={`text-sm font-medium ${item.positive ? 'text-secondary' : 'text-loss'}`}>
                      {item.change}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-200 dark:border-surface-700 p-6">
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center p-3 rounded-lg bg-secondary text-white hover:bg-secondary-dark transition-colors">
                  <ApperIcon name="TrendingUp" className="h-4 w-4 mr-2" />
                  Buy
                </button>
                <button className="flex items-center justify-center p-3 rounded-lg bg-loss text-white hover:bg-red-600 transition-colors">
                  <ApperIcon name="TrendingDown" className="h-4 w-4 mr-2" />
                  Sell
                </button>
              </div>
            </div>
          </div>

{/* Main Content */}
          <div className="lg:col-span-9">
            <div className="main-features-section">
              <MainFeature />
            </div>
            
            {/* Portfolio Summary */}
            {portfolioData && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-200 dark:border-surface-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-surface-600 dark:text-surface-400">Total Holdings</p>
                      <p className="text-2xl font-bold text-surface-900 dark:text-white">
                        ₹{portfolioData.totalValue?.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ApperIcon name="Wallet" className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-200 dark:border-surface-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-surface-600 dark:text-surface-400">Day's P&L</p>
                      <p className={`text-2xl font-bold ${portfolioData.dayPL >= 0 ? 'text-secondary' : 'text-loss'}`}>
                        {portfolioData.dayPL >= 0 ? '+' : ''}₹{portfolioData.dayPL?.toLocaleString()}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${portfolioData.dayPL >= 0 ? 'bg-secondary/10' : 'bg-loss/10'}`}>
                      <ApperIcon 
                        name={portfolioData.dayPL >= 0 ? "TrendingUp" : "TrendingDown"} 
                        className={`h-6 w-6 ${portfolioData.dayPL >= 0 ? 'text-secondary' : 'text-loss'}`} 
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-200 dark:border-surface-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-surface-600 dark:text-surface-400">Overall P&L</p>
                      <p className={`text-2xl font-bold ${portfolioData.overallPL >= 0 ? 'text-secondary' : 'text-loss'}`}>
                        {portfolioData.overallPL >= 0 ? '+' : ''}₹{portfolioData.overallPL?.toLocaleString()}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${portfolioData.overallPL >= 0 ? 'bg-secondary/10' : 'bg-loss/10'}`}>
                      <ApperIcon 
                        name="BarChart3" 
                        className={`h-6 w-6 ${portfolioData.overallPL >= 0 ? 'text-secondary' : 'text-loss'}`} 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home