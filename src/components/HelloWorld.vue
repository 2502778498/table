<template>
  <div>
    <el-table highlight-current-row @current-change="choose" stripe='stripe' border :data="tableData6" :span-method="row" style="width: 100%;margin-top:200px"  show-summary @selection-change="handleSelectionChange" @row-click='clickfunc'>
      <!-- <el-table-column type="selection" width="50" style="border:1px solid black"></el-table-column> -->
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="amount1" sortable label="数值 1"></el-table-column>
      <el-table-column prop="amount2" sortable label="数值 2"></el-table-column>
      <el-table-column prop="amount3" sortable label="数值 3"></el-table-column>
    </el-table>
<!--
  :data="tableData6":将数组tableData6中的数据遍历打印
  prop: 打印时prop属性值与tableData6每个对象的键对应
  span-method：合并行或列的方法
  sortable:排序
  show-summary:在表格最后新增‘合计’行  不带单位
  :summary-method="getSummaries"：方法 需与上面的属性一起使用
  @selection-change="handleSelectionChange":  当选择项发生变化时会触发该事件  参数 val[0] 包含该行的数据
  @row-click  点击行时触发 参数 row event column

  点击高亮该行：highlight-current-row  @current-change="choose"
-->
    <el-table border :data="tableData6" v-bind:span-method="objectSpanMethod" style="width: 100%; margin-top: 20px" :summary-method="getSummaries" show-summary>
      <el-table-column prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="amount1" label="数值 1（元）">
      </el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）">
      </el-table-column>
      <el-table-column label="数值 3（元）">
        <!--
          ⬇️ scope.row.name ： 可以直接row, column, $index 和 store（table 内部的状态管理）的数据
        -->
        <template slot-scope="scope">
          <el-popover trigger="hover">
            <p>姓名: {{ scope.row.name }}</p>
            <p>ID: {{ scope.row.id }}</p>
            <p>行: {{ scope.$index + 1}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>

      </el-table-column>
    </el-table>

     <!-- 弹窗 -->
     <el-table border v-show="isShow" :data="alertTable" style="position:fixed; top:0; z-index:999">
      <el-table-column prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="amount1" label="数值 1（元）">
        </el-table-column>
        <el-table-column prop="amount2" label="数值 2（元）">
        </el-table-column>
        <el-table-column prop="amount3" label="数值 3（元）">
        </el-table-column>
     </el-table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      header: false,
      stripe: true,
      isShow: false,
      alertTable: [{
        id: '',
        name: '',
        amount1: '',
        amount2: '',
        amount3: ''
      }],
      tableData6: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }],
      chooses: null
    }
  },
  methods: {
    choose (val) {
      this.chooses = val
    },
    clickfunc (row, event, column) {
      this.isShow = true
      this.alertTable[0].id = row['id']
      this.alertTable[0].name = row.name
      this.alertTable[0].amount1 = row.amount1
      this.alertTable[0].amount2 = row.amount2
      this.alertTable[0].amount3 = row.amount3
      console.log(1)
      axios.get('http://localhost:8081/static/test.json')
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleSelectionChange (val) {
      // console.log(val[0].id)
      this.multipleSelection = val
    },
    row: function ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    }
  }
}
</script>
<style lang='less'>
.el-table {
  th{
    .cell{
      text-align: center;
    }
  }
}
</style>
