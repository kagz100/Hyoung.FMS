<?php
/**
 * @version			v1.0.0
 * @author			Dorin Grigoras 
 * 					www.stepofweb.com
 *
 * @date			Monday, Nov 26, 2018
 * @update			Tuesday, Jul 16, 2019
 * @copyright 		[SOW] 	Stepofweb
 *
 * @dependendcies 	PHPMailer
 *
 *


		@Changelog

			* Tuesday, Jul 16, 2019
				** Adapted for Smarty Template
				** Added __ckmail() so can be used alone
				-- Dorin Grigoras

			* Monday, Nov 26, 2018
				** Initial Release
				-- Dorin Grigoras



		@Documentation

			1. [email_to]
			$array['email_to'][] = array(
				'email' => 'some@email.com', 
				'name' => 'John Doe - or leave empty'
			);


			2. [email_attachment]
			$array['email_attachment'][] = array(
				'file_path' => '/some/path/to.zip', 
				'file_name' => 'to.zip - or leave empty',
			);


			3. Rendering
			$return = SOW_Smtp::render(array(
				'email_subject'				=> '',							// Required
				'email_to'					=> $array['email_to'], 			// Required, array format
				  'email_cc'				=> '',							// NOT TESTED
				  'email_bcc'				=> '',							// NOT TESTED
				'email_from'				=> '', 							// Required
				'email_from_name'			=> '', 							// Optional
				'email_reply_to'			=> '',							// Optional | Recommended
				'email_body'				=> '', 							// Well...
				'email_attachment'			=> $array['email_attachment'],	// Optional
			));


			4. View smtp response
			var_dump($return);


			++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++
			RETURNS
				null 	= error, body/sender/etc not valid
				false 	= email not sent (email invalid or some other reason)
				true 	= email successfully sent
				string 	= debug / provider message
			++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++


		CONFIG EXAMPLE
			$config['sow.smtp:provider_email_list'] 		= array(

					array( 
						'name'			=> 'My Hosting',				// Informative only
						'enabled'		=> false, 						// true|false

						'host'			=> 'my-smtp-from-cpanel.com',
						'port'			=> 587, 						// 25, 465 or 587
						'type'			=> 'tls',						// secure type: tls or ssl (deprecated)
						'user'			=> 'noreply@mydomain.com',
						'pass'			=> 'noreply_email_password',
					),

					... more providers
			);

**/
class SOW_Smtp {

	
	// --


	private static $verbose_debug 				= false; 			// true verbose debug, false = disable debug
	private static $is_html 					= true;				// html email
	// --
	private static $smtp_server_host; 								// host
	private static $smtp_server_port			= 587; 				// smtp port (25, 465 or 587)
	private static $smtp_server_user;								// smtp user
	private static $smtp_server_pass;								// smtp password
	private static $smtp_server_secure			= 'tls'; 			// 'tls' -or- 'ssl' (ssl is deprecated)
	// --
	private static $Email_Subject 				= 'Contact Form';
	private static $Email_Body;
	private static $Email_Alt_Body				= 'Please, use a compatible HTML email client!'; 	// Non HTML email client
	private static $Email_setFrom_Email;
	private static $Email_setFrom_Name;
	private static $Email_addReplyTo_Email;
	private static $Email_addReplyTo_From 		= 'Reply to';
	private static $Email_addCC_Email 			= null;
	private static $Email_addBCC_Email 			= null;
	private static $Email_addAddress 			= array(); 			// array(0 => array('email' => 'some@email.com', 'name' => 'John Doe - or leave empty'))
	private static $Email_addAttachment 		= array(); 			// array(0 => array('file_path' => '/some/path/to.zip', 'file_name' => 'to.zip - or leave empty'))
	// --
	private static $Email_Language 				= null; 			// optional phpmailer: 'en', 'ro', 'de', 'fr', etc (not used/needed, anyway)
	private static $phpmailer_dir				= 'sow_core/libs/phpmailer/6.0.7/'; // sow_core/libs/phpmailer/6.0.7/	

	// ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++
	private static $config;
	private static $last_return;
	// ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++



	// --



	/**
	 * 	::render
	 *
	 * 	@return 	true 	: sent
	 * 				false 	: not sent
	 * 				null 	: error, body/sender/provider/etc not valid
	 * 				:err__provider__not_found: 			(no available provider)
	 * 				:err__provider__missconfigured: 	(something missing in config)
	 * 				:err__email_to__invalid_format: 	(array required)
	 *
	 * 	@public
	 * 	@author 	Dorin Grigoras
	 *
	 *
	**/
	public static function render($array) {

		global $config;
		self::$config = $config;

		if(!is_array($array['email_to']))
			return ':err__email_to__invalid_format:';


		// Required Params
		self::$Email_Subject			= isset($array['email_subject']) 		? trim(strip_tags($array['email_subject']))			: self::$Email_Subject;
		self::$Email_Body				= isset($array['email_body']) 			? $array['email_body'] 								: '';
		self::$Email_setFrom_Email		= isset($array['email_from']) 			? $array['email_from'] 								: null;
		self::$Email_setFrom_Name		= isset($array['email_from_name']) 		? $array['email_from_name'] 						: null;
		self::$Email_addReplyTo_Email	= isset($array['email_reply_to']) 		? self::__ckmail($array['email_reply_to'])			: $array['email_from'];
		self::$Email_addReplyTo_From	= isset($array['email_reply_from']) 	? $array['email_reply_from'] 						: $array['email_from_name'];// name (sender)
		self::$Email_addCC_Email		= isset($array['email_cc']) 			? self::__ckmail($array['email_cc']) 				: null;
		self::$Email_addBCC_Email		= isset($array['email_bcc']) 			? self::__ckmail($array['email_bcc'])				: null;
		self::$Email_addAttachment		= isset($array['email_attachment']) 	? $array['email_attachment'] 						: array(); 					// array(0 => array('file_path' => '/some/path/to.zip', 'file_name' => 'to.zip - or leave empty'))
		self::$Email_addAddress			= isset($array['email_to']) 			? $array['email_to'] 								: array(); 					// array(0 => array('email' => 'some@email.com', 'name' => 'John Doe - or leave empty'))

		// not required but might be used if really needed
		self::$is_html					= isset($array['email_is_html']) 		? $array['email_is_html'] 							: self::$is_html; 			// true|false
		self::$Email_Language			= isset($array['email_lang']) 			? $array['email_lang'] 								: self::$Email_Language; 	// 'en', 'ro', 'fr', etc (useless - only errors are displayed in different language).
		self::$Email_Alt_Body			= isset($array['email_body_alt']) 		? $array['email_body_alt'] 							: self::$Email_Alt_Body;



		/**
			
			1. Start the looper

		**/
		$return = self::__looper();



		/*
			
			2. Return
		*/
		
		if($return === true)			// email successfully sent
			return true;


		else if($return === null)		// error, body/sender/provider/etc not valid
			return null;


		else if($return === false)		// email not sent
			return false;


		else {

			/*

				PHPMAILER ERROR
				Future implementation - save to a log!

			*/
			return $return;

		}


		return false;
	}





	/**
	 * 	@__looper
	 *
	 * 	@return 	true 	: sent
	 * 				false 	: not sent
	 * 				null 	: error, body/sender/provider/etc not valid
	 *
	 * 	@private
	 * 	@author 	Dorin Grigoras
	 *
	 *
	**/
	private static function __looper() {

		foreach(self::$config['sow.smtp:provider_email_list'] as $key=>$provider_detail) {


			/*

				@Invalid! But WHYYYY?
				Remove from the list and skip

			*/
			if(!is_array($provider_detail)) {
				self::$last_return = ':err__provider__missconfigured:';
				unset(self::$config['sow.smtp:provider_email_list'][$key]);
				continue;
			}



			/* 

				@Disabled! Oh!
				Remove from the list and skip

			*/
			else if($provider_detail['enabled'] !== true) {
				unset(self::$config['sow.smtp:provider_email_list'][$key]);
				continue;
			}



			/*

				@Found one!
				Let's try it!

			*/
			self::$smtp_server_host 	= trim($provider_detail['host']);
			self::$smtp_server_port 	= (int) $provider_detail['port'];
			self::$smtp_server_user 	= trim($provider_detail['user']);
			self::$smtp_server_pass 	= trim($provider_detail['pass']);
			self::$smtp_server_secure 	= trim($provider_detail['type']); // 'tls' -or- 'ssl' (deprecated)

			/*
				1. Safe Check
			*/
			if(self::$smtp_server_host == '' || self::$smtp_server_port < 1 || self::$smtp_server_user == '' || self::$smtp_server_pass == '') {
				self::$last_return = ':err__provider__missconfigured:';
				unset(self::$config['sow.smtp:provider_email_list'][$key]);
				continue;
			}


			/*
				2. Send email
			*/
			self::$last_return = self::__PHPMailerSend();


			/*
				Oh! Not sent!
				Let go further to another provider
			*/
			if(self::$last_return !== true)
				continue;


			/*
				Sent! Well Done!
				Stop and return!
			*/
			return self::$last_return;

		}



		/*
			
			@Total fail!
			No provider, that's it!

		*/	return self::$last_return;

	}







	/**
	 * 	@__PHPMailerSend
	 *
	 * 	@return 	true|error
	 *
	 * 	@private
	 * 	@author 	Dorin Grigoras
	 *
	 *
	**/
	private static function __PHPMailerSend() {


	    /* 

	    	@PHPMailer 
	    	Core Files

	    */	
	    $phpmailer_dir = isset(self::$config['sow.smtp:phpmailer_dir']) ? self::$config['sow.smtp:phpmailer_dir'] : self::$phpmailer_version;
		require_once($phpmailer_dir . 'src/PHPMailer.php');
		require_once($phpmailer_dir . 'src/SMTP.php');
		require_once($phpmailer_dir . 'src/Exception.php');

		/* 
			@PHPMailer instance
		*/	$mail = new PHPMailer\PHPMailer\PHPMailer();			// Passing `true` enables exceptions





	    /*

	    	Email :: Server settings

	    */
	    $mail->isSMTP();											// Set mailer to use SMTP
	    $mail->Host 		= self::$smtp_server_host;				// Specify main and backup SMTP servers
	    $mail->SMTPAuth 	= true;									// Enable SMTP authentication
	    $mail->Username 	= self::$smtp_server_user;				// SMTP username
	    $mail->Password 	= self::$smtp_server_pass;				// SMTP password
	    $mail->SMTPSecure 	= self::$smtp_server_secure;			// Enable TLS encryption, `ssl` also accepted
	    $mail->Port 		= self::$smtp_server_port; 				// TCP port to connect to


	    /* Debug */
	    if(self::$verbose_debug === true)
	    	$mail->SMTPDebug = 2;


	    /* 

	    	Email :: Language
	    	Useless, only errors are translated

	    */
		if(self::$Email_Language !== null)
			$mail->setLanguage(self::$Email_Language);



	    /* 

	    	Email :: Attachments
	    	multiple address supported

	    */
	    if(is_array(self::$Email_addAttachment) && count(self::$Email_addAttachment) > 0) {

		    foreach(self::$Email_addAttachment as $attachment) {
		    	
		    	if($attachment['file_path'] == '')
		    		continue;

		    	if($attachment['file_name'] != '')
		    		$mail->addAttachment($attachment['file_path'], $attachment['file_name']);			// Add attachments
		    	else
		    		$mail->addAttachment($attachment['file_path']);									// Optional name

		    }

	    }




	    /* 

	    	Email :: Content

	    */
	    $mail->isHTML(self::$is_html);								// Set email format to HTML
	    $mail->Subject = self::$Email_Subject; 						// Email subject
	    $mail->Body    = self::$Email_Body; 						// 'This is the HTML message body <b>in bold!</b>';
	    $mail->AltBody = self::$Email_Alt_Body; 					// 'This is the body in plain text for non-HTML mail clients';



	    /* 

	    	Email :: Recipients

	    */
	    $mail->addReplyTo(self::$Email_addReplyTo_Email, self::$Email_addReplyTo_From);	// keep it first!

	    // multiple address supported
	    if(is_array(self::$Email_addAddress) && count(self::$Email_addAddress) > 0) {

		    foreach(self::$Email_addAddress as $recipient) {

		    	$recipient['email'] = self::__ckmail($recipient['email']);
		    	$recipient['name'] 	= trim(strip_tags($recipient['name']));

		    	if($recipient['email'] === null)
		    		continue;

		    	if($recipient['name'] != '')
		    		$mail->addAddress($recipient['email'], $recipient['name']);			// Add a recipient with name
		    	else
		    		$mail->addAddress($recipient['email']);								// Add a recipient without name

		    }

	    }



	    /* 

	    	Email :: From

	    */
	    $mail->setFrom(self::$Email_setFrom_Email, self::$Email_setFrom_Name);



	    /* 

	    	Email :: Carbon Copy 1

	    */
	    if(self::$Email_addCC_Email != '')
	    	$mail->addCC(self::$Email_addCC_Email);
	    


	    /* 

	    	Email :: Carbon Copy 2

	    */
	    if(self::$Email_addBCC_Email != '')
	    $mail->addBCC(self::$Email_addBCC_Email);



	    /* 

	    	Email :: SEND

	    */
		if($mail->send())
			return true;


	    /* 

	    	Email :: Error

	    */
		return $mail->ErrorInfo;

	}




	/**
	 * 	@__ckmail : format check only
	 *
	 * 	@return 	email|null
	 *
	 * 	@private
	 * 	@author 	Dorin Grigoras
	 *
	 *
	**/
	private static function __ckmail($email) {

		$email = trim(strtolower(strip_tags($email)));
		
		// validate email format only
		if(filter_var($email, FILTER_VALIDATE_EMAIL) === false)
			return null;

		return $email;

	}

}
