DOCKER_APP_RUN_USER=@docker compose run --rm -it -u 1000 app

yarn.install:
	$(DOCKER_APP_RUN_USER) yarn --frozen-lockfile

yarn.fresh-install:
	$(DOCKER_APP_RUN_USER) yarn install

yarn.dev:
	$(DOCKER_APP_RUN_USER) yarn dev

yarn.build:
	$(DOCKER_APP_RUN_USER) yarn build

yarn.start:
	$(DOCKER_APP_RUN_USER) yarn start

yarn.build-static:
	$(DOCKER_APP_RUN_USER) yarn build:static

audit:
	$(DOCKER_APP_RUN_USER) yarn audit

lint:
	$(DOCKER_APP_RUN_USER) yarn lint

format:
	$(DOCKER_APP_RUN_USER) yarn format

format.check:
	$(DOCKER_APP_RUN_USER) yarn format:check

test:
	$(DOCKER_APP_RUN_USER) yarn test

test.coverage:
	$(DOCKER_APP_RUN_USER) yarn test:coverage

build:
	docker compose build --no-cache

start:
	docker compose up -d

stop:
	docker compose down --remove-orphans

restart: stop start

logs.watch:
	docker compose logs -f