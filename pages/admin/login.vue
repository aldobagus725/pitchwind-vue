<template>
  <div class="fade-in">
    <div class="text-center mb-3">
      <nuxt-link to="/" class="text-black">
        <!-- <img src="/images/logo.png" alt="bali funn cheer" width="250" style="margin:1rem" class="shadow rounded-circle"> -->
        <img src="/images/logo.png" alt="bali funn cheer" width="250" style="margin:1rem" class="shadow rounded">
        <h3 class="mt-1 font-weight-bold text-white">Bali Fun & Cheer</h3>
      </nuxt-link>
    </div>
    <div class="card-group shadow">
      <div class="card border-top-orange border-0 shadow-sm rounded">
        <div class="card-header text-center">
            <h2>Admin Login</h2>
        </div>
        <div class="card-body">
          <div v-if="validation.length != 0" class="mt-2">
            <b-alert show variant="danger">{{validation }}</b-alert>
          </div>
          <form @submit.prevent="login">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
              <input class="form-control" v-model="user.email" :class="{ 'is-invalid': validation.email }" type="email" placeholder="Email Address">
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
              <input class="form-control" v-model="user.password" :class="{ 'is-invalid': validation.password }" type="password" placeholder="Password">
            </div>
            <div v-if="validation.password" class="mt-2">
              <b-alert show variant="danger">{{ validation.password[0] }}</b-alert>
            </div>
            <div class="row">
              <div class="col-12">
                <button class="btn btn-warning shadow rounded-sm px-4 w-100" type="submit"><h4>LOGIN</h4></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </template>
  <script>
    export default {
      //middleware
      middleware: 'authenticated',
      //layout
      layout: 'auth',
      //meta
      head() {
        return {
          title: 'Login - Administrator',
        }
      },
      data() {
        return {
          //state user
          user: {
            email: '',
            password: '',
          },
          //validation
          validation: []
        }
      },
      methods: {
        async login() {
          await this.$auth.loginWith('admin', {
              data: {
                email: this.user.email,
                password: this.user.password
              }
            })
            .then(() => {
              this.$router.push({
                name: 'admin-dashboard'
              })
            })
            .catch(error => {
              //assign validation
              console.log(error)
              this.validation = error.response.data.error
            })
        }
      }
    }
  </script>