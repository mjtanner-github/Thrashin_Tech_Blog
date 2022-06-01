const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Returns all posts to render homepage.
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    console.log("postData: " + postData);
    const posts = postData.map((post) => post.get({ plain: true }));
    // Pass in page title.
    const page_title = "The Tech Blog";
    res.render('homepage', { 
      page_title,
      posts,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Renders login page.
router.get('/login', (req, res) => {
  const page_title = "The Tech Blog";
  res.render('login', {page_title});
});

// Renders signup page.
router.get('/signup', (req, res) => {
  const page_title = "The Tech Blog";
  res.render('signup', {page_title});
});

// Renders dashboard.
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });
    const page_title = "Your Dashboard";
    console.log("homeRoutes, /dashboard user_id: " + req.session.user_id);
    // Get posts by the current user.
    try {
      const postData = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      console.log("homeRoutes /dashboard postData: " + postData);
      const posts = postData.map((post) => post.get({ plain: true }));
      // Pass in page title.
      const page_title = "Your Dashboard";
      res.render('dashboard', {
        page_title,
        ...user,
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Returns all posts to render homepage.
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    console.log("postData: " + postData);
    const posts = postData.map((post) => post.get({ plain: true }));
    // Pass in page title.
    const page_title = "The Tech Blog";
    res.render('homepage', { 
      page_title,
      posts,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Renders login page.
router.get('/login', (req, res) => {
  const page_title = "The Tech Blog";
  res.render('login', {page_title});
});

// Renders signup page.
router.get('/signup', (req, res) => {
  const page_title = "The Tech Blog";
  res.render('signup', {page_title});
});

router.get('/comments/:id', withAuth, async (req, res) => {
  console.log("commentRoutes");
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });
    const page_title = "The Tech Blog";
    //console.log("commentRoute: " + page_title + " " + user + " " +  req.session.logged_in);
    res.render('dashboard', {
      page_title,
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
