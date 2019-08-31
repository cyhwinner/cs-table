<style lang="stylus">

</style>
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
    }
  },

  render(h) {
    const columns = this.state.columns;
    const width = this.table.$refs.table && this.table.$refs.table.clientWidth;
    
    return (
      <thead>
        { this.headerRender(columns) }
      </thead>
    )
  },

  methods: {
    headerRender(columns) {
      return columns.map((column) => {
        return (
          <th>{column.label}</th>
        )
      })
    },
  }
}
</script>