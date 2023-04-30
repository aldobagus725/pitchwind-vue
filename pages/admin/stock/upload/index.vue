<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-folder"></i> IMPORT STOCK</span>
                </div>
                <div class="card-body">
  
                  <form @submit.prevent="uploadStock">
  
                    <div class="form-group">
                      <label>FILE IMPORT (HARUS XLS, XLSX, CSV!)</label>
                      <input type="file" @change="handleFileChange" class="form-control">
                      <div v-if="validation.file" class="mt-2">
                        <b-alert show variant="danger">{{ validation.file[0] }}</b-alert>
                      </div>
                    </div>
                    <button class="btn btn-info mr-1 btn-submit" type="submit"><i class="fa fa-paper-plane"></i>
                      UPLOAD</button>
  
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
          title: 'Upload Stock - Administrator',
        }
      },
  
      data() {
        return {
          //state category
          category: {
            file: '',
          },
          //state validation
          validation: []
        }
      },
  
      methods: {
  
        //handle file upload
        handleFileChange(e) {
  
          //get image
          let file = this.category.file = e.target.files[0]
  
          //check fileType
          if (!file.type.match('application.*')) {
  
            //if fileType not allowed, then clear value and set null
            e.target.value = ''
  
            //set state "category.image" to null
            this.category.file = null
  
            //show sweet alert
            this.$swal.fire({
              title: 'OOPS!',
              text: "Format File Tidak Didukung! (Harus XLSX, XLS, ATAU CSV)",
              icon: 'error',
              showConfirmButton: false,
              timer: 2000
            })
          }
  
        },
  
        //method "storeCategory"
        async uploadStock() {
  
          //define formData
          let formData = new FormData();
  
          formData.append('file', this.category.file)
  
          //sending data to action "storeCategory" vuex
          await this.$store.dispatch('admin/stock/uploadStock', formData)
            
            //success
            .then(() => {
  
              //sweet alert
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "Upload Berhasil!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
  
              //redirect route "admin-categories"
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
  
  </style>