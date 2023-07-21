// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  users: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@fakeemail.com',
      avatar: 'https://cdn.filestackcontent.com/TMo43YTaQNK6UdY7SSen',
      roles: ['admin'],
    },
    {
      id: '2',
      name: 'John Doe II',
      email: 'john.doe.second@fakeemail.com',
      avatar: 'https://cdn.filestackcontent.com/TMo43YTaQNK6UdY7SSen',
      roles: ['reader'],
    },
    {
      id: '3',
      name: 'John Doe III',
      email: 'john.doe.third@fakeemail.com',
      avatar: 'https://cdn.filestackcontent.com/TMo43YTaQNK6UdY7SSen',
      roles: ['writer'],
    },
  ],
})
