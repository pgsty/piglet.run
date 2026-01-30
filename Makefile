default: dev

d: dev
dev:
	hugo serve

b: build
build:
	hugo build --minify

s: sync
sync:
	rsync -avz public/ server:/www/piglet.run/

.PHONY: default d dev b build s sync
