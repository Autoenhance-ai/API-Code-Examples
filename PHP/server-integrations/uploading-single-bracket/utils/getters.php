<?php
function get_images() {
    $folder = "images/";
    $files = scandir($folder);
    $imageFiles = [];

    foreach ($files as $file) {
        $file_info = pathinfo($folder . $file);
        $extension = strtolower($file_info['extension']);
        if ($extension === 'jpg' || $extension === 'jpeg' || $extension === 'png' || $extension === 'gif') {
            $imageFiles[] = $folder . $file;
        }
    }
    
    return $imageFiles;
}
?>