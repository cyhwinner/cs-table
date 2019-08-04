import Table from './Table.vue';
import TableColumn from './TableColumn.vue';

Table.install = function(Vue) {
  Vue.component(Table.name, Table);
}
export default Table
