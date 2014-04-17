test: test-unit test-supertest

test-unit:
	@NODE_ENV=unittest mocha test/unit/index.js

test-supertest:
	@NODE_ENV=test node test/supertest/index.js