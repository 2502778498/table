<template>
  <div class="block">
      <el-table  max-height="400" highlight-current-row stripe='stripe' border :data="truepage" style="width: 100%;margin-top:200px">
      <!-- <el-table-column type="selection" width="50" style="border:1px solid black"></el-table-column> -->
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="amount1" sortable label="数值 1"></el-table-column>
      <el-table-column prop="amount2" sortable label="数值 2"></el-table-column>
      <el-table-column prop="amount3" sortable label="数值 3"></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[2, 3, 4, 5]" :page-size="100" layout="sizes, prev, pager, next" :total="10">
    </el-pagination>
  </div>
  <!--
      :current-page.sync  设置默认情况下显示第几页

      @size-change  每页显示条数发生变化时，触发
      @current-change  当前所在页数发生变话时 触发
 -->
</template>
<script>
export default {
  data () {
    return {
      message: '页面加载于 ' + new Date().toLocaleString(),
      // 默认 在第1页
      currentPage2: 1,
      truepage: [{
        id: '1',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '2',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }],
      tableData6: [{
        id: '1',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '2',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '3',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '4',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '5',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }, {
        id: '6',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '7',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '8',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '9',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '10',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }],
      meiye: 2,
      dangqian: 1
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.meiye = val
      this.handleCurrentChange(this.dangqian)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      let arr = []
      arr = this.tableData6.slice(this.meiye * val - this.meiye, this.meiye * val)
      this.truepage = arr
      this.dangqian = val
    }
  }
}
</script>
<style>
@import url("//unpkg.com/element-ui@2.2.2/lib/theme-chalk/index.css");
</style>
