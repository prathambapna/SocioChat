//to get the flash msg from req and put it into res
module.exports.setFlash=function(req,res,next)
{
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}

/*
set up the library flash
used it after session being used
setup msgs in users_controller
then to pass on these msgs to html/ejs created a middleware
to put the msg from req to res
in middleware it fetches from req and put it in locals
now we used it in index.js=>app.use(customMware.setFlash)
now include it in view that is include it in layout after header
*/