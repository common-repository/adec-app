<?php  

/**
* 
*/
class Admin_url
{
	
	protected $admin_url;

	public function get_admin_url(){
		return	$this->admin_url = 'http://localhost/1_ck_check/page.php';
	}

	public function get_url(){
		return  $this->url = 'http://localhost/1_ck_check/test.php';
	}
}

?>