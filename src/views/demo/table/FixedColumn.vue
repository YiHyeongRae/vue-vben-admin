<template>
  <div class="p-4" style="padding-top: 0; padding-bottom: 0">
    <div style="padding: 0 6px; display: flex; justify-content: space-between; align-items: center">
      <span>참가자 리스트</span>
      <Button @click="() => openModal()">선택한 대상 푸쉬 발송하기</Button>
    </div>
  </div>

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

    <BasicModal @register="register" title="PUSH 알림 발송" @ok="() => submitPushData()">
      <div style="display: flex; flex-direction: column; padding: 30px 0">
        <div>대상 = {{ pushList }}</div>

        <textarea
          placeholder="발송할 메세지를 입력해주세요."
          style="
            min-height: 148px;
            resize: none;
            width: 100%;
            outline: none;
            border: 1px solid #efefef;
            box-sizing: border-box;
            margin: 30px 0;
          "
        ></textarea>

        <BasicForm :schemas="forms" :showResetButton="false" :showSubmitButton="false" />
      </div>
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicForm, FormSchema } from '/@/components/Form/index';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { Button } from '/@/components/Button';
  import _ from 'lodash-es';
  import { computed, ref, unref } from 'vue';
  import { getToken } from '/@/utils/auth';
  import { useRouter } from 'vue-router';

  const props = defineProps(['api']);

  const columns = ref([] as Array<Object>);
  const data = ref(null);

  const pushList = ref([] as Array<number>);
  const pushContent = ref('');
  const SERVER_URL = import.meta.env.VITE_RESEARCH_SERVER_URL;
  const SERVER_VERSION = import.meta.env.VITE_SERVER_VERSION;

  const token = getToken();
  async function submitPushData() {
    const mnfPushList = {
      researchId: Number(1),
      title: '쏙닥쏙닥 리서치',
      messageType: 'Push',
      scheduledTime: '',
      sendType: 'Immediately',
      registerNo: pushList,
      content: pushContent,
    };
    const res = await fetch(`${SERVER_URL}/api/${SERVER_VERSION}/admin/message`, {
      method: 'POST',
      body: JSON.stringify(mnfPushList),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.result === 'OK') {
      closeModal();
    } else {
      alert('푸쉬 메세지 발송에 실패했습니다.');
    }
    closeModal();
  }
  const [register, { openModal: openModal, closeModal: closeModal }] = useModal();
  async function makeTableData() {
    const res = await props.api();
    data.value = res;
    return res;
  }

  async function makeHeadCellData() {
    const res = await makeTableData();

    _.forEach(res[0], (_, key) => {
      const head = {
        title:
          key === 'total'
            ? '종합'
            : key === 'registerNo'
            ? '등록번호'
            : key === 'uncompletedDays'
            ? '미완료 일 수'
            : key,
        dataIndex: key,
        width: 200,
      };
      columns.value.push(head);
    });
    return res;
  }
  makeHeadCellData();
  const [registerTable] = useTable({
    // title: '연구 참여자 리스트',
    api: makeTableData,
    columns: columns,
    rowSelection: {
      type: 'checkbox',
      onChange(selectedRowKeys, selectedRows) {
        console.log(selectedRowKeys, selectedRows);
        const ids = selectedRows.map((item) => item.registerNo);
        pushList.value = ids;
      },
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

  const forms: FormSchema[] = [
    {
      field: 'startTime',
      label: '예약전송',
      component: 'DatePicker',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: ['시간'],
        showTime: { format: 'HH:mm:ss' },
      },
    },
  ];

  const { currentRoute, replace } = useRouter();
  const value = ref<string>('');
  const { name } = unref(currentRoute);
  replace({ name: name!, params: { id: unref(value) } });

  const params = computed(() => {
    return unref(currentRoute).params;
  });

  console.log(params, value);
  // const handleClickGo = () => {
  //   const { name } = unref(currentRoute);
  //   replace({ name: name!, params: { id: unref(value) } });
  // };
</script>
