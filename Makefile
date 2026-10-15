HUGO ?= hugo
OINK ?= $(HOME)/pgsty/oink
OINK_LOCAL ?= $(OINK)
PORT ?= 1313

# Keep local development independent of module workspaces and vendored pins.
export GOWORK := off
export HUGO_MODULE_WORKSPACE := off
PINNED_HUGO = env -u HUGO_MODULE_REPLACEMENTS $(HUGO)
LOCAL_HUGO = HUGO_MODULE_REPLACEMENTS="github.com/pgsty/oink -> $(abspath $(OINK_LOCAL))" $(HUGO) --ignoreVendorPaths=github.com/pgsty/oink

default: dev

d: dev
dev: theme-local
	$(LOCAL_HUGO) server --renderToMemory --bind 127.0.0.1 --port "$(PORT)" --noBuildLock

serve:
	$(PINNED_HUGO) server --renderToMemory

b: build
build:
	$(PINNED_HUGO) build --minify --noChmod --cleanDestinationDir

c: check
check:
	go mod verify
	node --check static/js/piglet.js
	$(PINNED_HUGO) build --minify --noChmod --cleanDestinationDir --printPathWarnings --printI18nWarnings --panicOnWarning

s: sync
sync:
	rsync -avz public/ server:/www/piglet.run/

.PHONY: default d dev serve b build c check s sync

# Fail explicitly if a local theme was requested but is unavailable.
theme-local:
	@test -f "$(OINK_LOCAL)/hugo.yaml" || { echo "Set OINK_LOCAL to an OINK checkout (default: ~/pgsty/oink)." >&2; exit 1; }

.PHONY: theme-local
