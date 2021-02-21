<template lang="pug">
.page
  .title
    img(alt="sql2go" src="@/assets/img/logo.png")
    h1 Welcome to sql2go

  .sql2go
    .input-component
      .input-title SQL
      .input(contenteditable="true" @focus="handleFocus" @blur="handleBlur") {{ form.sql }}
    .sql2go-submit
      i.el-icon-refresh(v-if="!isLoading" @click="handleSubmit" style="font-size: 24px;")
      i.el-icon-loading(v-else style="font-size: 24px;")
    .input-component
      .input-title GO ORM
      .input {{ formRes.sql }}
</template>

<script>
import { ref, nextTick } from 'vue'
import { useLoading } from '@/global/useLoading'
import { convertSqlToGo } from '@/services/sql2goServices'

export default {
  name: 'sql2go',
  setup () {
    const form = ref({
      sql: 'Text SQL',
    })
    const formRes = ref({
      sql: 'Generate to go ORM',
    })

    const handleFocus = () => {
      if (form.value.sql === 'Text SQL') form.value.sql = ''
    }

    const handleBlur = async (e) => {
      const value = e.target.innerHTML
      await nextTick(() => {
        if (value === '') form.value.sql = 'Text SQL'
      })
    }

    const handleSubmit = async () => {
      const body = {
        sql: form.value.sql,
      }

      load()
      const [res, err] = await convertSqlToGo({ body })
      unLoad()
      if (!err) {
        formRes.value.sql = res
      }
    }

    const { load, unLoad, isLoading } = useLoading()

    return {
      isLoading,

      form,
      formRes,

      handleSubmit,
      handleFocus,
      handleBlur
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 80px;
}

.title {
  display: flex;
  justify-content: center;

  h1 {
    margin-left: 8px;
  }
}

.sql2go {
  display: flex;
  flex-direction: row;
  margin-top: 10vh;
}

.sql2go-submit {
  display: flex;
  align-items: center;
}

.el-icon-refresh {
  &:hover {
    cursor: pointer;
  }
}

.input-title {
  border: solid 1px cornflowerblue;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 40vw;
  height: 20px;
  margin-left: 20px;
  margin-right: 20px;
  background: cornflowerblue;
}

.input {
  border: solid 1px gray;
  padding: 10px;
  width: 40vw;
  height: 60vh;
  margin-left: 20px;
  margin-right: 20px;
}
</style>