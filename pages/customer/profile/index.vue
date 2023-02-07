<template>
    <div class="container py-1 px-3">
      <div class="fade-in">
        <div class="row py-2">
          <div class="col">
            <MenuHead />
          </div>
        </div>
        <div class="row py-2">
          <div class="col-md-12 py-3">
            <div class="card border-0 rounded shadow border-top-orange">
              <div class="card-body">
                <h5><i class="fa fa-tachometer-alt"></i> USER PROIFLE</h5>
                <div class="row py-3">
                  <div class="col-md-12">
                    <div class="table">
                        <table class="table table-borderless table-responisve">
                            <tr>
                                <th>Full Name : </th> <td>{{dataReturner(profile.name)}}</td>
                            </tr>
                            <tr>
                                <th>Email : </th> <td>{{dataReturner(profile.email)}}</td>
                            </tr>
                            <tr>
                                <th>Phone : </th> <td>{{dataReturner(profile.phone)}}</td>
                            </tr>
                            <tr>
                                <th>Address : </th> <td>{{dataReturner(profile.alamat)}}</td>
                            </tr>
                        </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer text-right">
                <div class="btn-group">
                    <nuxt-link :to="{name: 'customer-profile-profile'}" class="btn btn-info">
                        <i class="fa fa-user"></i> Update Profile</nuxt-link>
                    <nuxt-link :to="{name: 'customer-profile-address'}" class="btn btn-primary">
                        <i class="fa fa-home"></i> Update Address</nuxt-link>
                    <nuxt-link :to="{name: 'customer-profile-password'}" class="btn btn-danger">
                        <i class="fa fa-key"></i> Update Password</nuxt-link>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
    import MenuHead from '~/components/web/MenuHead.vue'
    export default {
      middleware: 'isCustomer',
      layout: 'default',
      components: {
        MenuHead
      },
      //meta
      head() {
        return {
          title: 'Dashboard - Profile',
        }
      },
      data() {
        return {
          usersDetail:{}
        }
      },
      async asyncData({ store }) {
        await store.dispatch('customer/customer/getProfile')
      },

      //computed
      computed: {
        profile() {
          return this.$store.state.customer.customer.user_detail
        },
      },
      methods:{
        
      },
      mounted(){
        this.usersDetail = this.profile
      }
    }
  </script>
  
  <style>
  
  </style>