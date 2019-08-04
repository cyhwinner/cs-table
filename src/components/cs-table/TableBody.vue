<script>
export default {
  props: {
    state: Object
  },
  data () {
    return {

    };
  },
  computed: {
    table() {
      return this.$parent;
    },
  },

  methods: {
    rowRender(row, index) {
      const columns = this.state.columns;
      return (
        <tr>
          {
            columns.map((column, columnIndex) => {
              const { rowspan, colspan } = this.getSpan(row, column, index, columnIndex);
              if (!rowspan || !colspan) {
                return null;
              }
              const columnData = { ...column };
              const data = {
                column: columnData,
                row,
                index
              }
              return(
                <td
                  colspan={colspan}
                  rowspan={rowspan}>
                  { column.renderCell(this.$createElement, data) }
                </td>
              )
            })
          }
        </tr>
      )
    },
    getSpan(row, column, rowIndex, columnIndex) {
      let rowspan = 1;
      let colspan = 1;
      const spanMethod = this.table.spanMethod;
      
      if (typeof spanMethod === 'function') {
        const result = spanMethod(row, column, rowIndex, columnIndex);
        if (Array.isArray(result)) {
          rowspan = result[0];
          colspan = result[1];
        } else {
          rowspan = result.rowspan;
          colspan = result.colspan;
        }
      }
      
      return { rowspan, colspan };
    }
  },

  render(h) {
    const data = this.state.tableData;
    let content = '';
    if (data.length) {
      content = (
        data.reduce((acc, row) => {
          return acc.concat(this.rowRender(row, acc.length))
        }, []) )
    } else {
      const headLength = this.table.head.length;
      content = (
        <tr>
          <td colspan={headLength}>暂无数据</td>
        </tr>
      )
    }
    return (
        <tbody>
         { content }
        </tbody>
      )
  },

}
</script>