<?php
// public/index.php
require_once __DIR__ . '/../blade_setup.php';
echo $blade->view()->make('pages.home')->render();
?>