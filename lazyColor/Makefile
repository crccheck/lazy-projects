dev:
	@$(MAKE) -s -j2 devdev

devdev: server css

server:
	python -m SimpleHTTPServer

css:
	sass --watch --compass --style compressed lazyColor.sass

lazyColor.js:
	node vendor/r.js -o baseUrl=js name=../vendor/almond include=main out=$@ wrap=true

clean:
	rm -rf lazyColor.js

build: lazyColor.js

all: clean build


.PHONY: dev dev devdev server css clean build all
