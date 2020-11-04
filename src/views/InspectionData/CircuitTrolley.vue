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
            <el-tooltip class="item" effect="dark" content="创建时间" placement="top-start"><label class="radio-label">创建时间:</label></el-tooltip>
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

      <el-table-column align="center" :label="$t('permission.isAlarmData')" width="130">
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

      <el-table-column align="center" :label="$t('permission.pdCode')" width="150">
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

      <el-table-column align="center" :label="$t('permission.ContactNumDLQ')" width="150">
        <template slot-scope="scope">
          {{ scope.row.contactNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.MaterialSNs')" width="120">
        <template slot-scope="scope">
          {{ scope.row.materialSN }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pressureValueUn')" width="130">
        <template slot-scope="scope">
          {{ scope.row.pressureValueUn }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pressureValue')" width="120">
        <template slot-scope="scope">
          {{ scope.row.pressureValue }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.vacuumVoltageUn')" width="170">
        <template slot-scope="scope">
          {{ scope.row.vacuumVoltageUn }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.vacuumVoltage')" width="150">
        <template slot-scope="scope">
          {{ scope.row.vacuumVoltage }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.phaseVoltageUn')" width="150">
        <template slot-scope="scope">
          {{ scope.row.phaseVoltageUn }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.phaseVoltage')" width="120">
        <template slot-scope="scope">
          {{ scope.row.phaseVoltage }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pressureTimeUn')" width="150">
        <template slot-scope="scope">
          {{ scope.row.pressureTimeUn }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pressureTime')" width="130">
        <template slot-scope="scope">
          {{ scope.row.pressureTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ratedCurrent')" width="120">
        <template slot-scope="scope">
          {{ scope.row.ratedCurrent }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.loopResistanceUn')" width="100">
        <template slot-scope="scope">
          {{ scope.row.loopResistanceUn }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.loopResistanceA')" width="120">
        <template slot-scope="scope">
          {{ scope.row.loopResistanceA }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.loopResistanceB')" width="120">
        <template slot-scope="scope">
          {{ scope.row.loopResistanceB }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.loopResistanceC')" width="120">
        <template slot-scope="scope">
          {{ scope.row.loopResistanceC }}
        </template>
      </el-table-column>

      <el-table-column align="center" :render-header="perReliableOper" width="120">
        <template slot-scope="scope">
          {{ scope.row.perReliableOper }}
        </template>
      </el-table-column>

      <el-table-column align="center" :render-header="reliableStorageOper" width="120">
        <template slot-scope="scope">
          {{ scope.row.reliableStorageOper }}
        </template>
      </el-table-column>

      <el-table-column align="center" :render-header="nomVolReliableOper" width="150">
        <template slot-scope="scope">
          {{ scope.row.nomVolReliableOper }}
        </template>
      </el-table-column>

      <el-table-column align="center" :render-header="nomACReliableSwitch" width="150">
        <template slot-scope="scope">
          {{ scope.row.nomACReliableSwitch }}
        </template>
      </el-table-column>

      <el-table-column align="center" :render-header="nomDCReliableSwitch" width="150">
        <template slot-scope="scope">
          {{ scope.row.nomDCReliableSwitch }}
        </template>
      </el-table-column>

      <el-table-column align="center" :render-header="breakReliableNoOper" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakReliableNoOper }}
        </template>
      </el-table-column>

      <el-table-column align="center" :render-header="breakNomVolReliableOper" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakNomVolReliableOper }}
        </template>
      </el-table-column>

      <el-table-column align="center" :render-header="breakVolReliableOper" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakVolReliableOper }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakTimeMax')" width="130">
        <template slot-scope="scope">
          {{ scope.row.breakTimeMax }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakTimeMin')" width="130">
        <template slot-scope="scope">
          {{ scope.row.breakTimeMin }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakTimeA')" width="120">
        <template slot-scope="scope">
          {{ scope.row.breakTimeA }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakTimeB')" width="120">
        <template slot-scope="scope">
          {{ scope.row.breakTimeB }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakTimeC')" width="120">
        <template slot-scope="scope">
          {{ scope.row.breakTimeC }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeTimeMax')" width="130">
        <template slot-scope="scope">
          {{ scope.row.closeTimeMax }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeTimeMin')" width="120">
        <template slot-scope="scope">
          {{ scope.row.closeTimeMin }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeTimeA')" width="120">
        <template slot-scope="scope">
          {{ scope.row.closeTimeA }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeTimeB')" width="120">
        <template slot-scope="scope">
          {{ scope.row.closeTimeB }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeTimeC')" width="120">
        <template slot-scope="scope">
          {{ scope.row.closeTimeC }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeNotSameTimeUn')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeNotSameTimeUn }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeNotSameTime')" width="120">
        <template slot-scope="scope">
          {{ scope.row.closeNotSameTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakNotSameTimeUn')" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakNotSameTimeUn }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakNotSameTime')" width="120">
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

      <el-table-column align="center" :label="$t('permission.breakOffAmplitudeUn')" width="180">
        <template slot-scope="scope">
          {{ scope.row.breakOffAmplitudeUn }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakOffAmplitude')" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakOffAmplitude }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.inspectionReportFile')" width="200">
        <template slot-scope="scope">
          {{ scope.row.inspectionReportFile }}
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
    <el-dialog title="编辑信息" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="130px" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">
            <el-form-item label="工厂名称" prop="saleOrg"><el-input v-model="ruleForm.saleOrg" :disabled="true" /></el-form-item>
            <el-form-item label="供应商工单编号" prop="supplierWorkNo"><el-input v-model="ruleForm.supplierWorkNo" /></el-form-item>
            <el-form-item label="规格型号编码" prop="modelCode"><el-input v-model="ruleForm.modelCode" /></el-form-item>
            <el-tooltip class="item" effect="dark" content="是否是告警问题数据" placement="top-start">
              <el-form-item label="是否是告警问题数据"><el-input v-model="ruleForm.isAlarmData" /></el-form-item>
            </el-tooltip>
            <el-form-item label="感知过程" prop="processType"><el-input v-model="ruleForm.processType" /></el-form-item>
            <el-form-item label="采集时间" prop="checkTime">
              <el-date-picker v-model="ruleForm.checkTime" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间" />
            </el-form-item>
            <el-tooltip class="item" effect="dark" content="断路器出厂编号(常州/nature)" placement="top-start">
              <el-form-item label="断路器出厂编号(常州/nature)" prop="contactNum"><el-input v-model="ruleForm.contactNum" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="相对地耐压额定值(kV)" placement="top-start">
              <el-form-item label="相对地耐压额定值(kV)" prop="pressureValueUn"><el-input v-model="ruleForm.pressureValueUn" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="真空断口耐压额定值(kV)" placement="top-start">
              <el-form-item label="真空断口耐压额定值(kV)" prop="vacuumVoltageUn"><el-input v-model="ruleForm.vacuumVoltageUn" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="相间耐压额定值(kV)" placement="top-start">
              <el-form-item label="相间耐压额定值(kV)" prop="phaseVoltageUn"><el-input v-model="ruleForm.phaseVoltageUn" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="耐压持续额定时间(s)" placement="top-start">
              <el-form-item label="耐压持续额定时间(s)" prop="pressureTimeUn"><el-input v-model="ruleForm.pressureTimeUn" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="额定电流(A)" placement="top-start">
              <el-form-item label="额定电流(A)" prop="ratedCurrent"><el-input v-model="ruleForm.ratedCurrent" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="A相回路电阻值(μΩ)" placement="top-start">
              <el-form-item label="A相回路电阻值(μΩ)" prop="loopResistanceA"><el-input v-model="ruleForm.loopResistanceA" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="C相回路电阻值(μΩ)" placement="top-start">
              <el-form-item label="C相回路电阻值(μΩ)" prop="loopResistanceC"><el-input v-model="ruleForm.loopResistanceC" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="储能电机85%和110%操作电压，储能可靠动作" placement="top-start">
              <el-form-item label="储能电机85%和110%操作电压，储能可靠动作" prop="eliableStorageOper"><el-input v-model="ruleForm.eliableStorageOper" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="85%~110%额定合闸电压（直流）范围，操作5次，可靠合闸" placement="top-start">
              <el-form-item label="85%~110%额定合闸电压（直流）范围，操作5次，可靠合闸" prop="nomACReliableSwitch">
                <el-input v-model="ruleForm.nomACReliableSwitch" />
              </el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分闸电源低于额定30%，操作5次可靠不动作" placement="top-start">
              <el-form-item label="分闸电源低于额定30%，操作5次可靠不动作" prop="breakReliableNoOper"><el-input v-model="ruleForm.breakReliableNoOper" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="额定操作电压下，分合操作5次，均可靠动作" placement="top-start">
              <el-form-item label="额定操作电压下，分合操作5次，均可靠动作" prop="breakNomVolReliableOper"><el-input v-model="ruleForm.breakNomVolReliableOper" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分闸时间额定上限值(ms)" placement="top-start">
              <el-form-item label="分闸时间额定上限值(ms)" prop="breakTimeMax"><el-input v-model="ruleForm.breakTimeMax" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="A相分闸时间(ms)" placement="top-start">
              <el-form-item label="A相分闸时间(ms)" prop="breakTimeA"><el-input v-model="ruleForm.breakTimeA" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="C相分闸时间(ms)" placement="top-start">
              <el-form-item label="C相分闸时间(ms)" prop="breakTimeC"><el-input v-model="ruleForm.breakTimeC" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="合闸时间额定下限值(ms)" placement="top-start">
              <el-form-item label="合闸时间额定下限值(ms)" prop="closeTimeMin"><el-input v-model="ruleForm.closeTimeMin" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="B相合闸时间(ms)" placement="top-start">
              <el-form-item label="B相合闸时间(ms)" prop="closeTimeB"><el-input v-model="ruleForm.closeTimeB" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="合闸不同期额定值(ms)" placement="top-start">
              <el-form-item label="合闸不同期额定值(ms)" prop="closeNotSameTimeUn"><el-input v-model="ruleForm.closeNotSameTimeUn" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分闸不同期额定值(ms)" placement="top-start">
              <el-form-item label="分闸不同期额定值(ms)" prop="breakNotSameTimeUn"><el-input v-model="ruleForm.breakNotSameTimeUn" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="合闸弹跳（真空断路器）额定值(ms)" placement="top-start">
              <el-form-item label="合闸弹跳（真空断路器）额定值(ms)" prop="closeBounceTimeUn"><el-input v-model="ruleForm.closeBounceTimeUn" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分闸反弹幅值额定值(mm)" placement="top-start">
              <el-form-item label="分闸反弹幅值额定值(mm)" prop="breakOffAmplitudeUn"><el-input v-model="ruleForm.breakOffAmplitudeUn" /></el-form-item>
            </el-tooltip>
          </div>
          <div class="boxRight">
            <el-form-item label="采集规范版本号" prop="standardVersion"><el-input v-model="ruleForm.standardVersion" /></el-form-item>
            <el-tooltip class="item" effect="dark" content="国网侧供应商编码" placement="top-start">
              <el-form-item label="国网侧供应商编码" prop="supplierCode"><el-input v-model="ruleForm.supplierCode" /></el-form-item>
            </el-tooltip>
            <el-form-item label="物资品类类型" prop="categoryType"><el-input v-model="ruleForm.categoryType" /></el-form-item>
            <el-form-item label="告警项"><el-input v-model="ruleForm.alarmItem" /></el-form-item>
            <el-form-item label="工序" prop="pdCode"><el-input v-model="ruleForm.pdCode" /></el-form-item>
            <el-form-item label="入数采中心时间" prop="putCenterTime">
              <el-date-picker v-model="ruleForm.putCenterTime" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间" />
            </el-form-item>
            <el-form-item label="成品序列号" prop="materialSN"><el-input v-model="ruleForm.materialSN" /></el-form-item>
            <el-tooltip class="item" effect="dark" content="相对地耐压值(kV)" placement="top-start">
              <el-form-item label="相对地耐压值(kV)" prop="pressureValue"><el-input v-model="ruleForm.pressureValue" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="真空断口耐压值(kV)" placement="top-start">
              <el-form-item label="真空断口耐压值(kV)" prop="vacuumVoltage"><el-input v-model="ruleForm.vacuumVoltage" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="相间耐压值(kV)" placement="top-start">
              <el-form-item label="相间耐压值(kV)" prop="phaseVoltage"><el-input v-model="ruleForm.phaseVoltage" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="耐压持续时间(s)" placement="top-start">
              <el-form-item label="耐压持续时间(s)" prop="pressureTime"><el-input v-model="ruleForm.pressureTime" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="额定回路电阻值(μΩ)" placement="top-start">
              <el-form-item label="额定回路电阻值(μΩ)" prop="loopResistanceUn"><el-input v-model="ruleForm.loopResistanceUn" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="B相回路电阻值(μΩ)" placement="top-start">
              <el-form-item label="B相回路电阻值(μΩ)" prop="loopResistanceB"><el-input v-model="ruleForm.loopResistanceB" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="人力分合操作5次，可靠动作" placement="top-start">
              <el-form-item label="人力分合操作5次，可靠动作" prop="perReliableOper"><el-input v-model="ruleForm.perReliableOper" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="等于或低于30% 额定合闸电压时，操作5次，可靠不动作" placement="top-start">
              <el-form-item label="等于或低于30% 额定合闸电压时，操作5次，可靠不动作" prop="nomVolReliableOper"><el-input v-model="ruleForm.nomVolReliableOper" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="65%~110%额定分闸电压（直流）范围，操作5次，可靠分闸" placement="top-start">
              <el-form-item label="65%~110%额定分闸电压（直流）范围，操作5次，可靠分闸" prop="nomDCReliableSwitch">
                <el-input v-model="ruleForm.nomDCReliableSwitch" />
              </el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分闸电源低于额定30%，操作5次可靠不动作" placement="top-start">
              <el-form-item label="分闸电源低于额定30%，操作5次可靠不动作" prop="breakReliableNoOper"><el-input v-model="ruleForm.breakReliableNoOper" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="额定操作电压“分-0.3-合分”，可靠动作" placement="top-start">
              <el-form-item label="额定操作电压“分-0.3-合分”，可靠动作" prop="breakVolReliableOper"><el-input v-model="ruleForm.breakVolReliableOper" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分闸时间额定下限值(ms)" placement="top-start">
              <el-form-item label="分闸时间额定下限值(ms)" prop="breakTimeMin"><el-input v-model="ruleForm.breakTimeMin" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="B相分闸时间(ms)" placement="top-start">
              <el-form-item label="B相分闸时间(ms)" prop="breakTimeB"><el-input v-model="ruleForm.breakTimeB" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="合闸时间额定上限值(ms)" placement="top-start">
              <el-form-item label="合闸时间额定上限值(ms)" prop="closeTimeMax"><el-input v-model="ruleForm.closeTimeMax" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="A相合闸时间(ms)" placement="top-start">
              <el-form-item label="A相合闸时间(ms)" prop="closeTimeA"><el-input v-model="ruleForm.closeTimeA" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="C相合闸时间(ms)" placement="top-start">
              <el-form-item label="C相合闸时间(ms)" prop="closeTimeC"><el-input v-model="ruleForm.closeTimeC" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="合闸不同期(ms)" placement="top-start">
              <el-form-item label="合闸不同期(ms)" prop="closeNotSameTime"><el-input v-model="ruleForm.closeNotSameTime" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分闸不同期(ms)" placement="top-start">
              <el-form-item label="分闸不同期(ms)" prop="breakNotSameTime"><el-input v-model="ruleForm.breakNotSameTime" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="合闸弹跳（真空断路器）(ms)" placement="top-start">
              <el-form-item label="合闸弹跳（真空断路器）(ms)" prop="closeBounceTime"><el-input v-model="ruleForm.closeBounceTime" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分闸反弹幅值(mm)" placement="top-start">
              <el-form-item label="分闸反弹幅值(mm)" prop="breakOffAmplitude"><el-input v-model="ruleForm.breakOffAmplitude" /></el-form-item>
            </el-tooltip>
          </div>
        </div>
        <div class="bigDownBox">
          <el-form-item label="断路器附件">
            <el-upload
              :class="{ disUoloadSty: noneBtnImg }"
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
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </div>
    </el-dialog>

    <!-- 上传文件弹窗 -->
    <!-- <el-dialog title="导入文件" :close-on-click-modal="false" :visible.sync="dialogVisible" width="30%">
      <el-upload
        ref="upload"
        class="upload-demo"
        :action="this.GLOBAL.BASE_URL + '/api/kvsc/dlqxc/import/file'"
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
    <el-dialog title="批量上传图片" :visible.sync="dialogVisibleAllImg" :close-on-click-modal="false" width="50%">
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
          :action="this.GLOBAL.BASE_URL+'/api/image/upload'"
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
              <el-form-item label="断路器出厂编号:">
                <span>{{ props.row.requestBody.contactNum }}</span>
              </el-form-item>
              <el-form-item label="成品序列号(PDSE):">
                <span>{{ props.row.requestBody.materialSN }}</span>
              </el-form-item>
              <el-form-item label="相对地耐压额定值(kV):">
                <span>{{ props.row.requestBody.pressureValueUn }}</span>
              </el-form-item>
              <el-form-item label="相对地耐压值(kV):">
                <span>{{ props.row.requestBody.pressureValue }}</span>
              </el-form-item>
              <el-form-item label="真空断口耐压额定值(kV):">
                <span>{{ props.row.requestBody.vacuumVoltageUn }}</span>
              </el-form-item>
              <el-form-item label="真空断口耐压值(kV):">
                <span>{{ props.row.requestBody.vacuumVoltage }}</span>
              </el-form-item>
              <el-form-item label="相间耐压额定值(kV):">
                <span>{{ props.row.requestBody.phaseVoltageUn }}</span>
              </el-form-item>
              <el-form-item label="相间耐压值(kV):">
                <span>{{ props.row.requestBody.phaseVoltage }}</span>
              </el-form-item>
              <el-form-item label="耐压持续额定时间(s):">
                <span>{{ props.row.requestBody.pressureTimeUn }}</span>
              </el-form-item>
              <el-form-item label="耐压持续时间(s):">
                <span>{{ props.row.requestBody.pressureTime }}</span>
              </el-form-item>
              <el-form-item label="额定电流(A):">
                <span>{{ props.row.requestBody.ratedCurrent }}</span>
              </el-form-item>
              <el-form-item label="额定回路电阻值(μΩ):">
                <span>{{ props.row.requestBody.loopResistanceUn }}</span>
              </el-form-item>
              <el-form-item label="A相回路电阻值(μΩ):">
                <span>{{ props.row.requestBody.loopResistanceA }}</span>
              </el-form-item>
              <el-form-item label="B相回路电阻值(μΩ):">
                <span>{{ props.row.requestBody.loopResistanceB }}</span>
              </el-form-item>
              <el-form-item label="C相回路电阻值(μΩ):">
                <span>{{ props.row.requestBody.loopResistanceC }}</span>
              </el-form-item>
              <el-form-item label="人力分合操作5次，可靠动作:">
                <span>{{ props.row.requestBody.perReliableOper }}</span>
              </el-form-item>
              <el-form-item label="储能电机85%和110%操作电压，储能可靠动作:">
                <span>{{ props.row.requestBody.reliableStorageOper }}</span>
              </el-form-item>
              <el-form-item label="等于或低于30% 额定合闸电压时，操作5次，可靠不动作:">
                <span>{{ props.row.requestBody.nomVolReliableOper }}</span>
              </el-form-item>
              <el-form-item label="85%~110%额定合闸电压（直流）范围，操作5次，可靠合闸:">
                <span>{{ props.row.requestBody.nomACReliableSwitch }}</span>
              </el-form-item>
              <el-form-item label="65%~110%额定分闸电压（直流）范围，操作5次，可靠分闸:">
                <span>{{ props.row.requestBody.nomDCReliableSwitch }}</span>
              </el-form-item>
              <el-form-item label="分闸电源低于额定30%，操作5次可靠不动作:">
                <span>{{ props.row.requestBody.breakReliableNoOper }}</span>
              </el-form-item>
              <el-form-item label="额定操作电压下，分合操作5次，均可靠动作:">
                <span>{{ props.row.requestBody.breakNomVolReliableOper }}</span>
              </el-form-item>
              <el-form-item label="额定操作电压“分-0.3-合分”，可靠动作:">
                <span>{{ props.row.requestBody.breakVolReliableOper }}</span>
              </el-form-item>
              <el-form-item label="分闸时间额定上限值(ms):">
                <span>{{ props.row.requestBody.breakTimeMax }}</span>
              </el-form-item>
              <el-form-item label="分闸时间额定下限值(ms):">
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
              <el-form-item label="合闸时间额定上限值(ms):">
                <span>{{ props.row.requestBody.closeTimeMax }}</span>
              </el-form-item>
              <el-form-item label="合闸时间额定下限值(ms):">
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
              <el-form-item label="合闸不同期额定值:">
                <span>{{ props.row.requestBody.closeNotSameTimeUn }}</span>
              </el-form-item>
              <el-form-item label="合闸不同期(ms):">
                <span>{{ props.row.requestBody.closeNotSameTime }}</span>
              </el-form-item>
              <el-form-item label="分闸不同期额定值(ms):">
                <span>{{ props.row.requestBody.breakNotSameTimeUn }}</span>
              </el-form-item>
              <el-form-item label="分闸不同期(ms):">
                <span>{{ props.row.requestBody.breakNotSameTime }}</span>
              </el-form-item>
              <el-form-item label="合闸弹跳（真空断路器）额定值(ms):">
                <span>{{ props.row.requestBody.closeBounceTimeUn }}</span>
              </el-form-item>
              <el-form-item label="合闸弹跳（真空断路器）(ms):">
                <span>{{ props.row.requestBody.closeBounceTime }}</span>
              </el-form-item>
              <el-form-item label="分闸反弹幅值额定值(ms):">
                <span>{{ props.row.requestBody.breakOffAmplitudeUn }}</span>
              </el-form-item>
              <el-form-item label="分闸反弹幅值(ms):">
                <span>{{ props.row.requestBody.breakOffAmplitude }}</span>
              </el-form-item>
              <el-form-item label="（断路器小车）检验报告附件:">
                <span>{{ props.row.requestBody.inspectionReportFile }}</span>
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
import { dlqxcList, dlqxcDellte, dlqxcEdit, allLogs } from '@/api/business'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination4
import ImprotFile from '@/components/ImprotFile' // 文件上传文件封装
const fixHeight = 270
import { getToken } from '@/utils/auth' // get token from cookie
const hasToken = getToken()
export default {
  name: 'CircuitTrolley',
  components: { Pagination, ImprotFile },
  data() {
    return {
      productionUrl: this.GLOBAL.BASE_URL + '/api/kvsc/dlqxc/import/file',
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
      newDataImg: { id: '', imagePath: '', modelName: '断路器小车' }, // 多个图片上传
      oneDataImg: { id: '', imagePath: '', modelName: '断路器小车' }, // 单个图片上传或替换之前的图片
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
        processType: [{ required: true, message: '请输入感知过程', trigger: 'blur' }],
        pdCode: [{ required: true, message: '请输入工序', trigger: 'blur' }],
        checkTime: [{ required: true, message: '请输入采集时间', trigger: 'blur' }],
        putCenterTime: [{ required: true, message: '请输入入数采中心时间', trigger: 'blur' }],
        contactNum: [{ required: true, message: '请输入断路器出厂编号(常州/nature)', trigger: 'blur' }],
        materialSN: [{ required: true, message: '请输入成品序列号(PDSE)', trigger: 'blur' }],
        pressureValueUn: [{ required: true, message: '请输入相对地耐压额定值(kV)', trigger: 'blur' }],
        pressureValue: [{ required: true, message: '请输入相对地耐压值(kV)', trigger: 'blur' }],
        vacuumVoltageUn: [{ required: true, message: '请输入真空断口耐压额定值(kV)', trigger: 'blur' }],
        vacuumVoltage: [{ required: true, message: '请输入真空断口耐压值(kV)', trigger: 'blur' }],
        phaseVoltageUn: [{ required: true, message: '请输入相间耐压额定值(kV)', trigger: 'blur' }],
        phaseVoltage: [{ required: true, message: '请输入相间耐压值(kV)', trigger: 'blur' }],
        pressureTimeUn: [{ required: true, message: '请输入耐压持续额定时间(s)', trigger: 'blur' }],
        pressureTime: [{ required: true, message: '请输入耐压持续时间(s)', trigger: 'blur' }],
        ratedCurrent: [{ required: true, message: '请输入额定电流(A)', trigger: 'blur' }],
        loopResistanceUn: [{ required: true, message: '请输入额定回路电阻值(μΩ)', trigger: 'blur' }],
        loopResistanceA: [{ required: true, message: '请输入A相回路电阻值(μΩ)', trigger: 'blur' }],
        loopResistanceB: [{ required: true, message: '请输入B相回路电阻值(μΩ)', trigger: 'blur' }],
        loopResistanceC: [{ required: true, message: '请输入C相回路电阻值(μΩ)', trigger: 'blur' }],
        perReliableOper: [{ required: true, message: '请输入人力分合操作5次，可靠动作', trigger: 'blur' }],
        reliableStorageOper: [{ required: true, message: '请输入储能电机85%和110%操作电压，储能可靠动作', trigger: 'blur' }],
        nomVolReliableOper: [{ required: true, message: '请输入等于或低于30% 额定合闸电压时，操作5次，可靠不动作', trigger: 'blur' }],
        nomACReliableSwitch: [{ required: true, message: '请输入85%~110%额定合闸电压（直流）范围，操作5次，可靠合闸', trigger: 'blur' }],
        nomDCReliableSwitch: [{ required: true, message: '请输入65%~110%额定分闸电压（直流）范围，操作5次，可靠分闸', trigger: 'blur' }],
        breakReliableNoOper: [{ required: true, message: '请输入分闸电源低于额定30%，操作5次可靠不动作', trigger: 'blur' }],
        breakNomVolReliableOper: [{ required: true, message: '请输入额定操作电压下，分合操作5次，均可靠动作', trigger: 'blur' }],
        breakVolReliableOper: [{ required: true, message: '请输入额定操作电压“分-0.3-合分”，可靠动作', trigger: 'blur' }],
        breakTimeMax: [{ required: true, message: '请输入分闸时间额定上限值(ms)', trigger: 'blur' }],
        breakTimeMin: [{ required: true, message: '请输入分闸时间额定下限值(ms)', trigger: 'blur' }],
        breakTimeA: [{ required: true, message: '请输入A相分闸时间(ms)', trigger: 'blur' }],
        breakTimeB: [{ required: true, message: '请输入B相分闸时间(ms)', trigger: 'blur' }],
        breakTimeC: [{ required: true, message: '请输入C相分闸时间(ms)', trigger: 'blur' }],
        closeTimeMax: [{ required: true, message: '请输入合闸时间额定上限值(ms)', trigger: 'blur' }],
        closeTimeMin: [{ required: true, message: '请输入合闸时间额定下限值(ms)', trigger: 'blur' }],
        closeTimeA: [{ required: true, message: '请输入A相合闸时间(ms)', trigger: 'blur' }],
        closeTimeB: [{ required: true, message: '请输入B相合闸时间(ms)', trigger: 'blur' }],
        closeTimeC: [{ required: true, message: '请输入C相合闸时间(ms)', trigger: 'blur' }],
        closeNotSameTimeUn: [{ required: true, message: '请输入合闸不同期额定值(ms)', trigger: 'blur' }],
        closeNotSameTime: [{ required: true, message: '请输入合闸不同期(ms)', trigger: 'blur' }],
        breakNotSameTimeUn: [{ required: true, message: '请输入分闸不同期额定值(ms)', trigger: 'blur' }],
        breakNotSameTime: [{ required: true, message: '请输入分闸不同期(ms)', trigger: 'blur' }],
        closeBounceTimeUn: [{ required: true, message: '请输入合闸弹跳（真空断路器）额定值(ms)', trigger: 'blur' }],
        closeBounceTime: [{ required: true, message: '请输入合闸弹跳（真空断路器）(ms)', trigger: 'blur' }],
        breakOffAmplitudeUn: [{ required: true, message: '请输入分闸反弹幅值额定值(mm)', trigger: 'blur' }],
        breakOffAmplitude: [{ required: true, message: '请输入分闸反弹幅值(mm)', trigger: 'blur' }]

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
            dlqxcDellte(idList).then(res => {
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
      dlqxcList(this.pagination, this.listQuery).then(res => {
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
          dlqxcEdit(this.ruleForm).then(res => {
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
          this.$message.success(this.$t('table.upSuccess'))
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
    },

    // 自定义列标题内容
    perReliableOper(h, { column, $index }, index) {
      return h('span', {}, [
        h('span', {}, '人力分合操作...'),
        h('el-popover', { props: { placement: 'top-start', width: '250', trigger: 'hover', content: '人力分合操作5次，可靠动作' }}, [
          h('i', { slot: 'reference', class: 'el-icon-question' }, '')
        ])
      ])
    },
    reliableStorageOper(h, { column, $index }, index) {
      return h('span', {}, [
        h('span', {}, '储能电机85%...'),
        h('el-popover', { props: { placement: 'top-start', width: '250', trigger: 'hover', content: '储能电机85%和110%操作电压，储能可靠动作' }}, [
          h('i', { slot: 'reference', class: 'el-icon-question' }, '')
        ])
      ])
    },
    nomVolReliableOper(h, { column, $index }, index) {
      return h('span', {}, [
        h('span', {}, '等于或低于30%...'),
        h('el-popover', { props: { placement: 'top-start', width: '250', trigger: 'hover', content: '等于或低于30% 额定合闸电压时，操作5次，可靠不动作' }}, [
          h('i', { slot: 'reference', class: 'el-icon-question' }, '')
        ])
      ])
    },
    nomACReliableSwitch(h, { column, $index }, index) {
      return h('span', {}, [
        h('span', {}, '85%~110%额定...'),
        h('el-popover', { props: { placement: 'top-start', width: '250', trigger: 'hover', content: '85%~110%额定合闸电压（直流）范围，操作5次，可靠合闸' }}, [
          h('i', { slot: 'reference', class: 'el-icon-question' }, '')
        ])
      ])
    },
    nomDCReliableSwitch(h, { column, $index }, index) {
      return h('span', {}, [
        h('span', {}, '65%~110%额定...'),
        h('el-popover', { props: { placement: 'top-start', width: '250', trigger: 'hover', content: '65%~110%额定分闸电压（直流）范围，操作5次，可靠分闸' }}, [
          h('i', { slot: 'reference', class: 'el-icon-question' }, '')
        ])
      ])
    },
    breakReliableNoOper(h, { column, $index }, index) {
      return h('span', {}, [
        h('span', {}, '分闸电源低于...'),
        h('el-popover', { props: { placement: 'top-start', width: '250', trigger: 'hover', content: '分闸电源低于额定30%，操作5次可靠不动作' }}, [
          h('i', { slot: 'reference', class: 'el-icon-question' }, '')
        ])
      ])
    },
    breakNomVolReliableOper(h, { column, $index }, index) {
      return h('span', {}, [
        h('span', {}, '额定操作电压下...'),
        h('el-popover', { props: { placement: 'top-start', width: '250', trigger: 'hover', content: '额定操作电压下，分合操作5次，均可靠动作' }}, [
          h('i', { slot: 'reference', class: 'el-icon-question' }, '')
        ])
      ])
    },
    breakVolReliableOper(h, { column, $index }, index) {
      return h('span', {}, [
        h('span', {}, '额定操作电压...'),
        h('el-popover', { props: { placement: 'top-start', width: '250', trigger: 'hover', content: '额定操作电压“分-0.3-合分”，可靠动作' }}, [
          h('i', { slot: 'reference', class: 'el-icon-question' }, '')
        ])
      ])
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
