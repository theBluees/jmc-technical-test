<?php $__env->startSection('title', 'Terima Kasih'); ?>
<?php $__env->startSection('content'); ?>
    <div class="container text-center p-5">
        <h1>Terima Kasih, <?php echo e(htmlspecialchars($name)); ?>!</h1>
        <p>Pesan Anda telah berhasil dikirim.</p>
        <a href="/" class="btn btn-primary">Kembali ke Beranda</a>
    </div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>