<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-folder"></i> EDIT SETTING</span>
                </div>
                <div class="card-body">
  
                  <form @submit.prevent="updateSetting">
  
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label>JUDUL SETTING</label>
                          <input type="text" v-model="setting.title" placeholder="Masukkan Nama SETTING"
                            class="form-control">
                          <div v-if="validation.title" class="mt-2">
                            <b-alert show variant="danger">{{ validation.title[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label>VALUE / NILAI</label>
                          <client-only placeholder="loading...">
                            <ckeditor-nuxt v-model="setting.value" :config="editorConfig" />
                          </client-only>
                          <div v-if="validation.description" class="mt-2">
                            <b-alert show variant="danger">{{ setting.value[0] }}</b-alert>
                          </div>
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
          title: 'Edit Setting - Administrator',
        }
      },
      components: {
        'ckeditor-nuxt': () => {
          if (process.client) {
            return import('@blowstack/ckeditor-nuxt')
          }
        },
      },
  
      data() {
        return {
          //state product
          setting: {
            value: '',
            title: '',
          },
          //state validation
          validation: [],
          //config CKEDITOR
          editorConfig: {
            removePlugins: ['Title'],
          }
        }
      },
      //hook "asyncData"
      async asyncData({ store, route }) {
          await store.dispatch('admin/setting/getDetailSetting', route.params.id)
      },
      //mounted
      mounted() {
          this.setting.title       = this.$store.state.admin.setting.setting.title
          this.setting.value        = this.$store.state.admin.setting.setting.value
      },
      methods: {
        //method "updateSetting"
        async updateSetting() {
          //define formData
          let formData = new FormData();
  
          formData.append('value', this.setting.value)
          formData.append('title', this.setting.title)
          formData.append("_method", "PATCH")
          //sending data to action "updateSetting" vuex
          await this.$store.dispatch('admin/setting/updateSetting', {
              productId: this.$route.params.id,
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
              //redirect route "admin-products"
              this.$router.push({
                name: 'admin-settings'
              })
            })
            //error
            .catch(error => {
              //assign error to state "validation"
              this.validation = error.response.data
            })
        }
      }
  
    }
  </script>
  
  <style>
    .ck-editor__editable {
      min-height: 200px;
    }
  </style>