dev: serve

serve:
	python -m SimpleHTTPServer

lazyColor.js:
	node vendor/r.js -o build.js out=$@

clean:
	rm -rf lazyColor.js

build: lazyColor.js

all: clean build


.PHONY: lazyColor.js
