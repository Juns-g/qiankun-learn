<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content"></div>
    </el-col>
    <el-col :span="24">
      <div class="grid-content"></div>
    </el-col>
    <el-col :span="24">
      <el-button size="small">默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button
        type="success"
        round
        >成功按钮</el-button
      >
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button
        type="danger"
        disabled
        >危险按钮</el-button
      >
    </el-col>
    <el-col :span="24">
      <el-input
        placeholder="请输入内容"
        style="width: 200px; margin-right: 10px"
        v-model="inputVal"
      />
      <el-input-number
        :min="1"
        :max="10"
        label="描述文字"
        style="margin-right: 10px"
        v-model="inputNumberVal"
      />
      <el-select placeholder="请选择" />
    </el-col>
    <el-col
      :span="24"
      style="display: flex; align-items: center; justify-content: center"
    >
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>卡片名称</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            >操作按钮</el-button
          >
        </div>
        <div
          v-for="o in 7"
          :key="o"
          class="text item"
        >
          {{ '列表内容 ' + o }}
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'BasePage1',
  data() {
    return {
      inputVal: '',
      inputNumberVal: 0,
    }
  },
}
</script>

<style scoped>
.el-row {
  gap: 12px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
