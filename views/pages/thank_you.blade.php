@extends('layouts.app')
@section('title', 'Terima Kasih')
@section('content')
    <div class="container text-center p-5">
        <h1>Terima Kasih, {{ htmlspecialchars($name) }}!</h1>
        <p>Pesan Anda telah berhasil dikirim.</p>
        <a href="/" class="btn btn-primary">Kembali ke Beranda</a>
    </div>
@endsection