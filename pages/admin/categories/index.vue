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
                      <h4 class="font-weight-bold"><i class="fa fa-folder"></i> CATEGORIES</h4>
                    </div>
                    <div class="col-sm-9 text-right">
                      <div class="form-group">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="Find by category name">
                            <div class="input-group-append">
                                <button  @click="searchData" class="btn btn-warning"><i class="fa fa-search"></i>SEARCH</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="btn-group">
                        <a href="/templateCategory.xlsx" download class="btn btn-dark">
                          <i class="fas fa-download"></i> TEMPLATE IMPORT
                        </a>
                        <div class="input-group-append">
                          <button @click="searchData" class="btn btn-warning"><i class="fa fa-search"></i>SEARCH</button>
                      </div>
                      </div>
                    </div>
                    <div class="col text-right">
                      <div class="btn-group">
                        <nuxt-link :to="{name: 'admin-categories-create'}" class="btn btn-primary" style="padding-top: 10px;">
                          <i class="fa fa-plus-circle"></i> ADD NEW</nuxt-link>
                          <nuxt-link :to="{name: 'admin-categories-upload'}" class="btn btn-info" style="padding-top: 10px;">
                            <i class="fas fa-upload"></i> IMPORT</nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <b-table striped bordered hover :items="categories.data" :fields="fields" show-empty>
                    <template v-slot:cell(image)="data">
                        <img class="img-fluid" width="50" :src="data.item.image" />
                    </template>
                    <template v-slot:cell(created_at)="row">
                      {{ formatProperDate(row.item.created_at) }}
                    </template>
                    <template v-slot:cell(actions)="row">
                        <b-button :to="{name: 'admin-categories-edit-id', params: {id: row.item.id}}" variant="warning" size="sm">
                            <i class="fas fa-edit"></i> EDIT
                        </b-button>
                        <b-button variant="danger" size="sm" @click="destroyCategory(row.item.id)"><i class="fas fa-trash-alt"></i> DELETE</b-button>
                    </template>
                  </b-table>
                  <!-- pagination -->
                  <b-pagination align="right" :value="categories.current_page" :total-rows="categories.total"
                    :per-page="categories.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
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
          title: 'Categories - Administrator',
        }
      },
      //data function
      data() {
        return {
          //table header
          fields: [
            // {
            //   label: 'ID',
            //   key: 'id',
            //   tdClass: 'text-center'
            // },
            {
              label: 'Image',
              key: 'image',
              tdClass: 'text-center'
            },
            {
              label: 'Category Name',
              key: 'name'
            },
            {
              label: 'Entry Date',
              key: 'created_at'
            },
            {
              label: 'Actions',
              key: 'actions',
              tdClass: 'text-center'
            }
          ],
  
          //state search
          search: ''
        }
      },
  
      //hook "asyncData"
      async asyncData({ store }) {
          await store.dispatch('admin/category/getCategoriesData')
      },
  
      //computed
      computed: {
  
          //categories
          categories() {
              return this.$store.state.admin.category.categories
          },
      },
  
      //method
      methods: {
      
          //method "searchData"
          searchData() {
  
              //commit to mutation "SET_PAGE"
              this.$store.commit('admin/category/SET_PAGE', 1)
  
              //dispatch on action "getCategoriesData"
              this.$store.dispatch('admin/category/getCategoriesData', this.search)
          },
  
          //method "changePage"
          changePage(page) {
              //commit to mutation "SET_PAGE"
              this.$store.commit('admin/category/SET_PAGE', page)
              //dispatch on action "getCategoriesData"
              this.$store.dispatch('admin/category/getCategoriesData', this.search)
          },

          //method "destroyCategory"
          destroyCategory(id) {
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
                this.$store.dispatch('admin/category/destroyCategory', id)
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
          // downloadTemplate() {
          //     this.$axios.$get('templateCategory.xlsx').then(response => {
          //       let blob = new Blob([response.data], { type: 'application/xlsx' })
          //       console.log(blob)
          //       let link = document.createElement('a')
          //       console.log(link)
          //       link.href = window.URL.createObjectURL(blob)
          //       console.log(link.href)
          //       link.download = 'Template-Category.xlsx'
          //       console.log(link.download)
          //       link.click()
          //   }).catch((e) => {
          //       console.log(e)
          //     })
          // },
  
      }
  
    }
  </script>
  
  <style>
  
  </style>