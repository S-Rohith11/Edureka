const jwt = require('jsonwebtoken');
const {User} =  require("../Model/userDB")

exports.postSignUp = async(req, res) => {
    const { email, password, name } = req.body;

    const userObj = await User ({
        email,
        password,
        name
    });

    userObj.save()
        .then(response => {
            res.status(200).json({
                message: "User Details Saved Successfully",
                signup: response
            })
        })
        .catch( err => {
            res.status(500).json({ error: err })
        })
}

exports.postlogin = (req, res) => {
    const { email, password } = req.body;
    

     
    User.find({
        email,
        password
    })
    .then(response => {
        if(response.length > 0){
             
            console.log(response)
            const token = jwt.sign({_id:response[0]._id},process.env.JWT_SECRET)

            res.status(200).json({
                message: "User Details Fetched Successfully",
                login: response,
                token,
                isAuthenticated: true
            })
        }else{
            res.status(200).json({
                message: "User Details Not Found",
                login: response,
                isAuthenticated: false
            })
        }
    })
    .catch( err => {
        res.status(500).json({ error: err })
    })
}

exports.getUser = async (req, res) => {
    try {
        // Retrieve email and password from request query


        const { token } = req.body;
      
         if(token)
         {
            let decode = jwt.decode(token,process.env.JWT_SECRET)
            if(decode)
            {
                console.log(token)
                console.log(decode)
                let user = await User.findById(decode._id)
                if(user)
                {
                    return res.status(200).send(user)
                }
                else
                {
                    return res.status(400).send({message:"not found"})
                }
            }
            else
            {
                return res.status(400).send({message:"jwt error"})
            }
         }
         else
         {
             return res.status(400).send({message:"please provide token"})
         }
   
        // Find user with matching email and password
    
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

