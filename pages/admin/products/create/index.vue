<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-folder"></i> ADD NEW PRODUCT</span>
                </div>
                <div class="card-body">
                  <form @submit.prevent="storeProduct">
                    <div class="form-group">
                      <label>GAMBAR</label>
                      <ul>
                        <li>WAJIB DI ISI!</li>
                        <li>FORMAT GAMBAR YANG DITERIMA : .jpg, .jpeg, .png</li>
                        <li>DIMENSI HARUS 700x700 (KOTAK)</li>
                        <li>MAKS UKURAN GAMBAR 1MB</li>
                      </ul>
                      <input type="file" @change="handleFileChange" class="form-control">
                      <div v-if="validation.image" class="mt-2">
                        <b-alert show variant="danger">{{ validation.image[0] }}</b-alert>
                      </div>
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
                              <option value="">-- PILIH CATEGORY --</option>
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
                          <label>WEIGHT (Gram)</label>
                          <input type="number" v-model="product.weight" placeholder="Masukkan Berat Product (Gram)"
                            class="form-control">
                          <div v-if="validation.weight" class="mt-2">
                            <b-alert show variant="danger">{{ validation.weight[0] }}</b-alert>
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
                              <option :value="''">NO PROMO</option>
                              <option v-for="p in promos" :key="p.id" :value="p.id">{{ p.title }}</option>
                            </select>
                            <div v-if="validation.promo_id" class="mt-2">
                              <b-alert show variant="danger">{{ validation.promo_id[0] }}</b-alert>
                            </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>DISCOUNT (%) <i>(GIVE 0 IF NO DISCOUNT)</i></label>
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
                      SAVE</button>
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
          title: 'Add New Product - Administrator',
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
            barcode: '',
            weight: '',
            price: '',
            minimum_stock_alert: '',
            discount: '',
            promo_id:'',
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
      async asyncData({ store }) {
          await store.dispatch('admin/promo/getListOfPromos')
          await store.dispatch('admin/category/getListAllCategories')
      },
      computed: {
          categories() {
            return this.$store.state.admin.category.categories
          },
          promos(){
            return this.$store.state.admin.promo.list_promos
          }
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
        //method "storeProduct"
        async storeProduct() {
          let formData = new FormData();
          formData.append('image', this.product.image)
          formData.append('title', this.product.title)
          formData.append('title_short', !this.product.title_short ? this.subStrProductTitle(this.product.title) : this.product.title_short)
          formData.append('category_id', this.product.category_id)
          formData.append('description', this.product.description)
          formData.append('weight', this.product.weight)
          formData.append('price', this.product.price)
          formData.append('minimum_stock_alert', this.product.minimum_stock_alert)
          formData.append('barcode', this.product.barcode)
          formData.append('discount', this.product.discount)
          formData.append('published', this.product.published)
          if(this.product.promo_id != null || this.product.promo_id != ''){
            formData.append('promo_id', this.product.promo_id)
          }
          await this.$store.dispatch('admin/product/storeProduct', formData)
            //success
            .then(() => {
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "Data Saved Successfully!",
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
              // console.log(error.response.data.error)
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