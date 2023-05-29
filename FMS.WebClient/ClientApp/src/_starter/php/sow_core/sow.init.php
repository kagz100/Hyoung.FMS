<?php 
	/** **********************************************************
 	 *
 	 *	@Init
 	 *
 	 *
	 *	@author 		Dorin Grigoras
	 *					www.stepofweb.com
 	 *
	********************************************************** **/

	/**
	 *
	 * 	@Errors & Notices
	 *		[true|false]
	 * 		set by config file
	 *
	**/
	$errVal = ($display_errors === true) ? 1 : 0;
	@ini_set('display_errors', $errVal);
	@ini_set('track_errors', $errVal);
	@ini_set('display_startup_errors', $errVal);
	@error_reporting(($errVal === 1) ? E_ALL : NULL);




	/**
	 *
	 * 	@Sessions
	 * 	Initial settings
	 *
	**/
	@session_name('SOW'); 								// Set a custom session name
	@ini_set('session.entropy_length', '512');			// And going overkill with entropy length for maximum security
	@ini_set('session.entropy_file', '/dev/urandom');	// Better session id's (avoid collisions on high traffic - same session id)
	@ini_set('session.cookie_lifetime', 2592000);		// 30 days
	@ini_set('session.cookie_httponly', true);			// Stops javascript being able to access the session id
	@session_save_path('/tmp/'); session_start();		// Start the php session



	/**
	 *
	 * 	@GZIP Compression
	 *  ob_start('ob_gzhandler'); needs zero preoutput!
	 * 
	 *
	**/
	if(!ini_get('safe_mode')) 		{ set_time_limit(0); }
	// if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) 
	// 	if (extension_loaded('zlib') && !ini_get('zlib.output_compression'))
	// 		ob_start('ob_gzhandler');




	/**
	 *
	 * 	@Headers
	 *
	 *
	**/
	header('Content-type: text/html; charset=UTF-8');
	header('Expires: ' . gmdate('D, d M Y H:i:s', time() + (3600 * 24 * 12)) . ' GMT');
	$etagmd5 = floor(time()/30)*30; 
	header('ETag: '.md5($etagmd5));
	header('Accept-Encoding: compress, gzip');
