# 🔥 Brawlhalla Open API

- An unofficial API server with no connection to Brawlhalla and its developers, prepared for easier and unlimited access to Brawlhalla API services. ✅
- See <https://bhapi.338.rocks> for live version.

## 💢 SelfHost Using docker-compose

```yml
services:
  bhapi:
    image: ghcr.io/barbarbar338/bhapi:latest
    restart: unless-stopped
    ports:
      - "5555:5555"
    environment:
      - BH_API_KEY=<get it from brawlhalla devs>
      - REDIS_URL=redis://redis:6379 # create your own redis server

  bhapi-fe:
    image: ghcr.io/barbarbar338/bhapi-fe:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    depends_on:
      - bhapi
```

## 🔗 Contributing / Issues / Ideas

- Feel free to use GitHub's features ✨
