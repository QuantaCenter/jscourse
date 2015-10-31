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
    function index()
    {
        $this->display();
    }
    function check(){
        $m=$this->model('count');
        $re=$m->login($_POST);
        if($re){
            echo "µÇÂ¼³É¹¦";
        }
        else{
            echo "µÇÂ½Ê§°Ü";
        }
    }
}
/* End of file democontroller.php */