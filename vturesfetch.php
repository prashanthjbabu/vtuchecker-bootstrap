<?
$usn=$_GET['q'];
$homepage = file_get_contents("http://results.vtu.ac.in/vitavi.php?rid=$usn&submit=SUBMIT");
//echo $homepage;
$pieces = explode("\n", $homepage);
//echo sizeof($pieces);
$results=$pieces[245];
//for($ctr=0;$ctr<245;$ctr++)
//array_shift($pieces);
//$results = implode("\n", $pieces);
//echo $results;
//echo sizeof($pieces);
echo $results;
//echo "<br>DEBUG = ".$pieces[0];


?>
