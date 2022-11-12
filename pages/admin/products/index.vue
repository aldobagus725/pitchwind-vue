<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-layer-group"></i> PRODUCTS</span>
                </div>
                <div class="card-body">
                  <br/>
                  <div class="form-group">
                    <button @click.prevent="exportAllProduct()" disabled class="btn btn-dark">
                      <i class="fas fa-download"></i> EXPORT ALL PRODUCT
                    </button>
                  </div>
                  <div class="form-group">
                      <div class="input-group mb-3">
                          <div class="input-group-prepend">
                              <nuxt-link :to="{name: 'admin-products-create'}" class="btn btn-primary" style="padding-top: 10px;">
                              <i class="fa fa-plus-circle"></i> ADD NEW</nuxt-link>
                          </div>
                          <div class="input-group-prepend">
                            <nuxt-link :to="{name: 'admin-products-upload'}" class="btn btn-info btn-sm" style="padding-top: 10px;">
                              <i class="fas fa-upload"></i> IMPORT</nuxt-link>
                          </div>
                          <div class="input-group-prepend">
                            <a href="/templateProduk.xlsx" download class="btn btn-dark">
                              <i class="fas fa-download"></i> TEMPLATE IMPORT
                            </a>
                        </div>
                          <input type="text" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="cari berdasarkan nama product">
                          <div class="input-group-append">
                              <button @click="searchData" class="btn btn-dark"><i class="fa fa-search"></i>
                              SEARCH
                              </button>
                          </div>
                      </div>
                  </div>
  
                  <b-table responsive striped bordered hover :items="products.data" :fields="fields" show-empty>
                    <template v-slot:cell(barcode)="row">
                      <div id="barcodePrint" class="row" style="background-color:white;">
                        <div class="col text-center">
                          <barcode :value="row.item.barcode" format="CODE39" :font-size="25" :height="85" :width="2">
                            ERROR!
                          </barcode>
                          <h4>{{row.item.title}}</h4>
                          <h3>{{uangIndonesia(row.item.price)}}</h3>
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
                        <!-- <b-button @click.prevent="generateAndDownloadBarcodeInPDF(row.item.barcode,row.item.price,row.item.title)" variant="primary" size="sm">
                            <i class="fas fa-download"></i> BARCODE
                        </b-button> -->
                        <!-- <b-button @click.prevent="convertBarcodeToImg(row.item.barcode,row.item.price,row.item.title)" variant="info">
                          <i class="fas fa-download"></i> BARCODE
                        </b-button> -->
                        <b-button-group>
                          <b-button @click.prevent="barcodeDownload(row.item.barcode,row.item.title)" variant="info">
                            <i class="fas fa-download"></i> BARCODE
                          </b-button>
                          <b-button :to="{name: 'admin-products-edit-id', params: {id: row.item.id}}" variant="warning">
                              <i class="fas fa-edit"></i> EDIT
                          </b-button>
                          <!-- <b-button variant="danger" size="sm" @click="destroyProduct(row.item.id)">DELETE</b-button> -->
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
    // import { jsPDF } from 'jspdf';
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
  
      //data function
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
  
          //state search
          search: ''
        }
      },
  
      //hook "asyncData"
      async asyncData({ store }) {
          await store.dispatch('admin/product/getProductsData')
      },
  
      //computed
      computed: {
          //products
          products() {
              return this.$store.state.admin.product.products
          },
      },
      //method
      methods: {
        uangIndonesia(value) {
          if (typeof value !== 'number') {
            return value
          }
          var formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })
          return formatter.format(value)
        },
        // generateAndDownloadBarcodeInPDF(orderNo,price,product){
        // let makeBase64Image = this.convertTextToBase64Barcode(orderNo,price)
        //       this.convertBase64ToPNGImage(makeBase64Image).then((realImage) => {
        //           const doc = new jsPDF('l', 'mm', [65,30]);
        //           let fileName = orderNo + '-' + product
        //           doc.addImage(realImage, 'PNG',10,10);
        //           doc.save(fileName+'.pdf');
        //       });
        //   },
        //   convertBase64ToPNGImage(url) {
        //       return new Promise((resolve) => {
        //           let img = new Image();
        //           img.onload = () => resolve(img);
        //           img.src = url;
                  
        //       });
        //   },

        //   convertTextToBase64Barcode(text,price){
        //       let label = String(text + ' ' + this.uangIndonesia(price))
        //       let canvas = document.createElement('canvas');
        //       JsBarcode(canvas, text, { format: 'code39', width: 1, height:40, fontSize:10, text:label });
        //       return canvas.toDataURL('image/png');
        //   },
        // convertBarcodeToImg(text,price,title){
        //     console.log('start')
        //     let canvas = document.createElement('canvas');
        //     let harga = document.createElement('h6');
        //     harga.innerText = String(this.uangIndonesia(price)) 
        //     JsBarcode(canvas, text, { format: 'code39', width: 2, height:70, fontSize:28});
        //     const barcode = document.createElement('a');
        //     barcode.download = text + "-" + title + ".png";
        //     barcode.href = canvas.toDataURL('image/png');
        //     document.body.append();
        //     barcode.click();
        //     barcode.remove();
        //     console.log('end')
        // },
        barcodeDownload(barcodeNum,title){
            // console.log('start')
            html2canvas(document.getElementById("barcodePrint")).then(function (canvas) {                   
                var anchorTag = document.createElement("a");
                document.body.appendChild(anchorTag);
                // document.getElementById("previewImg").appendChild(canvas);
                anchorTag.download = barcodeNum+"-"+title+".png";
                anchorTag.href = canvas.toDataURL();
                anchorTag.target = '_blank';
                anchorTag.click();
            });
            // console.log('end')
        },
        //method "searchData"
        searchData() {
            //commit to mutation "SET_PAGE"
            this.$store.commit('admin/product/SET_PAGE', 1)
            //dispatch on action "getProductsData"
            this.$store.dispatch('admin/product/getProductsData', this.search)
        },
        //method "changePage"
        changePage(page) {
            //commit to mutation "SET_PAGE"
            this.$store.commit('admin/product/SET_PAGE', page)
            //dispatch on action "getProductsData"
            this.$store.dispatch('admin/product/getProductsData', this.search)
        },
        //method "destroyProduct"
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

              //dispatch to action "deleteCategory" vuex
              this.$store.dispatch('admin/product/destroyProduct', id)
                .then((response) => {
                  console.log(response)
                  //feresh data
                  this.$nuxt.refresh()

                  //alert
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
  
  <style>
  
  </style>
