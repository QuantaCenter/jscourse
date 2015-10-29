<?php
/**
 * Created by PhpStorm.
 * User: zjy
 * Date: 2015/10/22
 * Time: 17:08
 */

namespace core;

class router
{
    static public function run(){
        @$info=$_SERVER['PATH_INFO']?$_SERVER['PATH_INFO']:"";
        $url=explode("/",$info);
        @$controller=$url[1]==''?"Index":$url[1];
        @$action=$url[2]?$url[2]:"index";
        define('__CONTROLLER__',$controller);
        define('__ACTION__',$action);
        static::load();
    }
    static public function load(){
        $conName='app\controllers\\'.__CONTROLLER__."Controller";
        $con=new $conName();
        eval('$con->'.__ACTION__.'();');
    }
}