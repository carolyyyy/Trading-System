import Mock from 'mockjs'
Mock.mock('/user/login','post',(data) =>{
    return{
        //user: data.user,
        code: 200, 
        msg: 'login success',
        token:'a94756da-2962-40ae-bdea-787fd02c9d92'
    
    }
})

// Mock.mock('/trader/submit','post',(data) =>{
//     return{
//         //user: data.user,
//         code: 200, 
//         msg: 'submit success'
        
    
//     }
// }
// )