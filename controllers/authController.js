const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const { User } =require( '../models');

require('dotenv').config();

exports.register =async(req, res) =>{

  const {email,password,role} =req.body;
  if (!email|| !password) return res.status(400).json({ message:'enter email and password' });

  try {
    const userexist =await User.findOne({ where: { email } });
    if (userexist){
    return res.status(409).json({ message:'use different email' });
    }
    const hashpwd =await bcrypt.hash(password, 10);
    const user =await User.create({ email, password:hashpwd, role:role|| 'user' });

    res.status(201).json({ message:'user registered'});

  } catch (error) {
    res.status(500).json({ message:'internal error', error });

  }
};

exports.login =async (req, res) => {
  const { email, password } =req.body;
  if (!email || !password) {
    return res.status( 400).json({ message:'enter email and pwd'});
  }
  try {
    const user =await User.findOne({where:{email}});
    if (!user) return res.status(401).json({message:'incorrect email or password'});

    const match =await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({message:'wrong password'});

    const token =jwt.sign({id:user.id,email:user.email,role:user.role}, process.env.JWTSECRET, {
      expiresIn: '3h',
    });

    res.json({token});
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
};
