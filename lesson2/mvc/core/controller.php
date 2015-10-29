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
    function display($tpl=__ACTION__){
        $t1=microtime();
        $tpl.=".php";
        require_once './app/views/'.$tpl;
        $t2=microtime();
        var_dump($t2-$t1);
    }
    function show($template, array $var = array()){
        $t1=microtime();
        extract($var);   // ��ȡ�����еı���
        //ob_end_clean (); //�رն�����������������
        ob_start ();     // ��ʼһ���µĻ�����
        require './app/views/' . $template . '.php';  //������ͼview
        $content = ob_get_contents ();             // ��û�����������
        ob_end_clean ();           // �رջ�����

        //ob_end_flush();      // �����ֱ������������������ˣ������ٴλ���������
        //ob_start();            //��ʼ�µĻ�������������ĳ�����
        echo $content;
        $t2=microtime();
        var_dump($t2-$t1);
    }
    public function model($class){
        $M='app\models\\'.$class."Model";
        return new $M();
    }
}