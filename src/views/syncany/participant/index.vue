<template>
  <PageWrapper :title="t('routes.syncany.participant')">
    <template #headerContent><FixedColumn /></template>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { useI18n } from '/@/hooks/web/useI18n';
  import { PageWrapper } from '/@/components/Page';
  import FixedColumn from '../../../views/demo/table/FixedColumn.vue';
  // import { getToken } from '/@/utils/auth';
  const { t } = useI18n();

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
</script>
