const express=require('express')
const dotenv=require('dotenv').config()
const mongoose=require('mongoose')
const morgan=require('morgan')
const helmet=require('helmet')
const cors=require('cors')
const passportSetup=require('./config/passport')
const passport=require('passport')
const session=require('express-session')
const MongoStore=require('connect-mongo')
const connectDB=require('./config/db')
//passport config
require('./config/passport')(passport)

connectDB();
const app=express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));


app.use(express.json())
app.use(express.urlencoded({extended:true}))

//express-session
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URL,
    collectinName: "sessions",
    stringify: false
    })
}))


//passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin:`${process.env.CLIENT_URL}`,
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}))

/*intialize routes*/
app.use('/',require('./routes/indexRouter'))
app.use('/auth',require('./routes/authRouter'))
app.use('/post',require('./routes/postRouter'));


const PORT=process.env.PORT || 3001
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))

