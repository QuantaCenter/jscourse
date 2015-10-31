<?php
/**
 * Created by PhpStorm.
 * User: zjy
 * Date: 2015/10/23
 * Time: 0:34
 */

namespace core;


abstract class controller
{
    function display($tpl=ACTION,array $var = array()){
//        require_once './app/views/'.$tpl;
        $content=$this->vendor($tpl,$var);
        $content=preg_replace_callback("#__[A-Z]+__#",'replace_view',$content);
        echo $content;
    }
    function vendor($template, array $var = array()){
        extract($var);   // 抽取数组中的变量
        //ob_end_clean (); //关闭顶层的输出缓冲区内容
        ob_start ();     // 开始一个新的缓冲区
        require './app/views/' . $template . '.html';  //加载视图view
        $content = ob_get_contents ();             // 获得缓冲区的内容
        ob_end_clean ();           // 关闭缓冲区

        //ob_end_flush();      // 这个是直接输出缓冲区的内容了，不用再次缓存起来。
        //ob_start();            //开始新的缓冲区，给后面的程序用
        return $content;
    }
    public function model($class){
        $M='app\models\\'.$class."Model";
        return new $M();
    }
}