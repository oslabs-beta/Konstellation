# FROM alpine:3.16

FROM node:19.0.0
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 4318