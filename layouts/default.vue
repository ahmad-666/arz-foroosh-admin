<template>
  <v-app :style="{ backgroundColor: backgroundColor }">
    <v-app-bar
      dense
      elevate-on-scroll
      fixed
      app
      dark
      color="backgroundColor lighten-1"
    >
      <div>
        <v-app-bar-nav-icon @click="toggleSidebar"></v-app-bar-nav-icon>
        <v-btn nuxt to="/" text small>
          <v-img src="imgs/logo.png" width="40px" max-height="95%"></v-img>
          <v-app-bar-title class="text-body-2">نام سایت</v-app-bar-title>
        </v-btn>
        <v-btn color="warning" dark nuxt to="/authorize">احراز هویت</v-btn>
      </div>

      <v-spacer></v-spacer>
      <div>
        <v-tooltip bottom dark color="cardColor">
          <template #activator="{ on, attrs }">
            <v-btn text v-bind="attrs" nuxt to="/profile" small v-on="on">
              <v-icon size="25">mdi-account-circle-outline</v-icon>
            </v-btn>
          </template>
          <p class="text-caption">حساب کاربری</p>
        </v-tooltip>
        <v-tooltip bottom dark color="cardColor">
          <template #activator="{ on, attrs }">
            <v-btn text v-bind="attrs" small v-on="on">
              <v-icon size="25">mdi-bell-outline</v-icon>
            </v-btn>
          </template>
          <p class="text-caption">اطلاعیه ها</p>
        </v-tooltip>
        <v-tooltip bottom dark color="cardColor">
          <template #activator="{ on, attrs }">
            <v-btn text v-bind="attrs" small v-on="on" @click="logoutHandler">
              <v-icon size="25" :style="{ transform: 'rotate(180deg)' }"
                >mdi-logout</v-icon
              >
            </v-btn>
          </template>
          <p class="text-caption">خروج از حساب کاربری</p>
        </v-tooltip>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="showSidebar"
      app
      right
      bottom
      fixed
      dark
      color="backgroundColor lighten-1"
    >
      <v-list>
        <v-list-item v-for="sidebarItem in sidebarItems" :key="sidebarItem.key">
          <template v-if="!sidebarItem.items">
            <v-btn
              text
              small
              nuxt
              :to="sidebarItem.route"
              width="100%"
              active-class="font-weight-bold secondary--text"
            >
              <v-list-item-icon>
                <v-icon size="15">{{ sidebarItem.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-body-2">
                  {{ sidebarItem.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-btn>
          </template>
          <template v-else>
            <v-list-group class="width-100">
              <template #activator>
                <v-list-item-icon>
                  <v-icon size="15">{{ sidebarItem.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-body-2">{{
                    sidebarItem.text
                  }}</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list>
                <v-list-item v-for="item in sidebarItem.items" :key="item.id">
                  <v-btn
                    nuxt
                    small
                    :to="item.route"
                    class="width-100 transparent elevation-0"
                    active-class="font-weight-bold secondary--text"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="text-body-2">{{
                        item.text
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-list-group>
          </template>
        </v-list-item>
        <v-list-item>
          <v-btn text small width="100%" nuxt to="#!" @click="logoutHandler">
            <v-list-item-icon>
              <v-icon size="15" :style="{ transform: 'rotate(180deg)' }"
                >mdi-logout</v-icon
              >
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-body-2">
                خروج از حساب کاربری
              </v-list-item-title>
            </v-list-item-content>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <div class="pa-6">
        <Nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      showSidebar: false,
      sidebarItems: [
        {
          id: 'buy-sell',
          icon: 'mdi-shopping-outline',
          text: 'خرید و فروش تتر',
          route: '/buy-sell',
        },
        {
          id: 'current-orders',
          icon: 'mdi-account-clock-outline',
          text: 'سفارشات در حال انجام',
          route: '/current-orders',
        },
        {
          id: 'history',
          icon: 'mdi-history',
          text: 'تاریخچه معاملات',
          route: '/history',
        },
        {
          id: 'accounting',
          icon: 'mdi-bank',
          text: 'حسابداری',
          items: [
            {
              id: 'deposit',
              text: 'واریز',
              route: '/deposit',
            },
            {
              id: 'withdraw',
              text: 'برداشت',
              route: '/withdraw',
            },
            {
              id: 'transactions',
              text: 'تراکنش ها',
              route: '/transactions',
            },
          ],
        },
        {
          id: 'banking-info',
          icon: 'mdi-folder-information-outline',
          text: 'اطلاعات بانکی',
          route: '/banking-info',
        },
        {
          id: 'security',
          icon: 'mdi-shield-account-outline',
          text: 'امنیت',
          route: '/security',
        },
        {
          id: 'invite',
          icon: 'mdi-email-open-outline',
          text: 'معرفی به دوستان',
          route: '/invite',
        },
        {
          id: 'profile',
          icon: 'mdi-account-box-outline',
          text: 'حساب کاربری',
          route: '/profile',
        },
      ],
    }
  },
  computed: {
    backgroundColor() {
      return this.$vuetify.theme.themes.dark.backgroundColor
    },
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar
    },
    logoutHandler() {},
  },
}
</script>
