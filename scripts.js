var running="false";
function search()
{
  if(running=="true")
  {
    alert("already running");
    running="false";  
    return;
  }
  alert("hello");
  running="true";
  var usn=document.getElementById("usn");
  $("#loading").show();
  var xmlhttp;
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
    if(xmlhttp.readyState==4 && xmlhttp.status==200)
      {
        clearTimeout(xmlHttpTimeout); 
        var n=xmlhttp.responseText.match(/not yet available/g);
        if(n!=null)
        {
          document.getElementById("myDiv").innerHTML="<p class=\"lead\" align=\"justify\">Results are <font color=red>NOT YET AVAILABLE</font> for USN <font color=green>"+usn.value+"</font> . Trying again in <font color=blue>10</font> seconds</p>";
          window.setTimeout("display(10)",1000);
            $("#loading").hide();
          window.setTimeout("search()", 10000);
        }
       else if(xmlhttp.responseText.length!=0)
        {
          document.getElementById("myDiv").innerHTML="<p class=\"lead\" align=\"justify\">Result ARE <font color=red>OUT</font> for USN <font color=green>"+usn.value+"</font></p>"+xmlhttp.responseText;
          $("#loading").hide();
          playSound('bing');
        }
       else
        {
          document.getElementById("myDiv").innerHTML="<p class=\"lead\" align=\"justify\">Error communicating with VTU Server for USN <font color=green>"+usn.value+"</font> . Trying again in <font color=blue>10</font> seconds</p>";
          window.setTimeout("display2(10)",1000);
          $("#loading").hide();
          window.setTimeout("search()", 10000);
        }
      }
      else if(xmlhttp.readyState==4 && xmlhttp.status==404)
      {
        document.getElementById("myDiv").innerHTML="<p class=\"lead\" align=\"justify\">Error communicating with VTU Server for USN <font color=green>"+usn.value+"</font> . Trying again in <font color=blue>10</font> seconds</p>";
        window.setTimeout("display2(10)",1000);
        $("#loading").hide();
        window.setTimeout("search()", 10000);
      }
    }
    xmlhttp.open("GET","vturesfetch.php?q="+usn.value,true);
    xmlhttp.send();
    var xmlHttpTimeout=setTimeout(ajaxTimeout,8000);
    function ajaxTimeout(){
    var usn=document.getElementById("usn");
    xmlhttp.abort();
    document.getElementById("myDiv").innerHTML="<p class=\"lead\" align=\"justify\">Error communicating with VTU Server for USN <font color=green>"+usn.value+"</font> . Trying again in <font color=blue>10</font> seconds</p>";
    window.setTimeout("display2(10)",1000);
    $("#loading").hide();
    window.setTimeout("search()", 10000);
  }
}
function display(t)
{
  if(running=="false")
    document.getElementById("myDiv").innerHTML="";
  var usn=document.getElementById("usn");
  t=t-1;
  document.getElementById("myDiv").innerHTML="<p class=\"lead\" align=\"justify\">Results are <font color=red>NOT YET AVAILABLE</font> for USN <font color=green>"+usn.value+"</font> . Trying again in <font color=blue>"+t+"</font> seconds</p>";
  if(t>0)
    window.setTimeout("display("+t+")",1000);
}
function display2(t)
{
  if(running=="false")
    document.getElementById("myDiv").innerHTML="";
  var usn=document.getElementById("usn");
  t=t-1;
  document.getElementById("myDiv").innerHTML="<p class=\"lead\" align=\"justify\">Error communicating with VTU Server for USN <font color=green>"+usn.value+"</font> . Trying again in <font color=blue>"+t+"</font> seconds</p>";
  if(t>0)
    window.setTimeout("display2("+t+")",1000);
}
function playSound(filename)
{   
  document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3" /></audio>';
}
$(document).ready(function()
{
  $("#loading").hide();
  $("#res").click(function()
  {
    $("#loading").show();
    document.getElementById("myDiv").innerHTML="";
  });
});