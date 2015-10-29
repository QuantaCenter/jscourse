<?php
/**
 * Created by PhpStorm.
 * User: zjy
 * Date: 2015/10/23
 * Time: 0:58
 */

namespace core;


abstract class model
{
    protected $db;
    protected $result;
    function __construct(){
        $conf=require "./app/conf/config.php";
        $this->db=new \mysqli($conf['DB_HOST'].":".$conf['DB_PORT'],$conf['DB_USER'],$conf['DB_PWD'],$conf['DB_NAME']);
        $this->db->query('set names utf8');
    }
    function result($re){
        $arr=[];
        while($row=$re->fetch_assoc()){
            $arr[]=$row;
        }
        return $arr;
    }
}