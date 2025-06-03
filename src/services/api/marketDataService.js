import marketData from '../mockData/marketData.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const marketDataService = {
  async getAll() {
    await delay(300)
    return [...marketData]
  },

  async getById(symbol) {
    await delay(250)
    const stock = marketData.find(item => item.symbol === symbol)
    return stock ? { ...stock } : null
  },

  async create(stockData) {
    await delay(400)
    const newStock = {
      ...stockData,
      symbol: stockData.symbol,
      createdAt: new Date().toISOString()
    }
    marketData.push(newStock)
    return { ...newStock }
  },

  async update(symbol, data) {
    await delay(350)
    const index = marketData.findIndex(item => item.symbol === symbol)
    if (index !== -1) {
      marketData[index] = { ...marketData[index], ...data, updatedAt: new Date().toISOString() }
      return { ...marketData[index] }
    }
    throw new Error('Stock not found')
  },

  async delete(symbol) {
    await delay(300)
    const index = marketData.findIndex(item => item.symbol === symbol)
    if (index !== -1) {
      const deleted = marketData.splice(index, 1)
      return { ...deleted[0] }
    }
    throw new Error('Stock not found')
  }
}

export default marketDataService