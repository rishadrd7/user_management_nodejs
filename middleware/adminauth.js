// const  adminindo= (req, res, next) => {
//     try {
      

//         if (!req.session.user_id) {
          
//             return res.redirect('/')
//         }

//         next();

//     } catch (err) {
       
//         return res.status(500).send('Internal Server Error');
//     }
// };


// const admininditta = (req, res, next) => {
//     try {

//         if (req.session.user_id) {
          
//             return res.redirect('/admin/login')
//         }

//         next();

//     } catch (err) {
       
//         return res.status(500).send('Internal Server Error');
//     }
// };

// module.exports = {
//     adminindo,
//     admininditta
// };
