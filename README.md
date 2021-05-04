# Litekart

- Clone including submodules
  `git clone --recurse-submodules git@github.com:itswadesh/litekart-grocery.git`

- Update submodules after clone
  `git submodule update --init --recursive`

## Docker

- docker pull itswadesh/litekart-grocery
- /usr/local/bin/docker-compose up

## Login to docker shell

- docker exec -ti a00 /bin/sh

# Todo replace with v-model.eager when released

EditAddress.vue -> v-model.number="address.zip"

`$event.target.composing = false` used to handle keyup in android mobile

search-suggestions.vue -> v-model="q"

`$event.target.composing = false` Input anv Value method used for handling keyup in mobile
