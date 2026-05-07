import { app, createApp } from './app.js';

const app2 = createApp();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
