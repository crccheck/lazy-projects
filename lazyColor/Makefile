dev:
	@$(MAKE) -s -j2 devdev

devdev: server css

server:
	python -m SimpleHTTPServer

css:
	sass --watch --compass --style compressed lazyColor.sass

.PHONY: dev dev devdev server css
