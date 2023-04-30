<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <div class="row">
                    <div class="col-sm-2">
                      <span class="font-weight-bold"><i class="fa fa-layer-group"></i> ARTICLES</span>
                    </div>
                    <div class="col-sm-10">
                      <div class="form-group">
                          <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                  <nuxt-link :to="{name: 'admin-articles-create'}" class="btn btn-primary" style="padding-top: 10px;">
                                  <i class="fa fa-plus-circle"></i> ADD NEW</nuxt-link>
                              </div>
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
                </div>
                <div class="card-body">
                  <b-table responsive striped bordered hover :items="articles.data" :fields="fields" show-empty>
                    <template v-slot:cell(published)="row">
                      <template v-if="row.item.published == 0">
                          <h4><span class="badge bg-danger text-white">UNPUBLISHED</span></h4>
                      </template>
                      <template v-else>
                          <h4><span class="badge bg-success text-white">PUBLISHED</span></h4>
                      </template>
                    </template>
                    <template v-slot:cell(actions)="row">
                        <b-button-group>
                          <b-button :to="{name: 'admin-articles-edit-id', params: {id: row.item.id}}" variant="warning">
                              <i class="fas fa-edit"></i> EDIT
                          </b-button>
                          <!-- <b-button variant="danger" size="sm" @click="destroyArticle(row.item.id)">DELETE</b-button> -->
                          <b-button variant="danger" @click="destroyArticle(row.item.id)"><i class="fas fa-trash-alt"></i> DELETE</b-button>
                        </b-button-group>
                    </template>
                  </b-table>
                  <!-- pagination -->
                  <b-pagination align="right" :value="articles.current_page" :total-rows="articles.total"
                    :per-page="articles.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  <script>
    // import html2canvas from 'html2canvas';
    export default {
      //layout
      layout: 'admin',
      //meta
      head() {
        return {
          title: 'Articles - Administrator',
        }
      },
      //data function
      data() {
        return {
          //table header
          fields: [
            {
              label: 'Judul',
              key: 'title',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            // {
            //   label: 'Barcode',
            //   key: 'barcode',
            //   thClass:'text-center',
            //   tdClass: 'text-center'
            // },
            // {
            //   label: 'Product Name',
            //   key: 'title',
            //   thClass:'text-center',
            //   tdClass: 'text-center'
            // },
            // {
            //   label: 'Category Name',
            //   key: 'category.name',
            //   thClass:'text-center',
            //   tdClass: 'text-center'
            // },
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
              label: 'Status',
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
  
          //state search
          search: ''
        }
      },
  
      //hook "asyncData"
      async asyncData({ store }) {
          await store.dispatch('admin/article/getArticlesData')
      },
  
      //computed
      computed: {
          //articles
          articles() {
              return this.$store.state.admin.article.articles
          },
      },
      //method
      methods: {
        //method "searchData"
        searchData() {
            //commit to mutation "SET_PAGE"
            this.$store.commit('admin/article/SET_PAGE', 1)
            //dispatch on action "getProductsData"
            this.$store.dispatch('admin/article/getArticlesData', this.search)
        },
        //method "changePage"
        changePage(page) {
            //commit to mutation "SET_PAGE"
            this.$store.commit('admin/article/SET_PAGE', page)
            //dispatch on action "getProductsData"
            this.$store.dispatch('admin/article/getArticlesData', this.search)
        },
        //method "destroyArticle"
        destroyArticle(id) {
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

              //dispatch to action "deleteCategory" vuex
              this.$store.dispatch('admin/article/destroyArticle', id)
                .then((response) => {
                  console.log(response)
                  //feresh data
                  this.$nuxt.refresh()

                  //alert
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
      }
  
  }
  </script>
  
  <style>
  
  </style>