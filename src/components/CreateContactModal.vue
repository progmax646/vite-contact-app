<template>
<div class="d-flex justify-end">
  <button class="btn btn-primary" @click.prevent="isOpenModal = !isOpenModal">Создать</button>
  <q-dialog v-model="isOpenModal">
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
                <button class="btn btn-primary" @click.prevent="isOpenModal = false">Закрыть</button>
              </div>
            </div>
          </div>
        </form>
      </q-card-section>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
import {computed, reactive, ref} from 'vue'
import {useStore} from "vuex";
import {clearNumber} from "../plugins/custom-functions";
import {email, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default {
  setup(props, { emit }) {

    const store = useStore()

    const contact = reactive({
      name: null,
      email: null,
      tags: null,
      phone: null
    })
    const isOpenModal = ref(false)

    const tags = computed(() => {
      return store.state.tags
    })

    const createContact = () => {
      $v.value.$validate()
      if (!$v.value.$error) {
        contact.phone = clearNumber(contact.phone)
        store.commit('SET_CONTACT', contact)
        isOpenModal.value = !isOpenModal.value
      }
    }

    const rules = computed(() => {
      return {
        name: { required },
        email: { required, email },
        tags: { required },
        phone: { required }
      }
    })

    const $v = useVuelidate(rules, contact)


    const setTest = (val) => {
      emit('input', val)
    }

    return {
      setTest,
      isOpenModal,
      contact,
      $v,
      tags,
      createContact
    }
  }
}
</script>

<style scoped>

</style>
