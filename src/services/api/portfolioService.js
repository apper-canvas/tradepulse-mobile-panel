import portfolioData from '../mockData/portfolio.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const portfolioService = {
  async getAll() {
    await delay(300)
    return [...portfolioData]
  },

  async getById(id) {
    await delay(250)
    const portfolio = portfolioData.find(item => item.portfolioId === id)
    return portfolio ? { ...portfolio } : null
  },

  async create(portfolioItem) {
    await delay(400)
    const newPortfolio = {
      ...portfolioItem,
      portfolioId: Date.now(),
      createdAt: new Date().toISOString()
    }
    portfolioData.push(newPortfolio)
    return { ...newPortfolio }
  },

  async update(id, data) {
    await delay(350)
    const index = portfolioData.findIndex(item => item.portfolioId === id)
    if (index !== -1) {
      portfolioData[index] = { ...portfolioData[index], ...data, updatedAt: new Date().toISOString() }
      return { ...portfolioData[index] }
    }
    throw new Error('Portfolio not found')
  },

  async delete(id) {
    await delay(300)
    const index = portfolioData.findIndex(item => item.portfolioId === id)
    if (index !== -1) {
      const deleted = portfolioData.splice(index, 1)
      return { ...deleted[0] }
    }
    throw new Error('Portfolio not found')
  }
}

export default portfolioService