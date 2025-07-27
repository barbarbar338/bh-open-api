# 🔥 Brawlhalla Open API (Server)

- An unofficial API server with no connection to Brawlhalla and its developers, prepared for easier and unlimited access to Brawlhalla API services. ✅

## 💢 SelfHost Using docker-compose

```yml
services:
  bhapi:
    image: ghcr.io/barbarbar338/bhapi:latest
    restart: unless-stopped
    ports:
      - "5555:80"
    environment:
      - BH_API_KEY=<get it from brawlhalla devs>
      - MONGODB_URI=mongodb://bhapi:bhapi@mongo:27017/BHAPI?authSource=admin
    depends_on:
      - mongo
    networks:
      - bhapi

  mongo:
    image: mongo:latest
    restart: unless-stopped
    environment:
      - MONGO_INITDB_ROOT_USERNAME=bhapi
      - MONGO_INITDB_ROOT_PASSWORD=bhapi
    volumes:
      - mongo_data:/data/db
    networks:
      - bhapi

  mongo_express:
    image: mongo-express:latest
    restart: unless-stopped
    ports:
      - "8081:8081"
    environment:
      - ME_CONFIG_MONGODB_ADMINUSERNAME=bhapi
      - ME_CONFIG_MONGODB_ADMINPASSWORD=bhapi
      - ME_CONFIG_MONGODB_SERVER=mongo
    depends_on:
      - mongo
    networks:
      - bhapi

volumes:
  mongo_data:

networks:
  bhapi:
```

## 🔗 Contributing / Issues / Ideas

- Feel free to use GitHub's features ✨
