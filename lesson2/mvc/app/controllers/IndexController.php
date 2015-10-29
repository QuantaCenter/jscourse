<?php
/**
 * Created by PhpStorm.
 * User: zjy
 * Date: 2015/10/21
 * Time: 12:48
 */
namespace app\controllers;
use core\controller;
class IndexController extends controller
{
    function __construct(){
        header("Content-type:text/html;charset=utf-8");
    }
    function index()
    {
//        echo('hello world');
//        $m=$this->model("count");
//        $result=$m->getAll();
//        var_dump($result);
        $this->display();
    }
    function a(){
        $this->show('index');
    }
}
/* End of file democontroller.php */