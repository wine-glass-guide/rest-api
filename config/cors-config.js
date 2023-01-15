// The options are hardcoded, because I cannot load them from env.
export const corsOptions = {
  origin: ['https://wine-glass-guide-web-app.fly.dev', 'http://localhost:5173'],
  credentials: true,
};

export const ioCorsOptions = {
  origin: true,
  methods: ['GET', 'POST'],
};
