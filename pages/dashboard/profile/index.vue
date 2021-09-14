<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="8" xl="10">
        <show-profile
          v-if="mode === 'read'"
          type="profile"
          :user="user"
          @set-edit-mode="setEditMode"
        ></show-profile>
        <edit-profile
          v-else-if="mode === 'edit'"
          :user="user"
          @set-read-mode="setReadMode"
          @update-user="updateUser"
        ></edit-profile>
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="4"
        xl="2"
        class="d-flex flex-column align-center align-md-start"
      >
        <v-btn
          color="secondary"
          dark
          nuxt
          to="/dashboard/banking-info"
          width="200"
          >ویرایش حساب های بانکی</v-btn
        >
        <v-btn
          color="accent"
          dark
          nuxt
          to="/dashboard/security"
          class="mt-4"
          width="200"
          >تغییر رمز عبور</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ShowProfile from '~/components/ShowProfile.vue'
import EditProfile from '~/components/EditProfile.vue'
export default {
  components: {
    ShowProfile,
    EditProfile,
  },
  layout: 'dashboard',
  data() {
    return {
      user: {},
      loading: false,
      error: '',
      mode: 'read', // 'read' || 'edit'
    }
  },
  fetch() {
    this.loading = true
    this.error = ''
    try {
      this.user = {
        fName: 'John',
        lName: 'Doe',
        ssn: '1234567890',
        bDate: '1400/10/10',
        email: 'something@gmail.com',
        mobile: '09150000000',
        isAuth: true,
      }
      this.loading = false
      this.error = ''
    } catch (err) {
      this.loading = false
      this.error =
        err.response?.data?.message || 'خطایی در حین دریافت اطلاعات رخ داد'
    }
  },
  methods: {
    setEditMode() {
      this.mode = 'edit'
    },
    setReadMode() {
      this.mode = 'read'
    },
    updateUser({ fName, lName, ssn, bDate, email, mobile }) {
      this.user.fName = fName
      this.user.lName = lName
      this.user.ssn = ssn
      this.user.bDate = bDate
      this.user.email = email
      this.user.mobile = mobile
    },
  },
}
</script>
