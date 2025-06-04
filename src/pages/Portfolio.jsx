import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3,
  Eye,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle
} from 'lucide-react'
import portfolioService from '../services/api/portfolioService'
import Chart from 'react-apexcharts'

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')

  useEffect(() => {
    fetchPortfolioData()
  }, [])

  const fetchPortfolioData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await portfolioService.getAll()
      if (data && data.length > 0) {
        setPortfolio(data[0]) // Get the first portfolio
      }
    } catch (err) {
      setError('Failed to load portfolio data')
      toast.error('Failed to load portfolio data')
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    try {
      setRefreshing(true)
      await fetchPortfolioData()
      toast.success('Portfolio data refreshed')
    } catch (err) {
      toast.error('Failed to refresh data')
    } finally {
      setRefreshing(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatPercent = (percent) => {
    return `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`
  }

  // Portfolio performance chart data
  const chartOptions = {
    chart: {
      type: 'area',
      height: 300,
      zoom: { enabled: false },
      toolbar: { show: false },
      sparkline: { enabled: false }
    },
    colors: ['#387ED1'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: {
      categories: ['9:15', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '15:30'],
      labels: { style: { fontSize: '12px' } }
    },
    yaxis: {
      labels: {
        formatter: (value) => formatCurrency(value),
        style: { fontSize: '12px' }
      }
    },
    grid: {
      strokeDashArray: 3,
      borderColor: '#e2e8f0'
    },
    tooltip: {
      y: {
        formatter: (value) => formatCurrency(value)
      }
    }
  }

  const chartSeries = [{
    name: 'Portfolio Value',
    data: [480000, 482500, 485000, 483000, 486000, 485750, 487000, 485750]
  }]

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-surface-600">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-loss mx-auto mb-4" />
          <p className="text-surface-600 mb-4">{error}</p>
          <button
            onClick={fetchPortfolioData}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-surface-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <PieChart className="w-12 h-12 text-surface-400 mx-auto mb-4" />
          <p className="text-surface-600">No portfolio data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <div className="bg-white border-b border-surface-200 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-surface-900 mb-2">Portfolio</h1>
              <p className="text-surface-600">Track your investments and performance</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="1D">1 Day</option>
                <option value="1W">1 Week</option>
                <option value="1M">1 Month</option>
                <option value="3M">3 Months</option>
                <option value="1Y">1 Year</option>
              </select>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-primary" />
              <span className="text-sm text-surface-600">Total Value</span>
            </div>
            <div className="text-2xl font-bold text-surface-900 mb-1">
              {formatCurrency(portfolio.totalValue)}
            </div>
            <div className="text-sm text-surface-600">
              Invested: {formatCurrency(portfolio.investedAmount)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-secondary" />
              <span className="text-sm text-surface-600">Day P&L</span>
            </div>
            <div className={`text-2xl font-bold mb-1 ${portfolio.dayPL >= 0 ? 'text-secondary' : 'text-loss'}`}>
              {portfolio.dayPL >= 0 ? '+' : ''}{formatCurrency(portfolio.dayPL)}
            </div>
            <div className={`text-sm ${portfolio.dayPL >= 0 ? 'text-secondary' : 'text-loss'}`}>
              {formatPercent((portfolio.dayPL / portfolio.investedAmount) * 100)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-primary" />
              <span className="text-sm text-surface-600">Overall P&L</span>
            </div>
            <div className={`text-2xl font-bold mb-1 ${portfolio.overallPL >= 0 ? 'text-secondary' : 'text-loss'}`}>
              {portfolio.overallPL >= 0 ? '+' : ''}{formatCurrency(portfolio.overallPL)}
            </div>
            <div className={`text-sm ${portfolio.overallPL >= 0 ? 'text-secondary' : 'text-loss'}`}>
              {formatPercent((portfolio.overallPL / portfolio.investedAmount) * 100)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <div className="flex items-center justify-between mb-4">
              <PieChart className="w-8 h-8 text-accent" />
              <span className="text-sm text-surface-600">Available Margin</span>
            </div>
            <div className="text-2xl font-bold text-surface-900 mb-1">
              {formatCurrency(portfolio.availableMargin)}
            </div>
            <div className="text-sm text-surface-600">
              Used: {formatCurrency(portfolio.usedMargin)}
            </div>
          </motion.div>
        </div>

        {/* Portfolio Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-card mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-surface-900">Portfolio Performance</h2>
            <div className="flex items-center gap-2 text-sm text-surface-600">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              Portfolio Value
            </div>
          </div>
          <Chart options={chartOptions} series={chartSeries} type="area" height={300} />
        </motion.div>

        {/* Holdings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-card mb-6"
        >
          <h2 className="text-xl font-semibold text-surface-900 mb-6">Holdings</h2>
          <div className="space-y-4">
            {portfolio.holdings?.map((holding, index) => (
              <div key={index} className="border border-surface-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-surface-900">{holding.symbol}</h3>
                      <span className="text-sm text-surface-600">Qty: {holding.quantity}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-surface-600">
                      <span>Avg: {formatCurrency(holding.avgPrice)}</span>
                      <span>LTP: {formatCurrency(holding.currentPrice)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-4">
                    <div className="text-right">
                      <div className={`font-semibold ${holding.pnl >= 0 ? 'text-secondary' : 'text-loss'}`}>
                        {holding.pnl >= 0 ? '+' : ''}{formatCurrency(holding.pnl)}
                      </div>
                      <div className={`text-sm ${holding.pnl >= 0 ? 'text-secondary' : 'text-loss'}`}>
                        {formatPercent(holding.pnlPercent)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {holding.pnl >= 0 ? (
                        <ArrowUpRight className="w-5 h-5 text-secondary" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-loss" />
                      )}
                      <button className="p-2 hover:bg-surface-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-surface-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Positions */}
        {portfolio.positions && portfolio.positions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <h2 className="text-xl font-semibold text-surface-900 mb-6">Positions</h2>
            <div className="space-y-4">
              {portfolio.positions.map((position, index) => (
                <div key={index} className="border border-surface-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-surface-900">{position.symbol}</h3>
                        <span className="text-sm text-surface-600">Qty: {position.quantity}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-surface-600">
                        <span>Avg: {formatCurrency(position.avgPrice)}</span>
                        <span>LTP: {formatCurrency(position.currentPrice)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <div className="text-right">
                        <div className={`font-semibold ${position.pnl >= 0 ? 'text-secondary' : 'text-loss'}`}>
                          {position.pnl >= 0 ? '+' : ''}{formatCurrency(position.pnl)}
                        </div>
                        <div className={`text-sm ${position.pnl >= 0 ? 'text-secondary' : 'text-loss'}`}>
                          {formatPercent(position.pnlPercent)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {position.pnl >= 0 ? (
                          <ArrowUpRight className="w-5 h-5 text-secondary" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5 text-loss" />
                        )}
                        <button className="p-2 hover:bg-surface-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-surface-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Portfolio