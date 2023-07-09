// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  comments: [
    {
      id: 42,
      name: 'name',
      message: 'message',
      createdAt: new Date().toDateString(),
    },
    {
      id: 43,
      name: 'name',
      message: 'message',
      createdAt: new Date().toDateString(),
    },
    {
      id: 44,
      name: 'name',
      message: 'message',
      createdAt: new Date().toDateString(),
    },
  ],
})
