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
                <h5><i class="fa fa-tachometer-alt"></i> UPDATE USER PROFILE</h5>
                <div class="row py-3">
                  <div class="col-md-12">
                    <h6>Current Profile</h6>
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
                        </table>
                    </div>
                    <hr />
                    <h6>Update Profile</h6>
                    <form @submit.prevent="updateProfile">
                        <div class="row py-2 px-2">
                            <div class="col">
                                <div class="input-group mb-3">
                                  <div class="input-group-prepend">
                                    <span class="input-group-text">
                                      Name
                                    </span>
                                  </div>
                                  <input class="form-control" v-model="usersUpdate.name" type="text" placeholder="Full Name">
                                </div>
                                <div v-if="validation.name" class="mt-2">
                                  <b-alert show variant="danger">{{ validation.name[0] }}</b-alert>
                                </div>
                              </div>
                        </div>
                        <div class="row py-2 px-2">
                            <div class="col">
                                <div class="input-group mb-3">
                                  <div class="input-group-prepend">
                                    <span class="input-group-text">
                                      Phone
                                    </span>
                                  </div>
                                  <input class="form-control" v-model="usersUpdate.phone" type="text" placeholder="Phone Number">
                                </div>
                                <div v-if="validation.phone" class="mt-2">
                                  <b-alert show variant="danger">{{ validation.phone[0] }}</b-alert>
                                </div>
                              </div>
                        </div>
                        <div class="row py-2 px-2">
                            <div class="col">
                                <div class="input-group mb-3">
                                  <div class="input-group-prepend">
                                    <span class="input-group-text">
                                      Email
                                    </span>
                                  </div>
                                  <input class="form-control" v-model="usersUpdate.email" type="email" placeholder="Your Email">
                                </div>
                                <div v-if="validation.email" class="mt-2">
                                  <b-alert show variant="danger">{{ validation.email[0] }}</b-alert>
                                </div>
                              </div>
                        </div>
                        <div class="row">
                          <div class="col-12 text-right">
                            <button class="btn btn-primary shadow-sm" type="submit">UPDATE PROFILE</button>
                          </div>
                        </div>
                      </form>
                  </div>
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
          usersUpdate:{
            name:'',
            phone:'',
            email:'',
          },
          validation: []
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
        //method "register"
        async updateProfile() {
          //dispatch to action "storeRegister"
          await this.$store.dispatch('customer/customer/updateProfile', {
              name: this.usersUpdate.name,
              email: this.usersUpdate.email,
              phone: this.usersUpdate.phone,
            })
            .then(() => {
              //sweet alert
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "UPDATE SUCCESS! PLEASE RE-LOGIN TO TAKE EFFECT ON CHANGES!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              //redirect
              // this.$router.push({
              //   name: 'customer-dashboard'
              // })
              this.restart()
            })
            .catch(error => {
              //assign validation
              this.validation = error.response.data
            })
        },
        async restart(){
          //logout auth
          await this.$auth.logout()
          //set state
          this.$store.commit('web/cart/SET_CARTS_DATA', [])
          this.$store.commit('web/cart/SET_CART_PRICE', 0)
          //redirect route customer login
          this.$router.push({
            name: 'customer-login'
          })
        }
      },
      mounted(){
        this.usersUpdate.name = this.profile.name
        this.usersUpdate.phone = this.profile.phone
        this.usersUpdate.email = this.profile.email
        // console.log(this.usersUpdate)
        // console.log(this.profile)
      }
    }
  </script>
  
  <style>
  
  </style>