<template>
  <div>
    <div v-for="(a, ix) in ast" :key="ix">
      <component :is="a.name" v-if="a.type == 'SELF_CLOSING'"></component>
      <div v-else v-html="a.body"></div>
    </div>
  </div>
</template>

<script>
import { default as Tokenizer } from 'shortcode-tokenizer'
function renderText(token) {
  if (token.type === Tokenizer.TEXT || token.type === Tokenizer.ERROR) {
    token.output = token.body
  }
  return token
}
function renderSelfClosing(token) {
  if (token.type === Tokenizer.SELF_CLOSING) {
    let name = getComponentName(token)
    let params = renderParams(token)
    token.output = `<${name}${params}></${name}>`
  }
  return token
}
export default {
  data() {
    return {
      ast: [],
    }
  },
  props: {
    content: {
      type: String,
      required: true,
    },
    strict: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    renderContent() {
      try {
        let ast = this.tokenizer.input(this.content).ast()
        this.ast = ast
      } catch (e) {
        console.log('page render err...', e)
      }
    },
  },
  created() {
    this.tokenizer = new Tokenizer()
    this.tokenizer.strict = this.strict
    this.renderContent()
  },
}
</script>
