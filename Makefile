yarn.install:
	docker compose run --rm app yarn --frozen-lockfile

yarn.fresh-install:
	docker compose run --rm app yarn install

yarn.dev:
	docker compose run --rm app yarn dev

yarn.build:
	docker compose run --rm app yarn build

yarn.start:
	docker compose run --rm app yarn start

yarn.build-static:
	docker compose run --rm app yarn build:static

lint:
	docker compose run --rm app yarn lint

format:
	docker compose run --rm app yarn format

format.check:
	docker compose run --rm app yarn format:check

test:
	docker compose run --rm app yarn test

test.coverage:
	docker compose run --rm app yarn test:coverage

build:
	docker compose build --no-cache

start:
	docker compose up -d

stop:
	docker compose down --remove-orphans

restart: stop start

logs.watch:
	docker compose logs -f