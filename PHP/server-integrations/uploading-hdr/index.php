<?php
require_once 'utils/getters.php';
require_once 'utils/generate_order_id.php';
require_once 'utils/create_image.php';
require_once 'utils/upload_to_s3.php';
require_once 'utils/merge_order.php';

echo "Enter your API key: ";
$api_key = fgets(STDIN);
$api_key = preg_replace('/[^[:print:]]/', '', $api_key);

$image_files = get_images();
$order_id = generate_order_id();

$successfully_uploaded = true;

foreach ($image_files as $image_file) {
    $image_data = file_get_contents($image_file);
    
    $image_name = basename($image_file);
    $image_mime = mime_content_type($image_file);
    
    $image = array(
        'name' => $image_name,
        'type' => $image_mime,
        'data' => base64_encode($image_data)
    );

    $result = create_image($api_key, $order_id, $image);
    
    if ($result['status'] == 401) {
        echo "Invalid API key, please check the value before you start the script.\n";
        $successfully_uploaded = false;
        break;
    } elseif ($result['status'] != 200) {
        echo "Failed to upload $image_name\n";
        $successfully_uploaded = false;
    } else {
        echo "Successfully created $image_name\n";
        $s3PutObjectUrl = $result['body']['s3PutObjectUrl'];
    }

    if(isset($s3PutObjectUrl)) {
        upload_to_s3($s3PutObjectUrl, $image_mime, $image_data, $image_name);
    } else {
        echo "Failed to upload $image_name\n, the s3PutObjectUrl does not exist.\n";
        $successfully_uploaded = false;
    }
}

if($successfully_uploaded) {
    merge_order($api_key, $order_id);
}

?>