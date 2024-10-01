<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <div class="row align-items-center">
                    <div class="col-sm-3">
                      <h4 class="font-weight-bold"><i class="fa fa-layer-group"></i> PRODUCTS</h4>
                    </div>
                    <div class="col-sm-9">
                      <div class="form-group">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="Find by product name">
                            <div class="input-group-append">
                                <button @click="searchData" class="btn btn-dark"><i class="fa fa-search"></i>
                                SEARCH
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                  </div>
                  <div class="row py-2">
                    <div class="col">
                      <div class="btn-group">
                        <a href="/templateProduk.xlsx" download class="btn btn-dark">
                          <i class="fas fa-download"></i> TEMPLATE IMPORT
                        </a>
                        <button @click.prevent="exportAllProduct()" disabled class="btn btn-dark">
                          <i class="fas fa-download"></i> EXPORT ALL PRODUCT
                        </button>
                      </div>
                      </div>
                      <div class="col text-right">
                        <div class="btn-group">
                          <nuxt-link :to="{name: 'admin-products-create'}" class="btn btn-primary">
                            <i class="fa fa-plus-circle"></i> ADD NEW</nuxt-link>
                          <!-- <nuxt-link :to="{name: 'admin-products-upload'}" class="btn btn-info">
                            <i class="fas fa-upload"></i> IMPORT</nuxt-link> -->
                          <!-- <nuxt-link :to="{name: 'admin-products-upload'}" class="btn btn-info">
                            <i class="fas fa-upload"></i> IMPORT</nuxt-link> -->
                          <button class="btn btn-info" data-toggle="modal" data-target="#importModal">
                            <i class="fas fa-upload"></i> IMPORT
                          </button>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="card-body">
                  <b-table responsive bordered hover :items="products.data" :fields="fields" show-empty>
                    <template v-slot:cell(barcode)="row">
                      <div :id="'barcodePrint'+row.item.barcode" class="row">
                        <div class="col">
                          <div class="row">
                            <div class="col">
                              <p style="color:black;padding:0;margin:0;font-weight:700;font-size:1.27rem;font-family: Arial, Helvetica, sans-serif" class="text-center">{{subStrProductTitle(row.item.title_short)}}</p>
                              <barcode :value="row.item.barcode" :margin="0" :displayValue="false" format="CODE39" :height="57" style="font-family: Arial, Helvetica, sans-serif" :width="3">
                                ERROR!
                              </barcode>
                              <p style="color:black;padding:0;margin:0;font-weight:900;font-size:1.28rem;font-family: Arial, Helvetica, sans-serif" class="text-center">{{ row.item.barcode }} - {{uangIndonesia(row.item.price)}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-slot:cell(published)="row">
                      <template v-if="row.item.published == 0">
                          <h4><span class="badge bg-danger text-white">UNPUBLISHED</span></h4>
                      </template>
                      <template v-else>
                          <h4><span class="badge bg-success text-white">PUBLISHED</span></h4>
                      </template>
                    </template>
                    <!-- <template v-slot:cell(stock)="row">
                        <template v-if="row.item.stock == 0">
                            <h4><span class="badge bg-danger text-white">{{row.item.stock}}</span></h4>
                        </template>
                        <template v-else-if="(row.item.stock <= row.item.minimum_stock_alert) && (row.item.stock != 0 || row.item.stock != null) ">
                            <h4><span class="badge bg-warning text-white">{{row.item.stock}}</span></h4>
                        </template>
                        <template v-else>
                            <h4><span class="badge bg-success text-white">{{row.item.stock}}</span></h4>
                        </template>
                    </template> -->
                    <template v-slot:cell(created_at)="row">
                        {{ formatProperDate(row.item.created_at) }}
                    </template>
                    <template v-slot:cell(actions)="row">
                        <b-button-group>
                          <b-button @click.prevent="barcodeDownload(row.item.barcode,row.item.title)" variant="info">
                            <i class="fas fa-download"></i> BARCODE
                          </b-button>
                          <b-button :to="{name: 'admin-products-edit-id', params: {id: row.item.id}}" variant="warning">
                              <i class="fas fa-edit"></i> EDIT
                          </b-button>
                          <b-button variant="danger" @click="destroyProduct(row.item.id)"><i class="fas fa-trash-alt"></i> DELETE</b-button>
                        </b-button-group>
                    </template>
                  </b-table>
                  <!-- pagination -->
                  <b-pagination align="right" :value="products.current_page" :total-rows="products.total"
                    :per-page="products.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade shadow" data-backdrop="false" id="importModal" tabindex="-1" role="dialog" aria-labelledby="importModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="importModalLabel">IMPORT PRODUCT</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <nuxt-link :to="{name: 'admin-products-upload_new'}">
                <div class="card mb-3 choice-import" style="cursor: pointer">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col-sm-4">
                        <img src="/300x300_import_update_trans.png" style="width: 75%" class="rounded-0" />
                      </div>
                      <div class="col-sm-8">
                        <h4>Add New Product</h4>
                        <h6>Add New Items to your products list. Does not effect other
                          items</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </nuxt-link>
              <nuxt-link :to="{name: 'admin-products-upload_edit'}">
                <div class="card mb-3 choice-import" style="cursor: pointer">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col-sm-4">
                        <img src="/300x300_import_new_trans.png" style="width: 75%" class="rounded-0" />
                      </div>
                      <div class="col-sm-8">
                        <h4>Update Product</h4>
                        <h6>Update items to in products list.</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">CLOSE</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  <script>
    import VueBarcode from 'vue-barcode';
    // import JsBarcode from 'jsbarcode';
    import html2canvas from 'html2canvas';
    export default {
      //layout
      layout: 'admin',
      //meta
      head() {
        return {
          title: 'Products - Administrator',
        }
      },
      components: {
          'barcode': VueBarcode
      },
      data() {
        return {
          //table header
          fields: [
            {
              label: 'Product Name',
              key: 'title',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Barcode',
              key: 'barcode',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Category Name',
              key: 'category.name',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            // {
            //   label: 'Stock',
            //   key: 'stock',
            //   thClass:'text-center',
            //   tdClass: 'text-center'
            // },
            // {
            //   label: 'Minimal Stock',
            //   key: 'minimum_stock_alert',
            //   thClass:'text-center',
            //   tdClass: 'text-center'
            // },
            {
              label: 'Status Produk',
              key: 'published',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Created At',
              key: 'created_at',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Actions',
              key: 'actions',
              thClass:'text-center',
              tdClass: 'text-center'
            }
          ],
          search: ''
        }
      },
      async asyncData({ store }) {
          await store.dispatch('admin/product/getProductsData')
      },
      computed: {
          products() {
              return this.$store.state.admin.product.products
          },
      },
      methods: {
        barcodeDownload(barcodeNum,title){
            html2canvas(document.getElementById("barcodePrint"+barcodeNum)).then(function (canvas) {                   
                var anchorTag = document.createElement("a");
                document.body.appendChild(anchorTag);
                anchorTag.download = barcodeNum+"-"+title+".png";
                anchorTag.href = canvas.toDataURL();
                anchorTag.target = '_blank';
                anchorTag.click();
            });
        },
        searchData() {
            this.$store.commit('admin/product/SET_PAGE', 1)
            this.$store.dispatch('admin/product/getProductsData', this.search)
        },
        changePage(page) {
            this.$store.commit('admin/product/SET_PAGE', page)
            this.$store.dispatch('admin/product/getProductsData', this.search)
        },
        destroyProduct(id) {
          this.$swal.fire({
            title: 'ARE YOU SURE ?',
            text: "TO ERASE THIS DATA !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'YES!',
            cancelButtonText: 'NO',
          }).then((result) => {
            if (result.isConfirmed) {
              this.$store.dispatch('admin/product/destroyProduct', id)
                .then((response) => {
                  console.log(response)
                  this.$nuxt.refresh()
                  this.$swal.fire({
                    title: 'SUCCESS!',
                    text: "Data Erased Successfully!",
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                  })

                })
            }
          })
        },
        exportAllProduct() {
          this.$axios.$get('api/v1/admin/export_all_products')
            .then((response) => {
              let blob = new Blob([response.data], { type: 'application/xlsx' })
              let link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              var date = new Date()
              link.download = 'ListProduk-' + date.toDateString() + '.xlsx'
              link.click()
            })
            .catch((e) => {
              console.log(e)
            })
        },
      }
  
  }
  </script>
  <style>
  .choice-import:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
    text-decoration: none;
  }
  .choice-import {
    transition: box-shadow 0.3s;
    text-decoration: none;
  }
  </style>
