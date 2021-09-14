<template>
  <v-app :style="{ 'background-color': backgroundColor }">
    <v-app-bar
      app
      fixed
      elevate-on-scroll
      class="
        my-app-bar
        text-body-2
        textColor--text
        d-flex
        align-center
        justify-space-between
      "
      :class="{ 'px-15': isScreenMdAndUp, 'pa-0': !isScreenMdAndUp }"
      color="backgroundColor"
    >
      <div class="d-flex align-center">
        <nuxt-link to="/" class="mt-0 d-flex align-center">
          <img src="imgs/logo.png" alt="imgs/logo.png" width="60" height="60" />
          <p
            class="
              mr-1
              font-weight-medium
              text-body-2
              titleColor--text
              text--lighten-1
            "
          >
            ارز فروش
          </p>
        </nuxt-link>
        <v-menu v-if="isScreenMdAndUp" offset-y>
          <template #activator="{ on, attrs }">
            <v-btn
              text
              v-bind="attrs"
              class="text-body-2"
              :class="{ 'px-0': !isScreenMdAndUp }"
              v-on="on"
            >
              نحوه خرید و فروش
              <v-icon size="17" class="mr-2">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list color="cardColor" elevation="5" class="pa-0">
            <v-list-item
              v-for="item in buySellListItems"
              :key="item.id"
              class="pa-0"
            >
              <v-list-item-content class="pa-0">
                <v-list-item-title>
                  <v-hover v-slot="{ hover }">
                    <nuxt-link
                      :to="item.route"
                      class="d-block width-100 pa-2 text-caption"
                      :class="{ grey: hover, 'lighten-3': hover }"
                      >{{ item.text }}</nuxt-link
                    >
                  </v-hover>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          v-if="isScreenMdAndUp"
          nuxt
          to="/introduction"
          text
          class="text-body-2"
          :class="{ 'px-0': !isScreenMdAndUp }"
        >
          معرفی به دوستان</v-btn
        >
        <v-btn
          v-if="isScreenMdAndUp"
          nuxt
          to="/support"
          text
          class="text-body-2"
          :class="{ 'px-0': !isScreenMdAndUp }"
        >
          پشتیبانی</v-btn
        >
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-btn
          v-if="isScreenMdAndUp"
          nuxt
          to="/login"
          rounded
          color="primary"
          dark
          :small="!isScreenMdAndUp"
        >
          ورود / ثبت نام
        </v-btn>
        <v-menu
          v-if="!isScreenMdAndUp"
          offset-y
          min-width="200px"
          class="pa-0"
          :close-on-click="true"
          :close-on-content-click="false"
        >
          <template #activator="{ on, attrs }">
            <v-btn v-bind="attrs" text v-on="on">
              <v-icon size="25" color="primary"> mdi-menu </v-icon>
            </v-btn>
          </template>
          <v-list class="pa-0">
            <v-list-item class="py-0">
              <v-list-item-content class="py-0">
                <v-list-item-title>
                  <v-btn
                    nuxt
                    to="/login"
                    text
                    class="width-100 justify-start text-body-2"
                    >ورود و ثبت نام</v-btn
                  >
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="py-0">
              <v-list-item-content class="py-0">
                <v-list-item-title>
                  <v-list-group>
                    <template #activator>
                      <v-list-item-content class="py-0">
                        <v-list-item-title class="py-0">
                          <p
                            text
                            class="width-100 justify-start text-body-2 pr-3"
                          >
                            نحوه خرید و فروش
                          </p>
                        </v-list-item-title>
                      </v-list-item-content>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="item in buySellListItems"
                        :key="item.id"
                        class="py-0"
                      >
                        <v-list-item-content class="py-0">
                          <v-list-item-title>
                            <nuxt-link
                              class="
                                width-100
                                d-block
                                text-body-2
                                titleColor--text
                                text--lighten-2
                              "
                              :to="item.route"
                              >{{ item.text }}</nuxt-link
                            >
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-list-group>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="py-0">
              <v-list-item-content class="py-0">
                <v-list-item-title>
                  <v-btn
                    text
                    nuxt
                    to="/introduction"
                    class="width-100 justify-start text-body-2"
                    >معرفی به دوستان</v-btn
                  >
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="py-0">
              <v-list-item-content class="py-0">
                <v-list-item-title>
                  <v-btn
                    text
                    nuxt
                    to="/support"
                    class="width-100 justify-start text-body-2"
                  >
                    پشتیبانی
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main class="mt-4 mx-2 mx-md-15">
      <Nuxt />
    </v-main>
    <v-footer class="pa-0 mt-8">
      <v-container>
        <v-row>
          <v-col cols="12" md="2" class="d-flex justify-center align-center">
            <v-img
              src="imgs/logo.png"
              width="80%"
              height="auto"
              max-width="200px"
              max-height="100%"
            ></v-img>
          </v-col>
          <v-col cols="12" md="10" class="primary">
            <v-container>
              <v-row>
                <v-col
                  v-for="footerItem in footerItems"
                  :key="footerItem.id"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <h6 class="text-subtitle-1 font-weight-bold white--text">
                    {{ footerItem.title }}
                  </h6>
                  <v-list color="transparent">
                    <v-list-item
                      v-for="item in footerItem.items"
                      :key="item.id"
                    >
                      <v-btn
                        text
                        nuxt
                        :to="item.route"
                        class="text-body-2 font-weight-thin"
                        color="white"
                      >
                        {{ item.text }}
                      </v-btn>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="12" md="2" class="d-flex align-center justify-center">
            <v-btn
              text
              nuxt
              to="/"
              active-class=""
              class="font-weight-bold text-subtitle-1"
              color="grey darken-2"
            >
              ArzForosh.com
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            md="10"
            class="
              d-flex
              flex-column flex-md-row
              justify-start justify-md-space-between
              flex-nowrap
            "
          >
            <p
              class="
                font-weight-bold
                primary--text
                text-subtitle-1
                flex-shrink-1
              "
              :style="{ width: '400px' }"
            >
              ارز فروش در شبکه های اجتماعی
            </p>
            <div class="d-flex flex-grow-1 flex-wrap flex-row-reverse">
              <nuxt-link
                v-for="social in socials"
                :key="social.id"
                :to="social.route"
                class="mx-2"
              >
                <v-icon size="35" color="primary">{{ social.icon }}</v-icon>
              </nuxt-link>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      buySellListItems: [
        {
          id: 1,
          text: 'مورد 1',
          route: '/',
        },
        {
          id: 2,
          text: 'مورد 2',
          route: '/',
        },
        {
          id: 3,
          text: 'مورد 3',
          route: '/',
        },
        {
          id: 4,
          text: 'مورد 4',
          route: '/',
        },
      ],
      footerItems: [
        {
          id: 1,
          title: 'درباره ارز فروش',
          items: [
            {
              id: 1,
              text: 'درباره ما',
              route: '/about',
            },
            {
              id: 2,
              text: 'تماس با ما',
              route: '/contact',
            },
            {
              id: 3,
              text: 'قوانین و مقررات',
              route: '/rules',
            },
            {
              id: 4,
              text: 'ارز فروش در شبکه های اجتماعی',
              route: '/socials',
            },
          ],
        },
        {
          id: 2,
          title: 'راهنما و پشتیبان',
          items: [
            {
              id: 1,
              text: 'ویدیوهای آموزشی',
              route: '/vidsGuide',
            },
            {
              id: 2,
              text: 'سوالات متداول',
              route: '/faqs',
            },
            {
              id: 3,
              text: 'تماس با پشتیبانی',
              route: '/contact',
            },
            {
              id: 4,
              text: 'نحوه خرید و فروش',
              route: '/sellBuyGuide',
            },
            {
              id: 5,
              text: 'نحوه احراز هویت',
              route: '/authGuide',
            },
          ],
        },
        {
          id: 3,
          title: 'مطالب مهم',
          items: [
            {
              id: 1,
              text: 'تتر چیست',
              route: '/tether',
            },
            {
              id: 2,
              text: 'کلاهبرداران فضای رمز ارز',
              route: '/theft',
            },
            {
              id: 3,
              text: 'همه جیز درباره کیف پول تتر',
              route: '/allAboutTether',
            },
            {
              id: 4,
              text: 'انواع تتر',
              route: '/tetherTypes',
            },
            {
              id: 5,
              text: 'در مورد کارمزدهای تتر در انواع شبکه',
              route: '/tetherWage',
            },
          ],
        },
      ],
      socials: [
        {
          id: 1,
          icon: 'mdi-telegram',
          route: '/',
        },
        {
          id: 2,
          icon: 'mdi-instagram',
          route: '/',
        },
        {
          id: 3,
          icon: 'mdi-linkedin',
          route: '/',
        },
        {
          id: 4,
          icon: 'mdi-whatsapp',
          route: '/',
        },
        {
          id: 5,
          icon: 'mdi-facebook',
          route: '/',
        },
        {
          id: 6,
          icon: 'mdi-twitter',
          route: '/',
        },
      ],
    }
  },
  computed: {
    isScreenMdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp
    },
    backgroundColor() {
      return this.$vuetify.theme.themes.light.backgroundColor
      // const isDark = this.$vuetify.theme.dark
      // if (isDark) return this.$vuetify.theme.themes.dark.backgroundColor
      // else return this.$vuetify.theme.themes.light.backgroundColor
    },
  },
}
</script>
