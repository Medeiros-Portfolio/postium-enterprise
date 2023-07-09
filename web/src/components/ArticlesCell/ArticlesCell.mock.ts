// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  articles: [
    {
      id: 42,
      title: 'title',
      body: 'body',
      public: true,
      createdAt: new Date().toDateString(),
      User: {
        name: 'name',
      },
    },
    {
      id: 43,
      title: 'title',
      body: 'body',
      public: true,
      User: {
        name: 'name',
      },
      createdAt: new Date().toDateString(),
    },
    {
      id: 44,
      title: 'title',
      body: 'body',
      public: true,
      User: {
        name: 'name',
      },
      createdAt: new Date().toDateString(),
    },
  ],
})
