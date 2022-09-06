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
                <div class="form-group">
                  <label for="">Ф.И.О</label>
                  <input type="text" class="form-control" v-model="contact.name">
                </div>
                <div class="form-group">
                  <label for="">Номер телефона</label>
                  <input type="text" class="form-control" v-model="contact.phone" v-mask="'+999 (99) 999 9999'">
                </div>
                <div class="form-group">
                  <label for="">Email</label>
                  <input type="text" class="form-control" v-model="contact.email">
                </div>
                <div class="form-group">
                  <label for="">Теги</label>
                  <q-select multiple filled v-model="contact.tags" :options="tags" label="Выбрать тэг" />
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex justify-end">
                      <button class="btn btn-primary mr-2" @click.prevent="saveContact()">Сохранить</button>
                      <button class="btn btn-primary" @click.prevent="alert = false">Закрыть</button>
                    </div>
                  </div>
                </div>
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
              <td>{{ item.tags.length > 0 ? item.tags.map(item => item.label) : 'Отсутвует' }}</td>
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
import { mapState } from 'vuex'
import { required } from '@vuelidate/validators'
export default {
  name: "Contact",
  data () {
    return {
      alert: false,
      value: null,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      contact: {
        name: null,
        email: null,
        tags: null,
        phone: null
      }
    }
  },
  validations: {
    contact: {
      name: { required }
    }
  },
  computed: {
    ...mapState(['contacts', 'tags']),
    getContacts () {
      if (this.value?.id === 1) {
        return this.contacts
      }
      try {
        const res = this.contacts.filter(item => item.tags.some((ev) => ev.label === this.value.label))
        if (res.length > 0) {
          return res
        }
      } catch (e) {
        return this.contacts
      }
    }
  },
  methods: {
    saveContact () {
      console.log(this.$clearNumber(this.contact.phone))
      this.$store.commit('SET_CONTACT', {name: this.contact.name, email: this.contact.email, tags: this.contact.tags, phone: this.contact.phone})
      this.alert = !this.alert
      for (const [key] of Object.entries(this.contact)) {
        this.contact[key] = null
      }
    }
  }
}
</script>

<style scoped>

</style>
