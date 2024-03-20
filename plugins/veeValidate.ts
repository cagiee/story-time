import { defineRule, configure } from 'vee-validate'
// eslint-disable-next-line camelcase
import { required, min, max, confirmed, email, min_value, image } from '@vee-validate/rules'
// Define the rule globally

export default defineNuxtPlugin(() => {
  defineRule('required', (value: any, children: any, ctx: any) => {
    if (!value) {
      return `${ctx.label} is required`;
    }
    return true;
  })
  defineRule('requiredQuill', (value: any, children: any, ctx: any) => {
    if (value === '<p><br></p>' || !value) {
      return `${ctx.label} is required`;
    }
    return true;
  })

  defineRule('min', (value: any, limit: any, ctx: any) => {
  // The field is empty so it should pass
    if (!value || !value.length) {
      return true;
    }
    if (value.length < limit) {
      return `${ctx.label} must be at least ${limit} characters`;
    }
    return true;
  })

  defineRule('confirmed', (value: any, target: any, ctx: any) => {
    if (value === target[0]) {
      return true;
    }
    return `${ctx.label} doesn't match`
  });

  defineRule('email', email)
  defineRule('max', max)
  defineRule('min_value', min_value)
  defineRule('image', image)
})