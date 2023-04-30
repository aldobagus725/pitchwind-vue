<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-folder"></i> EDIT Asset</span>
                </div>
                <div class="card-body">
                  <form @submit.prevent="updateAsset">
                    <div class="row py-3">
                      <div class="col">
                        <div class="form-group">
                          <label>NAME</label>
                          <input type="text" v-model="asset.name" placeholder="NAME"
                            class="form-control">
                          <div v-if="validation.name" class="mt-2">
                            <b-alert show variant="danger">{{ validation.name[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row py-3">
                      <div class="col">
                        <div class="form-group">
                          <label>DESCRIPTION</label>
                          <input type="text" v-model="asset.description" placeholder="DESCRIPTION"
                            class="form-control">
                          <div v-if="validation.description" class="mt-2">
                            <b-alert show variant="danger">{{ validation.description[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row py-3">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label>QTY</label>
                          <input type="number" min="0" v-model="asset.qty" placeholder="QTY"
                            class="form-control">
                          <div v-if="validation.qty" class="mt-2">
                            <b-alert show variant="danger">{{ validation.qty[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label>CONDITION</label>
                          <input type="text" v-model="asset.condition" placeholder="CONDITION (i.e. second, new...)"
                            class="form-control">
                          <div v-if="validation.qty" class="mt-2">
                            <b-alert show variant="danger">{{ validation.condition[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row py-3">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label>COST</label>
                          <input type="number" min="0" v-model="asset.cost" placeholder="Cost (In RP)"
                            class="form-control">
                          <div v-if="validation.cost" class="mt-2">
                            <b-alert show variant="danger">{{ validation.cost[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label>DATE OF ACQUIREMENT</label>
                          <input type="date" v-model="asset.date_of_acquirement"
                            class="form-control">
                          <div v-if="validation.date_of_acquirement" class="mt-2">
                            <b-alert show variant="danger">{{ validation.date_of_acquirement[0] }}</b-alert>
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
          title: 'Edit Asset - Administrator',
        }
      },
      data() {
        return {
          asset: {
            name: '',
            description: '',
            qty: '',
            condition: '',
            cost: '',
            date_of_acquirement: '',
          },
          validation: [],
        }
      },
      async asyncData({ store, route }) {
          await store.dispatch('admin/inventory/getOneInventory', route.params.id)
      },
      //mounted
      mounted() {
          this.asset.name = this.$store.state.admin.inventory.inventory.nama_barang
          this.asset.description = this.$store.state.admin.inventory.inventory.description
          this.asset.qty = this.$store.state.admin.inventory.inventory.qty
          this.asset.condition = this.$store.state.admin.inventory.inventory.kondisi
          this.asset.cost = this.$store.state.admin.inventory.inventory.harga_beli
          this.asset.date_of_acquirement = this.$store.state.admin.inventory.inventory.tanggal_beli
      },
      methods: {
        async updateAsset() {
          let formData = new FormData();
          formData.append("_method", "PATCH")
          formData.append('nama_barang', this.asset.name)
          formData.append('description', this.asset.description)
          formData.append('qty', this.asset.qty)
          formData.append('kondisi', this.asset.condition)
          formData.append('harga_beli', this.asset.cost)
          formData.append('tanggal_beli', this.asset.date_of_acquirement)
          await this.$store.dispatch('admin/inventory/updateInventory', {
              dataId: this.$route.params.id,
              payload: formData
          })
            .then(() => {
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "Data Updated Successfully!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              this.$router.push({
                name: 'admin-inventory'
              })
  
            })
            .catch(error => {
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