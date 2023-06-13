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
                  <form @submit.prevent="uploadProduct">
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
      layout: 'admin',
      head() {
        return {
          title: 'Upload New Product - Administrator',
        }
      },
      data() {
        return {
          import: {
            file: '',
          },
          validation: []
        }
      },
      methods: {
        handleFileChange(e) {
          let file = this.import.file = e.target.files[0]
          if (!file.type.match('application.*')) {
            e.target.value = ''
            this.import.file = null
            this.$swal.fire({
              title: 'OOPS!',
              text: "Format File Tidak Didukung! (Harus XLSX, XLS, ATAU CSV)",
              icon: 'error',
              showConfirmButton: false,
              timer: 2000
            })
          }
        },
        async uploadProduct() {
          let formData = new FormData();
          formData.append('file', this.import.file)
          await this.$store.dispatch('admin/product/uploadProduct', formData)
            .then(() => {
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "Upload Berhasil!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              this.$router.push({
                name: 'admin-products'
              })
            })
            .catch(error => {
              var mamang = error.response.data.error
              // var mamangdua = mamang.substring(0, 150)
                this.$swal.fire({
                  title: 'ERROR!',
                  text: mamang,
                  // html: true,
                  icon: 'error',
                  showConfirmButton: true,
                })
              // this.validation = error.response.data
            })
        }
      }
    }
  </script>