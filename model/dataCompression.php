<?php
	$action = $_POST["action"];

	if ($action == "compress")
	{
		$id = $_POST["id"];
		$idCompress = _compress($id);
		echo $idCompress;
	}
	else if ($action == "decompress")
	{
		$id = $_POST["id"];
		$idCompress = _decompress($id);
		echo $idCompress;
	}

	function _compress($data) {
		try
		{
			$content = rtrim(strtr(base64_encode(gzdeflate($data, 9)), '+/', '-_'), '=');
			echo $content;
		}
		catch(Exception $e)
		{
			echo -1;
		}
	}

	function _decompress($data) {
		try
		{
			$content = gzinflate(base64_decode(strtr($data, '-_', '+/')));
			echo $content;
		}
		catch(Exception $e)
		{
			echo -1;
		}
	}
?>