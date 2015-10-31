<?php
/**
 * Created by PhpStorm.
 * User: zjy
 * Date: 2015/10/31
 * Time: 15:21
 */
@$info=$_SERVER['PATH_INFO']?$_SERVER['PATH_INFO']:"";
$url=explode("/",$info);
@$controller=$url[1]==''?"Index":$url[1];
@$action=$url[2]?$url[2]:"index";

$url2=explode("/",$_SERVER['REQUEST_URI']);
$root=$url2[1];

define("__ROOT__",'/'.$root);
define("__CONTROLLER__",$_SERVER['SCRIPT_NAME'].'/'.$controller);
define("__ACTION__",__CONTROLLER__.'/'.$action);
define("__PUBLIC__",'/'.$root.'/'.'public');
