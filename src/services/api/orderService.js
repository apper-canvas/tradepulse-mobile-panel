import orderData from '../mockData/order.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const orderService = {
  async getAll() {
    await delay(300)
    return [...orderData]
  },

  async getById(id) {
    await delay(250)
    const order = orderData.find(item => item.orderId === id)
    return order ? { ...order } : null
  },

  async create(orderItem) {
    await delay(400)
    const newOrder = {
      ...orderItem,
      orderId: Date.now(),
      timestamp: new Date().toISOString(),
      status: orderItem.status || 'PENDING'
    }
    orderData.unshift(newOrder)
    return { ...newOrder }
  },

  async update(id, data) {
    await delay(350)
    const index = orderData.findIndex(item => item.orderId === id)
    if (index !== -1) {
      orderData[index] = { ...orderData[index], ...data, updatedAt: new Date().toISOString() }
      return { ...orderData[index] }
    }
    throw new Error('Order not found')
  },

  async delete(id) {
    await delay(300)
    const index = orderData.findIndex(item => item.orderId === id)
    if (index !== -1) {
      const deleted = orderData.splice(index, 1)
      return { ...deleted[0] }
    }
    throw new Error('Order not found')
  }
}

export default orderService