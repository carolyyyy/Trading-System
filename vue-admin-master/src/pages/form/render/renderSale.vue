
<template>
  <div class="render">
    
    <el-form
      ref="form"
      :model="form"
      size="small"
      :inline="false"
      label-position="right">
      
      <template v-for="(item, index) in formData.fields">

        <!--input-->
        <el-form-item :label="item.title" :prop="item.id" :rules="item.rules" v-if="item.type === 'input'" >
          <el-col :span="12">
            <el-input clearable
          v-model.trim="form[item.id]"
          
          ></el-input> 
          </el-col>
        </el-form-item>
 

        <!--select-->
        <el-form-item :label="item.title" v-if="item.type === 'select'">
          <!-- <el-select placeholder="Please select" v-model="form.cusip"
           @focus="getCusip"  >
            <el-option v-for="(option_item, option_index) in item.values" :key="option_index" :label="option_item"
                       :value="option_item"></el-option>
            
                   
          </el-select> -->
        <el-select placeholder="Please select" v-model="form.cusip"
           @focus="getCusip" @change="getCusipId">
        <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.cusip"
            :value="item.id"
        ></el-option>
        </el-select>

        </el-form-item> 

        

        <!--text-->
        <el-form-item :label="item.title" v-if="item.type === 'text'">
          <el-col :span="12">
            <el-input clearable v-model.trim="form[item.id]"></el-input> 
          </el-col>
        </el-form-item>
      </template>

      <el-form-item label="Client" >         
        <el-select placeholder="Please select" v-model="form.client"
           @focus="getClient" @change="getClientId">
        <el-option
            v-for="client in clientOptions"
            :key="client.id"
            :label="client.client"
            :value="client.id"
        ></el-option>
        </el-select>

        </el-form-item>

      <el-form-item>
            	<!-- 提交按钮，点击触发submitForm()方法 -->
                <el-button type="primary" @click="submitForm()" round>add</el-button>
                <!-- 清空表单 -->
                <el-button @click="resetForm()" round >reset</el-button>
				
				<!-- 删除了查看所有节目按钮 -->
				
            </el-form-item>  
    </el-form>
  </div>
</template>
<script>
  import tableRadio from 'src/components/TableRadio/index';
  import selfAdd from 'src/components/SelfAdd/index';
  import {addTrade} from "src/axios/api";
  

  export default {
    created () {
      this.axios.get('getFormData')
      .then(data => {
        if (data.errno === 0) {
          this.formData = data.data;
          console.log(this.formData);
        } else {
          console.log(data.msg);
        }
      })
      .catch(error => {
        console.log(error);
      })
    },
    data () {
      return {
        formData: {},
        form: {
          cusip:'',
          price:'',
          sale:'',
          relative_id:'',
          creator_id:'' 
                
        },
        options:[],
        selectid:'',
        clientOptions:[],
        clientSelectid:'' ,
        userid:''
        
    }},
    methods: {
      onSubmit () {
      },
      show (value) {
        console.log(1);
        console.log(value);
      },
      getCusip() {
      // get select option
        this.axios.post('create/displayProduct')
        .then(response => {
         
            console.log(response);
            this.options = response.data;
        })
    },
    getClient(){
      this.axios.post('create/displayClient')
        .then(response => {
         
            console.log(response);
            this.clientOptions = response.data;
        })
    },
    getClientId(val){
       let obj={};
   obj=this.clientOptions.find((item)=>{
     return item.id===val;
   });
   this.clientSelectid=obj.id;
   console.log("11111");
   console.log(this.clientSelectid);

    },
 getCusipId(val) {
   
   let obj={};
   obj=this.options.find((item)=>{
     return item.id===val;
   });
   this.selectid=obj.id;
   console.log(this.selectid);
   },

      submitForm() {
                var _this = this;
                var list = this.form
                console.log(this.form)
                // var userid = this.$route.query.id
        // 将数据放在当前组件的数据内
                this.userid=sessionStorage.getItem('id')
                console.log("id="+this.userid)
                // this.userid = userid
                // if (this.form.sale == '' || this.form.price==''||this.form.cusip=='') {	//自行校验
                //     this.$alert('please input!')
                // }
                let boolean = new RegExp("^[1-9][0-9]*$").test(this.form.price)
                if (this.form.client == ''){this.$alert('Please input client!')} 
                else if(this.form.cusip==''){this.$alert('Please select cusip!')}
                else if(this.form.price=='') {	//自行校验
                      this.$alert('Please input price!') }
                else {
                    this.axios.post("create/createTrade",{
                    product_id:this.selectid,
                    price:this.form.price,
                    relative_id:this.clientSelectid,
                     creator_id:this.userid

                      }).then((response)=>{
                          // this.$alert('Success')
                          console.log(response);
                          let tradeid1 = response;
                          console.log("+++++");
                          console.log(tradeid1);
                          if(tradeid1 != null){
                            alert("Add success!");
                            this.resetForm()
                          }
                           this.axios.post("autoMatch",{id:tradeid1}).then((data)=>{
                              // console.log(id);

                             console.log(data);
                           })
 
                      });
                }
            },


      resetForm() {//clear form
                var _this = this;
                var list = this.form;
                console.log(111111);
                console.log(list);
                console.log(list.cusip)
                
                //array.push()
                console.log(22222);
                console.log(this.form.cusip);
                this.form.cusip = ''
                this.form.price = ''
                this.form.client = ''
        
            }

    },
    watch: {
      'formData': {
        handler: function (newVal, oldVal) {
          console.log(newVal);
        },
        deep: true
      }
    },
    components: {
      tableRadio,
      selfAdd
    }
  };
</script>
<style lang="scss" scoped>
  .render {
    padding: 16px;
    margin-bottom: 16px;
    background-color: #ffffff;
  }
</style>
