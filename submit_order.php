<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "smart_shop";


$conn = new mysqli($host, $user, $pass, $db);


if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$product = $_POST['product'];
$price = $_POST['price'];
$qty = $_POST['quantity'];


$sql = "INSERT INTO orders (product_name, price, quantity) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sdi", $product, $price, $qty);

if ($stmt->execute()) {
  echo "✅ Order placed for $product!";
} else {
  echo "❌ Error: " . $stmt->error;
}

$conn->close();
?>
