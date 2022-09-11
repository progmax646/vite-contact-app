<template>
<div class="contact">
  <div class="container">
    <div class="row pt-4 pb-4">
      <div class="col-md-6">
        <h4>Contact index</h4>
      </div>
      <div class="col-md-6">
        <div class="d-flex justify-content-end align-items-center">
          <button class="btn btn-primary" @click="alert = true">Создать</button>
          <q-dialog v-model="alert">
            <q-card>
              <q-card-section>
                <div class="text-h6">Создать контакт</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <form @submit.prevent="createContact()">
                  <div class="form-group">
                    <label for="">Ф.И.О</label>
                    <input v-model="contact.name" class="form-control" :class="{'is-invalid': $v.name.$errors.some(e => e)}">
                  </div>
                  <div class="form-group">
                    <label for="">Номер телефона</label>
                    <input type="text" class="form-control" v-model="contact.phone" v-mask="'+999 (99) 999 9999'" :class="{'is-invalid': $v.phone.$errors.some(e => e)}">
                  </div>
                  <div class="form-group">
                    <label for="">Email</label>
                    <input type="text" class="form-control" v-model="contact.email" :class="{'is-invalid': $v.email.$errors.some(e => e)}">
                  </div>
                  <div class="form-group">
                    <label for="">Теги</label>
                    <q-select multiple filled v-model="contact.tags" :options="tags" label="Выбрать тэг" :class="{'is-invalid': $v.tags.$errors.some(e => e)}" />
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="d-flex justify-end">
                        <button class="btn btn-primary mr-2" type="submit">Сохранить</button>
                        <button class="btn btn-primary" @click.prevent="alert = false">Закрыть</button>
                      </div>
                    </div>
                  </div>
                </form>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
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
import { ref, reactive, computed } from 'vue'
import { required, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useStore } from 'vuex'
import { clearNumber } from "../plugins/custom-functions";
export default {
  setup() {
    const store = useStore()

    const alert = ref(false)
    const value = ref({id: 1, label: 'Все'})

    const contact = reactive({
      name: null,
      email: null,
      tags: null,
      phone: null
    })

    const contacts = computed(() => {
      return store.state.contacts
    })

    const tags = computed(() => {
      return store.state.tags
    })


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

    const rules = computed(() => {
      return {
        name: { required },
        email: { required, email },
        tags: { required },
        phone: { required }
      }
    })

    const $v = useVuelidate(rules, contact)



// create contact

    const createContact = () => {
      $v.value.$validate()
      if (!$v.value.$error) {
        contact.phone = clearNumber(contact.phone)
        store.commit('SET_CONTACT', contact)
        alert.value = !alert.value
      }
    }

    return {
      createContact,
      getContacts,
      alert,
      value,
      tags,
      contact,
      $v
    }

  },
}
</script>

<style scoped>

</style>
