import vue from 'vue'
import App from './App.vue'
import Table from 'components/cs-table';
import TableColumn from 'components/cs-table-column';

vue.use(Table);
vue.use(TableColumn);
new vue({
	el: '#app',
	render: h =>h(App)
})