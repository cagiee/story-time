<script lang="ts" setup>
</script>
<template lang="">
  <div class="hero">
    <div class="title-wrapper">
      <h1 class="title">
        Welcome to 
      </h1>
      <!-- <img src="/images/logo.svg" alt=""  height="50"> -->
      <span class="logo-text" data-content="storytime">storytime</span>
    </div>
    <div class="subtitle">
      <p>The world's most-loved social storytelling platform.</p>
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
    min-height: 100vh;
    // background-color: red;

    .title-wrapper{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      margin: 1rem auto;
      font-size: 52px;
    }

    .title{
      line-height: 1;
      font-weight: 500;
      margin: 0 auto;
      font-size: clamp(2.1rem, 5vw, 3.6rem);
    }

    .subtitle{
      text-align: center;
      margin: 0 auto;

      p{
        font-weight: normal;
        font-size: clamp(.9rem, 2.5vw, 2rem);
        margin: 0 auto;
      }
    }
  }
  .logo-text{
    line-height: 1.5ch;
    font-size: clamp(2.1rem, 5vw, 3.6rem);
    font-weight: 600;
    position: relative;
    color: transparent;
    margin: 0 auto;
    
    &::before,
    &::after{
      content: attr(data-content);
      color: #000;
      position: absolute;
      left: 0;
    }
    &::after{
      color: #ffffff;
      background-color: #000;
      width: 1.5ch;
      overflow: hidden;
    }
  }
</style>