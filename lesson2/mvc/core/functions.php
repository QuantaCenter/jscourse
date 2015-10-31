<?php
/**
 * Created by PhpStorm.
 * User: zjy
 * Date: 2015/10/31
 * Time: 15:18
 */
function replace_view($arr){
    $re='';
    $string='@$re='.$arr[0].'?'.$arr[0].':$arr[0];';
    eval($string);
    return $re;
}