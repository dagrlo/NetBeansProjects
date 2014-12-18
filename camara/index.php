<?php
session_start();
  $activo=false;
echo "-".$_SESSION["aa"];
if ($_SESSION["aa"]=="1"){
    $activo=true;
}
?>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
       <meta http-equiv="refresh" content="1000">

        <title></title>
        <style type="text/css">
            
            </style>
            
            <SCRIPT LANGUAGE="JavaScript">
 // 1000 = 1 segundo
            </SCRIPT>
        </head>
        <body>
            <?php
         
           unset($_SESSION["aa"]);
            if ($_POST["pass"] == "kk") 
                {
             $_SESSION["aa"]="1";
            }
            ?>
            <form action="index.php" method="post">
                <input type="text" name="pass"/>

                <div id="contenedor"  <?php if($activo == true){ echo 'style="display:block;"'; } else { echo 'style="display:none;"';} ?>>

                <TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0" BGCOLOR=#333333>

                    <TR><TD ALIGN="center"><IMG id="foto" SRC="index.jpg"  BORDER="1" HEIGHT="480" WIDTH="640"></TD></TR>

                </TABLE>
            </div>


        </form>


    </body>
</html>
