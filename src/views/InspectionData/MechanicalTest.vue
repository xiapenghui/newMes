<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.supplierWorkNo') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.supplierWorkNo" :placeholder="$t('permission.supplierWorkNo')" clearable /></el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" placement="top-start"><label class="radio-label">创建时间:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-date-picker
              v-model="listQuery.importDate"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="false"
              :picker-options="pickerOptions"
              @change="importChange"
            />
          </el-col>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="danger" icon="el-icon-delete" @click="deleteAll">{{ $t('permission.deleteAll') }}</el-button>
      <el-button type="primary" icon="el-icon-download" @click="okImprot">导入文件</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :header-cell-style="{ background: '#008284',color:'#ffffff' }"
      :data="tableData"
      :height="tableHeight"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55" fixed />

      <el-table-column align="center" label="创建时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.upload')" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isUpload === 0" class="classBlack">未上传</el-tag>
          <el-tag v-else-if="scope.row.isUpload === 2" class="classGreen">已上传</el-tag>
          <el-tag v-else class="classRed">上传失败</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.SaleOrg')" width="100">
        <template slot-scope="scope">
          {{ scope.row.saleOrg }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.standardVersion')" width="120">
        <template slot-scope="scope">
          {{ scope.row.standardVersion }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierWorkNo')" width="120">
        <template slot-scope="scope">
          {{ scope.row.supplierWorkNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierCodeOther')" width="120">
        <template slot-scope="scope">
          {{ scope.row.supplierCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.modelCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.modelCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.categoryType')" width="120">
        <template slot-scope="scope">
          {{ scope.row.categoryType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.factoryCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.factoryCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierSupportId')" width="150">
        <template slot-scope="scope">
          {{ scope.row.supplierSupportId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productModelOther')" width="150">
        <template slot-scope="scope">
          {{ scope.row.productModel }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.equipmentName')" width="120">
        <template slot-scope="scope">
          {{ scope.row.equipmentName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.equipmentUniqueCode')" width="150">
        <template slot-scope="scope">
          {{ scope.row.equipmentUniqueCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.isAlarmData')" width="150">
        <template slot-scope="scope">
          {{ scope.row.isAlarmData }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.alarmItem')" width="120">
        <template slot-scope="scope">
          {{ scope.row.alarmItem }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.processTypeThree')" width="120">
        <template slot-scope="scope">
          {{ scope.row.processType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pdCodeOther')" width="120">
        <template slot-scope="scope">
          {{ scope.row.pdCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.checkTime')" width="150">
        <template slot-scope="scope">
          {{ scope.row.checkTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.putCenterTime')" width="150">
        <template slot-scope="scope">
          {{ scope.row.putCenterTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ContactNumOther')" width="150">
        <template slot-scope="scope">
          {{ scope.row.contactNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.MaterialSNs')" width="150">
        <template slot-scope="scope">
          {{ scope.row.mterialSN }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakTimeMax')" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakTimeMax }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakTimeMin')" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakTimeMin }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakTimeA')" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakTimeA }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakTimeB')" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakTimeB }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakTimeC')" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakTimeC }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeTimeMax')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeTimeMax }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeTimeMin')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeTimeMin }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeTimeA')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeTimeA }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeTimeB')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeTimeB }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeTimeC')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeTimeC }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeNotSameTimeUn')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeNotSameTimeUn }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeNotSameTime')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeNotSameTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakNotSameTimeUn')" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakNotSameTimeUn }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakNotSameTime')" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakNotSameTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeBounceTimeUn')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeBounceTimeUn }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeBounceTime')" width="200">
        <template slot-scope="scope">
          {{ scope.row.closeBounceTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.imageFileUrlJixie')" width="200">
        <template slot-scope="scope">
          {{ scope.row.imageFileUrl }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button type="warning" size="small" @click="clickLogs(scope.row)">日志</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹窗 -->
    <el-dialog
      title="编辑信息"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="130px" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">
            <el-form-item label="工厂名称" prop="saleOrg"><el-input v-model="ruleForm.saleOrg" :disabled="true" /></el-form-item>
            <el-form-item label="供应商工单编号" prop="supplierWorkNo"><el-input v-model="ruleForm.supplierWorkNo" /></el-form-item>
            <el-form-item label="规格型号编码" prop="modelCode"><el-input v-model="ruleForm.modelCode" /></el-form-item>
            <el-form-item label="厂区编号"><el-input v-model="ruleForm.factoryCode" /></el-form-item>
            <el-tooltip class="item" effect="dark" content="供应商产品厂内编号" placement="top-start">
              <el-form-item label="供应商产品厂内编号" prop="productModel"><el-input v-model="ruleForm.productModel" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="生产设备唯一识别号" placement="top-start">
              <el-form-item label="生产设备唯一识别号" prop="equipmentUniqueCode"><el-input v-model="ruleForm.equipmentUniqueCode" /></el-form-item>
            </el-tooltip>
            <el-form-item label="是告警问题数据"><el-input v-model="ruleForm.isAlarmData" /></el-form-item>
            <el-form-item label="感知过程" prop="processType"><el-input v-model="ruleForm.processType" /></el-form-item>
            <el-form-item label="采集时间" prop="checkTime">
              <el-date-picker v-model="ruleForm.checkTime" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间" />
            </el-form-item>
            <el-tooltip class="item" effect="dark" content="断路器出厂编号(常州)" placement="top-start">
              <el-form-item label="断路器出厂编号(常州)" prop="contactNum"><el-input v-model="ruleForm.contactNum" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="额定分闸时间上限值" placement="top-start">
              <el-form-item label="额定分闸时间上限值" prop="breakTimeMax"><el-input v-model="ruleForm.breakTimeMax" /></el-form-item>
            </el-tooltip>
            <el-form-item label="A相分闸时间" prop="breakTimeA"><el-input v-model="ruleForm.breakTimeA" /></el-form-item>
            <el-form-item label="C相分闸时间" prop="breakTimeC"><el-input v-model="ruleForm.breakTimeC" /></el-form-item>
            <el-tooltip class="item" effect="dark" content="额定合闸时间下限" placement="top-start">
              <el-form-item label="额定合闸时间下限" prop="closeTimeMin"><el-input v-model="ruleForm.closeTimeMin" /></el-form-item>
            </el-tooltip>
            <el-form-item label="B相合闸时间" prop="closeTimeB"><el-input v-model="ruleForm.closeTimeB" /></el-form-item>
            <el-tooltip class="item" effect="dark" content="合闸不同期额定值(ms)" placement="top-start">
              <el-form-item label="合闸不同期额定值(ms)" prop="closeNotSameTimeUn"><el-input v-model="ruleForm.closeNotSameTimeUn" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分闸不同期额定值(ms)" placement="top-start">
              <el-form-item label="分闸不同期额定值(ms)" prop="breakNotSameTimeUn"><el-input v-model="ruleForm.breakNotSameTimeUn" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="合闸弹跳（真空断路器）额定值(ms)" placement="top-start">
              <el-form-item label="合闸弹跳（真空断路器）额定值(ms)" prop="closeBounceTimeUn"><el-input v-model="ruleForm.closeBounceTimeUn" /></el-form-item>
            </el-tooltip>
          </div>
          <div class="boxRight">
            <el-form-item label="采集规范版本号" prop="standardVersion"><el-input v-model="ruleForm.standardVersion" /></el-form-item>
            <el-tooltip class="item" effect="dark" content="国网侧供应商编码" placement="top-start">
              <el-form-item label="国网侧供应商编码" prop="supplierCode"><el-input v-model="ruleForm.supplierCode" /></el-form-item>
            </el-tooltip>
            <el-form-item label="物资品类类型" prop="categoryType"><el-input v-model="ruleForm.categoryType" /></el-form-item>
            <el-form-item label="供应商产品编号"><el-input v-model="ruleForm.supplierSupportId" /></el-form-item>
            <el-form-item label="生产设备名称" prop="equipmentName"><el-input v-model="ruleForm.equipmentName" /></el-form-item>
            <el-form-item label="告警项"><el-input v-model="ruleForm.alarmItem" /></el-form-item>
            <el-form-item label="工序" prop="pdCode"><el-input v-model="ruleForm.pdCode" /></el-form-item>
            <el-form-item label="入数采中心时间" prop="putCenterTime">
              <el-date-picker v-model="ruleForm.putCenterTime" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间" />
            </el-form-item>
            <el-form-item label="成品序列号" prop="materialSN"><el-input v-model="ruleForm.materialSN" /></el-form-item>
            <el-tooltip class="item" effect="dark" content="额定分闸时间下限值" placement="top-start">
              <el-form-item label="额定分闸时间下限值" prop="breakTimeMin"><el-input v-model="ruleForm.breakTimeMin" /></el-form-item>
            </el-tooltip>
            <el-form-item label="B相分闸时间" prop="breakTimeB"><el-input v-model="ruleForm.breakTimeB" /></el-form-item>
            <el-tooltip class="item" effect="dark" content="额定合闸时间上限值" placement="top-start">
              <el-form-item label="额定合闸时间上限值" prop="closeTimeMax"><el-input v-model="ruleForm.closeTimeMax" /></el-form-item>
            </el-tooltip>
            <el-form-item label="A相合闸时间" prop="closeTimeA"><el-input v-model="ruleForm.closeTimeA" /></el-form-item>
            <el-form-item label="C相合闸时间" prop="closeTimeC"><el-input v-model="ruleForm.closeTimeC" /></el-form-item>
            <el-form-item label="合闸不同期" prop="closeNotSameTime"><el-input v-model="ruleForm.closeNotSameTime" /></el-form-item>
            <el-form-item label="分闸不同期(ms)" prop="breakNotSameTime"><el-input v-model="ruleForm.breakNotSameTime" /></el-form-item>
            <el-tooltip class="item" effect="dark" content="合闸弹跳（真空断路器）(ms)" placement="top-start">
              <el-form-item label="合闸弹跳（真空断路器）(ms)" prop="closeBounceTime"><el-input v-model="ruleForm.closeBounceTime" /></el-form-item>
            </el-tooltip>
            <el-form-item label="机械特性附件">
              <el-upload
                :class="{disUoloadSty: noneBtnImg }"
                :action="this.GLOBAL.BASE_URL+'/api/image/upload'"
                :data="this.oneDataImg"
                :headers="this.myHeaders"
                :limit="this.limitCountImg"
                list-type="picture-card"
                :file-list="editFileList"
                :on-remove="onRemoveImg"
                :on-success="onsucessImg"
                :on-change="imgChange"
                :on-preview="handlePictureCardPreview"
              >
                <i slot="default" class="el-icon-plus" />
              </el-upload>
              <el-dialog :visible.sync="dialogVisibleImg"><img width="100%" :src="dialogImageUrl" alt=""></el-dialog>
            </el-form-item>
          </div>
        </div>
        <!-- <div class="bigDownBox"></div> -->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </div>
    </el-dialog>

    <!-- 上传文件弹窗 -->
    <!-- <el-dialog
      title="导入文件"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-upload
        ref="upload"
        class="upload-demo"
        :action="this.GLOBAL.BASE_URL + '/api/kvsc/mct/import/file'"
        :headers="this.myHeaders"
        :limit="1"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :auto-upload="true"
      >
        <el-button size="small" type="primary">{{ $t('table.clickUp') }}</el-button>
        <div slot="tip" class="el-upload__tip">
          {{ $t('table.onlyUpload') }}
          <b>{{ $t('table.xls') }}</b>
          {{ $t('table.or') }}
          <b>{{ $t('table.xlsx') }}</b>
          {{ $t('table.fileSize') }}
        </div>
      </el-upload>
    </el-dialog> -->
    <ImprotFile
      :dialog-visible="dialogVisible"
      :improt-loading="improtLoading"
      :production-url="productionUrl"
      @handleavatarsuccess="handleAvatarSuccess"
      @beforeavatarupload="beforeAvatarUpload"
      @fileClose="fileClose"
    />

    <!-- //批量上传图片弹窗 -->
    <el-dialog
      title="批量上传图片"
      :visible.sync="dialogVisibleAllImg"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="demo-image__error">
        <div v-for="(item, index) in imgList" :key="index" class="blockImg">
          <el-image style="width:80px; height: 80px" :src="item.imagePath === null ? '' : item.imagePath">
            <div slot="error" class="image-slot"><i class="el-icon-picture-outline" /></div>
          </el-image>
          <span class="demonstration">{{ item.imageName }}</span>
        </div>
      </div>

      <div class="uploadImg">
        <el-upload
          ref="uploadImage"
          style="margin-top: 30px"
          class="upload-demo"
          :action="this.GLOBAL.BASE_URL+'api/image/upload'"
          :data="this.newDataImg"
          :headers="this.myHeaders"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="onSuccessImage"
          :before-upload="beforeUploadImage"
          :on-change="onChange"
          multiple
          :limit="20"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">选择图片</el-button>
        </el-upload>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAllImg = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleAllImg = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 日志弹出框 -->
    <el-dialog title="日志信息" :visible.sync="dialogTableVisible">
      <el-table border style="width: 100%" height="50vh" :data="gridData">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="工厂:">
                <span>{{ props.row.requestBody.saleOrg }}</span>
              </el-form-item>
              <el-form-item label="采集规范版本号:">
                <span>{{ props.row.requestBody.standardVersion }}</span>
              </el-form-item>
              <el-form-item label="供应商工单编号:">
                <span>{{ props.row.requestBody.supplierWorkNo }}</span>
              </el-form-item>
              <el-form-item label="国网侧供应商编码:">
                <span>{{ props.row.requestBody.supplierCode }}</span>
              </el-form-item>
              <el-form-item label="规格型号编码:">
                <span>{{ props.row.requestBody.modelCode }}</span>
              </el-form-item>
              <el-form-item label="物资品类类型:">
                <span>{{ props.row.requestBody.categoryType }}</span>
              </el-form-item>
              <el-form-item label="厂区编号:">
                <span>{{ props.row.requestBody.factoryCode }}</span>
              </el-form-item>
              <el-form-item label="供应商产品编号:">
                <span>{{ props.row.requestBody.supplierSupportId }}</span>
              </el-form-item>
              <el-form-item label="供应商产品厂内编号:">
                <span>{{ props.row.requestBody.productModel }}</span>
              </el-form-item>
              <el-form-item label="生产设备名称:">
                <span>{{ props.row.requestBody.equipmentName }}</span>
              </el-form-item>
              <el-form-item label="生产设备唯一识别号:">
                <span>{{ props.row.requestBody.equipmentUniqueCode }}</span>
              </el-form-item>
              <el-form-item label="是否是告警问题数据:">
                <span>{{ props.row.requestBody.isAlarmData }}</span>
              </el-form-item>
              <el-form-item label="告警项:">
                <span>{{ props.row.requestBody.alarmItem }}</span>
              </el-form-item>
              <el-form-item label="感知过程:">
                <span>{{ props.row.requestBody.processType }}</span>
              </el-form-item>
              <el-form-item label="工序:">
                <span>{{ props.row.requestBody.pdCode }}</span>
              </el-form-item>
              <el-form-item label="采集时间:">
                <span>{{ props.row.requestBody.checkTime }}</span>
              </el-form-item>
              <el-form-item label="入数采中心时间:">
                <span>{{ props.row.requestBody.putCenterTime }}</span>
              </el-form-item>
              <el-form-item label="断路器出厂编号(常州/nature):">
                <span>{{ props.row.requestBody.contactNum }}</span>
              </el-form-item>
              <el-form-item label="成品序列号(PDSE):">
                <span>{{ props.row.requestBody.materialSN }}</span>
              </el-form-item>
              <el-form-item label="额定分闸时间上限值(ms):">
                <span>{{ props.row.requestBody.breakTimeMax }}</span>
              </el-form-item>
              <el-form-item label="额定分闸时间下限值(ms):">
                <span>{{ props.row.requestBody.breakTimeMin }}</span>
              </el-form-item>
              <el-form-item label="A相分闸时间(ms):">
                <span>{{ props.row.requestBody.breakTimeA }}</span>
              </el-form-item>
              <el-form-item label="B相分闸时间(ms):">
                <span>{{ props.row.requestBody.breakTimeB }}</span>
              </el-form-item>
              <el-form-item label="C相分闸时间(ms):">
                <span>{{ props.row.requestBody.breakTimeC }}</span>
              </el-form-item>
              <el-form-item label="额定合闸时间上限值(ms):">
                <span>{{ props.row.requestBody.closeTimeMax }}</span>
              </el-form-item>
              <el-form-item label="额定合闸时间下限值(ms):">
                <span>{{ props.row.requestBody.closeTimeMin }}</span>
              </el-form-item>
              <el-form-item label="A相合闸时间(ms):">
                <span>{{ props.row.requestBody.closeTimeA }}</span>
              </el-form-item>
              <el-form-item label="B相合闸时间(ms):">
                <span>{{ props.row.requestBody.closeTimeB }}</span>
              </el-form-item>
              <el-form-item label="C相合闸时间(ms):">
                <span>{{ props.row.requestBody.closeTimeC }}</span>
              </el-form-item>
              <el-form-item label="合闸不同期额定值(ms):">
                <span>{{ props.row.requestBody.closeNotSameTimeUn }}</span>
              </el-form-item>
              <el-form-item label="合闸不同期(ms):">
                <span>{{ props.row.requestBody.closeNotSameTime }}</span>
              </el-form-item>
              <el-form-item label="分闸不同期额定值(ms):">
                <span>{{ props.row.requestBody.breakNotSameTime }}</span>
              </el-form-item>
              <el-form-item label="分闸不同期(ms):">
                <span>{{ props.row.requestBody.texture }}</span>
              </el-form-item>
              <el-form-item label="合闸弹跳（真空断路器）额定值(ms):">
                <span>{{ props.row.requestBody.closeBounceTimeUn }}</span>
              </el-form-item>
              <el-form-item label="合闸弹跳（真空断路器）(ms):">
                <span>{{ props.row.requestBody.closeBounceTime }}</span>
              </el-form-item>
              <el-form-item label="机械特性试验报告:">
                <span>{{ props.row.requestBody.imageFileUrl }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" width="150px" />
        <el-table-column label="状态" align="center" prop="levelString" width="100px">
          <template slot-scope="scope">
            <el-tag :type="scope.row.levelString" :class="[scope.row.levelString === 'ERROR' ? 'classRed' : 'classGreen']">
              {{ scope.row.levelString === 'ERROR' ? '错误' : '成功' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column property="modelName" label="模块名称" align="center" width="150px" />
        <el-table-column label="消息日志" align="center" prop="message" />
      </el-table>
      <pagination v-show="logTotal > 0" :total="logTotal" :current.sync="paginationLog.current" :size.sync="paginationLog.size" @pagination="getLogList" />
    </el-dialog>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.current" :size.sync="pagination.size" @pagination="getList" />
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import i18n from '@/lang'
import { mctList, mctDellte, mctEdit, allLogs } from '@/api/business'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination4
import ImprotFile from '@/components/ImprotFile' // 文件上传文件封装
import { getToken } from '@/utils/auth' // get token from cookie
const hasToken = getToken()
const fixHeight = 270
export default {
  name: 'MechanicalTest',
  components: { Pagination, ImprotFile },
  data() {
    return {
      productionUrl: this.GLOBAL.BASE_URL + '/api/kvsc/mct/import/file',
      myHeaders: { Authorization: hasToken }, // 获取token
      // 日志分页
      paginationLog: {
        current: 1,
        size: 20
      },
      logTotal: 0,
      logId: {}, // 日志行数据
      tableData: [],
      gridData: [], // 日志信息
      ruleForm: {}, // 编辑弹窗
      pagination: {
        current: 1,
        size: 50,
        startTime: '',
        endTime: ''
      },
      listQuery: {
        supplierWorkNo: undefined,
        importDate: []
      },
      listLoading: true,
      editLoading: false, // 编辑loading
      improtLoading: false, // 导入文件进度loading
      total: 10,
      selectedData: [], // 批量删除新数组
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogTableVisible: false, // 日志弹出框
      dialogVisible: false, // 文件上传弹出框
      dialogFormVisible: false, // 编辑弹出框
      dialogImageUrl: '', // 编辑上传单张图片
      dialogVisibleImg: false, // 上传图片模态框
      dialogVisibleAllImg: false, // 批量上传图片
      disabled: false,
      imgList: [], // 批量上传图片数组
      fileList: [],
      newDataImg: { id: '', imagePath: '', modelName: '机械特性试验' }, // 多个图片上传
      oneDataImg: { id: '', imagePath: '', modelName: '机械特性试验' }, // 单个图片上传或替换之前的图片
      editRow: {},
      editFileList: [],
      noneBtnImg: false, // 隐藏上传按钮
      limitCountImg: 1, // 上传图片的最大数量
      content1: this.$t('permission.supplierWorkNo'),
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近六个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
            picker.$emit('pick', [start, end])
          }
        }
        ]
      },
      rules: {
        saleOrg: [{ required: true, message: '请输入工厂', trigger: 'blur' }],
        standardVersion: [{ required: true, message: '请输入采集规范版本号', trigger: 'blur' }],
        supplierWorkNo: [{ required: true, message: '请输入供应商工单编号', trigger: 'blur' }],
        supplierCode: [{ required: true, message: '请输入国网侧供应商编码', trigger: 'blur' }],
        modelCode: [{ required: true, message: '请输入规格型号编码', trigger: 'blur' }],
        categoryType: [{ required: true, message: '请输入物资品类类型', trigger: 'blur' }],
        productModel: [{ required: true, message: '请输入供应商产品厂内编号', trigger: 'blur' }],
        equipmentName: [{ required: true, message: '请输入生产设备名称', trigger: 'blur' }],
        equipmentUniqueCode: [{ required: true, message: '请输入生产设备唯一识别号', trigger: 'blur' }],
        processType: [{ required: true, message: '请输入感知过程', trigger: 'blur' }],
        pdCode: [{ required: true, message: '请输入工序', trigger: 'blur' }],
        checkTime: [{ required: true, message: '请输入采集时间', trigger: 'blur' }],
        putCenterTime: [{ required: true, message: '请输入入数采中心时间', trigger: 'blur' }],
        contactNum: [{ required: true, message: '请输入断路器出厂编号', trigger: 'blur' }],
        materialSN: [{ required: true, message: '请输入成品序列号', trigger: 'blur' }],
        breakTimeMax: [{ required: true, message: '请输入额定分闸时间上限值', trigger: 'blur' }],
        breakTimeMin: [{ required: true, message: '请输入额定分闸时间下限值', trigger: 'blur' }],
        breakTimeA: [{ required: true, message: '请输入A相分闸时间', trigger: 'blur' }],
        breakTimeB: [{ required: true, message: '请输入B相分闸时间', trigger: 'blur' }],
        breakTimeC: [{ required: true, message: '请输入C相分闸时间', trigger: 'blur' }],
        closeTimeMax: [{ required: true, message: '请输入额定合闸时间上限值', trigger: 'blur' }],
        closeTimeMin: [{ required: true, message: '请输入额定合闸时间下限值', trigger: 'blur' }],
        closeTimeA: [{ required: true, message: '请输入A相合闸时间', trigger: 'blur' }],
        closeTimeB: [{ required: true, message: '请输入B相合闸时间', trigger: 'blur' }],
        closeTimeC: [{ required: true, message: '请输入C相合闸时间', trigger: 'blur' }],
        closeNotSameTimeUn: [{ required: true, message: '请输入合闸不同期额定值', trigger: 'blur' }],
        closeNotSameTime: [{ required: true, message: '请输入合闸不同期', trigger: 'blur' }],
        breakNotSameTimeUn: [{ required: true, message: '请输入分闸不同期额定值', trigger: 'blur' }],
        breakNotSameTime: [{ required: true, message: '请输入分闸不同期', trigger: 'blur' }],
        closeBounceTimeUn: [{ required: true, message: '请输入合闸弹跳（真空断路器）额定值', trigger: 'blur' }],
        closeBounceTime: [{ required: true, message: '请输入合闸弹跳（真空断路器）', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {
    // 监听表格高度
    tableHeight(val) {
      if (!this.timer) {
        this.tableHeight = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    },
    'listQuery.importDate': {
      handler(val) {
        this.pagination.startTime = val[0] + ' 00:00:00'
        this.pagination.endTime = val[1] + ' 23:59:59'
      },
      deep: true
    },
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.content1 = this.$t('permission.supplierWorkNo')
    }
  },
  created() {
    // 搜索框初始化开始结束时间
    this.listQuery.importDate[0] = this.$moment(new Date())
      .subtract(1, 'months')
      .format('YYYY-MM-DD 00:00:00')
    this.listQuery.importDate[1] = this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')
    this.pagination.startTime = this.listQuery.importDate[0]
    this.pagination.endTime = this.listQuery.importDate[1]
    // 监听表格高度
    const that = this
    window.onresize = () => {
      return (() => {
        that.tableHeight = window.innerHeight - fixHeight
      })()
    }
    this.getList()
  },
  methods: {
    // 改变搜索框开始结束时间触发
    importChange(val) {
      this.listQuery.importDate[0] = val[0]
      this.listQuery.importDate[1] = val[1]
    },
    // 查询
    handleSearch() {
      this.pagination.current = 1
      if (this.listQuery.supplierWorkNo === '') {
        this.listQuery.supplierWorkNo = undefined
      }
      this.getList()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        supplierWorkNo: undefined,
        importDate: [
          this.$moment(new Date())
            .subtract(1, 'months')
            .format('YYYY-MM-DD'),
          this.$moment(new Date()).format('YYYY-MM-DD')
        ]
      }
      this.pagination = {
        current: 1,
        size: 50
      }
      this.getList()
    },

    // 多选
    handleSelectionChange(val) {
      this.selectedData = val
    },
    // 点击日志
    clickLogs(row) {
      this.logId = row
      allLogs(this.paginationLog, { dataId: row.id }).then(res => {
        if (res.data.records.length > 0) {
          this.dialogTableVisible = true
          res.data.records.map(item => {
            item.requestBody = JSON.parse(item.requestBody)
          })
          this.gridData = res.data.records
          this.logTotal = res.data.total
        } else {
          this.dialogTableVisible = false
          this.$message('此条数据暂无操作日志！')
        }
      })
    },

    // 日志分页
    getLogList(val) {
      this.paginationLog = val
      this.clickLogs(this.logId)
    },

    // 批量删除
    deleteAll() {
      if (this.selectedData.length > 0) {
        this.$confirm(this.$t('table.deleteInfo'), this.$t('table.Tips') + this.$t('table.total') + this.selectedData.length + this.$t('table.dataInfo'), {
          confirmButtonText: this.$t('table.confirm'),
          cancelButtonText: this.$t('table.cancel'),
          type: 'warning'
        })
          .then(() => {
            const idList = []
            this.selectedData.map(item => {
              const newFeatid = item.id
              idList.push(newFeatid)
            })
            mctDellte(idList).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.deleteSuccess')
                })
                this.getList()
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: this.$t('table.deleteError')
            })
          })
      }
    },
    // 获取列表
    getList() {
      this.listLoading = true
      mctList(this.pagination, this.listQuery).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
        this.listLoading = false
      })
    },
    i18n(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`)
        if (route.children) {
          route.children = this.i18n(route.children)
        }
        return route
      })
      return app
    },
    // 编辑
    handleEdit(index, row) {
      this.editFileList = []
      this.oneDataImg.id = row.id
      this.editRow = row
      if (row.imagePath !== null) {
        this.editFileList.push({
          name: row.imageFileUrl,
          url: this.GLOBAL.BASE_URL + '/api/image/' + row.imagePath
          // url: 'http://192.168.1.192:8888/api/image/' + row.imagePath
        })
      }
      this.noneBtnImg = this.editFileList.length >= this.limitCountImg
      this.ruleForm = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          mctEdit(this.ruleForm).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: this.$t('table.editSuc')
              })
              this.editLoading = false
              this.dialogFormVisible = false
              this.getList()
            }
          })
        } else {
          this.editLoading = false
          this.$message({
            type: 'error',
            message: '必填项不能为空'
          })
          return false
        }
      })
    },
    // 文件导入
    okImprot() {
      this.dialogVisible = true
    },
    // 关闭导入文件弹窗
    fileClose() {
      this.dialogVisible = false
    },
    // 成功
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        if (res.data.length > 0) {
          this.$message.success(this.$t('table.upSuccess'))
          this.dialogVisible = false
          this.dialogVisibleAllImg = true
          this.improtLoading = false
          this.imgList = res.data
          this.getList()
        } else {
          this.dialogVisible = false
          this.dialogVisibleAllImg = false
          this.improtLoading = false
          this.getList()
        }
      } else {
        this.$message({
          message: res.message,
          type: 'error',
          duration: 5000
        })
        this.dialogVisible = false
        this.improtLoading = false
      }
    },
    // 失败
    // handleAvatarError(res, file) {
    //   if (res.code === 500 && res.type === 'error') {
    //     this.$message.error(this.$t('table.upError'))
    //   }
    // },
    beforeAvatarUpload(file) {
      const isXLS = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const isLt50M = file.size / 1024 / 1024 < 50

      if (!isXLS) {
        this.$message.error(this.$t('table.errorOne'))
      }
      if (!isLt50M) {
        this.$message.error(this.$t('table.errorTwo'))
      }
      this.improtLoading = true
      return isXLS && isLt50M
    },
    // 上传
    onChange(file, fileList) {
      // console.log('file', file)
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePreview(file) {
      // console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 20 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      if (file && file.status === 'success') {
        // 成功时候的方法
        return this.$confirm(`确定移除 ${file.name}？`)
      }
    },
    beforeUploadImage(file) {
      // console.log('file', file)
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const self = this
      var isOK = this.imgList.some(function(item) {
        if (item.imageName === file.name) {
          self.newDataImg.id = item.id
        }
        return item.imageName === file.name
      })
      if (!isJPG && !isPNG) {
        this.$message.error(` ${file.name}格式错误！`)
      }

      return isJPG && isOK
    },
    onSuccessImage(res, file, fileList) {
      // console.log('res', res)
      // console.log('file', file)
      // console.log('fileList', fileList)
      this.imgList.map(item => {
        if (item.imageName === file.name) {
          item.imagePath = this.GLOBAL.BASE_URL + res.data
          // item.imagePath = 'http://192.168.1.192:8888' + res.data
        }
      })
      this.getList()
    },
    // 编辑替换移除图片
    onRemoveImg(file, fileList) {
      this.noneBtnImg = fileList.length >= this.limitCountImg
    },
    // 超过1张图片隐藏上传按钮，小于1张图片上传按钮显示
    imgChange(file, fileList) {
      console.log('fileList', fileList)
      this.noneBtnImg = fileList.length >= this.limitCountImg
    },
    // 编辑图片上传成功
    onsucessImg(response, file, fileList) {
      console.log('response', response)
      console.log('file', file)
      console.log('fileList', fileList)
      this.editRow.imageFileUrl = file.name
      this.getList()
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisibleImg = true
    }

  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.disUoloadSty ::v-deep .el-upload--picture-card {
  display: none !important;
}
</style>
