import userData from '../mockData/user.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const userService = {
  async getAll() {
    await delay(300)
    return [...userData]
  },

  async getById(id) {
    await delay(250)
    const user = userData.find(item => item.userId === id)
    return user ? { ...user } : null
  },

  async create(userItem) {
    await delay(400)
    const newUser = {
      ...userItem,
      userId: Date.now(),
      createdAt: new Date().toISOString()
    }
    userData.push(newUser)
    return { ...newUser }
  },

  async update(id, data) {
    await delay(350)
    const index = userData.findIndex(item => item.userId === id)
    if (index !== -1) {
      userData[index] = { ...userData[index], ...data, updatedAt: new Date().toISOString() }
      return { ...userData[index] }
    }
    throw new Error('User not found')
  },

  async delete(id) {
    await delay(300)
    const index = userData.findIndex(item => item.userId === id)
    if (index !== -1) {
      const deleted = userData.splice(index, 1)
      return { ...deleted[0] }
    }
    throw new Error('User not found')
  }
}

export default userService