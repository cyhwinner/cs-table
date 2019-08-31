<template>
  <div>
    <cs-table 
      :data="dataList"
      :head="headList"
      >
      <cs-table-column props="value" label="Id" width="100">
      </cs-table-column>
      <cs-table-column label="姓名">
        <template slot-scope="{row}">
          <div>
            {{row.name}}
          </div>
        </template>
      </cs-table-column>
      <cs-table-column label="操作">
      </cs-table-column>
      <cs-table-column label="滴滴">
      </cs-table-column>
    </cs-table>
  </div>
</template>

<script>
	export default {
    components: {
      
    },
    data() {
      return {
        dataList: [
          { value: '11', name: 'john', key: 'one', rowspan: 2 },
          { value: '12', name: 'john', key: 'one', rowspan: 0 },
          { value: '13', name: 'john', key: 'one' },
          { value: '15', name: 'john', key: 'one' },
        ],
        headList: ['Id', '姓名', '操作']
      }
    },
    methods: {
      spanMethod(row, column, rowIndex, columnIndex) {
        if (row.rowspan !==undefined && columnIndex === 0) {
          return [row.rowspan, 1];
        }
        return [1, 1];
      }
    }
	}
</script>

<style>
	
</style>