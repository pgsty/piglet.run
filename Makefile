HUGO ?= hugo
OINK ?= $(abspath ../oink)

default: dev

d: dev
dev:
	HUGO_MODULE_REPLACEMENTS='github.com/pgsty/oink -> $(OINK)' $(HUGO) server --renderToMemory

serve:
	$(HUGO) server --renderToMemory

b: build
build:
	$(HUGO) build --minify --noChmod --cleanDestinationDir

c: check
check:
	go mod verify
	node --check static/js/piglet.js
	$(HUGO) build --minify --noChmod --cleanDestinationDir --printPathWarnings --printI18nWarnings --panicOnWarning

s: sync
sync:
	rsync -avz public/ server:/www/piglet.run/

.PHONY: default d dev serve b build c check s sync
