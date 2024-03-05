import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const participant: AppRouteModule = {
  path: '/participant',
  name: 'Participant',
  component: LAYOUT,
  redirect: '/participant/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'mdi:users',
    title: t('routes.syncany.participant'),
    orderNo: 0,
  },
  children: [
    {
      path: 'index',
      name: 'ParticipantPage',
      component: () => import('/@/views/syncany/participant/index.vue'),
      meta: {
        title: t('routes.syncany.participant'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default participant;
