release:
		make dist && make pack

dist:
		echo "// Copyright 2013 lovebear https://github.com/lovebear/multiarray.js" > multiarray.min.js
		./node_modules/uglify-js/bin/uglifyjs ./index.js -mc >> multiarray.min.js

pack:
		rm -rf package; rm -rf multiarray*.tgz; 
		npm pack .

test:
		@mocha -R spec

.PHONY: test