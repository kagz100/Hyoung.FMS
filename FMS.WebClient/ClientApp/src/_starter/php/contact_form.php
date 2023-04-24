<?php 
	/** **********************************************************
 	 *
 	 *	Smarty PHP Contact Form
 	 *	https://wrapbootstrap.com/theme/smarty-website-admin-rtl-WB02DSN1B
	 *
	 *	SOW AJAX FORM : Expecting Return
	 *		1. unexpected error: 		if server response is this string: {:err:unexpected:}
	 *		2. mising mandatory:		if server response is this string: {:err:required:}
	 *		3. success:							if server response is this string: {:success:}
	 *		Else, will print what server spit out, if debug Smarty is enabled!
	 *
	 * 	HTML Attributes:
	 *		data-ajax-control-alerts="true"
	 *		data-ajax-control-alert-succes="#contactSuccess" 
	 *		data-ajax-control-alert-unexpected="#contactErrorUnexpected" 
	 *		data-ajax-control-alert-mandaroty="#contactErrorMandatory" 
	 *
	********************************************************** **/
	require_once('config.inc.php');
	require_once('sow_core/sow.init.php');
	require_once('sow_core/sow.core.php');
	$SOW = new SOW_Core; /* Init */


	/**

		Required: 
			$_POST['action'] = 'contact_form_submit'

	**/
	if($SOW->sanitizr('POST', array('action'=>'string'))['action'] !== 'contact_form_submit') {
		$SOW->headerStatusSet(404);
		die('{:err:unexpected:}');
	}

	// Low/noob Spammy Robots filter!
	else if($SOW->sanitizr('POST', array('norobot'=>'string'))['norobot'] !== '') {
		$SOW->headerStatusSet(404);
		die('{:err:unexpected:}');
	}


	// [SECURITY] : Sanitize Posts
	$array = [

		'contact_department'	=> $SOW->sanitizr('POST', array('contact_department'=>'string'))['contact_department'],
		'contact_subject'		=> $SOW->sanitizr('POST', array('contact_subject'=>'string'))['contact_subject'],
		'contact_name'			=> $SOW->sanitizr('POST', array('contact_name'=>'string'))['contact_name'],
		'contact_email'			=> $SOW->sanitizr('POST', array('contact_email'=>'email'))['contact_email'],
		'contact_phone'			=> $SOW->sanitizr('POST', array('contact_phone'=>'string'))['contact_phone'],
		'contact_message'		=> $SOW->sanitizr('POST', array('contact_message'=>'string'))['contact_message'],
		'contact_gdpr'			=> (int) $SOW->sanitizr('POST', array('contact_gdpr'=>'int'))['contact_gdpr'], // not used

	];


	// Valid email required!
	if($array['contact_email'] === null) {
		$SOW->headerStatusSet(404);
		die('{:err:required:}');
	}



	// All good so far!
	// Include here the SMTP, not at top!
	// Security reasons!
	require_once('sow_core/sow.smtp.php');


	// Loop  through departments and assign email
	foreach($config['email_contacts'] as $contact) {

		// Looks like somebody made no changes to config?
		if($contact['enabled'] !== true || $contact['email'] == 'john.doe@mydomain.com')
			continue;


		if($contact['department'] === '*' ||  $contact['department'] == $array['contact_department'] &&  $array['contact_department'] != '') {

			// 1. [email_to]
			$array['email_to'][] = array(
				'email' => $contact['email'], 
				'name' 	=> ($contact['name'] != '') ? $contact['name'] : '',
			);

		}

	}


	// Required dest!
	if(!isset($array['email_to'])) {
		die('<div class="alert alert-danger mb-3">No department set in php/config.inc.php</div>');
		$SOW->headerStatusSet(404);
	}

	// NOT AVAILABLE! YET!
	// 2. [email_attachment]
	// $array['email_attachment'][] = array(
	// 	'file_path' => '/some/path/to.zip', 
	// 	'file_name' => 'to.zip - or leave empty',
	// );


	// Email Subject!
	$array['contact_subject'] = $array['contact_subject'] != '' ? $array['contact_subject'] : $array['contact_department'];
	if($array['contact_subject'] == '')
		$array['contact_subject'] = 'Contact Form';


	// 3. Rendering
	$return = SOW_Smtp::render(array(
		'email_subject'				=> $array['contact_subject'],								// Required
		'email_to'					=> $array['email_to'], 										// Required, array format
		'email_from'				=> $array['contact_email'], 								// Required
		'email_from_name'			=> $array['contact_name'], 									// Optional
		'email_reply_to'			=> $array['contact_email'],									// Optional | Recommended
		'email_body'				=> buildEmailBody($array), 									// Well...
		// 'email_attachment'			=> $array['email_attachment'],							// Optional
	));


	/*

		4.SMTP responses
		++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++
		RETURNS
			null 	= error, body/sender/etc not valid
			false 	= email not sent (email invalid or some other reason)
			true 	= email successfully sent
			string 	= debug / provider message
		++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++ ++
	
	*/


	if($return !== true)
		die('<div class="alert alert-danger mb-3">' . $return . '</div>');


	// Yeee! Success!
	die('{:success:}');

















	/**
	 *
	 *	Creating a template
	 *	Looks ugly in here, but the final email
	 *	is better than plain text!
	 *
	 *	:: More email template layouts in a future update!
	 */
	function buildEmailBody($array) {


		// HEADER
		$tpl = '
		<html>
			<head>
				<title>' . $array['contact_subject'] . '</title>
			</head>

			<body style="color:#000000;background-color:#e9ecf3;font-family: Helvetica, Arial, sans-serif;line-height:20px;font-size: 16px;font-weight:normal;">
				<div style="background-color:#ffffff;max-width:600px; margin-left:auto; margin-right:auto; margin-top:60px; margin-bottom:60px; box-shadow: 0 1px 15px 1px rgba(113, 106, 202, 0.08); border-radius:4px; -webkit-border-radius:4px; padding:30px;">


					<h3 style="font-size: 23px; margin-bottom:0px;padding-bottom:30px; border-bottom: #cccccc 1px solid;">
						' . $array['contact_subject'] . '													<br>
						<span style="color:#999999;font-weight:300; font-size:15px;">
							' . date('d F, Y / H:i') . '
						</span>
					</h3> 																					<br>';

		// BODY
		$tpl .= '
					<div style="font-size:18px;font-weight:normal;">
						' . $array['contact_message'] . '
					</div>
																											<br>
					<hr style="border:0; border-top:#cccccc 1px solid;">
																											<br>
					<div style="font-size:14px">
						<strong>Name:</strong> 					' . $array['contact_name'] . ' 				<br>
						<strong>Email:</strong> 				' . $array['contact_email'] . ' 			<br>
						<strong>Phone:</strong> 				' . $array['contact_phone'] . ' 			<br>
					</div>';
			

		// FOOTER 
		$tpl .= '
				</div>
			</body>
		</html>';


		return $tpl;

	}																					