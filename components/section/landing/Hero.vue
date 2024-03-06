<script lang="ts" setup>

</script>
<template lang="">
  <div class="hero">
    <div class="title">
      Welcome To <img src="/images/logo.svg" alt=""  height="60">
    </div>
    <div class="subtitle">
      <h1>The world's most-loved social storytelling platform.</h1>
      <p>Story time connects a global community of 90 million readers and writers through the power of story.</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .hero{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;

    .title{
      font-size: 52px;
      line-height: 1;
      font-weight: 500;
      margin-bottom: 10px;
    }

    .subtitle{
      text-align: center;

      h1, p{
        font-weight: normal;
        font-size: 2.5rem;
      }
    }
  }
</style>