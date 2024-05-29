<?php
const API_URL = "https://api.autoenhance.ai/v3/images/";

function create_image($apiKey, $orderId, $image) {
    try {
        $requestData = array(
            'image_name' => $image['name'],
            'contentType' => $image['type'],
            'order_id' => $orderId,
            'hdr' => true
        );

        $options = array(
            'http' => array(
                'header'  => "Content-Type: application/json\r\n" .
                             "x-api-key: $apiKey\r\n",
                'method'  => 'POST',
                'content' => json_encode($requestData),
                'ignore_errors' => true
            )
        );

        $context  = stream_context_create($options);
        $response = file_get_contents(API_URL, false, $context);

        if ($response === false) {
            return ['status' => 500, 'body' => null];
        }

        $http_response_header = $http_response_header ?? [];
        preg_match('/HTTP\/\d\.\d\s+(\d+)/', $http_response_header[0], $matches);
        $status_code = intval($matches[1]);

        return ['status' => $status_code, 'body' => json_decode($response, true)];
    } catch (Exception $e) {
        error_log("Error uploading image: " . $e->getMessage());
        return ['status' => 500, 'body' => null];
    }
}
?>