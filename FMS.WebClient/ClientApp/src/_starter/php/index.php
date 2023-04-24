<?php 
	/** **********************************************************
 	 *
 	 *	A basic PHP functions helping you get started (or play with)
 	 *	Most common functions added to one class (sow_core/sow.core.php)
 	 *
 	 *	Few libs are also added:
 	 *		- Mobile Detect
 	 *		- PHP Mailer
 	 *		- HTML 2 PDF
 	 *
 	 * 	
 	 *	Note: 	Save your files UTF-8 if this php used mixed with html!
 	 * 			ob_start('ob_gzhandler'); require 0 preouput (sow.init.php)
 	 *
 	 *
	 *	@author 		Dorin Grigoras
	 *					www.stepofweb.com
 	 *
	********************************************************** **/
	require_once('config.inc.php');
	require_once('sow_core/sow.init.php');
	require_once('sow_core/sow.core.php');

	/* Init */
	$SOW = new SOW_Core;


	/*

		++++++++++++++++++++++++++++++++++++
		Uncomment the line you want to test!
		++++++++++++++++++++++++++++++++++++

	*/








	/*

		Variables from $_POST and $_GET
		XSS Cleaner is used as a security plus. No other sanitization!
		Array $_POST is returned as it is!

	*/
	// echo $SOW->_postVar('email');				// return $_GET['email'] ; return null if not set
	// echo $SOW->_getVar('email');					// return $_POST['email'] ; return null if not set
	// echo $SOW->_requestVar('email');			// return $_GET['email'] -or- $_POST['email'] - autodetect - not $_REQUEST ; return null if not set



	/*
		
		SANITIZED
		SECURE DATA FROM GET|POST|COOKIE|ETC - see function for more
		SIMPLE & DIRECT - examples



	*/
	// $var 	= $SOW->sanitizr('GET', array('form_string'=>'string'))['form_string'];
	// $var 	= $SOW->sanitizr('POST', array('form_int'=>'int'))['form_int'];
	// $var 	= $SOW->sanitizr('POST', array('form_price'=>'float'))['form_price'];
	
	// $email 	= $SOW->sanitizr('POST', array('form_email'=>'email'))['form_email'];
	// $name 	= $SOW->sanitizr('POST', array('form_name'=>'string'))['form_name'];
	// $phone 	= $SOW->sanitizr('POST', array('form_phone'=>'phone'))['form_phone'];
	// $url 	= $SOW->sanitizr('POST', array('form_url'=>'url'))['form_url'];

	// Skip sanitiazation, just get the variable!
	// $var 	= $SOW->sanitizr('POST', array('float'=>'string'))['float'];
	
	// Get Cookie
	// $cookie 	= $SOW->sanitizr('COOKIE', array('cookie'=>'string'))['cookie'];

	/*
		
		ARRAY (MULTIPLE)

	*/
	// $array = $SOW_Core->sanitizr('POST', array(
	// 	'id'		=>	'int'
	// 	'address'	=>	'string'
	// 	'email'		=>	'email'
	// 	'name'		=>	'name'
	// ));
	// echo $array['id'];
	// echo $array['address'];
	// echo $array['email'];
	// echo $array['name'];



	/*

		++ EXPLAINING THIS FUNCTION ++

	      *1                                       *2         *3           *4                    
	    $email = $SOW->sanitizr('POST', array('form_email'=>'email'))['form_email'];
			
			*1 = Is the data you can safely use, after sanitization.
			*2 = Is the form element ($_POST['form_email'])
			*3 = Sanitizer FILTER - so the sanitizer know exactly how to securely test/check/remove/ malicious data
			*4 = *2  MUST BE IDENTICAL! Is the final array name the server is sending back! (is actually a shortcut, to have a single line of code)

			FILTERS
				'int'
				'float'
				'string'
				'url'
				'email'
				'name'
				'phone'
				'skip' 	- 	skip sanitization, return raw data!
							recommended to use 'string' instead!

	*/














	/*

		HTML TO PDF!

			Second param:
				'open' 		- open in browser
				'download' 	- download as a file

	*/
	// $SOW->html2pdf('This is my PDF! <br> Like it?', 	'open', 		null, 11, 'Helvetica');
	// $SOW->html2pdf('This is my PDF! <br> Like it?', 	'download', 	"output_name.pdf", 11, 'Helvetica');




	/*

		Useful if needed

	*/
	// echo $SOW->ckmail('some@email.com'); 											// check for a valid email format & valid domain. return: null (invalid) -or- trim(strtolower($email_address))
	// echo $SOW->user_device(); 																	// return: mobile|tablet|pc 
	// echo $SOW->user_ip(); 																			// return: user IP
	// echo $SOW->age_by_date('1982/06/29'); 											// Return age by date
	
	/* Redirects - see the class for all codes! */
	// echo $SOW->headerStatusSet(404); 													// Set header to: 404 not found
	// echo $SOW->headerStatusSet(301, 'new-url-redirect.html'); 	// 301 redirect

	// echo $SOW->full_url(); 																		// full current URL
	// echo $SOW->fix_url('www.google.com'); 											// add https:// to url if mising
	// echo $SOW->close_tags('<div>lorem <a href="#">ipsum'); 		// fix html unclosed tags
	// echo $SOW->permalink('Smarty is a Multipuse Template! !!'); 						// create a permalink from a string (usable as URL)
	// echo $SOW->remove_accent('ÎĂÎÂȘȚ ăîâșț litere în limba română ;)'); 		// remove accents (function used by permalink())

	// echo $SOW->random_gen(10); 																// Random chars (leters & numbers)
	// echo $SOW->random_gen(8, 'L'); 														// Random letters only
	// echo $SOW->random_gen(6, 'N'); 														// Random numbers only
	
	/* Curl */
	// echo $SOW->curl_get($url, false); 													// CURL used to get content. Second param: false = disable SSL certificate
	// echo $SOW->curl_post($url, $array, false); 								// CURL used to post content. Last param: false = disable SSL certificate
	// echo $SOW->curl_api($url, $data, $method, $ssl); 					// $method = GET|POST|PUT|DELETE ; $ssl = false -OR- path to ssl certificate
	
	/* Cookies */
	// echo $SOW->cookie_set('cookie_name', 'cookie_value', expire_days, serialize); 	// serialize = true|false. default: false
	// echo $SOW->cookie_get('cookie_name', unserialize[true|false]); 								// serialize = true|false. default: false
	// echo $SOW->cookie_del('cookie_name');

	// echo $SOW->xss_cleaner('string to clean'); 																			// check & remove XSS by different patterns
	// echo $SOW->words_limit('long string here', 100); 																// words limiter
	// echo $SOW->byte2size(7897382942); 																								// bytes to size (890Kb, 5Mb, 2.1Gb, etc).
	// echo $SOW->file_download('path/to/file.pdf', 'download_as_name_optional.pdf'); 	// download a file from server instead of opening
	// $SOW->file_download_from_string('Lorem ipsum dolor', 'test.txt');								// download string as a file
	// echo $SOW->gzip('path/of/file.txt', 'dest/to/file.gz', 'w'); 										// create a gzip file. zip type: w / w9
	// $SOW->file_write('test.txt', "Lorem ipsum dolor sit amet\n", 'a'); 							// create a file ('a' = append , 'w' = write, one line)
	// echo $SOW->file_read('test.txt', false); 										
	// var_dump($SOW->file_read('test.txt', true)); 																		// second param: true = return as array each line from the file
