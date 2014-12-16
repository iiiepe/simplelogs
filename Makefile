
install:
	@fig run --rm web npm install

build:
	@fig run --rm web npm install
	@docker build --tag=simplelogs .

up:
	@fig up -d

clean:
	@fig stop

start:
	@fig start web
	@tail -f /var/log/docker/simplelogs/nodejs.log

stop:
	@fig stop web

status:
	@fig ps

cli:
	@fig run --rm web bash

log:
	@tail -f /var/log/docker/simplelogs/nodejs.log

restart:
	@fig stop web
	@fig start web
	@tail -f /var/log/docker/simplelogs/nodejs.log

.PHONY: install build up clean start stop status cli log restart
