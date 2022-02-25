import {createClient} from 'redis';

export const redisClient = createClient({
  socket: {
    port: 6379,
    host: 'redis',
  },
  password: 'root',
  legacyMode: true,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect().catch(console.error);

// await client.connect();

// await client.set('key', 'value');
// const value = await client.get('key');

// console.log(value);

