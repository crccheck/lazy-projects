serve:
	python -m SimpleHTTPServer

deploy:
	git co -b prod
	grunt prod
	git add -f lazyColor.css lazyColor.js
	git commit -m "prod $$(date -u +%Y-%m-%dT%H:%M:%SZ)"
	git push -f origin prod
	git co -
	git b -D prod
