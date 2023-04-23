<template>
    <div class="container mt-custom mb-3">
      <div class="fade-in">
        <div class="row justify-content-center">
            <div class="col-md-7">
            <div class="card-group" style="margin:2rem;">
                <div class="card border-top-orange border-0 shadow rounded">
                <div class="card-body">
                    <h3 class="text-center">PASSWORD RESET</h3>
                    <hr>
                    <p>Enter your email to send password reset request to your email.</p>
                    <form @submit.prevent="checkEmailExist">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-envelope"></i>
                                </span>
                            </div>
                            <input class="form-control" v-model="email" type="email" placeholder="Email Address">
                        </div>
                        <div v-if="validation.length != 0" class="mt-2">
                            <b-alert show variant="danger">{{ validation }}</b-alert>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <button class="btn btn-warning shadow-sm rounded-sm px-4 w-100" type="submit"><h4>SEND REQUEST</h4></button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="text-center mt-3" style="margin:2rem;">
            <h4>Not Registered yet? <nuxt-link :to="{name: 'customer-register'}" class="font-weight-bold">Sign Up Now!</nuxt-link></h4>
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
          title: 'Reset Password - Customer',
        }
      },
      data() {
        return {
          //state user
          email:'',
          //validation
          validation: []
        }
      },
      methods: {
        async checkEmailExist() {
            await this.$store.dispatch('customer/customer/storeRegister', {
              email: this.email
            })
            .then((response) => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
                this.validation = !error.response.data.error ? error : error.response.data.error
            })
        },
      }
    }
  </script>