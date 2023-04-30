<template>
    <div class="container mt-custom mb-3">
      <div class="fade-in">
        <div class="row justify-content-center">
          <div class="col-md-7">
            <div class="card-group" style="margin:2rem;">
              <div class="card border-top-orange border-0 shadow rounded">
                <div class="card-body">
                  <h3 class="text-center">CUSTOMER LOGIN</h3>
                  <hr>
                  <form @submit.prevent="login">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="fa fa-envelope"></i>
                        </span>
                      </div>
                      <input class="form-control" v-model="user.email" type="email" placeholder="Email Address">
                    </div>
                    <div v-if="validation.email" class="mt-2">
                      <b-alert show variant="danger">{{ validation.email[0] }}</b-alert>
                    </div>
                    <div class="input-group mb-4">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="fa fa-lock"></i>
                        </span>
                      </div>
                      <input class="form-control" v-model="user.password" :type="type" placeholder="Password">
                      <div class="input-group-prepend">
                        <span @click="seePassword()" class="input-group-text">
                            <i :class="iconType"></i>
                        </span>
                      </div>
                    </div>
                    <div v-if="validation.password" class="mt-2">
                      <b-alert show variant="danger">{{ validation.password[0] }}</b-alert>
                    </div>
                    <!-- <div v-if="validation.length != 0" class="mt-2">
                      <b-alert show variant="danger">{{ validation }}</b-alert>
                    </div> -->
                    <div class="row">
                      <div class="col-12">
                        <button class="btn btn-warning shadow-sm rounded-sm px-4 w-100" type="submit"><h4>LOGIN</h4></button>
                      </div>
                    </div>
                  </form>
                  <div v-if="!validation.password && !validation.email && validation.length != 0" class="mt-2">
                    <b-alert show variant="danger">{{ validation }}</b-alert>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-3" style="margin:2rem;">
          <h4>Not Registered yet? <nuxt-link :to="{name: 'customer-register'}" class="font-weight-bold">Sign Up Now!</nuxt-link></h4>
        </div>
        <div class="text-center mt-3" style="margin:2rem;">
            <h5><nuxt-link :to="{name: 'customer-reset_req'}" class="font-weight-bold">Forget Password</nuxt-link></h5>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      //middleware
      middleware: 'authenticated',
      //layout
      layout: 'default',
      //meta
      head() {
        return {
          title: 'Login - Customer',
        }
      },
      data() {
        return {
          //state user
          user: {
            email: '',
            password: '',
          },
          type:'password',
          iconType:'fa fa-eye',
          //validation
          validation: []
        }
      },
      methods: {
        async login() {
          await this.$auth.loginWith('customer', {
              data: {
                email: this.user.email,
                password: this.user.password
              }
            })
            .then(() => {
              //fething carts on Rest API
              this.$store.dispatch('web/cart/getCartsData')
              this.$store.dispatch('web/cart/getCartPrice')

              //redirect
              this.$router.push({
                  name: 'customer-dashboard'
              })
  
            })
            .catch(error => {
              // console.log(error)
              //assign validation
              // console.log(error.response.data.error)
              this.validation = !error.response.data.error ? error : error.response.data.error
              // console.log(this.validation)
            })
        },
        seePassword(){
          if (this.type == 'password'){
            this.type = 'text'
            this.iconType = 'fa fa-eye-slash'
          } else {
            this.type = 'password'
            this.iconType = 'fa fa-eye'
          }
        }
      }
    }
  </script>