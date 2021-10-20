<template>
  <div class="wrap">
    <div class="title-wrap">
      <el-image class="logo" :src="require('../../assets/image/databoard/logo.png')"></el-image>
      <div class="date-time-wrap">
        <div class="time-wrap">
          <el-image class="time-icon" :src="require('../../assets/image/databoard/time.png')"></el-image>
          <span class="time">{{nowDate[2]}}</span>
        </div>
        <div class="date-wrap">
          <span class="week">{{nowDate[1]}}</span>
          <span class="date">{{nowDate[0]}}</span>
        </div>
      </div>
      <el-image class="title" :src="studentType == '1' ? underGraduateStuTitleImg : graduateStuTitleImg"></el-image>
    </div>

    <div class="row-wrap">
      <div class="left-content-wrap">
        <el-image class="left-content-bg" :src="require('../../assets/image/databoard/frame_left.png')"></el-image>
        <p class="title">报到率展示</p>
        <div class="left-content-item male-wrap">
          <div class="left-content-item-1">
            <span class="left-content-item-1-title">男生报到</span>
            <el-image class="left-content-item-1-icon" :src="require('../../assets/image/databoard/man.png')"></el-image>
          </div>
          <div class="left-content-item-chart" ref="maleEchart"></div>
          <div class="left-content-item-info-list">
            <p class="left-content-item-info-item">
              <span class="left-content-item-info-item-title">报到人数</span>
              <span class="left-content-item-info-item-num man">{{regRateData.maleRegisteredTotal}}人</span>
            </p>
            <p class="left-content-item-info-item">
              <span class="left-content-item-info-item-title">录取人数</span>
              <span class="left-content-item-info-item-num">{{regRateData.maleTotal}}人</span>
            </p>
          </div>
        </div>
        <div class="left-content-item male-wrap">
          <div class="left-content-item-1">
            <span class="left-content-item-1-title">女生报到</span>
            <el-image class="left-content-item-1-icon" :src="require('../../assets/image/databoard/woman.png')"></el-image>
          </div>
          <div class="left-content-item-chart" ref='femaleEchart'></div>
          <div class="left-content-item-info-list">
            <p class="left-content-item-info-item">
              <span class="left-content-item-info-item-title">报到人数</span>
              <span class="left-content-item-info-item-num woman">{{regRateData.femaleRegisteredTotal}}人</span>
            </p>
            <p class="left-content-item-info-item">
              <span class="left-content-item-info-item-title">录取人数</span>
              <span class="left-content-item-info-item-num">{{regRateData.femaleTotal}}人</span>
            </p>
          </div>
        </div>
      </div>

      <div class="center-content-wrap">
        <el-image class="center-content-bg" :src="require('../../assets/image/databoard/frame_mid.png')"></el-image>
        <p class="title">已报到人数</p>
        <div class="row-wrap register-info-wrap">
          <div class="info-box-wrap">
            <el-image class="info-box-wrap-bg" :src="require('../../assets/image/databoard/enroll.png')"></el-image>
            <span class="info-box-wrap-txt1">录取人数</span>
            <span class="info-box-wrap-txt2">{{totalData.enrollTotal}}</span>
          </div>
          <div class="num-box-wrap" v-for="(item, index) in totalData.registeredTotal.toString().split('')" :key="index">
            <el-image class="num-box-wrap-bg" :src="require('../../assets/image/databoard/bg_num.png')"></el-image>
            <span class="num-box-wrap-txt1">{{item}}</span>
          </div>
          <div class="info-box-wrap">
            <el-image class="info-box-wrap-bg" :src="require('../../assets/image/databoard/register.png')"></el-image>
            <span class="info-box-wrap-txt1">报到占比</span>
            <span class="info-box-wrap-txt2">{{totalData.percentage}}</span>
          </div>
        </div>
        <p class="sub-title">各院系报到人数、报到率</p>
         <div class="college-list-wrap">
          <div class="college-list-wrap-item">
            <span class="college-list-wrap-item-txt1">院系</span>
            <span class="college-list-wrap-item-txt1">报到/录取人数</span>
            <span class="college-list-wrap-item-txt1">男生录取人数</span>
            <span class="college-list-wrap-item-txt1">女生录取人数</span>
            <span class="college-list-wrap-item-txt1">报到率</span>
            <el-image class="college-list-wrap-item-bg" :src="require('../../assets/image/databoard/bg.png')"></el-image>
          </div>
         </div>
        <div class="college-list-wrap" ref="collegeListWrap">
          <div>
            <div ref='collegeList' style="transform: translateY(0px)">
              <div class="college-list-wrap-item" v-for="(item,index) in collegeData" :key="index">
                <span class="college-list-wrap-item-txt1 white">{{item.collegeName}}</span>
                <span class="college-list-wrap-item-txt1 white">{{`${item.registeredTotal}/${item.enrollTotal}`}}</span>
                <span class="college-list-wrap-item-txt1 blue">{{item.maleTotal}}</span>
                <span class="college-list-wrap-item-txt1 red">{{item.femaleTotal}}</span>
                <span class="college-list-wrap-item-txt1 yellow">{{item.registrationRate}}</span>
                <el-image class="college-list-wrap-item-bg" :src="require('../../assets/image/databoard/bg.png')" fit='cover'></el-image>
              </div>
            </div>
          </div>
          
          <div ref='collegeListClone' style="transform: translateY(0px)">
            <div class="college-list-wrap-item" v-for="(item,index) in collegeData" :key="index">
              <span class="college-list-wrap-item-txt1 white">{{item.collegeName}}</span>
              <span class="college-list-wrap-item-txt1 white">{{`${item.registeredTotal}/${item.enrollTotal}`}}</span>
              <span class="college-list-wrap-item-txt1 blue">{{item.femaleTotal}}</span>
              <span class="college-list-wrap-item-txt1 red">{{item.maleTotal}}</span>
              <span class="college-list-wrap-item-txt1 yellow">{{item.registrationRate}}</span>
              <el-image class="college-list-wrap-item-bg" :src="require('../../assets/image/databoard/bg.png')" fit='cover'></el-image>
            </div>
          </div>
        </div>
      </div>

      <div class="right-content-wrap">
        <div class="right-content-top-wrap">
          <el-image class="right-content-top-wrap-bg" :src="require('../../assets/image/databoard/frame_right_up.png')"></el-image>
          <p class="title">学费缴纳、体检办理</p>
          <div class="row-wrap right-content-top-wrap-list">
            <div class="right-content-top-wrap-item">
              <el-image class="right-content-top-wrap-item-bg" :src="require('../../assets/image/databoard/tuition.png')"></el-image>
              <span class="right-content-top-wrap-item-txt1 tuition">学费缴纳</span>
              <span class="right-content-top-wrap-item-txt2">{{otherData.payFeeRatio}}</span>
            </div>
            <div class="right-content-top-wrap-item">
              <el-image class="right-content-top-wrap-item-bg" :src="require('../../assets/image/databoard/health_examination.png')"></el-image>
              <span class="right-content-top-wrap-item-txt1 health_examination">体检办理</span>
              <span class="right-content-top-wrap-item-txt2">{{otherData.medicalExamRatio}}</span>
            </div>
          </div>
        </div>

        <div class="right-content-bottom-wrap">
          <el-image class="right-content-bottom-wrap-bg" :src="require('../../assets/image/databoard/frame_right_up.png')"></el-image>
          <p class="title">贷款人数、缓缴学费人数</p>
          <div class="row-wrap right-content-bottom-wrap-item">
            <span class="right-content-bottom-wrap-item-title">生源地贷款人数:</span>
            <div class="right-content-bottom-wrap-item-num-wrap" v-for="item in greenData.shengyuandi" :key='item'>
              <el-image class="right-content-bottom-wrap-item-num-wrap-bg" :src="require('../../assets/image/databoard/input.png')"></el-image>
              <span class="right-content-bottom-wrap-item-num-wrap-bg-txt">{{item}}</span>
            </div>
          </div>
          <div class="row-wrap right-content-bottom-wrap-item">
            <span class="right-content-bottom-wrap-item-title">校园地贷款人数:</span>
            <div class="right-content-bottom-wrap-item-num-wrap" v-for="item in greenData.xiaoyuandi" :key='item'>
              <el-image class="right-content-bottom-wrap-item-num-wrap-bg" :src="require('../../assets/image/databoard/input.png')"></el-image>
              <span class="right-content-bottom-wrap-item-num-wrap-bg-txt">{{item}}</span>
            </div>
          </div>
          <div class="row-wrap right-content-bottom-wrap-item">
            <span class="right-content-bottom-wrap-item-title">缓缴学费人数:</span>
            <div class="right-content-bottom-wrap-item-num-wrap" v-for="item in greenData.huanjiao" :key='item'>
              <el-image class="right-content-bottom-wrap-item-num-wrap-bg" :src="require('../../assets/image/databoard/input.png')"></el-image>
              <span class="right-content-bottom-wrap-item-num-wrap-bg-txt">{{item}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Ref} from 'vue-property-decorator'
import { ERR_OK } from '@/utils/request'
import { PermissionModule } from '@/store/modules/permission'
import * as apiServer from '@/api/dashboard'
import { fromPairs } from '@/utils/util'
import { formatDate } from '@/utils/common'
import echarts from  '@/plugin/echart'
import underGraduateStuTitleImg from '@/assets/image/databoard/title-1.png'
import graduateStuTitleImg from '@/assets/image/databoard/title-2.png'

@Component({name: 'Data'})
export default class extends Vue{
  private underGraduateStuTitleImg = underGraduateStuTitleImg
  private graduateStuTitleImg = graduateStuTitleImg
  
  private totalDataConfig = [
    {title: '总录取人数', key: 'enrollTotal'},
    {title: '总报到占比', key: 'percentage'},
  ]
  private totalData = {
    registeredTotal: '0'
  }

  private otherDataConfig = [
    {title: '体检办理率', key: 'medicalExamRatio'},
    {title: '学费缴费率', key: 'payFeeRatio'},
    // {title: '新生预报到比率', key: 'preRegRatio'},
    // {title: '学院报到比率', key: 'regRatio'},
  ]
  private otherData = {}

  private greenData = {}

  private collegeData:any[] = []

  private studentType:any = ''

  private getNowTime(){
    let date = new Date()
    let weeks=["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    return [formatDate(date, 'YYYY.mm.dd'), weeks[date.getDay()], formatDate(date, 'HH:MM:SS')]
  }
  private nowDate = this.getNowTime()
  
  private timer1:any
  private timer2:any
  private timer3:any

  private regRateData = {}

  created(){
    this.studentType = this.$route.query.studentType
    this.getData()

    this.timer1 = setInterval(() => {
      this.nowDate = this.getNowTime()
    }, 1000)
    this.timer2 = setInterval(() => {
      this.getData()
    }, 5000)
  }

  destroyed(){
    this.timer1 && clearInterval(this.timer1)
    this.timer2 && clearInterval(this.timer2)
    this.timer3 && clearInterval(this.timer3)
  }

  @Watch('collegeData', {immediate: true})
  _initTime3(collegeData: object[]){
    if (collegeData && collegeData.length > 0){
      // 已经有的定时器就直接返回
      if (this.timer3) return
      this.$nextTick(() => {
        // 获取可见高度
        let collegeListWrapHeight = (this.$refs.collegeListWrap as HTMLElement).offsetHeight
        // 获取列表元素、实际高度
        let collegeList = (this.$refs.collegeList as HTMLElement)
        let collegeListClone = (this.$refs.collegeListClone as HTMLElement)
        this.timer3 = setInterval(() => {
          let collegeListHeight = collegeList.offsetHeight
          // 获取偏移量
          let transformStyle = (this.$refs.collegeList as HTMLElement).style.transform
          let transformStyleSearch = transformStyle.match(/translateY\((\-*\d*)px\)/)
          let y:any = transformStyleSearch ? parseFloat(transformStyleSearch[1]) : 0   
          // 获取第一个子节点的高度
          let firstChildHeight = ((this.$refs.collegeList as HTMLElement).children[0] as HTMLElement).offsetHeight
          let preY = y - firstChildHeight
          let preY_abs = Math.abs(preY)
          collegeList.style.transform = `translateY(${preY_abs >= collegeListHeight ? 0 : preY}px)`
          collegeListClone.style.transform = `translateY(${preY_abs >= collegeListHeight ? 0 : preY}px)`
        }, 2000)
      })
    }
  }

  private getData(){
    this.getTotalData()
    this.getGreenData()
    this.getOtherData()
    this.getCollegeRegisterTotalData()
    this.getRegisterRateData()
  }

  // 报到率
  private async getRegisterRateData(){
    try{
      const result = await apiServer.registerRateData({studentType: this.studentType})
      if (result.status == ERR_OK){
        let res = result.data
        this.regRateData = res  
        this._initRegisterEchart('femaleEchart', res.femaleRegisteredTotal, res.femaleTotal, res.femaleRegRate)
        this._initRegisterEchart('maleEchart', res.maleRegisteredTotal, res.maleTotal, res.maleRegRate)
      } else {
        this.$message({message: result.msg})
      }
    } catch(err){
      console.log(err);
    }
  }
  private _initRegisterEchart(ref:string, register:string, total:string, rate:string){
    this.$nextTick(() => {
      let color = ref == 'maleEchart' ? ['#4631F8', '#54FFF1'] : ['#4631F8', '#FF4141']
      let option = {
        series: [
          // 浅色背景大圈
          {
            type: "gauge",
            detail: {
              show: false,
            },
            data: [{
              value: parseFloat(rate),
              name: '报到率',
              color: "rgba(255, 255, 255, 1)"
            }],
            radius: 55,
            legendHoverLink: false,
            startAngle: 225,
            endAngle: -45,
            clockwise: true,
            axisLine: {
              show: true,
              lineStyle: {
                width: 5,
                color: [[1, '#123565']]
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false
            },
            title: {
              show: false,
            },
          },
          // 实际数据图
          {
            type: "gauge",
            detail: {
              show: true,
              formatter: "{value}%",
              offsetCenter: [0, -8],
              color: "rgba(255, 255, 255, 1)",
              fontSize: 25,
              fontWeight: 'bold',
            },
            data: [{
              value: parseFloat(rate),
              name: '报到率',
              color: "rgba(255, 255, 255, 1)"
            }],
            radius: 55,
            legendHoverLink: false,
            startAngle: 225,
            //2.7的求值方程是： 100 * 系数 + 225 = -45
            endAngle: - 2.7 * parseFloat(rate) + 225,
            clockwise: true,
            axisLine: {
              show: true,
              lineStyle: {
                width: 5,
                color: [
                  [ 1, new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      {
                        offset: 0.1,
                        color: color[0]
                      },
                      {
                        offset: 1,
                        color: color[1]
                      }
                    ])
                  ]
                ]
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false
            },
            title: {
              show: true,
              offsetCenter: ["0", 22],
              color: "rgba(255, 255, 255, 1)",
            },
          },
        ]
      }
      let chartCtx = echarts.init(this.$refs[ref])
      chartCtx.setOption(option)
    })
  }

  // 总报到人数、总录取人数、总报到占比
  private async getTotalData(){
    try{
      const result = await apiServer.registerTotalData({studentType: this.studentType})
      if (result.status == ERR_OK){
        const res = result.data
        let obj:any = {}
        for(let k of Object.keys(res)){
          obj[k] = res[k] != null ? res[k].toString() : ''
        }
        this.totalData = obj
      } else {
        this.$message({showClose: true, type: 'error', message: result.msg})
      }
    } catch(err){
      console.log(err);
    }
  }

  // 体检办理率 学费缴费率 新生预报到比率 学院报到比率
  private async getOtherData(){
    try{
      const result = await apiServer.otherData({studentType: this.studentType})
      if (result.status == ERR_OK){
        this.otherData = result.data
      } else {
        this.$message({showClose: true, type: 'error', message: result.msg})
      }
    } catch(err){
      console.log(err);
    }
  }

  // 生源地贷款人数、校园地贷款人数、缓缴申请人数
  private async getGreenData(){
    try{
      const result = await apiServer.greenData({studentType: this.studentType})
      if (result.status == ERR_OK){
        let obj:any = {}
          let nameObj:any = {
            "生源地贷款": 'shengyuandi',
            "校园地贷款": 'xiaoyuandi',
            "其他特殊情况申请缓缴": 'huanjiao'
          }
          result.data.forEach(({name,value}:any) => {
            obj[nameObj[name]] = value.toString()
          })
          this.greenData = obj
      } else {
        this.$message({showClose: true, type: 'error', message: result.msg})
      }
    } catch(err){
      console.log(err);
    }
  }

  // 学院报到人数统计
  private async getCollegeRegisterTotalData(){
    try{
      const result = await apiServer.collegeRegisterTotalData({studentType: this.studentType})
      if (result.status == ERR_OK){
        const res = result.data
        this.collegeData = res
      } else {
        this.$message({showClose: true, type: 'error', message: result.msg})
      }
    } catch(err){
      console.log(err);
    }
  }
}
</script>

<style lang="scss" scoped>
.right-content-wrap{
  margin: 22px 0 0 33px;
  .right-content-top-wrap{
    width: 429px;
    height: 280px;
    position: relative;
    .right-content-top-wrap-bg{
      position: absolute;
      width: 429px;
      height: 280px;
    }
    .title{
      padding: 19px 0 0 20px;
      font-size: 20px;
      font-weight: 700;
      color: #EFD739;
    }
    .right-content-top-wrap-list{
      margin: 46px 0 0;
      justify-content: center;
      .right-content-top-wrap-item{
        width: 149px;
        position: relative;
        display: flex;
        flex-direction: column;
        &:first-child{
          margin-right: 39px;
        }
        .right-content-top-wrap-item-bg{
          position: absolute;
          width: 149px;
          height: 161px;
        }
        .right-content-top-wrap-item-txt1{
          margin: 82px 0 11px;
          font-size: 18px;
          text-align: center;
          z-index: 1;
          &.tuition{
            color: #11B3D0;
          }
          &.health_examination{
            color: #01E69D;
          }
        }
        .right-content-top-wrap-item-txt2{
          font-size: 30px;
          font-weight: 500;
          color: #FFE535;
          text-align: center;
          z-index: 1;
        }
      }
    }

  }

  .right-content-bottom-wrap{
    width: 429px;
    height: 600px;
    position: relative;
    .right-content-bottom-wrap-bg{
      position: absolute;
      width: 429px;
      height: 600px;
    }
    .title{
      padding: 21px 0 0 20px;
      font-size: 20px;
      font-weight: 700;
      color: #EFD739;
    }
    .right-content-bottom-wrap-item{
      margin: 66px 0 0;
      padding: 0 0 0 21px;
      align-items: center;
      &+&{
        margin: 51px 0 0;
      }
      .right-content-bottom-wrap-item-title{
        margin-right: 21px;
        width: 153px;
        font-size: 20px;
        color: #FFFFFE;
        display: block;
      }
      .right-content-bottom-wrap-item-num-wrap{
        width: 34px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        &+&{
          margin-right: 9px;
        }
        .right-content-bottom-wrap-item-num-wrap-bg{
          position: absolute;
          width: 34px;
          height: 53px;
        }
        .right-content-bottom-wrap-item-num-wrap-bg-txt{
          font-size: 36px;
          font-weight: 800;
          color: #fff;
          z-index: 1;
        }
      }
    }
  }
}

.center-content-wrap{
  margin: 3px 0 0;
  width: 916px;
  height: 942px;
  position: relative;
  .center-content-bg{
    position: absolute;
    width: 916px;
    height: 942px;
  }
  .title{
    padding: 29px 0;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    color: #FFE535;
  }
  .register-info-wrap{
    width: 916px;
    justify-content: center;
    .info-box-wrap{
      width: 220px;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      &+.num-box-wrap{
        margin-left: 27px;
      }
      &-bg{
        position: absolute;
        width: 220px;
        height: 75px;
      }
      &-txt1{
        margin-right: 11px;
        padding-left: 43px;
        font-size: 18px;
        color: #fff;
      }
      &-txt2{
        font-size: 30px;
        font-weight: 500;
        color: #3CD7FF;
      }
    }
    .num-box-wrap{
      width: 72px;
      margin-left: 22px;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      &+.info-box-wrap{
        margin-left: 27px;
      }
      &-bg{
        position: absolute;
        width: 72px;
        height: 72px;
      }
      &-txt1{
        font-size: 48px;
        font-weight: 700;
        color: #FFE535;
        z-index: 1;
      }
    }
  }
  .sub-title{
    padding: 34px 0 14px 22px;
    font-size: 20px;
    font-weight: 700;
    color: #FFE535;
  }
  .college-list-wrap{
    padding:0 11px;
    overflow: hidden;
    &:last-child{
      height: 580px;
    }
    .college-list-wrap-item{
      padding: 11px 0 10px;
      width: 893px;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      .college-list-wrap-item-bg{
        position: absolute;
        width: 893px;
        // height: 36px;
      }
      .college-list-wrap-item-txt1{
        padding: 0 10px;
        font-size: 18px;
        color: #FFFFFE;
        text-align: center;
        &:nth-child(1){
          width: 303px;
          text-align: left;
        }
        &:nth-child(2){
          width: 142px;
        }
        &:nth-child(3), &:nth-child(4){
          width: 134px;
        }
        &:nth-child(5){
          width: 80px;
        }
        &.white{
          color: #FFFFFF;
        }
        &.blue{
          color: #3CD7FF;
        }
        &.red{
          color: #FF4141;
        }
        &.yellow{
          color: #FFE535;
        }
      } 
    }
  }
}

.left-content-wrap{
  margin: 24px 30px 0 41px;
  width: 431px;
  height: 923px;
  position: relative;
  .left-content-bg{
    position: absolute;
    width: 431px;
    height: 923px;
  }
  .title{
    padding: 18px 0 0 21px;
    font-size: 20px;
    font-weight: 700;
    color: #EFD739;
  }
  .left-content-item{
    margin-top: 82px;
    width: 431px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    &:last-child{
      margin-top: 96px;
    }
    .left-content-item-1{
      display: flex;
      flex-direction: column;
      align-items: center;
      &-title{
        font-size: 18px;
        color: #fff;
      }
      &-icon{
        margin: 22px 0 0;
        width: 16px;
        height: 44px;
      }
    }
    .left-content-item-chart{
      margin: 0 44px;
      width: 120px;
      height: 120px;
    }
    .left-content-item-info-list{
      .left-content-item-info-item{
        display: flex;
        flex-direction: column;
        &-title{
          font-size: 14px;
          font-weight: 500;
          color: #d7d7d7;
        }
        &-num{
          padding: 8px 0;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          border-bottom: 1px solid #fff;
          &.man{
            color: #41FFE6;
            border-bottom: 1px solid #41FFE6;
          }
          &.woman{
            color: #FF4141;
            border-bottom: 1px solid #FF4141;
          }
        }
      }
    }
  }
}

.row-wrap{
  display: flex;
  flex-direction: row;
}

.title-wrap{
  position: relative;
  .logo{
    width: 237px;
    height: 68px;
    position: absolute;
    left: 47px;
    top: 29px;
  }
  .date-time-wrap{
    position: absolute;
    right: 50px;
    top: 35px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    color: #D3D3D6;
    .time-wrap{
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      .time-icon{
        width: 30px;
        height: 33px;
      }
      .time{
        margin: 0 0 0 14px;
        font-size: 34px;
        font-weight: 700;
      }
    }
    .date-wrap{
      margin-left: 22px;
      display: flex;
      flex-direction: column;
      text-align: right;
      span{
        font-size: 18px;
        font-weight: 500;
      }
      .week{
        margin: 0 0 10px;
      }
    }
    
  }
  .title{
    padding: 38px 0 0;
    width: 1920px;
    height: 61px;
    box-sizing: content-box;
  }
}
.wrap{
  background: #03133f;
  width: 100%;
  font-family: PingFang SC, PingFang SC-Medium;
}
</style>
