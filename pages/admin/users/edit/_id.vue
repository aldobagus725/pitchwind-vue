<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-users"></i> EDIT USER</span>
                </div>
                <div class="card-body">
  
                  <form @submit.prevent="updateUser">
  
                    <div class="row py-2">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>FULL NAME</label>
                          <input type="text" v-model="user.name" placeholder="Masukkan Nama User" class="form-control">
                          <div v-if="validation.name" class="mt-2">
                            <b-alert show variant="danger">{{ validation.name[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>EMAIL ADDRESS</label>
                          <input type="email" v-model="user.email" placeholder="Masukkan Email Address"
                            class="form-control">
                          <div v-if="validation.email" class="mt-2">
                            <b-alert show variant="danger">{{ validation.email[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>PHONE</label>
                          <input type="text" v-model="user.phone"
                            placeholder="No Telp" class="form-control">
                            <div v-if="validation.phone" class="mt-2">
                              <b-alert show variant="danger">{{ validation.email[0] }}</b-alert>
                            </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>ROLE</label>
                          <select name="role" class="form-control" v-model="user.role">
                            <option :value="'superadmin'">SUPERADMIN</option>
                            <option :value="'admin'">ADMIN</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row py-2">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>PASSWORD</label>
                          <input type="password" v-model="user.password" placeholder="Masukkan Password"
                            class="form-control">
                          <div v-if="validation.password" class="mt-2">
                            <b-alert show variant="danger">{{ validation.password[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>PASSWORD CONFIRMATION</label>
                          <input type="password" v-model="user.password_confirmation"
                            placeholder="Konfirmasi Password" class="form-control">
                        </div>
                      </div>
                    </div>
  
                    <button class="btn btn-info mr-1 btn-submit" type="submit"><i class="fa fa-paper-plane"></i>
                      UPDATE</button>
                    <button class="btn btn-warning btn-reset" type="reset"><i class="fa fa-redo"></i>
                      RESET</button>
  
                  </form>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script>
    export default {
      //layout
      layout: 'admin',
      //meta
      head() {
        return {
          title: 'Edit User - Administrator',
        }
      },
      data() {
        return {
          //state user
          user: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            role:'',
            phone:'',
          },
          //state validation
          validation: []
        }
      },
      //hook "asyncData"
      async asyncData({ store, route }) {
          await store.dispatch('admin/user/getDetailUser', route.params.id)
      },
      //mounted
      mounted() {
          this.user.name = this.$store.state.admin.user.user.name
          this.user.email = this.$store.state.admin.user.user.email
          this.user.role = this.$store.state.admin.user.user.role
          this.user.phone = this.$store.state.admin.user.user.phone
      },
      methods: {
        async updateUser() {
          let formData = new FormData();
          formData.append('name', this.user.name)
          formData.append('email', this.user.email)
          formData.append('role', this.user.role)
          formData.append('phone', this.user.phone)
          formData.append('password', this.user.password)
          formData.append('password_confirmation', this.user.password_confirmation)
          formData.append("_method", "PATCH")
          await this.$store.dispatch('admin/user/updateUser', {
              userId: this.$route.params.id,
              payload: formData
          })
            //success
            .then(() => {
              //sweet alert
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "Data Updated Successfully!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              //redirect route "admin-users"
              this.$router.push({
                name: 'admin-users'
              })
            })
            .catch(error => {
              //assign error to state "validation"
              this.validation = error.response.data
            })
        }
      }
  
    }
  </script>
  
  <style>
  
  </style>