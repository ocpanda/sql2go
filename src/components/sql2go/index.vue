<template lang="pug">
.page
  .title
    img(alt="sql2go" src="@/assets/img/logo.png")
    h1 Welcome to sql2go

  .sql2go
    .input-component
      .input-title SQL
      el-input.input(v-model="form.sql" :resize="'none'" placeholder="Taste SQL" :rows="20" type="textarea")
    .sql2go-submit
      i.el-icon-refresh(v-if="!isLoading" @click="handleSubmit" style="font-size: 24px;")
      i.el-icon-loading(v-else style="font-size: 24px;")
    .input-component
      .input-title GO struct
      .input.el-textarea__inner.input-res(v-html="formRes.sql")
</template>

<script>
import { ref, nextTick } from 'vue'
import { useLoading } from '@/global/useLoading'
import { convertSqlToGo } from '@/services/sql2goServices'
import { ElInput } from 'element-plus'

export default {
  name: 'sql2go',
  components: {
    ElInput,
  },
  setup () {
    const form = ref({
      sql: '',
    })
    const formRes = ref({
      sql: '',
    })

    const handleInput = async (e) => {
      const value = e.target.innerHTML
      await nextTick(() => {
        form.value.sql = value
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
        formRes.value.sql = '<div>' + res.replace(/\n/g, '<br>').replace(/\s/g, '&nbsp') + '</div>'
      }
    }

    const { load, unLoad, isLoading } = useLoading()

    return {
      isLoading,

      form,
      formRes,

      handleInput,
      handleSubmit,
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
  padding: 5px 0 5px 0;
  width: 45vw;
  height: 20px;
  margin-left: 20px;
  margin-right: 20px;
  background: cornflowerblue;
}

.input {
  overflow: scroll;
  border: solid 1px gray;
  width: 45vw;
  height: 60vh;
  margin-left: 20px;
  margin-right: 20px;
  word-wrap: wrap;
}

::v-deep(.el-textarea__inner) {
  border-radius: 0;
}

.input-res {
  overflow: auto;
  font-size: 10px;
}
</style>