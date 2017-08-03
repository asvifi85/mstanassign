var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Stock quotes. */
router.get('/stockdata', function(req, res, next) {
var jsonData = [{"id":1, "account":"IRA-5200",  "price":"5,763.36","change_in_percent":"-0.08","changed_price":"8,916.69"},
				{"id":2, "account":"AAA-3800",  "price":"10,050,054.07","change_in_percent":"0.07","changed_price":"8,916.69"},
				{"id":3, "account":"REG-2019",  "price":"13,450,231.38","change_in_percent":"0","changed_price":"0"},
				{"id":4, "account":"BSC-1219",  "price":"1,450,432.37","change_in_percent":"-2.4","changed_price":"2342"},
				{"id":5, "account":"NSE-2916",  "price":"1,23,343.33","change_in_percent":"3.4","changed_price":"423"}];
 res.json(jsonData);
});
module.exports = router;
