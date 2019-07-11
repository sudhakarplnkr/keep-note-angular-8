FROM node:10.9 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2

FROM nginx:alpine
COPY --from=node /app/dist/GoogleKeepUI /usr/share/nginx/html