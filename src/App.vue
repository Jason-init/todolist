<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleInputChange"/>
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="getListByActiveList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e) => {handleCheckBoxChanged(e, item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="deleteItemFromList(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{getUndoneCount}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="activeList === 'all' ? 'primary' : 'default'" @click="switchList('all')">全部</a-button>
          <a-button :type="activeList === 'undone' ? 'primary' : 'default'" @click="switchList('undone')">未完成</a-button>
          <a-button :type="activeList === 'done' ? 'primary' : 'default'" @click="switchList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="deleteDoneItems">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
    this.getList()
  },
  methods: {
    ...mapActions(['getList']),
    handleInputChange (e) {
      this.$store.commit('setInputValue', e.target.value)
    },
    addItemToList () {
      if (this.inputValue.trim().length === 0) return this.$message.warning('Input cannot be empty')
      this.$store.commit('addToList', this.inputValue.trim())
    },
    deleteItemFromList (id) {
      this.$store.commit('deleteFromList', id)
    },
    handleCheckBoxChanged (e, id) {
      this.$store.commit('updateStatus', {
        id: id,
        status: e.target.checked
      })
    },
    deleteDoneItems () {
      this.$store.commit('deleteDones')
    },
    switchList (activeList) {
      this.$store.commit('changeActiveList', activeList)
    }
  },
  computed: {
    ...mapState(['list', 'inputValue', 'activeList']),
    ...mapGetters(['getUndoneCount', 'getListByActiveList'])
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
