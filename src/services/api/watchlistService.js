import watchlistData from '../mockData/watchlist.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const watchlistService = {
  async getAll() {
    await delay(300)
    return [...watchlistData]
  },

  async getById(id) {
    await delay(250)
    const watchlist = watchlistData.find(item => item.watchlistId === id)
    return watchlist ? { ...watchlist } : null
  },

  async create(watchlistItem) {
    await delay(400)
    const newWatchlist = {
      ...watchlistItem,
      watchlistId: Date.now(),
      createdAt: new Date().toISOString()
    }
    watchlistData.push(newWatchlist)
    return { ...newWatchlist }
  },

  async update(id, data) {
    await delay(350)
    const index = watchlistData.findIndex(item => item.watchlistId === id)
    if (index !== -1) {
      watchlistData[index] = { ...watchlistData[index], ...data, updatedAt: new Date().toISOString() }
      return { ...watchlistData[index] }
    }
    throw new Error('Watchlist not found')
  },

  async delete(id) {
    await delay(300)
    const index = watchlistData.findIndex(item => item.watchlistId === id)
    if (index !== -1) {
      const deleted = watchlistData.splice(index, 1)
      return { ...deleted[0] }
    }
    throw new Error('Watchlist not found')
  }
}

export default watchlistService