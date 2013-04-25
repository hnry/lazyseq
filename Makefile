release:
		make dist && make pack

dist:
		echo "// Copyright 2013 lovebear https://github.com/lovebear/lazyseq.js" > lazyseq.min.js
		./node_modules/uglify-js/bin/uglifyjs ./index.js -mc >> lazyseq.min.js

pack:
		rm -rf package; rm -rf lazyseq*.tgz; 
		npm pack .

test:
		@mocha -R spec

.PHONY: test