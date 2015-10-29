<?php
/**
 * Created by PhpStorm.
 * User: zjy
 * Date: 2015/10/21
 * Time: 12:39
 */
// ¼ì²âPHP»·¾³
if(version_compare(PHP_VERSION,'5.3.0','<'))  die('require PHP > 5.3.0 !');

define("CORE","./core/");

require_once "core/mvc.php";