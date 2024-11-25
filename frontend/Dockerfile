FROM node:20-alpine

COPY . .

ARG BEURL

ENV VITE_BACKEND_URL=${BEURL}

RUN npm install
RUN npm run build

EXPOSE 8000

CMD ["npx", "serve", "-s", "dist"]