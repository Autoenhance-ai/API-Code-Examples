<?php
require_once 'vendor/autoload.php';

use Ramsey\Uuid\Uuid;

function generate_order_id() {
    return Uuid::uuid4()->toString();
}
?>