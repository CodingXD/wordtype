FROM node:16-alpine
WORKDIR /app
COPY . /app
RUN npm install serve -g
RUN npm install
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "serve"]