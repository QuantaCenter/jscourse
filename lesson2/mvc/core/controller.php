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
        extract($var);   // ��ȡ�����еı���
        //ob_end_clean (); //�رն�����������������
        ob_start ();     // ��ʼһ���µĻ�����
        require './app/views/' . $template . '.html';  //������ͼview
        $content = ob_get_contents ();             // ��û�����������
        ob_end_clean ();           // �رջ�����

        //ob_end_flush();      // �����ֱ������������������ˣ������ٴλ���������
        //ob_start();            //��ʼ�µĻ�������������ĳ�����
        return $content;
    }
    public function model($class){
        $M='app\models\\'.$class."Model";
        return new $M();
    }
}