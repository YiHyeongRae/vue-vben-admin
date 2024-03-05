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
  // import { defineComponent } from 'vue';
  import { BasicTable, useTable, BasicColumn, TableAction } from '/@/components/Table';

  import { demoListApi } from '/@/api/demo/table';
  // import { getToken } from '/@/utils/auth';

  // const { data } = defineProps<{ data?: { [key: string]: any } }>();
  // console.log('?==>??', data);
  const columns: BasicColumn[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 160,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 260,
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 300,
    },
    {
      title: '开始时间',
      width: 200,
      dataIndex: 'beginTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 200,
    },
  ];
  // console.log('위에서 잘 주나 ? props ?', data);
  // const token = getToken();
  // console.log('is token right? =>', token);
  // const res = await fetch('https://research-dev.ssokdak.kr/api/v1/admin/schedule/4/applicants', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     authorization: `Bearer ${token}`,
  //   },
  // });
  // const applicants = await res.json();
  // console.log('applicantns =>', applicants);
  const [registerTable] = useTable({
    title: 'TableAction组件及固定列示例',
    api: demoListApi,
    columns: columns,
    rowSelection: {
      type: 'checkbox',
    },

    bordered: true,
    actionColumn: {
      width: 160,
      title: 'Action',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
    },
  });

  function handleDelete(record: Recordable) {
    console.log('handle delete record', record);
  }
  function handleOpen(record: Recordable) {
    console.log('handle open record', record);
  }
  // export default defineComponent({
  //   components: { BasicTable, TableAction },
  //   setup() {

  //     return {
  //       // registerTable,
  //       // handleDelete,
  //       // handleOpen,
  //     };
  //   },
  // });
</script>
