
<script>
let columnId = 1;
export default {
  name: 'CsTableColumn',
  props: {
    label: String,
    props: String
  },
  data () {
    return {
      columnId: 0,
      columnsConfig: {}
    };
  },
  computed: {
    owner() {
      let parent = this.$parent;
      // 那就说明父组件不是table
      while (parent && !parent.tableId) {
        parent = parent.$parent;
      }
      return parent;
    },
  },
  created () {
    const parent = this.owner;
    this.columnId = parent.tableId + '_column_' + columnId++;
    const basicProps = ['columnKey', 'label', 'className', 'labelClassName', 'type', 'renderHeader', 'formatter', 'fixed', 'resizable', 'props'];
    
    let column = this.getPropsData(basicProps);
    column = this.setColumnRender(column);
    this.columnsConfig = column;
  },
  mounted() {
    const owner = this.owner;
    const children = owner.$refs.hiddenColumns.children;
    const columnIndex = this.getColumnIndex(children, this.$el);
    owner.insertColumn(this.columnsConfig, columnIndex);
  },

  methods: {
    defaultRenderCell(h, { row, column, $index }) {
      const property = column.props;
      const value = row[property];
      return value;
    },
    setColumnRender(column) {
      let children;
      column.renderCell = (h, data) => {
        if (this.$scopedSlots.default) {
          children = this.$scopedSlots.default(data);
        } else {
          children = this.defaultRenderCell(h, data);
        }
        const props = {
          class: `cell ${this.columnId}`
        }
        return (
          <div {...props}>
            { children }
          </div>
        )
      }
      return column;
    },
    getPropsData(...props) {
      return props.reduce((column, cur) => {
        if (Array.isArray(cur)) {
          cur.forEach((key) => column[key] = this[key]);
        }
        return column
      }, {})
    },
    getColumnIndex(children, child) {
      return [].indexOf.call(children, child);
    }
  },
  render(h) {
    return h('div', this.$slots.default)
  }

}
</script>
