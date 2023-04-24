<?php
/**
 *
 *	[SOW] Step Of Web
 *
 *	@author Dorin Grigoras
 *					www.stepofweb.com
 *
 *	Useful PHP functions
 * 	Extract them or use the entire class!
 *
 *	@Usage 			$SOW = new SOW_Core;
 * 							$SOW->classname($params_if_needed);
 *
 **/

class SOW_Core {

	/* dirname(__FILE__) 		used to build full path! */
	var $path__html2pdf 			= 'libs/fpdf/'; // dir only
	var $path__mobile_detect 	= 'libs/Mobile_Detect.php';





	/**
	 *
	 * 	@_postVar
	 * 	$_POST Variables
	 *
	 *
	**/
	function _postVar($var, $type=null) {

		if($type !== null)
			return self::sanitizr('POST', array($var=>$type));


		// actually, not doing anything - is default filter
		$__POST = filter_input_array(INPUT_POST);

		if(!isset($__POST[$var]))
			return null;


		if(is_array($__POST[$var]))
			return $__POST[$var];


		$post = trim($__POST[$var]);
		return (!is_numeric($post) && strlen($post) > 10) ? $this->xss_cleaner($post) : $post;

	}



	/**
	 *
	 * 	@_getVar
	 * 	$_GET Variables

	 *
	**/
	function _getVar($var, $type=null) {

		if($type !== null)
			return self::sanitizr('GET', array($var=>$type));


		// actually, not doing anything - is default filter
		$__GET = filter_input_array(INPUT_GET);


		if(!isset($__GET[$var]))
			return null;


		$get = trim($__GET[$var]);
		return (!is_numeric($get) && strlen($get) > 10) ? $this->xss_cleaner($get) : $get;

	}




	/**
	 *
	 * 	@_requestVar
	 * 	$_GET -or- $_POST
	 *
	 *
	**/
	function _requestVar($var) {

		$__return = self::_getVar($var);
		return ($__return !== null) ? $__return : self::_postVar($var);

	}





	/**
	 *
	 * 	@sanitizer
	 * 	https://www.php.net/manual/en/function.filter-input-array.php
	 * 	https://www.php.net/manual/en/filter.filters.sanitize.php
	 * 	https://www.php.net/book.filter

		EXAMPLE
		$res = $SOW->sanitizr('GET', array(

			'id'		=> 'float',
			// - OR: CUSTOM -
			'id'		=> [FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION],

			'name'		=> 'name',
			'email'		=> 'email',

			'contact'		=> array(
				'name'			=> 'string',
				'email'			=> 'email',
				'comment'		=> 'string',

				// deep levels contact[contact2][name2]
				'contact2'		=> array(
					'name2'			=> 'string',
					'email2'		=> 'email',
					'comment2'		=> 'string',
				)

			)

		));


		05:46 AM Friday, May 22, 2020
		Update for PHP 7.4

		SIMPLE & DIRECT
			$var 	= $SOW->sanitizr('GET', array('var'=>'int'))['var'];
			$var 	= $SOW->sanitizr('GET', array('var'=>'string'))['var'];

			$var 	= $SOW->sanitizr('POST', array('var'=>'int'))['var'];
			$var 	= $SOW->sanitizr('POST', array('var'=>'string'))['var'];
			
			$email 	= $SOW->sanitizr('POST', array('email'=>'string'))['email'];
			$name 	= $SOW->sanitizr('POST', array('name'=>'string'))['name'];
			$phone 	= $SOW->sanitizr('POST', array('phone'=>'string'))['phone'];
			$url 	= $SOW->sanitizr('POST', array('url'=>'string'))['url'];
			$float 	= $SOW->sanitizr('POST', array('float'=>'string'))['float'];

	 *
	**/
	public function sanitizr($TYPE, $array) {

		// Accept POST -or- GET
		if($TYPE === 'POST|GET' || $TYPE === 'GET|POST')
			$TYPE = isset($_GET[key($array)]) ? 'GET' : 'POST';



		// CPU Save
		if($TYPE == 'POST' && !isset($_POST[key($array)]))
			return [key($array) => null];

		else if($TYPE == 'GET' && !isset($_GET[key($array)]))
			return [key($array) => null];

		else if($TYPE == 'COOKIE' && !isset($_COOKIE[key($array)]))
			return [key($array) => null];

		else if($TYPE == 'SERVER' && !isset($_SERVER[key($array)]))
			return [key($array) => null];



		// Switch by request
		switch($TYPE) {

			case 'POST': 			$S_TYPE = INPUT_POST;
												break;

			case 'GET': 			$S_TYPE = INPUT_GET;
												break;

			case 'COOKIE': 		$S_TYPE = INPUT_COOKIE;
												break;

			case 'SERVER': 		$S_TYPE = INPUT_SERVER;
												break;

			case 'ENV': 			$S_TYPE = INPUT_ENV;
												break;

			// Direct Sanitizer, not from post/get/etc
			default: 					return self::sanitizr_input($TYPE, $array);
												break;

		}

		// https://www.php.net/manual/en/filter.filters.sanitize.php
		foreach($array as $val=>$sanitizer_flag) {

			switch($S_TYPE) {

				case INPUT_POST: 	$IS_ARRAY = isset($_POST[$val]) && is_array($_POST[$val]) ? true : false;
													break;

				case INPUT_GET: 	$IS_ARRAY = isset($_GET[$val]) && is_array($_GET[$val]) ? true : false;
													break;

				default: 					$IS_ARRAY = false;

			}

			// Deep Arrays
			if(is_array($sanitizer_flag) && !isset($sanitizer_flag[0])) {

				// Recursive
				foreach($sanitizer_flag as $val_d=>$key_d) {
					$return[$val][$val_d] = self::sanitizr($TYPE, array($val_d => $key_d))[$val_d];
				}

			}

			// Custom flags
			else if(is_array($sanitizer_flag) && isset($sanitizer_flag[0])) {
				$return[$val] = filter_input($S_TYPE, $val, $sanitizer_flag[0], isset($sanitizer_flag[1]) ? $sanitizer_flag[1]: null);
			}
			
			// --

			else if($sanitizer_flag === 'int') {

				if($IS_ARRAY === true)
						$return[$val] = filter_input($S_TYPE, $val, FILTER_SANITIZE_NUMBER_INT, FILTER_REQUIRE_ARRAY);
				else 	$return[$val] = (int) filter_input($S_TYPE, $val, FILTER_SANITIZE_NUMBER_INT);
				
			}

			else if($sanitizer_flag === 'float') {
				$return[$val] = (float) filter_input($S_TYPE, $val, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
			}

			else if ($sanitizer_flag === 'string') {

				if($IS_ARRAY === true)
						$return[$val] = filter_input($S_TYPE, $val, FILTER_SANITIZE_STRING, FILTER_REQUIRE_ARRAY);
				else 	$return[$val] = (string) filter_input($S_TYPE, $val, FILTER_SANITIZE_STRING);
			
			}

			else if ($sanitizer_flag === 'url') {
				$return[$val] = filter_input($S_TYPE, $val, FILTER_SANITIZE_URL);
				$return[$val] = (string) self::fix_url($return[$val]);
			}

			else if ($sanitizer_flag === 'email') {
				$return[$val] = filter_input($S_TYPE, $val, FILTER_SANITIZE_EMAIL);
				$return[$val] = self::ckmail($return[$val]);
			}

			else if ($sanitizer_flag === 'name') {
				$return[$val] = (string) filter_input($S_TYPE, $val, FILTER_SANITIZE_STRING);
				$return[$val] = ucwords($return[$val]);
			}

			else if ($sanitizer_flag === 'phone') {
				$return[$val] = filter_input($S_TYPE, $val, FILTER_SANITIZE_NUMBER_INT);
			}

			else if ($sanitizer_flag === 'skip') {
				$return[$val] = filter_input($S_TYPE, $val, FILTER_UNSAFE_RAW);

			}

			else {
				die('sanitizr: required: int|float|string|url|email|name|phone|skip');
			}

		}

		return isset($return) ? $return : null;

	}





	/**
	 *
	 * 	@sanitizr_input
	 * 
	 *
	**/
	private function sanitizr_input($str, $type='string') {

		if(is_array($str)) {

			foreach($str as $arr) {
				$return[] = self::sanitizr_input($arr, $type);
			}

			return isset($return) ? $return : null;
		}

		// +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++

		else if($type === 'string')
			return filter_var($str, FILTER_SANITIZE_STRING);

		else if($type === 'int')
			return filter_var($str, FILTER_SANITIZE_NUMBER_INT);

		else if($type === 'float')
			return filter_var($str, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

		else if($type === 'email') {

			$return = filter_var($str, FILTER_SANITIZE_EMAIL);
			return Helper::emailValidate($return);

		}

		else if($type === 'url') {

			$return = filter_var($str, FILTER_SANITIZE_URL);
			return (string) Helper::fixUrl($return);

		}

		else if ($type === 'name') {
			$return = (string) filter_var($str, FILTER_SANITIZE_STRING);
			return ucwords($return);
		}

		else if ($type === 'phone') {
			return filter_var($str, FILTER_SANITIZE_NUMBER_INT);
		}

		else if ($type === 'skip') {
			return filter_var($str, FILTER_UNSAFE_RAW);
		}

		return null;
	}





	/**
	 *
	 * 	@xss_cleaner
	 * 	Secure XSS Cleaner
	 *
	 *
	**/
	function xss_cleaner($string) {

		// Simply cut out unwanted
		$string = str_ireplace(array('&amp;','&lt;','&gt;'), array('&amp;amp;','&amp;lt;','&amp;gt;'), $string);
		$string = str_ireplace(array('HTTP-EQUIV','onmouse','onclick','onblur','onfocus','onread','onerr','onload', 'onprop','onchange','onbefo','onactive','onscroll'), 'data-xssfilter', $string);
		$string = str_ireplace('embed', 'embed allowScriptAccess="never" allownetworking="internal"', $string);
		
		// URL encoding
		$string = preg_replace("@%[\dA-F]{2}@", '#', $string);

		// Fix &entity\n;
		$string = preg_replace('/(&#*\w+)[\x00-\x20]+;/u', '$1;', $string);
		$string = preg_replace('/(&#x*[0-9A-F]+);*/iu', '$1;', $string);
		$string = html_entity_decode($string, ENT_COMPAT, 'UTF-8');

		// Remove any attribute starting with "on" or xmlns
		$string = preg_replace('#(<[^>]+?[\x00-\x20"\'])(?:on|xmlns)[^>]*+>#iu', '$1>', $string);

		// Remove javascript: and vbscript: protocols
		$string = preg_replace('#([a-z]*)[\x00-\x20]*=[\x00-\x20]*([`\'"]*)[\x00-\x20]*j[\x00-\x20]*a[\x00-\x20]*v[\x00-\x20]*a[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2nojavascript...', $string);
		$string = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*v[\x00-\x20]*b[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2novbscript...', $string);
		$string = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*-moz-binding[\x00-\x20]*:#u', '$1=$2nomozbinding...', $string);

		// Only works in IE: <span style="width: expression(alert('Ping!'));"></span>
		$string = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?expression[\x00-\x20]*\([^>]*+>#i', '$1>', $string);
		$string = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?behaviour[\x00-\x20]*\([^>]*+>#i', '$1>', $string);
		$string = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:*[^>]*+>#iu', '$1>', $string);

		// Remove namespaced elements (we do not need them)
		$string = preg_replace('#</*\w+:\w[^>]*+>#i', '', $string);

		// non printable characters
		$string = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $string);

		do {
			// Remove really unwanted tags
			$old_data = $string;
			$string = preg_replace('#</*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|i(?:layer)|l(?:ayer|ink)|object|s(?:cript|tyle)|title|xml)[^>]*+>#i', '', $string);
		}
		while ($old_data !== $string);

		// we are done...
		return $string;

	}




	/**
	 *
	 * 	@gzip
	 * 	Create gzip file
	 *
	 *
	**/
	function gzip($src, $dest, $typegz='w') { // typegz = w|w9

		$fp 	= fopen($src, 'r');
		$data 	= fread ($fp, filesize($src));
		fclose($fp);

		$zp 	= gzopen($dest, $typegz);

		gzwrite($zp, $data);
		gzclose($zp);

	}




	/**
	 *
	 * 	@file_write
	 * 	Write to file
	 * 
	 *
	**/
	function file_write($file, $value, $s='w') {

		$fh = fopen($file, $s);
		fwrite($fh, $value); 
		fclose($fh);

	}




	/**
	 *
	 * 	@file_read
	 * 	Rad a file
	 * 
	 *
	**/
	function file_read($file, $return_as_array=false) {

		if($return_as_array === true) {

			$file_lines = file($file);

			foreach ($file_lines as $line) {
				$array[] = $line;
			}

			return $array;
		}


		return file_get_contents($file);

	}




	/**
	 *
	 * 	@html2pdf
	 *
	 * 	http://www.fpdf.org/en/doc/output.htm
	 *
	 * 	Dependencies: 		html2pdf
	 *
		 $action
		 	download 		- force download
		 	save 			- save to local
		 	open 			- open in browser
		 	string 			- return document string
	 *
	**/
	function html2pdf($html, $action='open', $save_path=null, $font_size=12, $font_family='Arial') {

		require_once(dirname(__FILE__) . '/' . $this->path__html2pdf . 'fpdf.php');
		require_once(dirname(__FILE__) . '/' . $this->path__html2pdf . 'html2pdf.php');

		switch($action) {

			case 'save': 			$fpdf_action = 'F';
												break;

			case 'string': 		$fpdf_action = 'S';
												break;

			case 'download': 	$fpdf_action = 'D';
												break;

			// open in browser by default
			default: 					$fpdf_action = 'I';
												break;

		}

		$pdf = new PDF_HTML();
		$pdf->SetFont($font_family,'', $font_size);
		$pdf->AddPage();
		$pdf->WriteHTML($html);

		ob_end_clean(); // required, in case ob_start(); used!

		return $pdf->Output($save_path, $fpdf_action);

	}






	/**
	 *
	 * 	@headerStatusSet
	 * 	Set page header
	 *
	 *
	**/
	function headerStatusSet($code=200, $redirect_url=null, $return_only=false) {

		switch ($code) {
      case 100: $text = 'Continue'; break;
      case 101: $text = 'Switching Protocols'; break;
      case 200: $text = 'OK'; break;
      case 201: $text = 'Created'; break;
      case 202: $text = 'Accepted'; break;
      case 203: $text = 'Non-Authoritative Information'; break;
      case 204: $text = 'No Content'; break;
      case 205: $text = 'Reset Content'; break;
      case 206: $text = 'Partial Content'; break;
      case 300: $text = 'Multiple Choices'; break;
      case 301: $text = 'Moved Permanently'; break;
      case 302: $text = 'Moved Temporarily'; break;
      case 303: $text = 'See Other'; break;
      case 304: $text = 'Not Modified'; break;
      case 305: $text = 'Use Proxy'; break;
      case 400: $text = 'Bad Request'; break;
      case 401: $text = 'Unauthorized'; break;
      case 402: $text = 'Payment Required'; break;
      case 403: $text = 'Forbidden'; break;
      case 404: $text = 'Not Found'; break;
      case 405: $text = 'Method Not Allowed'; break;
      case 406: $text = 'Not Acceptable'; break;
      case 407: $text = 'Proxy Authentication Required'; break;
      case 408: $text = 'Request Time-out'; break;
      case 409: $text = 'Conflict'; break;
      case 410: $text = 'Gone'; break;
      case 411: $text = 'Length Required'; break;
      case 412: $text = 'Precondition Failed'; break;
      case 413: $text = 'Request Entity Too Large'; break;
      case 414: $text = 'Request-URI Too Large'; break;
      case 415: $text = 'Unsupported Media Type'; break;
      case 500: $text = 'Internal Server Error'; break;
      case 501: $text = 'Not Implemented'; break;
      case 502: $text = 'Bad Gateway'; break;
      case 503: $text = 'Service Unavailable'; break;
      case 504: $text = 'Gateway Time-out'; break;
      case 505: $text = 'HTTP Version not supported'; break;
      default:  $text = 'OK'; break; // 200
    }

    $protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.0');


    // RETURN ONLY, DO NOT SET HEADERS
    // OUTPUT EXAMPLE: HTTP/1.0 404 Not Found
    if($return_only === true)
    	return "{$protocol} {$code} {$text}";


    // SET HEADERS
		header('Content-Encoding: none');
		header('Cache-Control: no-store, no-cache');
		header('Cache-Control: post-check=0, pre-check=0');
		header('Pragma: no-cache');
		header("{$protocol} {$code} {$text}");
		header('Status: {$code} {$text}');


		if($redirect_url !== null) { 
			header('Location: ' . $redirect_url); 
			exit; 
		}

	}




	/**
	 *
	 * 	@random_gen
	 * 	Random generator
	 *
	 *
	**/
  function random_gen($length=6, $type=null) { // null = letters+numbers, L = letters, N = numbers

		switch($type) {
			case 'N' :	$chars = '0123456789'; 								break;
			case 'L' :	$chars = 'abcdefghijklmnopqrstuvwxyz'; 				break;
			default  :	$chars = 'abcdefghijklmnopqrstuvwxyz0123456789'; 	break;
		}

		$numChars = strlen($chars); 
		$string 	= '';

    for ($i = 0; $i < $length; $i++) { 
    	$string .= substr($chars, rand(1, $numChars) - 1, 1); 
    }
		
		return $string; 

	}




	/**
	 *
	 * 	@cookies
	 *
	 *
	 *
	**/
	function cookie_set($cookie_name,$cookie_value,$expire=31536000,$serialize=false) { // 3600*24*365 = 1 year

		if($serialize == true) 	setcookie($cookie_name , serialize($cookie_value) , time() + $expire, '/');
		else 										setcookie($cookie_name , $cookie_value , time() + $expire, '/');

	}

	function cookie_get($var,$unserialize=false) {

		if(!isset($_COOKIE[$var]))
			return null;

		if($unserialize === true)
			return unserialize($_COOKIE[$var]);

		return $_COOKIE[$var];

	}

	function cookie_del($cookie_name) {

		setcookie($cookie_name , '' , 0, '/');

	}




	/**
	 *
	 * 	@words_limit
	 *
	 *
	 *
	**/
	function words_limit($string, $length) {

	  $string = explode(' ', $string);
	  return implode(' ' , array_slice($string, 0, $length));

	}



	/**
	 *
	 * 	@b2s
	 *
	 *
	 *
	**/
	function byte2size($bytes, $precision=2) {

		if($bytes < 1) 
				return '0 B';

		$unit = array('B','Kb','Mb','Gb','Tb','Pb','Eb');

		return @round($bytes / pow(1024, ($i = floor(log($bytes, 1024)))), $precision).' '.$unit[$i];

	}



	/**
	 *
	 * 	@file_download
	 *
	 *
	 *
	**/
	function file_download($file_path, $file_name_output=null, $filesize=null) {

		if($file_name_output === null)
			$file_name_output = basename($file_path);
			
		if($filesize === null)
			$filesize = filesize($file_path);

		header('Expires: 0');
		header('Pragma: public'); // for IE
		header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
		header('Content-Type: application/force-download'); 
		header('Content-Type: application/octet-stream', FALSE); 
		header('Content-Type: application/download', FALSE); 
		header('Last-Modified: '.gmdate ('D, d M Y H:i:s', filemtime($file_path)).' GMT');
		header('Content-Description: File Transfer');
		header('Content-Disposition: attachment; filename="'.$file_name_output.'"');
		header('Content-Transfer-Encoding: binary');
		header('Content-Length: ' . $filesize);
		header('Connection: close');
		flush();

		readfile($file_path);
		exit;

	}





	/**
	 *
	 * 	@file_download : string as file
	 *
	 *
	 *
	**/
	function file_download_from_string($string, $output='output.txt') {

		header('Pragma: public'); // for IE
		header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
		header('Content-Type: application/force-download'); 
		header('Content-Disposition: attachment; filename="' . $output . '"');
		header('Content-Type: text/plain');
		header('Content-Length: ' . strlen($string));
		header('Connection: close');
		
		echo $string;
		exit;

	}




	/**
	 *
	 * 	@curl_get
	 * 	CURL used as primary. 
	 * 	file_get_contents() as second solution
	 *
	 *
	**/
	function curl_get($url, $ssl=false, $curl_err_only=false) {

		if(self::__ckCURL() === true) {

			$ch = curl_init();

			curl_setopt($ch,CURLOPT_URL,$url);
			curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
			curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,5);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, $ssl); // disable ssl certificate
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, $ssl); // disable ssl certificate
			curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:17.0) Gecko/20100101 Firefox/17.0');

			$content = curl_exec($ch);

			if($curl_err_only === true)
				$content = curl_error($ch);

			curl_close($ch);

			return $content;

		}


		return file_get_contents($url);
		
	}
		/* helper */
		function __ckCURL() {
			return ( in_array ('curl', get_loaded_extensions()) ) ? true : false;
		}





	/**
	 *
	 * 	@curl_post
	 * 	CURL used to post data
	 *
	 *
	 *
	**/
	function curl_post($url, $array, $ssl=false) { 

		if(self::__ckCURL() !== true)
			return false;

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $array);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, $ssl); // disable ssl certificate
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, $ssl); // disable ssl certificate
		curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:17.0) Gecko/20100101 Firefox/17.0');

		// receive server response
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($ch);
		curl_close ($ch);

		return $response;

	}





	/**
	 *
	 * 	@curl_api
	 * 	GET|POST|PUT|DELETE
	 * 	$ssl = false -OR- .crt absolute path
	 *
	 *
	**/
	function curl_api($url=null, $data=null, $method='GET', $ssl=false) {

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);


    if($ssl === false) {

			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // disable ssl certificate
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // disable ssl certificate

		} else {

			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
			curl_setopt($ch, CURLOPT_CAINFO, getcwd() . $ssl); // ssl path

		}

    switch ($method) {
      case "GET":
          curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
          curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");
          break;

      case "POST":
          curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
          curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
          break;

      case "PUT":
          curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
          curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
          break;

      case "DELETE":
          curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE"); 
          curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
          break;
    }

    // Get response
    $response = curl_exec($curl);

    // Get status code
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    // Close curl
    curl_close($curl);

    // Check the HTTP Status code
    switch ($httpCode) {
        case 200:
        	curl_close($curl);
            return array(
            	'status'	=> 200, // OK
            	'response'	=> $response,
            );
            break;

        case 404:
            return array(
            	'status'	=> 404, // "404: API Not found"
            );
            break;

        case 500:
            return array(
            	'status'	=> 500, // "500: servers replied with an error."
            );
            break;

        case 502:
            return array(
            	'status'	=> 502, // "502: servers may be down or being upgraded. Hopefully they'll be OK soon!"
            );
            break;

        case 503:
            return array(
            	'status'	=> 503, // "503: service unavailable. Hopefully they'll be OK soon!"
            );
            break;

        default:
            return array(
            	'status'	=> 000, // Undocumented error
            );
            break;
    }

    return;

	}




	/**
	 *
	 * 	@user_device
	 *
	 *
	 *
	**/
	function user_device() {
		
		require(dirname(__FILE__) . '/' . $this->path__mobile_detect);
		$Mobile_Detect = new Mobile_Detect;

		return ($Mobile_Detect->isMobile() ? ($Mobile_Detect->isTablet() ? 'tablet' : 'mobile') : 'pc');

	}




	/**
	 *
	 * 	@user_ip
	 *
	 *
	 *
	**/
	function user_ip() {

		if     (getenv('HTTP_CLIENT_IP'))       { $ip = getenv('HTTP_CLIENT_IP');       } 
		elseif (getenv('HTTP_X_FORWARDED_FOR')) { $ip = getenv('HTTP_X_FORWARDED_FOR'); } 
		elseif (getenv('HTTP_X_FORWARDED'))     { $ip = getenv('HTTP_X_FORWARDED');     } 
		elseif (getenv('HTTP_FORWARDED_FOR'))   { $ip = getenv('HTTP_FORWARDED_FOR');   } 
		elseif (getenv('HTTP_FORWARDED'))       { $ip = getenv('HTTP_FORWARDED');       } 
										   else { $ip = $_SERVER['REMOTE_ADDR'];        } 
		return $ip;

	}





	/**
	 *
	 * 	@age_by_date
	 *
	 *
	 *
	**/
	function age_by_date($date) {

		return intval(date('Y', time() - strtotime($date))) - 1970;

	}





	/**
	 *
	 * 	@ckmail
	 * 
	 *
	 *
	**/
	function ckmail($email) {

		$email = trim(strtolower(strip_tags($email)));
		
		// 1. validate email format
		if(filter_var($email, FILTER_VALIDATE_EMAIL) === false)
			return null;

		// 2. validate if MX exists
		if(self::__ckmailmx($email) === false)
			return null;

		return $email;

	}
		/* helper */
		function __ckmailmx($email, $record = 'MX') {
			$email = trim(strtolower($email));

      list($user, $domain) = explode('@', $email);
      return checkdnsrr($domain, $record); // true|false

		}




	/**
	 *
	 * 	@full_url
	 * 	Get page full url
	 *
	 *
	**/
	function full_url($cut_query_string=false) {

		$full_url = self::get_protocol() . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

		if($cut_query_string === true) {

			if(strpos($full_url,'?'))
				list($full_url) = explode('?', $full_url);

			if(strpos($full_url,'&'))
				list($full_url) = explode('&',$full_url);

		}

		return $full_url;

	}




	/**
	 *
	 * 	@fix_url
	 * 	Add http|https to url
	 *
	 * 	Useful when user entered his website without http/https
	 *
	 *
	**/
	function fix_url($url=null, $default_protocol='https://') {

		if(!$url)
			return null;

		$url = trim($url);

		// both support: ssl and non ssl
		if(substr($url, 0, 2) == '//')
			return $url;

		return (substr($url, 0, 4) == 'http') ? $url : $default_protocol . $url;

	}






	/**
	 *
	 * 	@get_protocol
	 * 	Get http|https (without ://)
	 *
	 *
	**/
	function get_protocol() {

		if(isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1) || isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https')
			return 'https';

		return 'http';

	}





	/**
	 *
	 * 	@close_tags
	 * 	Close unclosed html tags
	 *
	 *
	**/
	function close_tags($html) {

		preg_match_all("/<\/?(\w+)((\s+(\w|\w[\w-]*\w)(\s*=\s*(?:\".*?\"|'.*?'|[^'\">\s]+))?)+\s*|\s*)\/?>/i",$html,$result);
		$tags 		= $result[0]; 
		$closeCnt = 0;

		for ($i=count($tags)-1;$i>=0;$i--) {

			if ($tags[$i][strlen($tags[$i])-2] != '/') {
				if ($tags[$i][1] != '/') {

					if (!$closeCnt) $html .= '</'.$result[1][$i].'>'; else $closeCnt--;
				
				} else { $closeCnt++; }
			}

		}

		return $html;
		
	}




	/**
	 *
	 * 	@permalink
	 * Create a permalink (SEO URL) from a title/string

	 	Example:

			Smarty is a Multipuse Template!
	 		 	++ is converted to ++
	 		smarty-is-a-multipurpose-template

	 *
	 *
	**/
	function permalink($string='') {

		if(empty($string))
			return '';
			
		$string 		= strip_tags($string);
		$string 		= str_replace(array('\\', '/','#','!','?','@','$','%','^','&','*','=',"'",'+',':','`','"','.',',','|',')','(','[',']','{','}','~','<','>','^','`'),'',$string);
		$string 		= self::remove_accent($string);
		$string 		= trim($string);
		$explode_var 	= explode(' ', $string);

		foreach($explode_var as $word) {
			$words[] = $word;
		}
		
		return str_replace(array('------', '-----','----','---','--'), '-', strtolower(implode('-',$words)));

	}




	/**
	 *
	 * 	@remove_accent
	 * 	Useful for permaliks
	 *
	 *
	**/
	function remove_accent($str) {

		$accent_array = array(
	 		'ъ' => '-', 'ь' => '-', 'Ъ' => '-', 'Ь' => '-',
      'А' => 'A', 'Ă' => 'A', 'Ǎ' => 'A', 'Ą' => 'A', 'À' => 'A', 'Ã' => 'A', 'Á' => 'A', 'Æ' => 'A', 'Â' => 'A', 'Å' => 'A', 'Ǻ' => 'A', 'Ā' => 'A', 'א' => 'A',
      'Б' => 'B', 'ב' => 'B', 'Þ' => 'B',
      'Ĉ' => 'C', 'Ć' => 'C', 'Ç' => 'C', 'Ц' => 'C', 'צ' => 'C', 'Ċ' => 'C', 'Č' => 'C', '©' => 'C', 'ץ' => 'C',
      'Д' => 'D', 'Ď' => 'D', 'Đ' => 'D', 'ד' => 'D', 'Ð' => 'D',
      'È' => 'E', 'Ę' => 'E', 'É' => 'E', 'Ë' => 'E', 'Ê' => 'E', 'Е' => 'E', 'Ē' => 'E', 'Ė' => 'E', 'Ě' => 'E', 'Ĕ' => 'E', 'Є' => 'E', 'Ə' => 'E', 'ע' => 'E',
      'Ф' => 'F', 'Ƒ' => 'F',
      'Ğ' => 'G', 'Ġ' => 'G', 'Ģ' => 'G', 'Ĝ' => 'G', 'Г' => 'G', 'ג' => 'G', 'Ґ' => 'G',
      'ח' => 'H', 'Ħ' => 'H', 'Х' => 'H', 'Ĥ' => 'H', 'ה' => 'H',
      'I' => 'I', 'Ï' => 'I', 'Î' => 'I', 'Í' => 'I', 'Ì' => 'I', 'Į' => 'I', 'Ĭ' => 'I', 'I' => 'I', 'И' => 'I', 'Ĩ' => 'I', 'Ǐ' => 'I', 'י' => 'I', 'Ї' => 'I', 'Ī' => 'I', 'І' => 'I',
      'Й' => 'J', 'Ĵ' => 'J',
      'ĸ' => 'K', 'כ' => 'K', 'Ķ' => 'K', 'К' => 'K', 'ך' => 'K',
      'Ł' => 'L', 'Ŀ' => 'L', 'Л' => 'L', 'Ļ' => 'L', 'Ĺ' => 'L', 'Ľ' => 'L', 'ל' => 'L',
      'מ' => 'M', 'М' => 'M', 'ם' => 'M',
      'Ñ' => 'N', 'Ń' => 'N', 'Н' => 'N', 'Ņ' => 'N', 'ן' => 'N', 'Ŋ' => 'N', 'נ' => 'N', 'ŉ' => 'N', 'Ň' => 'N',
      'Ø' => 'O', 'Ó' => 'O', 'Ò' => 'O', 'Ô' => 'O', 'Õ' => 'O', 'О' => 'O', 'Ő' => 'O', 'Ŏ' => 'O', 'Ō' => 'O', 'Ǿ' => 'O', 'Ǒ' => 'O', 'Ơ' => 'O',
      'פ' => 'P', 'ף' => 'P', 'П' => 'P',
      'ק' => 'Q',
      'Ŕ' => 'R', 'Ř' => 'R', 'Ŗ' => 'R', 'ר' => 'R', 'Р' => 'R', '®' => 'R',
      'Ş' => 'S', 'Ś' => 'S', 'Ș' => 'S', 'Š' => 'S', 'С' => 'S', 'Ŝ' => 'S', 'ס' => 'S',
      'Т' => 'T', 'Ț' => 'T', 'ט' => 'T', 'Ŧ' => 'T', 'ת' => 'T', 'Ť' => 'T', 'Ţ' => 'T',
      'Ù' => 'U', 'Û' => 'U', 'Ú' => 'U', 'Ū' => 'U', 'У' => 'U', 'Ũ' => 'U', 'Ư' => 'U', 'Ǔ' => 'U', 'Ų' => 'U', 'Ŭ' => 'U', 'Ů' => 'U', 'Ű' => 'U', 'Ǖ' => 'U', 'Ǜ' => 'U', 'Ǚ' => 'U', 'Ǘ' => 'U',
      'В' => 'V', 'ו' => 'V',
      'Ý' => 'Y', 'Ы' => 'Y', 'Ŷ' => 'Y', 'Ÿ' => 'Y',
      'Ź' => 'Z', 'Ž' => 'Z', 'Ż' => 'Z', 'ז' => 'Z',
      
      'а' => 'a', 'ă' => 'a', 'ǎ' => 'a', 'ą' => 'a', 'à' => 'a', 'ã' => 'a', 'á' => 'a', 'æ' => 'a', 'â' => 'a', 'å' => 'a', 'ǻ' => 'a', 'ā' => 'a', 'א' => 'a',
      'б' => 'b', 'ב' => 'b', 'þ' => 'b',
      'ĉ' => 'c', 'ć' => 'c', 'ç' => 'c', 'ц' => 'c', 'צ' => 'c', 'ċ' => 'c', 'č' => 'c', '©' => 'c', 'ץ' => 'c',
      'Ч' => 'ch', 'ч' => 'ch',
      'д' => 'd', 'ď' => 'd', 'đ' => 'd', 'ד' => 'd', 'ð' => 'd',
      'è' => 'e', 'ę' => 'e', 'é' => 'e', 'ë' => 'e', 'ê' => 'e', 'е' => 'e', 'ē' => 'e', 'ė' => 'e', 'ě' => 'e', 'ĕ' => 'e', 'є' => 'e', 'ə' => 'e', 'ע' => 'e',
      'ф' => 'f', 'ƒ' => 'f',
      'ğ' => 'g', 'ġ' => 'g', 'ģ' => 'g', 'ĝ' => 'g', 'г' => 'g', 'ג' => 'g', 'ґ' => 'g',
      'ח' => 'h', 'ħ' => 'h', 'х' => 'h', 'ĥ' => 'h', 'ה' => 'h',
      'i' => 'i', 'ï' => 'i', 'î' => 'i', 'í' => 'i', 'ì' => 'i', 'į' => 'i', 'ĭ' => 'i', 'ı' => 'i', 'и' => 'i', 'ĩ' => 'i', 'ǐ' => 'i', 'י' => 'i', 'ї' => 'i', 'ī' => 'i', 'і' => 'i',
      'й' => 'j', 'Й' => 'j', 'Ĵ' => 'j', 'ĵ' => 'j',
      'ĸ' => 'k', 'כ' => 'k', 'ķ' => 'k', 'к' => 'k', 'ך' => 'k',
      'ł' => 'l', 'ŀ' => 'l', 'л' => 'l', 'ļ' => 'l', 'ĺ' => 'l', 'ľ' => 'l', 'ל' => 'l',
      'מ' => 'm', 'м' => 'm', 'ם' => 'm',
      'ñ' => 'n', 'ń' => 'n', 'н' => 'n', 'ņ' => 'n', 'ן' => 'n', 'ŋ' => 'n', 'נ' => 'n', 'ŉ' => 'n', 'ň' => 'n',
      'ø' => 'o', 'ó' => 'o', 'ò' => 'o', 'ô' => 'o', 'õ' => 'o', 'о' => 'o', 'ő' => 'o', 'ŏ' => 'o', 'ō' => 'o', 'ǿ' => 'o', 'ǒ' => 'o', 'ơ' => 'o',
      'פ' => 'p', 'ף' => 'p', 'п' => 'p',
      'ק' => 'q',
      'ŕ' => 'r', 'ř' => 'r', 'ŗ' => 'r', 'ר' => 'r', 'р' => 'r', '®' => 'r',
      'ş' => 's', 'ś' => 's', 'ș' => 's', 'š' => 's', 'с' => 's', 'ŝ' => 's', 'ס' => 's',
      'т' => 't', 'ț' => 't', 'ט' => 't', 'ŧ' => 't', 'ת' => 't', 'ť' => 't', 'ţ' => 't',
      'ù' => 'u', 'û' => 'u', 'ú' => 'u', 'ū' => 'u', 'у' => 'u', 'ũ' => 'u', 'ư' => 'u', 'ǔ' => 'u', 'ų' => 'u', 'ŭ' => 'u', 'ů' => 'u', 'ű' => 'u', 'ǖ' => 'u', 'ǜ' => 'u', 'ǚ' => 'u', 'ǘ' => 'u',
      'в' => 'v', 'ו' => 'v',
      'ý' => 'y', 'ы' => 'y', 'ŷ' => 'y', 'ÿ' => 'y',
      'ź' => 'z', 'ž' => 'z', 'ż' => 'z', 'з' => 'z', 'ז' => 'z', 'ſ' => 'z',
      
      '™' => 'tm', '&amp;' => 'and', '@' => 'at',
      'Ä' => 'ae', 'Ǽ' => 'ae', 'ä' => 'ae', 'æ' => 'ae', 'ǽ' => 'ae',
      'ĳ' => 'ij', 'Ĳ' => 'ij',
      'я' => 'ja', 'Я' => 'ja',
      'Э' => 'je', 'э' => 'je',
      'ё' => 'jo', 'Ё' => 'jo',
      'ю' => 'ju', 'Ю' => 'ju',
      'œ' => 'oe', 'Œ' => 'oe', 'ö' => 'oe', 'Ö' => 'oe',
      'щ' => 'sch', 'Щ' => 'sch',
      'ш' => 'sh', 'Ш' => 'sh',
      'ß' => 'ss',
      'Ü' => 'ue',
      'Ж' => 'zh', 'ж' => 'zh',
		);

		return strtr($str, $accent_array);

	}

}
