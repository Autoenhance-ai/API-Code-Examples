<?php
    function upload_to_s3($url, $type, $buffer, $name) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Content-Type: $type"
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $buffer);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($response === false || $http_code >= 400) {
            echo "Failed to upload $name, error: " . curl_error($ch) . "\n";
        } else {
            echo "Uploaded image $name to S3\n";
        }

        curl_close($ch);
    }
?>