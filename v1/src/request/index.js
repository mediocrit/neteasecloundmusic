import Axios from 'axios'

const ajax= Axios.create({
    baseURL:'http://localhost:3000'
})
export default ajax