<?php
// File: public/contact_handler.php

// Periksa apakah request adalah metode POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitasi dan validasi input dari form
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    // Validasi semua input wajib
    if ($name && $email && $message) {
        try {
            // Inisialisasi koneksi ke database SQLite
            $pdo = new PDO('sqlite:../database/database.sqlite');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Siapkan dan eksekusi query untuk menyimpan data
            $stmt = $pdo->prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
            $stmt->execute([$name, $email, $message]);

            // Set header respons ke JSON
            header('Content-Type: application/json');
            // Kirim respons sukses
            echo json_encode(['success' => true, 'name' => $name]);
        } catch (PDOException $e) {
            // Set header respons ke JSON dan kode error 500
            header('Content-Type: application/json');
            http_response_code(500); // Internal Server Error
            echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data.']);
        }
    } else {
        // Set header respons ke JSON dan kode error 400
        header('Content-Type: application/json');
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Input tidak valid.']);
    }
}
?>