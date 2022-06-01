const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
  console.log("commentRoutes");
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });
    const page_title = "The Tech Blog";
    console.log("commentRoute: " + page_title + " " + user + " " +  req.session.logged_in);
    /*res.render('comment', {
      page_title,
      ...user,
      logged_in: req.session.logged_in,
    });*/
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
