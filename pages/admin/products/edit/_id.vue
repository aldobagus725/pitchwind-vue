<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-folder"></i> EDIT PRODUCT</span>
                </div>
                <div class="card-body">
  
                  <form @submit.prevent="updateProduct">
  
                    <div class="form-group">
                      <label>GAMBAR</label>
                      <input type="file" @change="handleFileChange" class="form-control">
                    </div>
  
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                            <label>No SKU</label>
                            <input type="text" v-model="product.no_sku" placeholder="Masukkan SKU Product"
                            class="form-control">
                            <div v-if="validation.no_sku" class="mt-2">
                            <b-alert show variant="danger">{{ validation.no_sku[0] }}</b-alert>
                            </div>
                        </div>
                        </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>NAMA PRODUCT</label>
                          <input type="text" v-model="product.title" placeholder="Masukkan Nama Product"
                            class="form-control">
                          <div v-if="validation.title" class="mt-2">
                            <b-alert show variant="danger">{{ validation.title[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>WEIGHT (Gram)</label>
                          <input type="number" v-model="product.weight" placeholder="Masukkan Berat Product (Gram)"
                            class="form-control">
                          <div v-if="validation.weight" class="mt-2">
                            <b-alert show variant="danger">{{ validation.weight[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                              <label>CATEGORY</label>
                              <select class="form-control" v-model="product.category_id">
                                <option value="">-- select category --</option>
                                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                              </select>
                              <div v-if="validation.category_id" class="mt-2">
                                <b-alert show variant="danger">{{ validation.category_id[0] }}</b-alert>
                              </div>
                            </div>
                          </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>PUBLISHED</label>
                          <select class="form-control" v-model="product.published">
                            <!-- <option value="">-- PILIH CATEGORY --</option> -->
                            <option :value="1">YES</option>
                            <option :value="0">NO</option>
                          </select>
                        </div>
                      </div>

                    </div>
  
                    <div class="form-group">
                      <label>DESCRIPTION</label>
                      <client-only placeholder="loading...">
                        <ckeditor-nuxt v-model="product.description" :config="editorConfig" />
                      </client-only>
                      <div v-if="validation.description" class="mt-2">
                        <b-alert show variant="danger">{{ validation.description[0] }}</b-alert>
                      </div>
                    </div>
  
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                              <label>MINIMAL STOCK</label>
                              <input type="number" v-model="product.minimum_stock_alert" placeholder="Masukkan Minimal Stock Product"
                                class="form-control">
                              <div v-if="validation.minimum_stock_alert" class="mt-2">
                                <b-alert show variant="danger">{{ validation.minimum_stock_alert[0] }}</b-alert>
                              </div>
                            </div>
                          </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>PRICE</label>
                          <input type="number" v-model="product.price" placeholder="Masukkan Harga Product"
                            class="form-control">
                          <div v-if="validation.price" class="mt-2">
                            <b-alert show variant="danger">{{ validation.price[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>DISCOUNT (%)</label>
                          <input type="number" v-model="product.discount" placeholder="Masukkan Discount Product (%)"
                            class="form-control">
                          <div v-if="validation.discount" class="mt-2">
                            <b-alert show variant="danger">{{ validation.discount[0] }}</b-alert>
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
          title: 'Edit Product - Administrator',
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
          product: {
            image: '',
            title: '',
            category_id: '',
            description: '',
            weight: '',
            price: '',
            no_sku: '',
            discount: '',
            minimum_stock_alert: '',
            published: 1,
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
  
          //get list all categories
          await store.dispatch('admin/category/getListAllCategories')
  
          //get detail product
          await store.dispatch('admin/product/getDetailProduct', route.params.id)
      },
  
      //computed
      computed: {
  
          //categories
          categories() {
              return this.$store.state.admin.category.categories
          },
      },
  
      //mounted
      mounted() {
          this.product.title       = this.$store.state.admin.product.product.title
          this.product.category_id = this.$store.state.admin.product.product.category_id
          this.product.weight      = this.$store.state.admin.product.product.weight
          this.product.no_sku       = this.$store.state.admin.product.product.no_sku
          this.product.description = this.$store.state.admin.product.product.description
          this.product.price       = this.$store.state.admin.product.product.price
          this.product.discount    = this.$store.state.admin.product.product.discount
          this.product.minimum_stock_alert    = this.$store.state.admin.product.product.minimum_stock_alert
          this.product.published    = this.$store.state.admin.product.product.published
      },
  
      methods: {
  
        //handle file upload
        handleFileChange(e) {
  
          //get image
          let image = this.product.image = e.target.files[0]
  
          //check fileType
          if (!image.type.match('image.*')) {
  
            //if fileType not allowed, then clear value and set null
            e.target.value = ''
  
            //set state "product.image" to null
            this.product.image = null
  
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
  
        //method "updateProduct"
        async updateProduct() {
  
          //define formData
          let formData = new FormData();
  
          formData.append('image', this.product.image)
          formData.append('title', this.product.title)
          formData.append('category_id', this.product.category_id)
          formData.append('description', this.product.description)
          formData.append('weight', this.product.weight)
          formData.append('price', this.product.price)
          formData.append('no_sku', this.product.no_sku)
          formData.append('discount', this.product.discount)
          formData.append('published', this.product.published)
          formData.append('minimum_stock_alert', this.product.minimum_stock_alert)
          formData.append("_method", "PATCH")
  
          //sending data to action "updateProduct" vuex
          await this.$store.dispatch('admin/product/updateProduct', {
              productId: this.$route.params.id,
              payload: formData
          })
  
            //success
            .then(() => {
  
              //sweet alert
              this.$swal.fire({
                title: 'BERHASIL!',
                text: "Data Berhasil Diupdate!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
  
              //redirect route "admin-products"
              this.$router.push({
                name: 'admin-products'
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