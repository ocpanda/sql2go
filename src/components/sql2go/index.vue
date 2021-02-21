<template lang="pug">
.page
  .title
    img(alt="sql2go" src="@/assets/img/logo.png")
    h1 Welcome to sql2go

  .sql2go
    el-input(v-model="form.sql" :rows="20" placeholder="Text SQL" type="textarea")
    .sql2go-submit(@click="handleSubmit")
      i.el-icon-refresh(v-if="!isLoading" style="font-size: 24px;")
      i.el-icon-loading(v-else style="font-size: 24px;")
    el-input(:disabled="true" v-model="formRes.sql" :rows="20" placeholder="Generate to go ORM" type="textarea")
</template>

<script>
import { ref } from 'vue'
import { ElementInput } from 'element-plus'
import { useLoading } from '@/global/useLoading'
import { convertSqlToGo } from '@/services/sql2goServices'

export default {
  name: 'sql2go',
  components: {
    ElementInput
  },
  setup () {
    const form = ref({
      sql: '',
    })
    const formRes = ref({
      sql: '',
    })

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

:deep(.el-textarea) {
  width: 40vw;
  margin-left: 20px;
  margin-right: 20px;
}
</style>