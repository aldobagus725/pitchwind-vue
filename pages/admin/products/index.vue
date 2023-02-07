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
                            <input type="text" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="cari berdasarkan nama product">
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
                            <nuxt-link :to="{name: 'admin-products-upload'}" class="btn btn-info">
                              <i class="fas fa-upload"></i> IMPORT</nuxt-link>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="card-body">
                  <b-table responsive bordered hover :items="products.data" :fields="fields" show-empty>
                    <template v-slot:cell(barcode)="row">
                      <div :id="'barcodePrint'+row.item.barcode" class="row">
                        <div class="col text-center">
                          <barcode :value="row.item.barcode" format="CODE128" :font-size="23" :height="75" :width="3">
                            ERROR!
                          </barcode>
                          <p style="padding:0;margin:0;font-size:0.95rem;">{{subStrProductTitle(row.item.title)}}</p>
                          <p style="padding:0;margin:0;font-size:1.25rem;">{{uangIndonesia(row.item.price)}}</p>
                        </div>
                      </div>
                    </template>
                    <template v-slot:cell(published)="row">
                      <template v-if="row.item.published == 0">
                          <h4><span class="badge bg-danger text-white">TIDAK AKTIF</span></h4>
                      </template>
                      <template v-else>
                          <h4><span class="badge bg-success text-white">AKTIF</span></h4>
                      </template>
                    </template>
                    <template v-slot:cell(stock)="row">
                        <template v-if="row.item.stock == 0">
                            <h4><span class="badge bg-danger text-white">{{row.item.stock}}</span></h4>
                        </template>
                        <template v-else-if="(row.item.stock <= row.item.minimum_stock_alert) && (row.item.stock != 0 || row.item.stock != null) ">
                            <h4><span class="badge bg-warning text-white">{{row.item.stock}}</span></h4>
                        </template>
                        <template v-else>
                            <h4><span class="badge bg-success text-white">{{row.item.stock}}</span></h4>
                        </template>
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
    </main>
  </template>
  <script>
    import VueBarcode from 'vue-barcode';
    import JsBarcode from 'jsbarcode';
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
              label: 'NO SKU',
              key: 'no_sku',
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
              label: 'Product Name',
              key: 'title',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Category Name',
              key: 'category.name',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Stock',
              key: 'stock',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Minimal Stock',
              key: 'minimum_stock_alert',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Status Produk',
              key: 'published',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Tanggal Di Buat',
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
            title: 'APAKAH ANDA YAKIN ?',
            text: "INGIN MENGHAPUS DATA INI !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'YA, HAPUS!',
            cancelButtonText: 'TIDAK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.$store.dispatch('admin/product/destroyProduct', id)
                .then((response) => {
                  console.log(response)
                  this.$nuxt.refresh()
                  this.$swal.fire({
                    title: 'BERHASIL!',
                    text: "Data Berhasil Dihapus!",
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
