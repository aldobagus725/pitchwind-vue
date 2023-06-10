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
                      <ul>
                        <li>FORMAT GAMBAR YANG DITERIMA : .jpg, .jpeg, .png</li>
                        <li>DIMENSI HARUS 700x700 (KOTAK)</li>
                        <li>MAKS UKURAN GAMBAR 1MB</li>
                      </ul>
                      <input type="file" @change="handleFileChange" class="form-control">
                    </div>
                    <div class="row">
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
                      <!-- <div class="col-md-4">
                        <div class="form-group">
                          <label>PRODUCT SHORT NAME</label>
                          <input type="text" v-model="product.title_short" placeholder="Masukkan Nama Product (PENDEK)"
                            class="form-control">
                          <div v-if="validation.title_short" class="mt-2">
                            <b-alert show variant="danger">{{ validation.title_short[0] }}</b-alert>
                          </div>
                        </div>
                      </div> -->
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>PRODUCT SHORT NAME <i>(IF EMPTY WILL BE CREATED AUTOMATICALLY)</i></label>
                          <input type="text" v-model="product.title_short" placeholder="Masukkan Nama Product (PENDEK)"
                            class="form-control">
                          <div v-if="validation.title_short" class="mt-2">
                            <b-alert show variant="danger">{{ validation.title_short[0] }}</b-alert>
                          </div>
                          <p>Recommended : {{ subStrProductTitle(product.title) }}</p>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>BARCODE <i>(OPTIONAL, IF EMPTY WILL BE CREATED AUTOMATICALLY)</i></label>
                          <input type="text" v-model="product.barcode" placeholder="Masukkan Barcode Produk"
                            class="form-control">
                          <div v-if="validation.barcode" class="mt-2">
                            <b-alert show variant="danger">{{ validation.barcode[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
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
                      <div class="col-md-3">
                        <div class="form-group">
                          <label>MINIMAL STOCK</label>
                          <input type="number" v-model="product.minimum_stock_alert" placeholder="Masukkan Minimal Stock Product"
                            class="form-control">
                          <div v-if="validation.minimum_stock_alert" class="mt-2">
                            <b-alert show variant="danger">{{ validation.minimum_stock_alert[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label>PUBLISHED</label>
                          <select class="form-control" v-model="product.published">
                            <!-- <option value="">-- PILIH CATEGORY --</option> -->
                            <option :value="1">YES</option>
                            <option :value="0">NO</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-3">
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
                            <label>PROMO - OPTIONAL</label>
                            <select class="form-control" v-model="product.promo_id">
                              <option :value="null">NO PROMO</option>
                              <option v-for="p in promos" :key="p.id" :value="p.id">{{ p.title }}</option>
                            </select>
                            <div v-if="validation.promo_id" class="mt-2">
                              <b-alert show variant="danger">{{ validation.promo_id[0] }}</b-alert>
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
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label>DESCRIPTION</label>
                          <client-only placeholder="loading...">
                            <ckeditor-nuxt v-model="product.description" :config="editorConfig" />
                          </client-only>
                          <div v-if="validation.description" class="mt-2">
                            <b-alert show variant="danger">{{ validation.description[0] }}</b-alert>
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
            title_short: '',
            category_id: '',
            description: '',
            weight: '',
            price: '',
            barcode: '',
            discount: '',
            minimum_stock_alert: '',
            published: 1,
            promo_id:''
          },
          validation: [],
          editorConfig: {
            removePlugins: ['Title'],
          }
        }
      },
      async asyncData({ store, route }) {
          await store.dispatch('admin/category/getListAllCategories')
          await store.dispatch('admin/product/getDetailProduct', route.params.id)
          await store.dispatch('admin/promo/getListOfPromos')
      },
      computed: {
          categories() {
              return this.$store.state.admin.category.categories
          },
          promos(){
            return this.$store.state.admin.promo.list_promos
          }
      },
      //mounted
      mounted() {
          this.product.title       = this.$store.state.admin.product.product.title
          this.product.title_short       = this.$store.state.admin.product.product.title_short
          this.product.category_id = this.$store.state.admin.product.product.category_id
          this.product.weight      = this.$store.state.admin.product.product.weight
          this.product.barcode       = this.$store.state.admin.product.product.barcode
          this.product.description = this.$store.state.admin.product.product.description
          this.product.price       = this.$store.state.admin.product.product.price
          this.product.discount    = this.$store.state.admin.product.product.discount
          this.product.minimum_stock_alert    = this.$store.state.admin.product.product.minimum_stock_alert
          this.product.published    = this.$store.state.admin.product.product.published
          this.product.promo_id    = this.$store.state.admin.product.product.promo_id
          console.log(this.product.image === '')
      },
  
      methods: {
        handleFileChange(e) {
          let image = this.product.image = e.target.files[0]
          if (!image.type.match('image.*')) {
            e.target.value = ''
            this.product.image = null
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
          let formData = new FormData();
          if(this.product.image === null || this.product.image === ''){
          } else {
            formData.append('image', this.product.image)
          }
          formData.append('title', this.product.title)
          // formData.append('title_short', this.product.title_short)
          formData.append('title_short', !this.product.title_short ? this.subStrProductTitle(this.product.title) : this.product.title_short)
          formData.append('category_id', this.product.category_id)
          formData.append('description', this.product.description)
          formData.append('weight', this.product.weight)
          formData.append('price', this.product.price)
          formData.append('barcode', this.product.barcode)
          formData.append('discount', this.product.discount)
          formData.append('published', this.product.published)
          formData.append('minimum_stock_alert', this.product.minimum_stock_alert)
          if(this.product.promo_id == null || this.product.promo_id == ''){
          } else {
            formData.append('promo_id', this.product.promo_id)
          }
          formData.append("_method", "PATCH")
          await this.$store.dispatch('admin/product/updateProduct', {
              productId: this.$route.params.id,
              payload: formData
          })
            .then(() => {
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "Data Updated Successfully!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              this.$router.push({
                name: 'admin-products'
              })
            })
            .catch(error => {
              console.log(error)
              console.log(error.response.data.error)
              this.validation = JSON.parse(error.response.data.error)
              var new_error = ''
              for(let x in this.validation){
                new_error += this.validation[x][0]+'\n'
                // console.log(new_error)
              }
              this.$swal.fire({
                title: 'Failed!',
                text: new_error,
                icon: 'error',
                showConfirmButton: true,
              })
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