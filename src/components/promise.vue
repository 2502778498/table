<template>
  <div>
      <button @click="promise"></button>
  </div>
</template>
<script>
export default {
  data() {
      return {

      }
  },
  method: {
      promise() {
        return new Promise((resolve, reject) => {
					//做一些异步操作
					setTimeout(() => {
						console.log('执行完成');
						resolve('随便什么数据');
					}, 2000);
        });     
    }
  }
}
</script>
