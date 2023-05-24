<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-folder"></i> EDIT STOCK</span>
                </div>
                <div class="card-body">
                  <form @submit.prevent="updateStock">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>No SKU : {{product.no_sku}}</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>NAMA PRODUCT : {{product.title}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>STOCK : {{product.stock}}</label>
                                <input type="number" v-model="product.min_stock_qty" placeholder="Masukkan Pengurangan"
                                    class="form-control">

                                <br />
                                <h4>Stock Final : {{product.stock - product.min_stock_qty}}</h4>
                                <div v-if="validation.stock" class="mt-2">
                                    <b-alert show variant="danger">{{ validation.min_stock_qty[0] }}</b-alert>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label> ALASAN PENGURANGAN</label>
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
          title: 'Edit Stock (Minus) - Administrator',
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
            no_sku: '',
            title: '',
            description: '',
            stock: '',
            min_stock_qty:'',
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
          await store.dispatch('admin/stock/getDetailStock', route.params.id)
      },
      //mounted
      mounted() {
          this.product.title       = this.$store.state.admin.stock.stock.title
          this.product.no_sku       = this.$store.state.admin.stock.stock.no_sku
          this.product.description = this.$store.state.admin.stock.stock.description
          this.product.stock       = this.$store.state.admin.stock.stock.stock
          this.product.min_stock_qty       = 0
      },
  
      methods: {

        //method "updateProduct"
        async updateStock() {
  
          //define formData
          let data = {
            min_stock_qty : this.product.min_stock_qty,
            stock : this.product.stock,
            description : this.product.description,
            stock_final :  parseInt(this.product.stock) - parseInt(this.product.min_stock_qty)
          }
          //sending data to action "updateProduct" vuex
          await this.$store.dispatch('admin/stock/storeMinusStock', {
              id: this.$route.params.id,
              payload: data
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
                name: 'admin-stock'
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