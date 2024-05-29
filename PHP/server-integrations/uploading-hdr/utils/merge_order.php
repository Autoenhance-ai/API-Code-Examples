<?php

function merge_order($apiKey, $orderId) {
    $url = "https://api.autoenhance.ai/v3/orders/$orderId/merge";
    
    $ch = curl_init($url);

    // Set the necessary options for the curl request
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "x-api-key: $apiKey"
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        error_log("Error merging images: " . curl_error($ch));
    } else {
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($http_code != 200) {
            error_log("Error merging images: HTTP status code " . $http_code);
        }
    }

    curl_close($ch);

    // Log the URL where images can be viewed
    echo "You can view the uploaded images at: https://app.autoenhance.ai/orders/$orderId\n";
}

?>