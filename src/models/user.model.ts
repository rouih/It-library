import mongoose,{Document,Schema} from "mongoose";


export interface IUser extends Document{
    id:string;    
    username:string;
    password:string;
    role: 'Customer'| 'Employee'
    loanedBooks: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    id:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    loanedBooks:[{type:mongoose.Schema.Types.ObjectId,ref:'Book'}]
})

const UserModel = mongoose.model<IUser>("User",userSchema)

export default UserModel;