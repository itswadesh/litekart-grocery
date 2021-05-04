<template>
  <div class="flex flex-col justify-center">
    <div>
      <h1 class="my-5 text-3xl font-bold text-center">Contact Us</h1>
    </div>

    <div class="container flex flex-col-reverse w-full mx-auto sm:flex-row">
      <div
        class="w-full py-3 mt-5 border-t-2 sm:border-t-0 sm:py-0 sm:mt-0 sm:border-r-2 sm:w-1/2"
      >
        <div class="p-5 space-y-6">
          <Textbox
            type="text"
            id="name"
            placeholder="Your Name *"
            class="w-full mx-auto md:w-4/5"
            required
            autofocus
          />
          <Textbox
            type="email"
            id="email"
            placeholder="Your Email *"
            class="w-full mx-auto md:w-4/5"
            required
            autofocus
          />
          <Textbox
            type="text"
            id="subject"
            placeholder="Subject *"
            class="w-full mx-auto md:w-4/5"
            required
            autofocus
          />
          <textarea
            placeholder="Message *"
            class="flex justify-center w-full h-40 p-3 mx-auto text-base font-light border-none rounded-sm md:w-4/5 ring-1 ring-gray-400 focus:ring-2 focus:ring-accent-700"
          ></textarea>
          <!-- <Textbox
            type="text"
            id="message"
            placeholder="Message *"
            class="w-full mx-auto md:w-4/5"
            required
            autofocus
          /> -->
          <Button class="w-4/5 p-2 mx-auto bg-primary-500"> Submit </Button>
        </div>
      </div>
      <div class="flex flex-col w-full sm:w-1/2">
        <div class="flex flex-col justify-center text-center">
          <span class="mt-4">Email:</span>
          <span
            class="text-base font-light cursor-pointer text-primary-500 hover:text-primary-200"
            >care@litekart.in</span
          >
          <span class="mt-8">Telephone:</span>
          <span
            class="text-base font-light cursor-pointer text-primary-500 hover:text-primary-200"
            >+91-88888888888</span
          >
          <span class="mt-8 text-xl">Litekart Private Limited</span>
          <span class="w-1/2 mx-auto text-primary-500"
            >LuLu Y Tower, 971/B, M K K Nair Road, Vazhakkala, Kochi, Kerala -
            682030</span
          >
        </div>
        <div class="mt-4 text-center">
          <h1>Follow Us On:</h1>
          <div class="flex flex-row justify-center mt-3">
            <img src="/img/social-facebook.png" alt="" class="w-10 h-10" />
            <img src="/img/tttttttt.png" alt="" class="w-10 h-10 mx-5" />
            <img src="/img/insta.jpg" alt="" class="w-10 h-10" />
          </div>
        </div>
      </div>
    </div>

    <!-- <h1 class="mt-4 mb-4 text-3xl font-bold text-center">Contact Us</h1>
    <div class="container flex items-center justify-center">
      Email:
      <div class="text-primary-500 ms-1">care@litekart.in</div>
    </div> -->
  </div>
</template>

<script>
import { Textbox, Button } from '~/shared/components/ui'
export default {
  head() {
    return {
      title: 'Contact Us',
    }
  },
  components: { Textbox, Button },
}
</script>

<style></style>
