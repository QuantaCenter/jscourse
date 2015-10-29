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
        $re=$this->db->query($sql);
        return $this->result($re);
    }
}