
	USING SOW CORE
		sow_core/sow.core.php is a simple PHP class containing a list of functions|helpers you can use for your project.
		If you already use a PHP framework, dfinitely don't need them.
		To test each function, open index.php and uncomment around there :)
		sow_core/sow.init.php is actually a basic setup like showing errors, setting headers, etc.


	USING SMTP CLASS ALONE
		Might be useful because uses redundancy - a list of transactional email providers -
		if one fail, will try to use the next one from the list (and so on). 
		Useful when a transactional email provider suspend/limit your account (or simply fail to deliver) - 
		your production server will be able to try/deliver using another email provider/service.

		1. Copy sow_core/sow.smtp.php
		2. Copy from config.inc.php
				$config['sow.smtp:*']
		3. Copy sow_core/libs/phpmailer/ (or use composer to get a fresh copy)

		You're done!
		Use it like you see in the demo files: 
			require_once('sow.smtp.php');
			SOW_Smtp::render(...);


	PHPMAILER MANUAL UPDATE
		1. download the latest version
			https://github.com/PHPMailer/PHPMailer
		2. Copy the folder to sow_core/libs/phpmailer/
		3. Update in config.inc.php this line
				$config['sow.smtp:phpmailer_dir']

		You're done!