<template>
  <div class="login" :style="{background: 'url(' + img + ')'}">
    <div class="middle-wrapper">
      <div class="title-wrapper">
        <div class="title">TPS System</div>
      </div>
      <div class="login-form">
        <el-form
          ref="loginForm"
          :model="form"
          :rules="rules">
          <el-form-item 
          prop="username"
          :rules="rules.username">
            <el-input v-model="form.username" placeholder="input account">
              <i slot="prefix" class="el-input__icon el-icon-adm-user" style="font-size: 18px;"></i>
            </el-input>
          </el-form-item>
          <el-form-item 
          prop="password"
          :rules="rules.password">
            <el-input :type="passwordType" v-model="form.password" placeholder="input password">
              <i slot="prefix" class="el-input__icon el-icon-adm-password" style="font-size: 18px;"></i>
              <!-- <i slot="suffix" class="el-input__icon el-icon-view" style="cursor: pointer;"
                 @click="_togglePasswordType"></i> -->
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 0;">
            <el-col :span="10" :offset="14">
              <el-form-item>
                <el-button
                  type="primary"
                  class="login-btn"
                  style="width: 100%;position:relative; right:240px"
                  @click="submitForm('loginForm')">
                  Login in
                </el-button>
                <el-button type="primary" style="width: 100%;position:relative; right:20px;bottom:40px" @click="resetForm('loginForm')">Reset</el-button>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
//import validateCode from 'src/components/ValidateCode/index';
import Register from 'src/components/Register.vue'
import * as types from 'src/store/types'
import {requseLogin} from "src/axios/api";
import Axios from 'axios';
// import mutation from "src/store/mutations"

  export default {  
    created () {
    },
    data () {
      return {
        img: require('src/assets/background.jpg'),
        passwordType: 'password',
        checkCode: '',
        form: {
          username: '',
          password: '',
          duty:'',
          id:''
        },
        rules: {
          username: [
            { required: true, message: 'Account can not be null!', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Password can not be null', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleClick(tab, event) {},
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 登录
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                  
                    let opt = this.form;

                    //Axios.post('/login').then(({

                    requseLogin(opt).then(({
                        data
                    }) => {
                        console.log(data)
                        if (!data) {
                            this.$message({
                                type: 'info',
                                message: 'Account not exist!'
                            })
                        }
                        if (data.code === 200) {
                            this.$message({
                                type: 'success',
                                message: 'Login in success'
                            })
                            // this.$store.dispatch('UserLogin', data.token)
                            // this.$store.dispatch('UserName', data.email)
                             let token = 'a94756da-2962-40ae-bdea-787fd02c9d92';
                            console.log(opt)
                            this.form.duty = data.data.duty;
                            console.log("******");
                            console.log(this.form.duty);
                            this.form.id=data.data.Id;
                            
                            this.$store.commit('SET_TOKEN', token);
                            this.$store.commit('SET_USER',opt)
                            //localStorage.setItem('id',this.form.id)
                            //localStorage.setItem('username',this.form.username)
                            sessionStorage.setItem('token',token)
                            sessionStorage.setItem('id',this.form.id)
                            sessionStorage.setItem('username',this.form.username)
                            // this.$store.dispatch('UserLogin', token)
                            // this.$store.dispatch('UserName', this.form.username)

                            if(this.form.duty==='s')
                            {
                              this.$router.replace('home_sale');                          
                            let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                           
                              // this.$router.push({ path: '/Layout_sale',
                              //                   query:{username:this.form.username} })                 
                            }
                            else if(this.form.duty==='t'){
                              
                                this.$router.push({path:'home'});                          
                            let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                                console.log("before:"+this.form.username)
                                // this.$router.push({ path: '/Layout',
                                //                 query:{username:this.form.username} })
                            }
                            
                            //console.log(this.form.username);
                            //console.log(this.$route.params.formName.username);
                            //this.$router.replace('home');
                        } else {
                            this.$message({ 
                                type: 'info',
                                message: 'Password wrong'
                            })
                        }
                    })
                } else {
                    console.log('Error Submit!!');
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
  .login {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: center center no-repeat;
    // background-color: rgb(32, 160, 255);
    // background-image:url(require('~@/assets/timg.jpg'));

    .middle-wrapper {
      position: fixed;
      width: 100%;
      margin: 0 auto;
      top: 50%;
      transform: translateY(-60%);

      .title-wrapper {
        margin-top: 50px;
        margin-bottom: 30px;
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        color: #ffffff;
      }
      .login-form {
        position: relative;
        margin: 0 auto;
        width: 520px;
        padding: 30px 50px;
        box-sizing: border-box;
        border-radius: 5px;
        // background-color: #ffffff;
        opacity:0.9;

        .el-row {
          margin-bottom: 20px;

          &:last-child {
            margin-bottom: 0;
          }

          .login-btn {
            width: 100%;
          }
        }

        .check-code-wrapper {
          display: flex;
          justify-content: space-between;
          height: 40px;

          .yanzhengma-wrapper {
            flex: 0 1 auto;
          }

          .validate-code-wrapper {
            flex: 0 0 160px;
          }
        }
      }
    }
  }
</style>
