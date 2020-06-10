<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.system"
        class="filter-item"
        placeholder="请输入系统名称"
        clearable
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      >
        <el-option v-for="item in calendarTypeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <!-- <el-input v-model="listQuery.system" placeholder="请输入系统名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->
      <el-input
        v-model="listQuery.job_name"
        placeholder="请输入任务名称"
        style="width: 200px;"
        clearable
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.author"
        placeholder="请输入任务负责人"
        style="width: 200px;"
        clearable
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="success"
        icon="el-icon-edit"
        @click="handleCreate();"
      >新增调度</el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-refresh"
        @click="handleRefreshGit"
      >更新git地址</el-button>
      <!-- <el-button class="filter-item" type="info" icon="el-icon-magic-stick" @click="drawer = true">
        使用说明
      </el-button>-->
      <el-tooltip class="item" effect="dark" content="使用手册" placement="top-start">
        <el-button type="primary" icon="el-icon-reading" circle @click="drawer = true" />
      </el-tooltip>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" align="center" fixed width="50px">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系统名称" align="center" fixed width="200px">
        <template slot-scope="{row}">
          <span>{{ row.system }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称" align="center" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.job_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="环境" align="center" width="50px">
        <template slot-scope="{row}">
          <span>{{ row.env }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="80px">
        <template slot-scope="{row}">
          <span v-if="row.status==0">
            <el-tag type effect="dark">未运行</el-tag>
          </span>
          <span v-else>
            <el-tag type="success" effect="dark">监控中</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="corn" align="center" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.job_corn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="脚本路径" align="center" width="400px">
        <template slot-scope="{row}">
          <span>{{ row.job_args }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务负责人" align="center" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="监控负责人" align="center" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.warning }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="300px"
        fixed="right"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="执行任务" placement="top-start">
            <el-button type="success" icon="el-icon-s-promotion" circle @click="handleUpdate(row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="停止任务" placement="top-start">
            <el-button
              type="warning"
              icon="el-icon-switch-button"
              circle
              @click="handleUpdate(row)"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="更新任务" placement="top-start">
            <el-button type="info" icon="el-icon-download" circle @click="handleUpdate(row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑任务" placement="top-start">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleUpdate(row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除任务" placement="top-start">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(row.id, row.status, row.author)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="700px">
      <el-form
        ref="dataForm"
        class="add-form"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="监控项目" prop="system">
          <el-select
            v-model="temp.system"
            class="filter-item"
            placeholder="请选择监控项目"
            @change="handleGetJobArgs()"
          >
            <el-option v-for="item in calendarTypeOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="脚本路径" prop="job_args">
          <el-select v-model="temp.job_args" class="filter-item" filterable placeholder="请输入脚本路径">
            <el-option v-for="item in projectInfo" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择环境" prop="env">
          <el-select v-model="temp.env" class="filter-item" placeholder="请选择环境">
            <el-option
              v-for="item in evnOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="任务名称" prop="job_name">
          <el-input v-model="temp.job_name" placeholder="请输入任务名称" />
        </el-form-item>
        <el-form-item label="crontab" prop="job_corn">
          <el-input v-model="temp.job_corn" placeholder="请输入corn表达式..." />
          <el-popover
            placement="top-start"
            width="200"
            trigger="hover"
          >
            <el-link href="https://www.iamwawa.cn/crontab.html" target="_blank" type="primary">创建Crontab表达式</el-link>
            <i slot="reference" class="el-icon-info" />
          </el-popover>
        </el-form-item>
        <el-form-item label="任务负责人" prop="author">
          <el-input v-model="temp.author" placeholder="请输入任务负责人..." :disabled="true" />
        </el-form-item>
        <el-form-item label="监控负责人" prop="warning">
          <el-input v-model="temp.warning" placeholder="请输入监控负责人..." />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      class="notice-drawer"
      title="监控使用说明"
    >
      <div style="height:100vh;overflow:auto;">
        <div style="padding:0 20px;margin-bottom: 80px;">
          <h4 class="mt-0 header-title">工具介绍</h4>
          <p class="text-black-50 m-b-30 font-16">
            &#12288;&#12288;监控平台是通过httprunner脚本的方式做线上业务监控、定时执行自动化回归脚本。工具对于httprunner脚本无任何入侵，
            只需要把脚本上传到git，配置定时任务。程序将自动从git拉取httprunner脚本，根据配置的定时任务运行测试并对测试失败的用例发送企业微信告警。
          </p>
          <h3>一、脚本管理, 目录结构</h3>
          <p class="mb-0 text-muted">
            说明:
            <br>&#12288;&#12288;此目录是基于httprunner脚手架生成，以整个目录作为一个工程上传git的QA_Automation组内。
          </p>
          <br>
          <img src="@/assets/monitor/step01.png" style="height:80%; width:100%">
          <h3>二、更新GIT地址</h3>
          <p
            class="m-b-20 text-muted"
          >&#12288;&#12288;说明:在本平台的 监控平台>>业务接口监控 点击更新git地址按钮，平台会去gitLab上QA_Automation组内拉取所有测试工程项目的URL(程序会根据对应项目URL从git拉取用例到本地执行)</p>
          <img src="@/assets/monitor/step02.png" style="height:80%; width:100%">
          <h3>三、调度管理</h3>
          <p
            class="mb-0 text-muted"
          >&#12288;&#12288;说明:调度管理添加要执行测试的脚本信息（脚本路径对应httprunner目录结构，可执行具体yml，也可是执行整个目录及子目录下所有脚本),如：/api/xxx/xx.yml; /testsuites</p>
          <img src="@/assets/monitor/step03.png" style="height:80%; width:100%">
          <h3>四、任务操作</h3>
          <p class="m-b-20 text-muted">
            1.执行：启动调度任务（点击启动会立即执行一次调度，然后按照corn表达式配置定时执行)。备注：这里的corn表达式和标准corn稍微有些差异，采用的是5位表达式，格式：minute hour day month day_of_week
            <br>2.停止：停止调度任务
            <br>3.刷新用例：立即从git上拉取最新用例到服务器执行目录。（如果不操作主动刷新，系统执行测试前会判断当前时间和上一次更新时间，如果大于等于分钟则拉取一次最新脚本。）
            <br>4.编辑
            <br>5.删除.
          </p>
          <img src="@/assets/monitor/step04.png" style="height:80%; width:100%">
          <h3>五、接口告警</h3>
          <p class="m-b-20 text-muted">告警：对接了企业微信告警（监控负责人字段维护,多人用英文逗号隔开 可编辑增删）</p>
          <img src="@/assets/monitor/step05.png" style="height:80%; width:100%">
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { gitInfo, getUrl, createJob, getJobList, deleteJob, updateJob, getProjectInfo } from '@/api/monitor'
import Pagination from '@/components/Pagination' // secondary package based on el-paginatio
import { mapGetters } from 'vuex'

const calendarTypeOptions = []
const projectInfo = []
const evnOptions = [
  { key: 'qa', display_name: 'QA' },
  { key: 'dev', display_name: 'DEV' },
  { key: 'prod', display_name: 'Prod' }
]
export default {
  name: 'ComplexTable',
  components: { Pagination },
  data() {
    return {
      hideComponent: ['second', 'year'],
      expression: '',
      showCron: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      drawer: false,
      direction: 'rtl',
      listQuery: {
        page: 1,
        system: undefined,
        job_name: undefined,
        author: undefined
      },
      temp: {
        id: undefined,
        system: '',
        env: '',
        job_name: '',
        job_args: '',
        job_corn: '',
        author: '',
        warning: ''
      },
      calendarTypeOptions,
      evnOptions,
      projectInfo,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑任务',
        create: '新建任务'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        system: [{ required: true, message: '请选择项目', trigger: 'change' }],
        env: [{ required: true, message: '请选择环境', trigger: 'change' }],
        job_name: [{ required: true, message: '任务名称必填', trigger: 'blur' }],
        job_args: [{ required: true, message: '脚本路径必填', trigger: 'blur' }],
        job_corn: [{ required: true, message: 'cron表达式必填', trigger: 'blur' }],
        author: [{ required: true, message: '任务负责人必填', trigger: 'blur' }],
        warning: [{ required: true, message: '任务监控人必填', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    this.getList()
  },
  methods: {
    crontabFill(value) {
      // 确定后回传的值
      this.temp.job_corn = value
    },
    showDialog() {
      this.expression = this.temp.job_corn // 传入的 cron 表达式，可以反解析到 UI 上
      this.showCron = true
    },
    getList() {
      this.calendarTypeOptions.splice(0, calendarTypeOptions.length)
      this.handleGetUrl()
      this.listLoading = true
      getJobList(this.listQuery).then(response => {
        this.list = response.data.results
        this.total = response.data.count

        // Just to simulate the time of the request
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleRefreshGit() {
      this.listLoading = true
      gitInfo().then(response => {
        this.$notify({
          title: 'Success',
          message: '更新GIT地址成功',
          type: 'success',
          duration: 2000
        })
        // Just to simulate the time of the request
        this.listLoading = false
      })
    },
    handleGetUrl() {
      this.listQuery.page = 1
      getUrl().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          calendarTypeOptions.push(response.data[i].system)
        }
      })
    },
    handleGetJobArgs() {
      getProjectInfo({
        groups_name: 'qa_automation',
        project_name: this.temp.system
      }).then(response => {
        this.projectInfo = response.data
      })
      console.log(this.projectInfo)
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createJob(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: '任务创建成功!'
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateJob(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          })
        }
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        system: '',
        env: '',
        job_name: '',
        job_args: '',
        job_corn: '',
        author: this.name,
        warning: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(index, status, author) {
      if (status !== 0) {
        this.$message({
          type: 'warning',
          message: '运行中的任务不能删除!'
        })
      } else if (author !== this.name) {
        // console.log(state.name)
        this.$message({
          type: 'warning',
          message: '只能删除本人创建的任务!'
        })
      } else {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteJob(index).then(response => {
              // this.list.splice(index, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList()
              // Just to simulate the time of the request
              this.listLoading = false
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    }
  }
}
</script>
<style scoped>
.filter-container {
  margin-bottom: 30px;
}
.add-form .el-input,
.el-select {
  width: 70%;
}
</style>
<style>
.notice-drawer .el-drawer__header > *:focus {
  outline: none;
}
</style>
