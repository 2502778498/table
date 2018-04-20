<template>
  <div>
    <span :title="message">
        鼠标悬停此处几秒，
        可以看到此处动态绑定的 title！
  </span>
  <p>
    问一个答案是 yes/no 的问题：
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
  </div>
</template>
<script>
import axios from 'axios'
// import lodash from 'lodash'
export default {
  data () {
    return {
      message: '页面加载于 ' + new Date().toLocaleString(),
      question: '',
      answer: '你要先提出问题，我才能给你答案！'
    }
  },
  watch: {
    // 只要 question 发生改变，此函数就会执行
    question: function (newQuestion, oldQuestion) {
      this.answer = '等待输入停止……'
      this.getAnswer()
    }
  },
  methods: {
    // _.debounce 是由 lodash 提供的函数，
    // 在运行特别消耗性能的操作时，
    // 可以使用 _.debounce 来限制频率。
    // 在下面这种场景中，我们需要限制访问 yesno.wtf/api 的频率，
    // 等到用户输入完毕之后，ajax 请求才会发出。
    // 想要了解更多关于 _.debounce 函数（以及与它类似的 _.throttle）的详细信息，
    // 请访问：https://lodash.com/docs#debounce
    getAnswer: function () {
      if (this.question.indexOf('？') === -1) {
        this.answer = '问题通常需要包含一个中文问号。;-)'
        return
      }
      this.answer = '思考中……'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
        //   console.log(response)
          vm.answer = response.data.answer
          console.log(vm.answer)
        })
        .catch(function (error) {
          vm.answer = '错误！API 无法处理。' + error
        })
    }
  }
}
</script>
