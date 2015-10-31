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
    private $db;
    private $re;
    private $lastSql;
    function __construct(){
        $conf=require "./app/conf/config.php";
        $this->db=new \mysqli($conf['DB_HOST'].":".$conf['DB_PORT'],$conf['DB_USER'],$conf['DB_PWD'],$conf['DB_NAME']);
        $this->db->query('set names utf8');
    }
    function query($sql){
        $this->lastSql=$sql;
        $this->re=$this->db->query($sql);
    }
    function result(){
        if($this->re && $this->re->num_rows>0){
            $arr=[];
            while($row=$this->re->fetch_assoc()){
                $arr[]=$row;
            }
        }
        else{
            $arr=null;
        }
        return $arr;
    }
    function getLastSql(){
        return $this->lastSql;
    }
    function select($sql,$arr){
        $arr=array_map('addslashes',$arr);
        $sunsql=explode("?",$sql);
        $sql='';
        foreach($sunsql as $in => $va ){
            if(isset($arr[$in]))
                $sql.=$va."'".$arr[$in]."'";
        }
        $this->lastSql=$sql;
        $this->re=$this->db->query($sql);
    }
}