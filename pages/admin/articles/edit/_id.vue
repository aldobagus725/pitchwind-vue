<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-folder"></i> EDIT ARTICLE</span>
                </div>
                <div class="card-body">
                  <form @submit.prevent="updateArticle">
                    <div class="row py-3">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>JUDUL ARTIKEL</label>
                          <input type="text" v-model="article.title" placeholder="Judul Article"
                            class="form-control">
                          <div v-if="validation.title" class="mt-2">
                            <b-alert show variant="danger">{{ validation.title[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>GAMBAR</label>
                          <input type="file" @change="handleFileChange" class="form-control">
                          <div v-if="validation.image" class="mt-2">
                            <b-alert show variant="danger">{{ validation.image[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row py-3">
                      <div class="col">
                        <div class="form-group">
                          <label>BODY</label>
                          <client-only placeholder="loading...">
                            <ckeditor-nuxt v-model="article.body" :config="editorConfig" />
                          </client-only>
                          <div v-if="validation.body" class="mt-2">
                            <b-alert show variant="danger">{{ validation.body[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row py-3">
                      <div class="col">
                        <div class="form-group">
                          <label>PUBLISHED</label>
                          <select class="form-control" v-model="article.published">
                            <!-- <option value="">-- PILIH CATEGORY --</option> -->
                            <option :value="1">YES</option>
                            <option :value="0">NO</option>
                          </select>
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
          title: 'Edit Article - Administrator',
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
          //state article
          article: {
            image: '',
            title: '',
            body: '',
            published: 1
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
          //get detail product
          await store.dispatch('admin/article/getDetailArticle', route.params.id)
      },
  
      //computed
      // computed: {
      //     //categories
      //     categories() {
      //         return this.$store.state.admin.article.article
      //     },
      // },
  
      //mounted
      mounted() {
          this.article.title       = this.$store.state.admin.article.article.title
          this.article.body         = this.$store.state.admin.article.article.body
          this.article.published    = this.$store.state.admin.article.article.published
      },
      methods: {
  
        //handle file upload
        handleFileChange(e) {
  
          //get image
          let image = this.article.image = e.target.files[0]
  
          //check fileType
          if (!image.type.match('image.*')) {
  
            //if fileType not allowed, then clear value and set null
            e.target.value = ''
  
            //set state "product.image" to null
            this.article.image = null
  
            //show sweet alert
            this.$swal.fire({
              title: 'OOPS!',
              text: "Format File Tidak Didukung!",
              icon: 'error',
              showConfirmButton: false,
              timer: 2000
            })
          }
  
        },
  
        //method "updateArticle"
        async updateArticle() {
  
          //define formData
          let formData = new FormData();
  
          formData.append('image', this.article.image)
          formData.append('title', this.article.title)
          formData.append('body', this.article.body)
          formData.append('published', this.article.published)
          formData.append("_method", "PATCH")
  
          //sending data to action "updateArticle" vuex
          await this.$store.dispatch('admin/article/updateArticle', {
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
                name: 'admin-articles'
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