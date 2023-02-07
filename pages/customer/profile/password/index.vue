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
                <h5><i class="fa fa-tachometer-alt"></i> UPDATE PASSWORD</h5>
                <div class="row py-3">
                  <div class="col-md-12">
                    <form @submit.prevent="updatePassword">
                        <div class="row py-2 px-2">
                            <div class="col">
                                <div class="input-group mb-3">
                                  <div class="input-group-prepend">
                                    <span class="input-group-text">
                                      New Password
                                    </span>
                                  </div>
                                  <input class="form-control" v-model="usersUpdate.password" :type="usersUpdate.passType" placeholder="Your New Password" />
                                  <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <i @click="seePass()" :class="usersUpdate.passIcon" ></i>
                                    </span>
                                  </div>
                                </div>
                                <div v-if="validation.password" class="mt-2">
                                  <b-alert show variant="danger">{{ validation.password[0] }}</b-alert>
                                </div>
                              </div>
                        </div>
                        <div class="row py-2 px-2">
                            <div class="col">
                                <div class="input-group mb-3">
                                  <div class="input-group-prepend">
                                    <span class="input-group-text">
                                      Confirm New Password
                                    </span>
                                  </div>
                                  <input class="form-control" v-model="usersUpdate.password_confirmation" :type="usersUpdate.confirmPassType" placeholder="Confirm New Password" />
                                  <div class="input-group-prepend">
                                    <span class="input-group-text">
                                      <i :class="usersUpdate.confirmPassIcon" @click.prevent="seeConfirmPass()"></i>
                                    </span>
                                  </div>
                                </div>
                                <div v-if="validation.password_confirmation" class="mt-2">
                                  <b-alert show variant="danger">{{ validation.password_confirmation[0] }}</b-alert>
                                </div>
                              </div>
                        </div>
                        <div class="row">
                          <div class="col-12 text-right">
                            <button class="btn btn-primary btn-lg shadow-sm" type="submit">UPDATE PASSWORD</button>
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
        MenuHead,
      },
      //meta
      head() {
        return {
          title: 'Dashboard - Password',
        }
      },
      data() {
        return {
          usersUpdate:{
            password:'',
            password_confirmation:'',
            passType:'password',
            confirmPassType:'password',
            passIcon:'fa fa-eye',
            confirmPassIcon:'fa fa-eye',
          },
          validation: [],
        }
      },
    //   async asyncData({ store }) {
    //     await store.dispatch('customer/customer/getProfile')
    //     await store.dispatch('web/rajaongkir/getProvincesData')
    //   },
      methods:{
        seePass(){
            if (this.usersUpdate.passType == 'password'){
                this.usersUpdate.passType = 'text'
                this.usersUpdate.passIcon = 'fa fa-eye-slash'
            } else{
                this.usersUpdate.passType = 'password'
                this.usersUpdate.passIcon = 'fa fa-eye'
            }
            console.log('haha')
        },
        seeConfirmPass(){
            if (this.usersUpdate.confirmPassType == 'password'){
                this.usersUpdate.confirmPassType = 'text'
                this.usersUpdate.confirmPassIcon = 'fa fa-eye-slash'
            } else{
                this.usersUpdate.confirmPassType = 'password'
                this.usersUpdate.confirmPassIcon = 'fa fa-eye'
            }
        },
        //method "register"
        async updatePassword() {
          await this.$store.dispatch('customer/customer/updatePassword', {
              password: this.usersUpdate.password,
              password_confirmation: this.usersUpdate.password_confirmation,
            })
            .then(() => {
              //sweet alert
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "UPDATE SUCCESS!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              //redirect
              this.$router.push({
                name: 'customer-dashboard'
              })
            })
            .catch(error => {
              //assign validation
              this.validation = error.response.data
            })
        }
      },
    }
  </script>
  
  <style>
  
  </style>