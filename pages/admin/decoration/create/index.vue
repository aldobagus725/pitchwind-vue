<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-folder"></i> ADD NEW DECORATION</span>
                </div>
                <div class="card-body">
                  <form @submit.prevent="storeDecoration">
                    <div class="row py-2">
                      <div class="col">
                        <div class="form-group">
                          <label>DECORATION</label>
                          <input type="text" v-model="decoration.decoration" placeholder="Decoration Level"
                            class="form-control">
                          <div v-if="validation.decoration" class="mt-2">
                            <b-alert show variant="danger">{{ validation.decoration[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label>Cost</label>
                          <input type="number" v-model="decoration.cost" placeholder="Cost"
                            class="form-control">
                          <div v-if="validation.cost" class="mt-2">
                            <b-alert show variant="danger">{{ validation.cost[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row py-2">
                      <div class="col">
                        <div class="form-group">
                          <label>Keterangan</label>
                          <input type="text" v-model="decoration.description" placeholder="Keterangan"
                            class="form-control">
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
          title: 'Add New Decoration - Administrator',
        }
      },
  
      data() {
        return {
          decoration: {
            decoration: null,
            cost: null,
            description: null,
          },
          validation: [],
        }
      },
      methods: {
        async storeDecoration() {
          let formData = new FormData();
          formData.append('decoration', this.decoration.decoration)
          formData.append('cost', this.decoration.cost)
          formData.append('description', this.decoration.description)
          await this.$store.dispatch('admin/decoration/storeDecoration', formData)
            .then(() => {
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "Data Saved Successfully!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              this.$router.push({
                name: 'admin-decoration'
              })
            })
            .catch(error => {
              this.validation = error.response.data
            })
        }
      }
  
    }
  </script>