<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '删除',
                icon: 'ic:outline-delete-outline',
                onClick: handleDelete.bind(null, record),
              },
            ]"
            :dropDownActions="[
              {
                label: '启用',
                popConfirm: {
                  title: '是否启用？',
                  confirm: handleOpen.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import _ from 'lodash-es';
  import { ref } from 'vue';

  const props = defineProps(['api']);

  const columns = ref([] as Array<Object>);

  async function makeTableData() {
    const res = await props.api();
    _.forEach(res[0], (_, key) => {
      const head = {
        title: key,
        dataIndex: key,
        width: 200,
      };
      console.log('is head right?', head);
      columns.value.push(head);
    });
    return res;
  }

  const [registerTable] = useTable({
    title: '연구 참여자 리스트',
    api: makeTableData,
    columns: columns,
    rowSelection: {
      type: 'checkbox',
    },

    bordered: true,
    // actionColumn: {
    //   width: 160,
    //   fixed: 'right',
    //   title: 'Action',
    //   dataIndex: 'action',
    //   // slots: { customRender: 'action' },
    // },
  });

  function handleDelete(record: Recordable) {
    console.log('handle delete record', record);
  }
  function handleOpen(record: Recordable) {
    console.log('handle open record', record);
  }
</script>
