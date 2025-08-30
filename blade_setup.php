<?php
// blade_setup.php
require 'vendor/autoload.php';
use Philo\Blade\Blade;

$views = __DIR__ . '/views';
$cache = __DIR__ . '/cache';

$blade = new Blade($views, $cache);
?>