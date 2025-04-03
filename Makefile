DOCKER_REGISTRY = localhost:5000
IMAGE_TAG = latest
LOCAL_PORT = 3000
IMAGE_NAME = $(DOCKER_REGISTRY)/hero-site/hero-site:$(IMAGE_TAG)

run:
	npm start

dockerbuild: ./Dockerfile
	docker build -f ./Dockerfile -t $(IMAGE_NAME) .
	docker push $(IMAGE_NAME)

docker:
	make dockerbuild

docker-local:
	docker build -f ./Dockerfile -t hero-site:local .

docker-run:
	docker run -it --rm -p $(LOCAL_PORT):3000 hero-site:local

docker-dev:
	make docker-local
	make docker-run

clean:
	docker rmi hero-site:local || true
	docker builder prune -f