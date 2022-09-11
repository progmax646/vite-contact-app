<template>
<div class="contact">
  <div class="container">
    <div class="row pt-4 pb-4">
      <div class="col-md-6">
        <h4>Contact index</h4>
      </div>
      <div class="col-md-6">
        <CreateContactModal @input="getTest"/>
      </div>
    </div>
    <div class="row pb-4">
      <div class="col-md-12">
        <div class="d-flex justify-end">
          <div style="min-width: 300px">
            <q-select v-model="value" :options="tags" label="Фильтровать по" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="table">
          <table v-if="getContacts" class="table">
            <thead>
            <tr>
              <td>№</td>
              <td>Ф.И.О</td>
              <td>Номер телефона</td>
              <td>Email</td>
              <td>Теги</td>
              <td>Действие</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, idx) in getContacts" :key="idx">
              <td>{{ idx + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.tags.map(item => item.label) }}</td>
              <td>---</td>
            </tr>
            </tbody>
          </table>
          <div v-else>
            <hr>
            <h6>Контактов не найдено</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import CreateContactModal from "./CreateContactModal.vue";
export default {
  components: {
    CreateContactModal
  },
  setup() {
    const store = useStore()

    const value = ref({id: 1, label: 'Все'})


    const contacts = computed(() => {
      return store.state.contacts
    })

    const tags = computed(() => {
      return store.state.tags
    })

    const getTest = (val) => {
      console.log(val)
    }


    const getContacts = computed(() => {
      if (value.value?.id === 1) {
        return contacts.value
      }

      try {
        const res = contacts.value.filter(item => item.tags.some((ev) => ev.label === value.value.label))
        if (res.length > 0) {
          return res
        }
      } catch (e) {
        return contacts.value
      }
    })


    return {
      getContacts,
      alert,
      value,
      tags,
      getTest
    }

  },
}
</script>

<style scoped>

</style>
