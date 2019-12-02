<template>
  <div class='basic'>
    <el-row>
      <el-col :span='24'>
        <el-card>
          <div slot="header">
            trade list
            <el-button type="primary" @click="edit()" style="float:right; bottom:11px;position:relative" round>Edit</el-button>
        <el-button type="primary" @click="showHistory()" style="float:right; right:5px; bottom:11px;position:relative" round>History</el-button>
         <el-button type="primary" @click="match()" style="float:right; bottom:11px;position:relative" round>Match</el-button>
        
          </div>
          <div class="table-wrapper">
            <el-table
              highlight-current-row
              @row-click="openDetails"
              :data='tableData'
              border
              
              :row-class-name="addRowClass"
              @row-dblclick="history(ID)">
              <el-table-column label="ID" prop="tradeId" align="center" width="100"></el-table-column>
              <el-table-column label="Creater name" prop="creatorname" align="center" width="140"></el-table-column>
              <el-table-column label="Cusip" prop="productId" align="center" width="100"></el-table-column>              
              <el-table-column label="price" prop="price" align="center" width="80"></el-table-column>              
              <el-table-column label="time" prop="create_time" align="center" :formatter="dateFormat" width="180">
              </el-table-column>
              <el-table-column label="state" prop="status" align="center" width="120"></el-table-column>
              <el-table-column label="match ID" prop="matchId" align="center" width="100"></el-table-column>
              <el-dialog title="Match List" :visible.sync="dialogTableVisible_1" :append-to-body="true">
              <el-table :data="matchData" border @current-change="tableChange">        
              <el-table-column label="Creater name" prop="creatorName" align="center" width="80"></el-table-column>
              <!-- <el-table-column label="Cusip" prop="Cusip" align="center" width="100"></el-table-column>               -->
              <el-table-column label="Price" prop="price" align="center" width="80"></el-table-column>              
              <el-table-column label="Time" :formatter="dateFormat" prop="timestamp" align="center" width="180">
            
              </el-table-column>
              <el-table-column label="State" prop="status" align="center" width="120"></el-table-column>
              <el-table-column prop="id">
                <template slot-scope="scope" width="80">
                  <el-radio v-model="radio" :label="scope.row.id" @change="selectMatchId"></el-radio>                  
                </template>
              </el-table-column>
                    </el-table>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogTableVisible_1 = false">cancel</el-button>
                        <el-button type="primary" @click="submitMatch">match</el-button>
                      </div>
                  </el-dialog>
            </el-table>
            <el-dialog title="History List" :visible.sync="dialogTableVisibleHistory" :append-to-body="true">
              <el-table :data="matchData" border @current-change="tableChange">        
              <el-table-column label="Creater name" prop="username" align="center" width="80"></el-table-column>
              <!-- <el-table-column label="Cusip" prop="Cusip" align="center" width="100"></el-table-column>               -->
              <el-table-column label="Price" prop="price" align="center" width="80"></el-table-column>              
              <el-table-column label="Time" :formatter="dateFormat" prop="create_time" align="center" width="180">            
              </el-table-column>
              <el-table-column label="State" prop="status" align="center" width="120"></el-table-column>
                    </el-table>
                  </el-dialog>

            <el-dialog title="Edit price" :visible.sync="dialogFormVisible" :append-to-body="true">
                  <el-form :model="form"
                  label-position="right">
                  <el-form-item label="Sales" style="pointer-events: none;">
                    <el-input v-model="form.creatorname" ></el-input>
                  </el-form-item>
                  <el-form-item label="Cusip"   style="pointer-events: none;" auto-complete="off"  >
                    <el-input v-model="form.productId" readonly="readonly"></el-input>
                  </el-form-item>
                  <el-form-item label="Price" >
                    <el-input v-model="form.price2" ></el-input>
                  </el-form-item>
                  <el-form-item>            
                <el-button type="primary" @click="submitForm()" round>Edit</el-button>             
                <el-button @click="resetForm()" round >Cancel</el-button>
            </el-form-item>                      
            </el-form>
          </el-dialog>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {formatDate} from 'src/utils/utils';
  import score from 'src/components/Score/index';
  import moment from "moment"

  const POSITIVE = 0;
  const NEGATIVE = 1;
  export default {
    created () {
      this.getTableData();
    },
    data () {
      return {
        form:{productId:'',
        creatorname:'',
        price:'',
        price2:'',
        creatorId:'',
        matchId:'',
        version:'',
        timestamp:'',
        matchTradeId:'',
        tradeId:''
        },
        tableData: [],
        matchData:[],
        historyData:[],
        loading: true,
        pagesize: 5,
        currentpage: 1,
        total: 11,
        radio:"",
        dialogTableVisible_1: false,
        dialogTableVisible_2: false,
        dialogFormVisible:false,
        dialogTableVisibleHistory:false,
        userName:''
      }
    },
    methods: {
      submitForm(){
        this.dialogFormVisible = false;
        if (this.form.price2 === this.form.price) {	//自行校验
                    this.$alert('please change price!')
                } else {
                    this.axios.post("http://127.0.0.1:8081/modifyTrade",{
                    tradeId:this.form.tradeId,
                    price:this.form.price2,

                      }).then((response)=>{

                          console.log(response)
                      });
                }
                this.axios.post("http://127.0.0.1:8081/allTrades",{
          userId:this.userId
        })
        .then(response => {
          // if (data.errno === 0) {
            this.tableData = response.data.tradeList;      
            console.log(response);
            console.log(response.data.tradeList)
            console.log(this.tableData)
        })
      },

      history(){

      },
      resetForm(){
          this.dialogFormVisible = false;
      },
      match(){
        console.log(this.form.matchId)
        if(this.form.matchId != null){
          alert("Please select another trade!")
          dialogTableVisible_1 = false;
        }
        else if(this.form.matchId == null) {        
         this.dialogTableVisible_1 = true;
          this.getMatchData();}

      },
      showHistory(){
      this.dialogTableVisibleHistory = true;
      this.getHistoryData()
      },
      tableChange(newCurrentRow) {
      this.selectRowData = newCurrentRow; 
      this.radio = newCurrentRow.ID; 
    },
    selectMatchId() {
      let tradeId = this.form.tradeId;
      console.log(this.radio);
      let matchTradeId = this.radio;    
    },
    submitMatch(){
        this.dialogTableVisible_1 = false;
        let tradeId = this.form.tradeId;
      console.log(this.radio);
      let matchTradeId = this.radio;
      this.axios.post('ManualMatch',{tradeId,matchTradeId}).then(
        response => {
            console.log(response)
        }
      )
      this.axios.post("http://127.0.0.1:8081/allTrades",{
          userId:this.userId
        })
        .then(response => {
          // if (data.errno === 0) {
            this.tableData = response.data.tradeList;      
            console.log(response);
            console.log(response.data.tradeList)
            console.log(this.tableData)
        })
    },
    
    edit(row,_index){
      if(this.form.version===4){
        this.dialogFormVisible = true;

      }else{
        this.$alert('Please select another trade!')
      }
    },

      getTableData () {
        // this.axios.get(`getTableData?per_page=${this.pagesize}&cur_page=${this.currentpage}`)
       this.userId=sessionStorage.getItem('id')
       this.userName=sessionStorage.getItem('username')
        console.log("id=="+this.userId)
        console.log("id=="+this.userName)
        
        this.axios.post("http://127.0.0.1:8081/allTrades",{
          userId:this.userId
        })
        .then(response => {
          // if (data.errno === 0) {
            this.tableData = response.data.tradeList;      
            console.log(response);
            console.log(response.data.tradeList)
            console.log(this.tableData)
        })

        // .catch(error => {
        //   console.log(error);
        // });
      },
      getMatchData () {
        console.log("8888888")
        console.log(this.form.tradeId)        
        this.dialogTableVisible_1 = true;
        this.axios.post('MatchList',{id:this.form.tradeId})
        .then(response => {
            this.matchData = response.data;      
            console.log(response);
            console.log(response.data)
            console.log("***********");
            console.log(this.matchData)
        })
        // .catch(error => {
        //   console.log(error);
        // });
      },
      dateFormat(row, column) {
                                var moment = require('moment');
                                var date = row[column.property];
                                console.log(date)
                                return moment(date).utc().format("YYYY-MM-DD HH:mm:ss")
                        },
      getHistoryData () {
        // this.axios.get(`getTableData?per_page=${this.pagesize}&cur_page=${this.currentpage}`)
        this.axios.post('history/historyOfTrade',{id:this.form.tradeId})
        .then(response => {
          // if (data.errno === 0) {
            this.matchData = response.data;      
            console.log(response);
            console.log(response.data)
            console.log(this.matchData)
        })
        // .catch(error => {
        //   console.log(error);
        // });
      },
      show (scope) {
        console.log(scope);
      },
      handleSizeChange (value) {
        this.pagesize = value;
        this.getTableData();
      },
      handleCurrentChange (value) {
        this.currentpage = value;
        this.getTableData();
      },
      addRowClass ({row, rowIndex}) {
        if (row.rateType === NEGATIVE) {
          return 'warning-row';
        }
      },
      openDetails(row){
        console.log(row);
        if (row != null) {
        this.selection = row;
        }
        this.form.productId = row.productId
        this.form.creatorname = row.creatorname
        this.form.price = row.price 
        this.form.price2=row.price
        this.form.creatorId = row.creatorId
        this.form.matchId = row.matchId
        this.form.version = row.version
        this.form.tradeId = row.tradeId
        console.log(this.form)
        //this.form.State = row.state
       
      },
      open() {
        this.$prompt('please input price', 'notice', {
          confirmButtonText: 'submit',
          cancelButtonText: 'cancel',
          inputPattern : /^[\s\S]*.*[^\s][\s\S]*$/,
          //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: 'empty is not permitted'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: 'price: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'cancel'
          });       
        });
      }
    },
    filters: {
      rateTypeToText (rateType) {
        return rateType === POSITIVE ? '满意' : '不满意';
      },
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    },
    components: {
      score
    }
  };
</script>
<style lang='scss'>
  .basic {
    .el-table {
      .warning-row {
        background-color: oldlace;
      }
    } 

    .recommend-tag {
      display: inline-block;
      margin: 4px 0;
      margin-right: 4px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
