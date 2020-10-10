exports.userSignupValidator = (req, res, next)=>{
  req.check('name', 'Name is required').notEmpty()
  req.check('email', 'Email must be between 4 to 42 characters').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                                                                .withMessage('Email must contain an @ symbol')
                                                                .isLength({
                                                                  min:4,
                                                                  max:42
                                                                });
  req.check('password', 'Password is requirred').notEmpty()
  req.check('password')
     .isLength({min:6})
     .withMessage('Password must contain at least 6 characters')
     .matches(/\d/)
     .withMessage('Password must contain a number');
  req.check('confirmPassword', 'Confirm your password!').notEmpty()
  req.check('password', 'Passwords do not match!').equals(req.body.confirmPassword)
  const errors = req.validationErrors()
  if(errors){
    const firstError = errors.map(error =>error.msg)[0]
    return res.status(400).json({error: firstError})
  }
  next();
}