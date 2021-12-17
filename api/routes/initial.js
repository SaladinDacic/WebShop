let admin = {
    name:"Saladin",
    email:"saladindacic@gmail.com",
    block:[],
    archive:[]
}
let seller ={
  name:"Saladin",
  email:"saladindacic@gmail.com",
  products:[]
}
let customer = {
  name:"Saladin",
  email:"saladindacic@gmail.com",
  intrested:["game", "pc", "tools"]
}
let product={
  productName:"switch",
  category:"game"
}


module.exports = [admin, seller, customer, product]


/* {
  admins:[{
    admin_id:{
      type: String,
      required: "ID cannot be blank!"
    },
    name:{
      type: String,
      required: "Name cannot be blank!"
    },
    email:{
      type: String,
      required: "Email cannot be blank!"
    },
    users:[{
      user:{
        user_id: {
          type: String,
          required: "ID cannot be blank!"
        },
        archive: {
          type: Boolean,
          default: false
        },
        block: {
          type: Boolean,
          default: false
        }
      }
    }]
  }],
  sellers:[{
    seller_id: {
      type: String,
      required: "ID cannot be blank!"
    },
    email:{
      type: String,
      required: "Email cannot be blank!"
    },
    fullname: {
      type: String,
      required: "Name cannot be blank!"
    },
    created_date:{
      type: Date,
      default: Date.now
    },
    products:[{
      product_id: {
        type: String,
        required: "ID cannot be blank!"
      },
      name:{
        type: String,
        required: "Name cannot be blank!"
      },
      shipping:{
        type: Boolean
      }
    }],
    category:{
      type: String
    },
  }],
  buyers:[{
    buyer_id: {
      type: String,
      required: "ID cannot be blank!"
    },
    email:{
      type: String,
      required: "Email cannot be blank!"
    },
    fullname: {
      type: String,
      required: "Name cannot be blank!"
    },
    created_date:{
      type: Date,
      default: Date.now
    },
    products:[{
      product_id: {
        type: String,
        required: "ID cannot be blank!"
      },
      name:{
        type: String,
        required: "Name cannot be blank!"
      },
      shipping:{
        type: Boolean
      }
    }],
    interested:[
      category=String
    ]
  }]
} */