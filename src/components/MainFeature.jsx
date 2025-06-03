import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { marketDataService, orderService, watchlistService } from '../services'

const MainFeature = () => {
  const [marketData, setMarketData] = useState([])
  const [watchlists, setWatchlists] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Trading form state
  const [selectedStock, setSelectedStock] = useState(null)
  const [orderType, setOrderType] = useState('BUY')
  const [tradeType, setTradeType] = useState('MARKET')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  
  // UI state
  const [activeTab, setActiveTab] = useState('watchlist')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [marketResult, watchlistResult, orderResult] = await Promise.all([
          marketDataService.getAll(),
          watchlistService.getAll(),
          orderService.getAll()
        ])
        setMarketData(marketResult || [])
        setWatchlists(watchlistResult || [])
        setOrders(orderResult || [])
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load market data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleStockSelect = (stock) => {
    setSelectedStock(stock)
    setPrice(stock?.ltp?.toString() || '')
  }

  const adjustPrice = (adjustment) => {
    if (!selectedStock?.ltp) return
    const currentPrice = parseFloat(price) || selectedStock.ltp
    const newPrice = currentPrice * (1 + adjustment / 100)
    setPrice(newPrice.toFixed(2))
  }

  const handlePlaceOrder = async () => {
    if (!selectedStock || !quantity || (tradeType === 'LIMIT' && !price)) {
      toast.error('Please fill all required fields')
      return
    }

    setIsPlacingOrder(true)
    try {
      const orderData = {
        symbol: selectedStock.symbol,
        orderType,
        quantity: parseInt(quantity),
        price: tradeType === 'MARKET' ? selectedStock.ltp : parseFloat(price),
        tradeType,
        status: 'PENDING'
      }

      const newOrder = await orderService.create(orderData)
      setOrders(prev => [newOrder, ...prev])
      
      // Reset form
      setQuantity('')
      setPrice(selectedStock?.ltp?.toString() || '')
      
      toast.success(`${orderType} order placed successfully!`)
      
      // Simulate order execution after 2 seconds
      setTimeout(() => {
        setOrders(prev => 
          prev.map(order => 
            order.orderId === newOrder.orderId 
              ? { ...order, status: 'EXECUTED' }
              : order
          )
        )
        toast.success(`Order executed at ₹${orderData.price}`)
      }, 2000)
      
    } catch (err) {
      toast.error('Failed to place order')
    } finally {
      setIsPlacingOrder(false)
    }
  }

  const calculateMargin = () => {
    if (!selectedStock || !quantity) return 0
    const orderPrice = tradeType === 'MARKET' ? selectedStock.ltp : parseFloat(price) || 0
    return orderPrice * parseInt(quantity) * (orderType === 'BUY' ? 1 : 0.2)
  }

if (loading) {
    return (
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-200 dark:border-surface-700 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface-200 dark:bg-surface-600 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-surface-200 dark:bg-surface-600 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
      {/* Watchlist & Market Data */}
      <div className="xl:col-span-2 bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-200 dark:border-surface-700">
          {/* Tabs */}
          <div className="border-b border-surface-200 dark:border-surface-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'watchlist', label: 'Watchlist', icon: 'Eye' },
                { id: 'orders', label: 'Orders', icon: 'FileText' },
                { id: 'positions', label: 'Positions', icon: 'TrendingUp' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                  }`}
                >
                  <ApperIcon name={tab.icon} className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

{/* Tab Content */}
        <div className="p-3 sm:p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'watchlist' && (
              <motion.div
                key="watchlist"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-2"
              >
                {/* Desktop Table Header */}
                <div className="hidden md:grid grid-cols-5 gap-4 pb-2 text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  <div>Symbol</div>
                  <div className="text-right">LTP</div>
                  <div className="text-right">Change</div>
                  <div className="text-right">Volume</div>
                  <div className="text-center">Action</div>
                </div>
                
{marketData?.map((stock, index) => (
                  <motion.div
                    key={stock.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-3 rounded-lg transition-all duration-200 cursor-pointer group hover:bg-surface-50 dark:hover:bg-surface-700 ${
                      selectedStock?.symbol === stock.symbol ? 'bg-primary/5 border border-primary/20' : ''
                    }`}
                    onClick={() => handleStockSelect(stock)}
                  >
                    {/* Mobile Card Layout */}
                    <div className="md:hidden space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-surface-900 dark:text-white">{stock.symbol}</p>
                          <p className="text-xs text-surface-500 dark:text-surface-400">NSE</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-surface-900 dark:text-white">₹{stock.ltp}</p>
                          <p className={`text-xs font-medium ${stock.change >= 0 ? 'text-secondary' : 'text-loss'}`}>
                            {stock.change >= 0 ? '+' : ''}₹{stock.change} ({((stock.change / (stock.ltp - stock.change)) * 100).toFixed(2)}%)
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-surface-500 dark:text-surface-400">Vol: {stock.volume?.toLocaleString()}</span>
                        <div className="flex space-x-1">
                          <button className="p-1 rounded bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors">
                            <ApperIcon name="TrendingUp" className="h-3 w-3" />
                          </button>
                          <button className="p-1 rounded bg-loss/10 text-loss hover:bg-loss/20 transition-colors">
                            <ApperIcon name="TrendingDown" className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Grid Layout */}
                    <div className="hidden md:grid grid-cols-5 gap-4">
                      <div>
                        <p className="font-medium text-surface-900 dark:text-white">{stock.symbol}</p>
                        <p className="text-xs text-surface-500 dark:text-surface-400">NSE</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-surface-900 dark:text-white">₹{stock.ltp}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-medium ${stock.change >= 0 ? 'text-secondary' : 'text-loss'}`}>
                          {stock.change >= 0 ? '+' : ''}₹{stock.change}
                        </p>
                        <p className={`text-xs ${stock.change >= 0 ? 'text-secondary' : 'text-loss'}`}>
                          ({((stock.change / (stock.ltp - stock.change)) * 100).toFixed(2)}%)
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-surface-600 dark:text-surface-300">{stock.volume?.toLocaleString()}</p>
                      </div>
                      
                      <div className="flex justify-center space-x-1">
                        <button className="p-1 rounded bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors opacity-0 group-hover:opacity-100">
                          <ApperIcon name="TrendingUp" className="h-3 w-3" />
                        </button>
                        <button className="p-1 rounded bg-loss/10 text-loss hover:bg-loss/20 transition-colors opacity-0 group-hover:opacity-100">
                          <ApperIcon name="TrendingDown" className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-2"
                >
                  {orders?.length === 0 ? (
                    <div className="text-center py-8">
                      <ApperIcon name="FileText" className="h-12 w-12 text-surface-300 mx-auto mb-4" />
                      <p className="text-surface-500 dark:text-surface-400">No orders placed yet</p>
</div>
                ) : (
                  <div className="space-y-2">
                    {/* Desktop Orders Header */}
                    <div className="hidden md:grid grid-cols-6 gap-4 pb-2 text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      <div>Symbol</div>
                      <div>Type</div>
                      <div className="text-right">Qty</div>
                      <div className="text-right">Price</div>
                      <div className="text-center">Status</div>
                      <div className="text-center">Time</div>
                    </div>
                    
{orders.map((order, index) => (
                      <motion.div
                        key={order.orderId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-3 rounded-lg bg-surface-50 dark:bg-surface-700"
                      >
                        {/* Mobile Order Card */}
                        <div className="md:hidden space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-surface-900 dark:text-white">{order.symbol}</p>
                              <p className={`text-sm font-medium ${order.orderType === 'BUY' ? 'text-secondary' : 'text-loss'}`}>
                                {order.orderType} • Qty: {order.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-surface-900 dark:text-white">₹{order.price}</p>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                order.status === 'EXECUTED' 
                                  ? 'bg-secondary/10 text-secondary' 
                                  : order.status === 'PENDING'
                                  ? 'bg-accent/10 text-accent'
                                  : 'bg-loss/10 text-loss'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-surface-500 dark:text-surface-400">
                            {new Date(order.timestamp).toLocaleTimeString()}
                          </div>
                        </div>

                        {/* Desktop Order Grid */}
                        <div className="hidden md:grid grid-cols-6 gap-4">
                          <div className="font-medium text-surface-900 dark:text-white">{order.symbol}</div>
                          <div className={`text-sm font-medium ${order.orderType === 'BUY' ? 'text-secondary' : 'text-loss'}`}>
                            {order.orderType}
                          </div>
                          <div className="text-right text-surface-600 dark:text-surface-300">{order.quantity}</div>
                          <div className="text-right font-medium text-surface-900 dark:text-white">₹{order.price}</div>
                          <div className="text-center">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              order.status === 'EXECUTED' 
                                ? 'bg-secondary/10 text-secondary' 
                                : order.status === 'PENDING'
                                ? 'bg-accent/10 text-accent'
                                : 'bg-loss/10 text-loss'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="text-center text-xs text-surface-500 dark:text-surface-400">
                            {new Date(order.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                </motion.div>
              )}
</AnimatePresence>
          </div>
        </div>
      </div>

      {/* Order Entry Panel */}
      <div className="space-y-4 lg:space-y-6">
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-200 dark:border-surface-700">
          <div className="p-4 sm:p-6 border-b border-surface-200 dark:border-surface-700">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white">Place Order</h3>
            {selectedStock && (
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                {selectedStock.symbol} • ₹{selectedStock.ltp}
              </p>
)}
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            {/* Order Type Tabs */}
            <div className="flex rounded-lg bg-surface-100 dark:bg-surface-700 p-1">
              {['BUY', 'SELL'].map((type) => (
                <button
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    orderType === type
                      ? type === 'BUY'
                        ? 'bg-secondary text-white shadow-sm'
                        : 'bg-loss text-white shadow-sm'
                      : 'text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Trade Type */}
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Order Type
              </label>
              <select
                value={tradeType}
                onChange={(e) => setTradeType(e.target.value)}
                className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 dark:text-white"
              >
                <option value="MARKET">Market</option>
                <option value="LIMIT">Limit</option>
                <option value="SL">Stop Loss</option>
                <option value="SL-M">Stop Loss Market</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 dark:text-white"
              />
            </div>

            {/* Price (for limit orders) */}
            {tradeType !== 'MARKET' && (
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Price
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                    className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 dark:text-white"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => adjustPrice(-5)}
                      className="flex-1 py-1 px-2 text-xs bg-surface-100 dark:bg-surface-600 text-surface-600 dark:text-surface-300 rounded hover:bg-surface-200 dark:hover:bg-surface-500 transition-colors"
                    >
                      -5%
                    </button>
                    <button
                      onClick={() => adjustPrice(-1)}
                      className="flex-1 py-1 px-2 text-xs bg-surface-100 dark:bg-surface-600 text-surface-600 dark:text-surface-300 rounded hover:bg-surface-200 dark:hover:bg-surface-500 transition-colors"
                    >
                      -1%
                    </button>
                    <button
                      onClick={() => adjustPrice(1)}
                      className="flex-1 py-1 px-2 text-xs bg-surface-100 dark:bg-surface-600 text-surface-600 dark:text-surface-300 rounded hover:bg-surface-200 dark:hover:bg-surface-500 transition-colors"
                    >
                      +1%
                    </button>
                    <button
                      onClick={() => adjustPrice(5)}
                      className="flex-1 py-1 px-2 text-xs bg-surface-100 dark:bg-surface-600 text-surface-600 dark:text-surface-300 rounded hover:bg-surface-200 dark:hover:bg-surface-500 transition-colors"
                    >
                      +5%
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Margin Display */}
            {quantity && selectedStock && (
              <div className="p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-surface-600 dark:text-surface-400">Required Margin:</span>
                  <span className="font-semibold text-surface-900 dark:text-white">
                    ₹{calculateMargin().toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Place Order Button */}
            <motion.button
              onClick={handlePlaceOrder}
              disabled={!selectedStock || !quantity || isPlacingOrder}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                orderType === 'BUY'
                  ? 'bg-secondary hover:bg-secondary-dark disabled:bg-surface-300'
                  : 'bg-loss hover:bg-red-600 disabled:bg-surface-300'
              } disabled:cursor-not-allowed`}
            >
              {isPlacingOrder ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Placing Order...</span>
                </div>
              ) : (
                `${orderType} ${selectedStock?.symbol || 'Select Stock'}`
              )}
            </motion.button>
          </div>
</div>

        {/* Chart Timeframes */}
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-200 dark:border-surface-700 p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Chart View</h3>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {['1m', '5m', '1H', '1D'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-primary text-white'
                    : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
</div>
          
          {selectedStock ? (
            <div className="aspect-video bg-surface-50 dark:bg-surface-700 rounded-lg flex items-center justify-center overflow-hidden">
              <div className="text-center p-4">
                <ApperIcon name="BarChart3" className="h-8 w-8 sm:h-12 sm:w-12 text-surface-300 mx-auto mb-2" />
                <p className="text-sm sm:text-base text-surface-500 dark:text-surface-400">
                  Chart for {selectedStock.symbol}
                <p className="text-xs text-surface-400 dark:text-surface-500">
                  Timeframe: {selectedTimeframe}
                </p>
              </div>
</div>
          ) : (
            <div className="aspect-video bg-surface-50 dark:bg-surface-700 rounded-lg flex items-center justify-center overflow-hidden">
              <p className="text-sm sm:text-base text-surface-500 dark:text-surface-400 text-center p-4">Select a stock to view chart</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainFeature