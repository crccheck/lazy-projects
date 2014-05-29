dev:
	@$(MAKE) -s -j2 devdev

devdev: serve css

serve:
	python -m SimpleHTTPServer

css:
	sass --watch --compass --style compressed lazyColor.sass

lazyColor.js:
	node vendor/r.js -o build.js out=$@

clean:
	rm -rf lazyColor.js

build: lazyColor.js

all: clean build


.PHONY: lazyColor.js
