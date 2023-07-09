// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  articles: [
    {
      id: 42,
      title: 'title',
      body: 'body',
      createdAt: new Date().toDateString(),
    },
    {
      id: 43,
      title: 'title',
      body: 'body',
      createdAt: new Date().toDateString(),
    },
    {
      id: 44,
      title: 'title',
      body: 'body',
      createdAt: new Date().toDateString(),
    },
  ],
})
