<?php
/**
 * Created by PhpStorm.
 * User: zjy
 * Date: 2015/10/25
 * Time: 16:23
 */

namespace app\models;
use core\model;

class countModel extends model
{
    function add($arr){
        $result='';
        foreach($arr as $num){
            $result+=$num;
        }
        return $result;
    }
    function getAll(){
        $sql="select * from user";
        $this->query($sql);
        return $this->result();
    }
    function login($arr){
        $sql="select * from user where username='{$arr['username']}' and password='{$arr['password']}'";
        $this->query($sql);
        echo $this->getLastSql();
        return $this->result();
    }
    function testSelect($arr){
        $this->select('select * form user where username= ? and password ?',$arr);
    }
}