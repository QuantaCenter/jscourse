<?php
/**
 * Created by PhpStorm.
 * User: zjy
 * Date: 2015/10/22
 * Time: 17:34
 */
function __autoload($class)
{
    $class = strtolower( $class );
    $class = str_replace( '\\', DIRECTORY_SEPARATOR, $class );
    require_once( "./" . $class . '.php' );
}