<style lang="scss">
  :root{
    --borderColor: #ccc
  }
  .cs-table{
    border: 1px solid var(--borderColor); 
    border-bottom: none;
    border-right: none;
    width: 100%;
    th {
      padding: 6px;
      font-size: 12px;
      font-weight: 400;
      border-right: 1px solid var(--borderColor); 
      border-bottom: 1px solid var(--borderColor); 
      text-align: left;
    }
    td{
      padding: 4px;
      border-right: 1px solid var(--borderColor); 
      border-bottom: 1px solid var(--borderColor);
    }
    .hiddenColumns{
      visibility: hidden;
    }
  }
</style>

<template>
  <div>
    <table class='cs-table tb-m-t-20' cellspacing='0' cellpadding='0' >
      <thead>
        <th v-for="item in this.head" :key="item"> {{item }}</th>
      </thead>
      <table-body :state="state"></table-body>
      <div ref="hiddenColumns" class="hiddenColumns"><slot></slot></div>
    </table>
  </div>
</template>

<script>
import TableBody from './TableBody.vue';
let tableId = 1;
export default {
  name: 'CsTable',
  props: {
    data: Array,
    spanMethod: Function,
    head: Array
  },
  data () {
    return {
      tableId: 0,
      state: {
        columns: [],
        tableData: []
      }
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(cur) {
        this.state.tableData = cur;
      }
    }
  },

  created () {
    this.tableId = 'table_' + tableId++;
  },

  methods: {
    insertColumn(column, columnIndex) {
      this.state.columns.splice(columnIndex, 0, column);
    },
    removeColumn(column, columnIndex) {
      this.state.columns.splice(columnIndex, 1)
    }
  },
  components: {
    TableBody
  }
}
</script>