const userindo = (req, res, next) => {
    try {
      

        if (!req.session.user_id) {
          
            return res.redirect('/')
        }

        next();

    } catch (err) {
       
        return res.status(500).send('Internal Server Error');
    }
};


const userinditta = (req, res, next) => {
    try {
  

        if (req.session.user_id) {
            return res.redirect('/homepage')
        }

        next();

    } catch (err) {
       
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    userindo,
    userinditta
};
