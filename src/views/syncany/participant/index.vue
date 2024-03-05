<template>
  <PageWrapper :title="t('routes.syncany.participant')">
    <template #headerContent><FixedColumn :api="getData" /></template>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { useI18n } from '/@/hooks/web/useI18n';
  import { PageWrapper } from '/@/components/Page';
  import FixedColumn from '../../../views/demo/table/FixedColumn.vue';
  import { getToken } from '/@/utils/auth';
  const { t } = useI18n();
  const SERVER_URL = import.meta.env.VITE_RESEARCH_SERVER_URL;
  const SERVER_VERSION = import.meta.env.VITE_SERVER_VERSION;

  async function getData() {
    const token = getToken();

    const res = await fetch(`${SERVER_URL}/api/${SERVER_VERSION}/admin/schedule/4/applicants`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    const applicants = await res.json();

    return applicants;
  }
</script>
