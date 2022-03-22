FROM node:latest as build
COPY ./ /vue-docker
WORKDIR /vue-docker
RUN yarn install && yarn run build

FROM nginx
RUN mkdir /vue-docker
COPY --from=build /vue-docker/dist /vue-docker
COPY nginx.conf /etc/nginx/nginx.conf


