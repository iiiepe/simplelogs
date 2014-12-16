FROM luis/nodejs

ENV MONGODB_DATABASE simplelogs

EXPOSE 3000

ADD ./application /var/www



